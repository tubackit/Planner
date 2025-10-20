const { contextBridge, ipcRenderer } = require('electron');

// Sichere Brücke zwischen Renderer-Prozess und Hauptprozess
contextBridge.exposeInMainWorld('electronAPI', {
  // Mitarbeiterdaten speichern
  saveEmployees: async (employees) => {
    return await ipcRenderer.invoke('save-data', {
      type: 'employees',
      employees: employees
    });
  },
  
  // Urlaubsdaten speichern
  saveVacationData: async (year, vacationData) => {
    return await ipcRenderer.invoke('save-data', {
      year: year,
      vacationData: vacationData
    });
  },
  
  // Mitarbeiterdaten laden
  loadEmployees: async () => {
    return await ipcRenderer.invoke('load-data', 'employees');
  },
  
  // Urlaubsdaten für ein bestimmtes Jahr laden
  loadVacationDataForYear: async (year) => {
    return await ipcRenderer.invoke('load-data', `year-${year}`);
  },
  
  // Alle Daten laden
  loadAllData: async () => {
    return await ipcRenderer.invoke('load-data');
  }
});
