// Globale Variablen
let currentYear = 2025;
let currentMonth = new Date().getMonth();
let employees = ['Max Mustermann'];
let vacationData = {};
let selectedDay = null;
let selectedEmployee = null;

// Feiertage nach Jahr - Rheinland-Pfalz
const holidaysByYear = {
    2025: {
        '01.01': 'Neujahr',
        '18.04': 'Karfreitag',
        '21.04': 'Ostermontag',
        '01.05': 'Tag der Arbeit',
        '29.05': 'Christi Himmelfahrt',
        '09.06': 'Pfingstmontag',
        '19.06': 'Fronleichnam',
        '03.10': 'Tag der Deutschen Einheit',
        '01.11': 'Allerheiligen',
        '25.12': 'Erster Weihnachtstag',
        '26.12': 'Zweiter Weihnachtstag'
    },
    2026: {
        '01.01': 'Neujahr',
        '03.04': 'Karfreitag',
        '06.04': 'Ostermontag',
        '01.05': 'Tag der Arbeit',
        '14.05': 'Christi Himmelfahrt',
        '25.05': 'Pfingstmontag',
        '04.06': 'Fronleichnam',
        '03.10': 'Tag der Deutschen Einheit',
        '01.11': 'Allerheiligen',
        '25.12': 'Erster Weihnachtstag',
        '26.12': 'Zweiter Weihnachtstag'
    }
};

// Schulferien nach Jahr - Rheinland-Pfalz
const schoolVacationsByYear = {
    2025: [
        { start: '23.12.2024', end: '03.01.2025', name: 'Weihnachtsferien' },
        { start: '14.04.2025', end: '25.04.2025', name: 'Osterferien' },
        { start: '07.07.2025', end: '15.08.2025', name: 'Sommerferien' },
        { start: '13.10.2025', end: '24.10.2025', name: 'Herbstferien' },
        { start: '22.12.2025', end: '07.01.2026', name: 'Weihnachtsferien' }
    ],
    2026: [
        { start: '22.12.2025', end: '07.01.2026', name: 'Weihnachtsferien' },
        { start: '30.03.2026', end: '10.04.2026', name: 'Osterferien' },
        { start: '06.07.2026', end: '14.08.2026', name: 'Sommerferien' },
        { start: '12.10.2026', end: '23.10.2026', name: 'Herbstferien' },
        { start: '21.12.2026', end: '06.01.2027', name: 'Weihnachtsferien' }
    ]
};

// DOM-Elemente
const vacationPlanner = document.getElementById('vacation-planner');
const monthTitle = document.getElementById('month-title');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const settingsButton = document.getElementById('settings-button');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings');
const employeeNameInput = document.getElementById('employee-name');
const addEmployeeBtn = document.getElementById('add-employee-btn');
const employeeList = document.getElementById('employee-list');
const yearSelect = document.getElementById('year-select');
const changeYearBtn = document.getElementById('change-year-btn');
const yearDisplay = document.getElementById('year-display');
const vacationDialog = document.getElementById('vacation-dialog');
const vacationDateEl = document.getElementById('vacation-date');
const vacationEmployeeEl = document.getElementById('vacation-employee');
const closeVacationBtn = document.getElementById('close-vacation');
const overlay = document.getElementById('overlay');
const navCalendar = document.getElementById('nav-calendar');
const navEmployees = document.getElementById('nav-employees');
const navSettings = document.getElementById('nav-settings');

// Event-Listener
document.addEventListener('DOMContentLoaded', initializeApplication);
prevMonthBtn.addEventListener('click', () => changeMonth(-1));
nextMonthBtn.addEventListener('click', () => changeMonth(1));
settingsButton.addEventListener('click', openSettings);
closeSettingsBtn.addEventListener('click', closeSettings);
addEmployeeBtn.addEventListener('click', addEmployee);
changeYearBtn.addEventListener('click', changeYear);
closeVacationBtn.addEventListener('click', closeVacationDialog);
overlay.addEventListener('click', closeAllDialogs);
navCalendar.addEventListener('click', () => showTab('calendar'));
navEmployees.addEventListener('click', () => showTab('employees'));
navSettings.addEventListener('click', () => showTab('settings'));

