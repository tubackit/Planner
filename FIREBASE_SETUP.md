# 🔥 Firebase Setup-Anleitung

Diese Anleitung erklärt, wie du Firebase für Echtzeit-Synchronisation einrichtest.

## 🎯 Was Firebase bietet

- ✅ **Echtzeit-Synchronisation**: Alle Nutzer sehen sofort Änderungen
- ✅ **Automatisches Backup**: Daten werden in der Cloud gespeichert
- ✅ **Multi-User Support**: Mehrere Personen können gleichzeitig arbeiten
- ✅ **Offline-Support**: App funktioniert auch ohne Internet
- ✅ **Kostenlos**: Firebase Spark Plan reicht für kleine Teams

## 📋 Schritt 1: Firebase-Projekt erstellen

### 1.1 Firebase Console öffnen

1. Gehe zu: https://console.firebase.google.com/
2. Melde dich mit deinem Google-Account an
3. Klicke auf **"Projekt hinzufügen"** oder **"Create a project"**

### 1.2 Projekt konfigurieren

1. **Projektname**: `Urlaubsplaner` (oder einen anderen Namen)
2. **Google Analytics**: Optional (kannst du aktivieren oder überspringen)
3. Klicke auf **"Projekt erstellen"**
4. Warte, bis das Projekt erstellt wurde (~30 Sekunden)

## 🔧 Schritt 2: Realtime Database aktivieren

### 2.1 Database erstellen

1. In der Firebase Console, klicke im linken Menü auf **"Realtime Database"**
2. Klicke auf **"Datenbank erstellen"**
3. **Standort wählen**: 
   - Für Europa: `europe-west1`
   - Für USA: `us-central1`
4. **Sicherheitsregeln**: Wähle **"Im Testmodus starten"** (später ändern wir das)
5. Klicke auf **"Aktivieren"**

### 2.2 Sicherheitsregeln anpassen

Die Testmodus-Regeln sind nur 30 Tage gültig. Ersetze sie mit:

```json
{
  "rules": {
    "urlaubsplaner": {
      ".read": true,
      ".write": true
    }
  }
}
```

⚠️ **Wichtig**: Diese Regeln erlauben jedem Zugriff. Für Produktivumgebung siehe Abschnitt "Sicherheit" unten.

## 🌐 Schritt 3: Web-App registrieren

### 3.1 App hinzufügen

1. In der Firebase Console, klicke oben links auf das **Zahnrad-Symbol** (⚙️)
2. Wähle **"Projekteinstellungen"**
3. Scrolle nach unten zu **"Deine Apps"**
4. Klicke auf das **`</>`-Symbol** (Web)
5. **App-Spitzname**: `Urlaubsplaner Web`
6. ✅ Aktiviere: **"Firebase Hosting für diese App einrichten"** (optional)
7. Klicke auf **"App registrieren"**

### 3.2 Config-Daten kopieren

Du siehst jetzt einen Code-Block wie diesen:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "urlaubsplaner-xxxxx.firebaseapp.com",
  databaseURL: "https://urlaubsplaner-xxxxx-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urlaubsplaner-xxxxx",
  storageBucket: "urlaubsplaner-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

**Kopiere diese Daten!** Du brauchst sie im nächsten Schritt.

## 📝 Schritt 4: Config-Datei aktualisieren

### 4.1 firebase-config.js bearbeiten

Öffne die Datei `firebase-config.js` in deinem Projekt und ersetze die Platzhalter mit deinen echten Werten:

```javascript
const firebaseConfig = {
  apiKey: "HIER_DEINE_API_KEY",
  authDomain: "HIER_DEINE_AUTH_DOMAIN",
  databaseURL: "HIER_DEINE_DATABASE_URL",  // Wichtig für Realtime Database!
  projectId: "HIER_DEINE_PROJECT_ID",
  storageBucket: "HIER_DEINE_STORAGE_BUCKET",
  messagingSenderId: "HIER_DEINE_SENDER_ID",
  appId: "HIER_DEINE_APP_ID"
};
```

### 4.2 Namespace anpassen (optional)

Falls du mehrere Teams/Abteilungen hast, ändere den Namespace:

```javascript
// In firebase-config.js
const APP_NAMESPACE = 'urlaubsplaner-team-a';  // oder 'team-b', etc.
```

Jeder Namespace hat seine eigenen Daten.

## ✅ Schritt 5: Testen

### 5.1 Lokal testen

```bash
# Öffne index.html in einem Browser
# ODER starte einen lokalen Server:

# Mit Python 3
python3 -m http.server 8000

# Mit Node.js (npx)
npx http-server -p 8000

# Dann öffne: http://localhost:8000
```

### 5.2 Online testen (GitHub Pages)

Wenn du bereits GitHub Pages verwendest:

```bash
git add firebase-config.js index.html
git commit -m "feat: Add Firebase realtime sync"
git push origin main
```

Nach 1-2 Minuten ist die App mit Firebase live auf:
https://tubackit.github.io/Planner/

### 5.3 Multi-User Test

1. Öffne die App in **zwei verschiedenen Browser-Fenstern**
2. Ändere einen Urlaubseintrag in Fenster 1
3. ✅ Die Änderung sollte **sofort** in Fenster 2 erscheinen!

