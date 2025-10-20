const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Speicherpfad für Daten
const userDataPath = app.getPath('userData');
const dataDirectory = path.join(userDataPath, 'urlaubsplaner-data');
const employeesFilePath = path.join(dataDirectory, 'employees.json');
const vacationDataPath = path.join(dataDirectory, 'vacation-data');

// Stellen Sie sicher, dass die Verzeichnisse existieren
function ensureDirectoriesExist() {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }
  if (!fs.existsSync(vacationDataPath)) {
    fs.mkdirSync(vacationDataPath, { recursive: true });
  }
}

let mainWindow;

function createWindow() {
  // Browser-Fenster erstellen
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Aus Sicherheitsgründen deaktiviert
      contextIsolation: true, // Aktiviert für Sicherheit
      preload: path.join(__dirname, 'preload.js') // Preload-Skript für sichere IPC
    }
  });

  // index.html laden
  mainWindow.loadFile('index.html');

  // DevTools nur in Entwicklungsumgebung öffnen
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Ereignis: Fenster wird geschlossen
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Funktion zum Löschen aller gespeicherten Daten
function resetAllData() {
  if (fs.existsSync(dataDirectory)) {
    try {
      // Lösche alle Dateien im Datenverzeichnis
      if (fs.existsSync(employeesFilePath)) {
        fs.unlinkSync(employeesFilePath);
      }
      
      if (fs.existsSync(vacationDataPath)) {
        const files = fs.readdirSync(vacationDataPath);
        for (const file of files) {
          fs.unlinkSync(path.join(vacationDataPath, file));
        }
      }
      
      console.log('Alle gespeicherten Daten wurden zurückgesetzt.');
      return true;
    } catch (error) {
      console.error('Fehler beim Zurücksetzen der Daten:', error);
      return false;
    }
  }
  return true;
}

// Prüfen, ob die App zum ersten Mal gestartet wird
function isFirstRun() {
  const firstRunFlagPath = path.join(userDataPath, '.first-run-completed');
  if (!fs.existsSync(firstRunFlagPath)) {
    // Erstelle die Datei, um zu markieren, dass der erste Start abgeschlossen ist
    try {
      fs.writeFileSync(firstRunFlagPath, new Date().toString());
      return true;
    } catch (error) {
      console.error('Fehler beim Erstellen der First-Run-Flag-Datei:', error);
    }
    return true;
  }
  return false;
}

// App ist bereit
app.whenReady().then(() => {
  // Stellen Sie sicher, dass die Verzeichnisse existieren
  ensureDirectoriesExist();
  
  // Lösche alle gespeicherten Daten NUR beim ersten Start
  if (isFirstRun()) {
    console.log('Erster Start der App - Daten werden zurückgesetzt');
    resetAllData();
  } else {
    console.log('Normaler Start der App - Daten bleiben erhalten');
  }
  
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Alle Fenster geschlossen
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC-Kommunikation für Datenspeicherung
ipcMain.handle('save-data', async (event, data) => {
  try {
    // Stellen Sie sicher, dass die Verzeichnisse existieren
    ensureDirectoriesExist();
    
    if (data.type === 'employees') {
      // Mitarbeiterdaten speichern
      fs.writeFileSync(employeesFilePath, JSON.stringify(data.employees));
      return { success: true };
    } else if (data.year !== undefined && data.vacationData) {
      // Urlaubsdaten für ein bestimmtes Jahr speichern
      const yearFilePath = path.join(vacationDataPath, `${data.year}.json`);
      fs.writeFileSync(yearFilePath, JSON.stringify(data.vacationData));
      return { success: true };
    } else {
      return { success: false, error: 'Ungültiges Datenformat' };
    }
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
    return { success: false, error: error.message };
  }
});

// IPC-Kommunikation für Datenabruf
ipcMain.handle('load-data', async (event, requestType) => {
  try {
    // Stellen Sie sicher, dass die Verzeichnisse existieren
    ensureDirectoriesExist();
    
    if (requestType === 'employees') {
      // Mitarbeiterdaten laden
      if (fs.existsSync(employeesFilePath)) {
        const data = fs.readFileSync(employeesFilePath, 'utf8');
        return { success: true, employees: JSON.parse(data) };
      } else {
        return { success: true, employees: null };
      }
    } else if (requestType && requestType.startsWith('year-')) {
      // Urlaubsdaten für ein bestimmtes Jahr laden
      const year = requestType.split('-')[1];
      const yearFilePath = path.join(vacationDataPath, `${year}.json`);
      
      if (fs.existsSync(yearFilePath)) {
        const data = fs.readFileSync(yearFilePath, 'utf8');
        return { success: true, year, vacationData: JSON.parse(data) };
      } else {
        return { success: true, year, vacationData: null };
      }
    } else {
      // Alle verfügbaren Daten laden
      const result = { success: true, data: [] };
      
      // Mitarbeiterdaten laden
      if (fs.existsSync(employeesFilePath)) {
        const employeesData = JSON.parse(fs.readFileSync(employeesFilePath, 'utf8'));
        result.data.push({ type: 'employees', employees: employeesData });
      }
      
      // Urlaubsdaten laden
      if (fs.existsSync(vacationDataPath)) {
        const files = fs.readdirSync(vacationDataPath);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const year = file.replace('.json', '');
            const yearFilePath = path.join(vacationDataPath, file);
            const vacationData = JSON.parse(fs.readFileSync(yearFilePath, 'utf8'));
            result.data.push({ year: parseInt(year), vacationData });
          }
        }
      }
      
      return result;
    }
  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
    return { success: false, error: error.message };
  }
});