// Urlaubsoptionen Event-Listener
document.querySelectorAll('.vacation-option').forEach(option => {
    option.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        setVacation(selectedDay, selectedEmployee, value);
        closeVacationDialog();
    });
});

// Initialisierung der Anwendung
async function initializeApplication() {
    // Aktuelles Jahr setzen
    const today = new Date();
    currentYear = today.getFullYear();
    
    // Jahr im Header anzeigen
    yearDisplay.textContent = currentYear;
    
    // Jahr im Auswahlfeld setzen
    yearSelect.value = currentYear;
    
    // Mitarbeiter laden
    await initializeEmployees();
    
    // Kalender erstellen
    createVacationPlanner();
    
    // Urlaubsdaten laden
    await loadVacationData();
    
    // Prüfen, ob es der erste Start ist
    checkFirstRun();
    
    // Mitarbeiterliste rendern
    renderEmployeeList();
    
    // Querformat-Optimierung
    setupLandscapeMode();
}

// Prüfen, ob es der erste Start ist
async function checkFirstRun() {
    if (window.AndroidBridge && typeof window.AndroidBridge.isFirstRun === 'function') {
        const isFirstRun = window.AndroidBridge.isFirstRun();
        if (isFirstRun) {
            // Daten zurücksetzen
            resetAllData();
        }
    }
}

// Alle Daten zurücksetzen
function resetAllData() {
    // Nur Max Mustermann als Mitarbeiter behalten
    employees = ['Max Mustermann'];
    saveEmployees();
    
    // Urlaubsdaten leeren
    vacationData = {};
    saveVacationData();
    
    // Anwendung neu laden
    createVacationPlanner();
    renderEmployeeList();
}

// Tab anzeigen
function showTab(tab) {
    // Navigation-Items aktualisieren
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Entsprechendes Tab aktivieren
    if (tab === 'calendar') {
        navCalendar.classList.add('active');
        closeSettings();
    } else if (tab === 'employees') {
        navEmployees.classList.add('active');
        openSettings();
        // Zum Mitarbeiterbereich scrollen
        document.querySelector('.section-title:nth-of-type(2)').scrollIntoView({behavior: 'smooth'});
    } else if (tab === 'settings') {
        navSettings.classList.add('active');
        openSettings();
    }
}

// Einstellungen öffnen
function openSettings() {
    settingsPanel.classList.add('active');
    overlay.classList.add('active');
}

// Einstellungen schließen
function closeSettings() {
    settingsPanel.classList.remove('active');
    overlay.classList.remove('active');
}

// Alle Dialoge schließen
function closeAllDialogs() {
    closeSettings();
    closeVacationDialog();
}

// Urlaubsdialog öffnen
function openVacationDialog(dateStr, employee) {
    selectedDay = dateStr;
    selectedEmployee = employee;
    
    // Datum formatieren
    const [day, month, year] = dateStr.split('.');
    const date = new Date(`${year}-${month}-${day}`);
    const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('de-DE', options);
    
    // Dialog aktualisieren
    vacationDateEl.textContent = `Eintrag für ${formattedDate}`;
    vacationEmployeeEl.textContent = employee;
    
    // Dialog anzeigen
    vacationDialog.classList.add('active');
    overlay.classList.add('active');
}

// Urlaubsdialog schließen
function closeVacationDialog() {
    vacationDialog.classList.remove('active');
    overlay.classList.remove('active');
}

// Monat wechseln - jetzt Jahr wechseln
function changeMonth(direction) {
    currentYear += direction;
    yearDisplay.textContent = currentYear;
    yearSelect.value = currentYear;
    
    createVacationPlanner();
    loadVacationData();
}

