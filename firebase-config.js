/**
 * Firebase Konfiguration für Urlaubsplaner
 * 
 * WICHTIG: Diese Datei muss mit deinen eigenen Firebase-Credentials ausgefüllt werden!
 * 
 * Anleitung zum Einrichten:
 * 1. Gehe zu https://console.firebase.google.com/
 * 2. Erstelle ein neues Projekt oder wähle ein bestehendes aus
 * 3. Gehe zu Projekteinstellungen > Allgemein
 * 4. Scrolle zu "Deine Apps" und klicke auf "</> Web"
 * 5. Registriere deine App und kopiere die Config-Daten hierher
 * 6. Aktiviere "Realtime Database" in der Firebase Console
 */

// Firebase Credentials für Urlaubsplaner
const firebaseConfig = {
  apiKey: "AIzaSyA6HvHWnIzNRvDyHxRUfgUWufaya_7gGLs",
  authDomain: "urlaubsplaner-9439f.firebaseapp.com",
  databaseURL: "https://urlaubsplaner-9439f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urlaubsplaner-9439f",
  storageBucket: "urlaubsplaner-9439f.firebasestorage.app",
  messagingSenderId: "324348513817",
  appId: "1:324348513817:web:52ec562ae3c041661fa488"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);

// Realtime Database Referenz
const database = firebase.database();

// Haupt-Namespace für die App (ändere dies für verschiedene Teams)
const APP_NAMESPACE = 'urlaubsplaner';

// Database Referenzen
const employeesRef = database.ref(`${APP_NAMESPACE}/employees`);
const vacationDataRef = database.ref(`${APP_NAMESPACE}/vacationData`);
const currentYearRef = database.ref(`${APP_NAMESPACE}/currentYear`);

// Export für andere Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    database,
    employeesRef,
    vacationDataRef,
    currentYearRef,
    APP_NAMESPACE
  };
}