## 🔒 Sicherheit (für Produktiv-Umgebung)

### Option 1: Domain-Beschränkung (Empfohlen für GitHub Pages)

```json
{
  "rules": {
    "urlaubsplaner": {
      ".read": "auth == null || request.auth != null",
      ".write": "auth == null || request.auth != null",
      ".validate": "newData.exists()"
    }
  }
}
```

Dann in der Firebase Console:
1. **Authentication** → **Settings** → **Authorized domains**
2. Füge hinzu: `tubackit.github.io`

### Option 2: Passwort-Schutz (Für sensible Daten)

Siehe `FIREBASE_AUTH.md` für detaillierte Anleitung.

### Option 3: Einfacher Passwort-Schutz im Code

```javascript
// In index.html, füge am Anfang hinzu:
const TEAM_PASSWORD = prompt("Team-Passwort eingeben:");
if (TEAM_PASSWORD !== "dein-geheimes-passwort") {
  alert("Falsches Passwort!");
  document.body.innerHTML = "";
}
```

## 📊 Firebase Console verwenden

### Daten ansehen

1. Firebase Console → **Realtime Database**
2. Du siehst alle Daten in Echtzeit
3. Du kannst Daten manuell bearbeiten/löschen

### Datenstruktur

```
urlaubsplaner/
├── employees/
│   ├── 0: "Max Mustermann"
│   ├── 1: "Maria Schmidt"
│   └── 2: "John Doe"
├── vacationData/
│   └── 2025/
│       ├── "01.01.2025-Max Mustermann": "U"
│       ├── "02.01.2025-Max Mustermann": "U"
│       └── ...
└── currentYear: 2025
```

## 🔄 Daten migrieren (Von localStorage zu Firebase)

Falls du bereits Daten in localStorage hast:

1. Öffne die Browser-Konsole (F12)
2. Führe aus:

```javascript
// Mitarbeiter migrieren
const employees = JSON.parse(localStorage.getItem('vacationPlannerEmployees') || '[]');
employeesRef.set(employees);

// Urlaubsdaten migrieren
const year = 2025;
const vacationData = JSON.parse(localStorage.getItem(`vacationPlanner${year}`) || '{}');
vacationDataRef.child(year).set(vacationData);
```

## 🆘 Fehlerbehebung

### "Firebase not defined"

- Stelle sicher, dass die Firebase Scripts in `index.html` eingebunden sind
- Überprüfe die Reihenfolge: Erst Firebase SDK, dann firebase-config.js

### "Permission denied"

- Überprüfe die Sicherheitsregeln in der Firebase Console
- Im Testmodus sollte ".read" und ".write" auf `true` stehen

### "Network error"

- Überprüfe deine `databaseURL` in firebase-config.js
- Stelle sicher, dass die URL mit `https://` beginnt
- Überprüfe, dass die Region übereinstimmt (z.B. `europe-west1`)

### Daten werden nicht synchronisiert

1. Öffne Browser-Konsole (F12)
2. Suche nach Fehlermeldungen
3. Überprüfe, dass Firebase initialisiert wurde:
   ```javascript
   console.log(firebase.database());
   ```

### "Quota exceeded"

Firebase Spark (kostenlos):
- 1 GB Datenspeicher
- 10 GB/Monat Download
- 100 gleichzeitige Verbindungen

Für mehr: Upgrade auf Blaze Plan (Pay-as-you-go)

## 📈 Nutzung überwachen

Firebase Console → **Usage**
- Siehe Datenverkehr
- Siehe aktive Verbindungen
- Siehe Kosten (im Blaze Plan)

## 💡 Tipps & Best Practices

### 1. Namespace pro Team/Abteilung

```javascript
// firebase-config.js
const APP_NAMESPACE = 'urlaubsplaner-vertrieb';
```

### 2. Jahres-Archive erstellen

Archiviere alte Jahre, um Performance zu verbessern:

```javascript
// Am Jahresende, Daten archivieren
database.ref(`${APP_NAMESPACE}/archive/2025`).set(vacationData2025);
```

### 3. Offline-Persistenz aktivieren

```javascript
// In firebase-config.js
firebase.database().enablePersistence = true;
```

### 4. Connection State anzeigen

```javascript
// Zeige Verbindungsstatus
const connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', (snap) => {
  if (snap.val() === true) {
    console.log('✅ Mit Firebase verbunden');
  } else {
    console.log('❌ Offline');
  }
});
```

## 🚀 Fertig!

Deine App synchronisiert jetzt in Echtzeit! 🎉

**Teste mit mehreren Browsern**: Öffne die App in Chrome, Firefox und Safari gleichzeitig und sieh die Magie! ✨

---

## 📚 Weitere Ressourcen

- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database)
- [Firebase Preise](https://firebase.google.com/pricing)
- [Firebase Best Practices](https://firebase.google.com/docs/database/usage/best-practices)

## 💬 Support

Bei Problemen:
- [Firebase Support](https://firebase.google.com/support)
- [GitHub Issues](https://github.com/tubackit/Planner/issues)