// Jahr ändern
async function changeYear() {
    const newYear = parseInt(yearSelect.value);
    
    if (newYear !== currentYear) {
        currentYear = newYear;
        yearDisplay.textContent = currentYear;
        
        // Kalender neu erstellen
        createVacationPlanner();
        
        // Urlaubsdaten für das neue Jahr laden
        await loadVacationData();
    }
}

// Mitarbeiter initialisieren
async function initializeEmployees() {
    try {
        if (window.AndroidBridge && typeof window.AndroidBridge.loadEmployees === 'function') {
            // Android-spezifischer Code
            const employeesJson = window.AndroidBridge.loadEmployees();
            if (employeesJson && employeesJson !== '[]') {
                employees = JSON.parse(employeesJson);
            }
        } else {
            // Fallback für Browser
            const storedEmployees = localStorage.getItem('employees');
            if (storedEmployees && storedEmployees !== '[]') {
                employees = JSON.parse(storedEmployees);
            }
        }
        
        // Sicherstellen, dass mindestens ein Mitarbeiter vorhanden ist
        if (!employees || employees.length === 0) {
            employees = ['Max Mustermann'];
            await saveEmployees();
        }
        
        console.log('Geladene Mitarbeiter:', employees);
    } catch (error) {
        console.error('Fehler beim Laden der Mitarbeiter:', error);
        employees = ['Max Mustermann'];
        await saveEmployees();
    }
}

// Mitarbeiter hinzufügen
function addEmployee() {
    const name = employeeNameInput.value.trim();
    
    if (name && !employees.includes(name)) {
        employees.push(name);
        employeeNameInput.value = '';
        saveEmployees();
        renderEmployeeList();
        createVacationPlanner();
    }
}

// Mitarbeiter entfernen
function removeEmployee(index) {
    const employee = employees[index];
    
    // Direkt entfernen ohne Bestätigung für bessere Touch-Bedienung
    employees.splice(index, 1);
    
    // Sicherstellen, dass mindestens ein Mitarbeiter vorhanden ist
    if (employees.length === 0) {
        employees = ['Max Mustermann'];
    }
    
    saveEmployees();
    renderEmployeeList();
    createVacationPlanner();
}

// Mitarbeiterliste rendern
function renderEmployeeList() {
    employeeList.innerHTML = '';
    
    employees.forEach((employee, index) => {
        const item = document.createElement('div');
        item.className = 'employee-item';
        
        const name = document.createElement('div');
        name.className = 'employee-name';
        name.textContent = employee;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.setAttribute('data-test-id', `delete-employee-${index}`);
        deleteBtn.setAttribute('aria-label', `Mitarbeiter ${employee} löschen`);
        
        // Click-Event
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeEmployee(index);
        });
        
        // Touch-Event für bessere mobile Unterstützung
        deleteBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        deleteBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeEmployee(index);
        });
        
        item.appendChild(name);
        item.appendChild(deleteBtn);
        employeeList.appendChild(item);
    });
}

// Mitarbeiter speichern
function saveEmployees() {
    try {
        if (window.AndroidBridge && typeof window.AndroidBridge.saveEmployees === 'function') {
            // Android-spezifischer Code
            window.AndroidBridge.saveEmployees(JSON.stringify(employees));
        } else {
            // Fallback für Browser
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    } catch (error) {
        console.error('Fehler beim Speichern der Mitarbeiter:', error);
    }
}

// Urlaubsplaner erstellen - Vereinfachte Tabellen-Ansicht
function createVacationPlanner() {
    // Monatstitel aktualisieren
    updateMonthTitle();
    
    // Tabelle leeren
    vacationPlanner.innerHTML = '';
    
    // Zwei Header-Zeilen erstellen
    const monthRow = document.createElement('tr');
    const dayRow = document.createElement('tr');
    
    // Mitarbeiter-Header (spannt beide Zeilen)
    const employeeHeader = document.createElement('th');
    employeeHeader.textContent = 'Mitarbeiter';
    employeeHeader.className = 'employee-cell';
    employeeHeader.rowSpan = 2;
    monthRow.appendChild(employeeHeader);
    
    // Monats-Header für Januar bis Dezember
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    
    months.forEach((month, monthIndex) => {
        const monthHeader = document.createElement('th');
        monthHeader.textContent = month;
        monthHeader.className = 'month-header';
        monthHeader.style.backgroundColor = '#e53935';
        monthHeader.style.color = 'white';
        
        // Korrekte Anzahl der Tage pro Monat
        const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
        monthHeader.colSpan = daysInMonth;
        
        monthRow.appendChild(monthHeader);
        
        // Tages-Header für jeden Tag des Monats
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, monthIndex, day);
            const dayOfWeek = date.getDay();
            const formattedDate = formatDate(date);
            
            const dayHeader = document.createElement('th');
            dayHeader.textContent = day;
            dayHeader.className = 'day-header';
            
            // Wochenende markieren
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayHeader.className += ' weekend';
            }
            
            // Schulferien markieren (nur an Werktagen)
            if (isInSchoolVacation(formattedDate) && dayOfWeek !== 0 && dayOfWeek !== 6) {
                dayHeader.className += ' school-vacation';
            }
            
            // Feiertage markieren
            const shortDate = formattedDate.substring(0, 5);
            const holidays = holidaysByYear[currentYear] || {};
            if (holidays[shortDate]) {
                dayHeader.className += ' holiday';
            }
            
            dayRow.appendChild(dayHeader);
        }
    });
    
    // Urlaub-Zähler-Header (spannt beide Zeilen)
    const vacationCounterHeader = document.createElement('th');
    vacationCounterHeader.textContent = 'Urlaub';
    vacationCounterHeader.className = 'vacation-counter';
    vacationCounterHeader.rowSpan = 2;
    monthRow.appendChild(vacationCounterHeader);
    
    vacationPlanner.appendChild(monthRow);
    vacationPlanner.appendChild(dayRow);
    
    // Debug: Mitarbeiter anzeigen
    console.log('Erstelle Tabelle für Mitarbeiter:', employees);
    
    // Fallback: Mindestens einen Mitarbeiter sicherstellen
    if (!employees || employees.length === 0) {
        employees = ['Max Mustermann'];
        console.log('Fallback: Verwende Standard-Mitarbeiter');
    }
    
    // Mitarbeiter-Zeilen erstellen
    employees.forEach(employee => {
        const employeeRow = document.createElement('tr');
        
        // Mitarbeiter-Name-Zelle
        const employeeCell = document.createElement('td');
        employeeCell.textContent = employee;
        employeeCell.className = 'employee-cell';
        employeeRow.appendChild(employeeCell);
        
        // Für jeden Monat (Januar bis Dezember)
        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            
            // Für jeden Tag des Monats
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(currentYear, month, day);
                const formattedDate = formatDate(date);
                const dayOfWeek = date.getDay();
                
                const dayCell = document.createElement('td');
                dayCell.className = 'day-cell';
                
                // Monatsnamen für Tooltip
                const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 
                                  'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
                
                // Beschriftung: Leer lassen, da die Header-Zeile die Tage zeigt
                dayCell.textContent = '';
                dayCell.setAttribute('title', `${formattedDate} - ${monthNames[month]} ${day}`); // Tooltip mit Datum
                
                // Debug: Erste Zelle loggen
                if (month === 0 && day === 1) {
                    console.log('Erste Tages-Zelle erstellt:', dayCell.textContent, dayCell.className);
                }
                
                // Wochenende markieren
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    dayCell.className += ' weekend';
                }
                
                // Schulferien markieren (nur an Werktagen)
                if (isInSchoolVacation(formattedDate) && dayOfWeek !== 0 && dayOfWeek !== 6) {
                    dayCell.className += ' school-vacation';
                }
                
                // Feiertage markieren
                const shortDate = formattedDate.substring(0, 5);
                const holidays = holidaysByYear[currentYear] || {};
                if (holidays[shortDate]) {
                    dayCell.className += ' holiday';
                    dayCell.setAttribute('title', `${formattedDate} - ${holidays[shortDate]}`);
                }
                
                // Heutigen Tag markieren
                const today = new Date();
                if (date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear()) {
                    dayCell.className += ' today';
                    dayCell.setAttribute('title', `${formattedDate} - HEUTE`);
                }
                
                dayCell.setAttribute('data-date', formattedDate);
                dayCell.setAttribute('data-employee', employee);
                
                // Click-Event für Urlaubsauswahl
                dayCell.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openVacationDialog(formattedDate, employee);
                });
                
                // Touch-Events für mobile Geräte
                dayCell.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
                
                dayCell.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openVacationDialog(formattedDate, employee);
                });
                
                employeeRow.appendChild(dayCell);
            }
        }
        
        // Urlaub-Zähler-Zelle
        const counterCell = document.createElement('td');
        counterCell.className = 'vacation-counter';
        counterCell.setAttribute('data-employee', employee);
        counterCell.textContent = '0';
        employeeRow.appendChild(counterCell);
        
        vacationPlanner.appendChild(employeeRow);
    });
    
    // Debug: Tabelle anzeigen
    console.log('Tabelle erstellt. Anzahl Zeilen:', vacationPlanner.rows.length);
    console.log('Tabelle HTML:', vacationPlanner.innerHTML.substring(0, 500) + '...');
    
    // Urlaubsdaten anzeigen, falls bereits geladen
    updateVacationDisplay();
    
    // Zum heutigen Tag scrollen
    setTimeout(scrollToToday, 100);
}

// Monatstitel aktualisieren
function updateMonthTitle() {
    monthTitle.textContent = `Jahr ${currentYear}`;
}

// Zum heutigen Tag scrollen
function scrollToToday() {
    const today = new Date();
    const todayFormatted = formatDate(today);
    
    // Finde die Zelle mit dem heutigen Tag
    const todayCell = document.querySelector(`td[data-date="${todayFormatted}"]`);
    
    if (todayCell) {
        // Scroll zur heutigen Zelle
        todayCell.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'center' 
        });
        
        // Heutige Zelle hervorheben
        todayCell.style.boxShadow = '0 0 10px 3px rgba(255, 0, 0, 0.7)';
        todayCell.style.zIndex = '1000';
        
        // Hervorhebung nach 3 Sekunden entfernen
        setTimeout(() => {
            todayCell.style.boxShadow = '';
            todayCell.style.zIndex = '';
        }, 3000);
    }
}

// Format date as DD.MM.YYYY
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Prüfen, ob ein Datum in den Schulferien liegt
function isInSchoolVacation(dateStr) {
    const [day, month, year] = dateStr.split('.');
    const date = new Date(`${year}-${month}-${day}`);
    
    const schoolVacations = schoolVacationsByYear[currentYear] || [];
    
    return schoolVacations.some(vacation => {
        const [startDay, startMonth, startYear] = vacation.start.split('.');
        const [endDay, endMonth, endYear] = vacation.end.split('.');
        
        const startDate = new Date(`${startYear || year}-${startMonth}-${startDay}`);
        const endDate = new Date(`${endYear || year}-${endMonth}-${endDay}`);
        
        return date >= startDate && date <= endDate;
    });
}

// Urlaub setzen
function setVacation(dateStr, employee, type) {
    if (!vacationData[dateStr]) {
        vacationData[dateStr] = {};
    }
    
    if (type === '') {
        // Eintrag löschen
        delete vacationData[dateStr][employee];
        
        // Leere Objekte entfernen
        if (Object.keys(vacationData[dateStr]).length === 0) {
            delete vacationData[dateStr];
        }
    } else {
        // Eintrag setzen
        vacationData[dateStr][employee] = type;
    }
    
    // Daten speichern
    saveVacationData();
    
    // Anzeige aktualisieren
    updateVacationDisplay();
}

// Urlaubsdaten speichern
function saveVacationData() {
    try {
        if (window.AndroidBridge && typeof window.AndroidBridge.saveVacationData === 'function') {
            // Android-spezifischer Code
            window.AndroidBridge.saveVacationData(currentYear, JSON.stringify(vacationData));
        } else {
            // Fallback für Browser
            localStorage.setItem(`vacationPlanner${currentYear}`, JSON.stringify(vacationData));
        }
    } catch (error) {
        console.error('Fehler beim Speichern der Urlaubsdaten:', error);
    }
}

// Urlaubsdaten laden
async function loadVacationData() {
    try {
        if (window.AndroidBridge && typeof window.AndroidBridge.loadVacationData === 'function') {
            // Android-spezifischer Code
            const vacationDataJson = window.AndroidBridge.loadVacationData(currentYear);
            if (vacationDataJson) {
                vacationData = JSON.parse(vacationDataJson);
            } else {
                vacationData = {};
            }
        } else {
            // Fallback für Browser
            const storedData = localStorage.getItem(`vacationPlanner${currentYear}`);
            vacationData = storedData ? JSON.parse(storedData) : {};
        }
        
        // Anzeige aktualisieren
        updateVacationDisplay();
    } catch (error) {
        console.error('Fehler beim Laden der Urlaubsdaten:', error);
        vacationData = {};
    }
}

// Urlaubsanzeige aktualisieren
function updateVacationDisplay() {
    // Alle Zellen zurücksetzen
    document.querySelectorAll('td[data-date][data-employee]').forEach(cell => {
        cell.classList.remove('vacation-u', 'vacation-k', 'vacation-gz');
        cell.textContent = '';
    });
    
    // Urlaubsdaten anzeigen
    for (const dateKey in vacationData) {
        for (const employee in vacationData[dateKey]) {
            const type = vacationData[dateKey][employee];
            const cell = document.querySelector(`td[data-date="${dateKey}"][data-employee="${employee}"]`);
            
            if (cell) {
                cell.classList.add(`vacation-${type}`);
                cell.textContent = type.toUpperCase();
            }
        }
    }
    
    // Urlaub-Zähler aktualisieren
    employees.forEach(employee => {
        let vacationCount = 0;
        for (const dateKey in vacationData) {
            if (vacationData[dateKey][employee] === 'u') {
                vacationCount++;
            }
        }
        
        const counterCell = document.querySelector(`.vacation-counter[data-employee="${employee}"]`);
        if (counterCell) {
            counterCell.textContent = vacationCount;
        }
    });
}

// Querformat-Funktionen
function setupLandscapeMode() {
    // Prüfe Orientierung und zeige/verstecke Legende-Button
    function checkOrientation() {
        const legendToggle = document.querySelector('.legend-toggle');
        const isLandscape = window.innerWidth > window.innerHeight;
        
        console.log('Orientierung prüfen:', {
            width: window.innerWidth,
            height: window.innerHeight,
            isLandscape: isLandscape,
            orientation: window.orientation || 'unknown'
        });
        
        if (isLandscape) {
            // Querformat - CSS-Klasse hinzufügen
            document.body.classList.add('landscape-mode');
            if (legendToggle) legendToggle.style.display = 'inline-block';
            console.log('✅ Querformat erkannt - kompakte Ansicht aktiviert');
        } else {
            // Hochformat - CSS-Klasse entfernen
            document.body.classList.remove('landscape-mode');
            if (legendToggle) legendToggle.style.display = 'none';
            // Verstecke Legende falls sichtbar
            const legend = document.querySelector('.legend');
            if (legend) legend.classList.remove('landscape-visible');
            console.log('📱 Hochformat erkannt - normale Ansicht aktiviert');
        }
    }
    
    // Initiale Prüfung
    checkOrientation();
    
    // Event Listener für Orientierungsänderung
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', () => {
        setTimeout(checkOrientation, 100);
    });
    
    // Zusätzliche Prüfung nach kurzer Verzögerung
    setTimeout(checkOrientation, 500);
}

function toggleLegend() {
    const legend = document.querySelector('.legend');
    if (legend) {
        legend.classList.toggle('landscape-visible');
    }
}

