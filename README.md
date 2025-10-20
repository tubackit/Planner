# Urlaubsplaner 2025 für Rheinland-Pfalz

<div align="center">
  <img src="kalender.png" alt="Urlaubsplaner Screenshot" width="600" />
  <p><em>Ein übersichtlicher Urlaubsplaner für 2025/2026, der Feiertage und Schulferien in Rheinland-Pfalz anzeigt</em></p>
  
  **🌐 [Live Demo](https://tubackit.github.io/Planner/)**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub Pages](https://img.shields.io/badge/demo-online-brightgreen)](https://tubackit.github.io/Planner/)
</div>

## 📋 Über das Projekt

Ein professioneller, benutzerfreundlicher Urlaubsplaner als Desktop-Anwendung (Electron) und Android-App. Perfekt für Teams, um Urlaub, Krankheitstage und Gleitzeit zu verwalten. Alle Daten werden lokal gespeichert – keine Cloud, keine Anmeldung erforderlich.

## ✨ Funktionen

- 📅 **Kalenderansicht** für das gesamte Jahr 2025/2026
- 🎉 **Feiertage** für Rheinland-Pfalz mit Tooltip-Informationen
- 🏫 **Schulferien** in Rheinland-Pfalz mit Tooltip-Informationen
- 🎨 **Farbliche Hervorhebung** der Wochenenden
- 📍 **Aktueller Tag** wird markiert und automatisch angezeigt
- 👥 **Mitarbeiterverwaltung** mit einfachem Hinzufügen/Entfernen
- 📊 **Automatische Zählung** der genommenen Urlaubstage pro Mitarbeiter
- 🔥 **Firebase Echtzeit-Synchronisation** - Mehrere Nutzer gleichzeitig!
- 💾 **Lokale Datenspeicherung** (localStorage & Electron als Fallback)
- 📱 **Responsive Design** für verschiedene Bildschirmgrößen
- 🖥️ **Desktop-App** für Windows und macOS
- 📱 **Android-App** verfügbar

### Urlaubstypen

- **U**: Urlaub (blau)
- **K**: Krank (grün)
- **GZ**: Gleitzeit (gelb)

## 🚀 Installation

### Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 16 oder höher)
- npm (wird mit Node.js installiert)
- Optional: [Firebase Account](https://firebase.google.com/) (kostenlos, für Multi-User Support)

### Web-Version (mit Firebase)

1. **Firebase einrichten** (siehe [FIREBASE_SETUP.md](FIREBASE_SETUP.md))
2. **firebase-config.js** mit deinen Credentials ausfüllen
3. **index.html** in einem Browser öffnen oder auf GitHub Pages deployen

### Desktop-App (Electron)

```bash
# Repository klonen
git clone https://github.com/tubackit/Planner.git
cd Planner

# Abhängigkeiten installieren
npm install

# Anwendung starten
npm start
```

### Android-App

```bash
# Zum Android-Verzeichnis wechseln
cd android-app

# App bauen (benötigt Android SDK)
./gradlew assembleDebug

# APK befindet sich dann in: app/build/outputs/apk/debug/
```

## 🛠️ Verwendung

### Desktop-App

1. Starten Sie die Anwendung mit `npm start`
2. Klicken Sie auf eine Zelle im Kalender, um das Dropdown-Menü zu öffnen
3. Wählen Sie den gewünschten Eintrag (U, K, GZ oder Löschen)
4. Die Anzahl der genommenen Urlaubstage wird automatisch aktualisiert
5. Alle Daten werden automatisch lokal gespeichert

### Mitarbeiterverwaltung

1. Klicken Sie auf den "⚙️ Einstellungen"-Button in der Kopfzeile
2. Geben Sie den Namen eines neuen Mitarbeiters ein und klicken Sie auf "Mitarbeiter hinzufügen"
3. Um einen Mitarbeiter zu entfernen, klicken Sie auf den "Entfernen"-Button neben seinem Namen
4. Klicken Sie erneut auf den Einstellungs-Button, um die Verwaltung auszublenden

## 📦 Build

### Desktop-App bauen

```bash
# Für Windows
npm run build

# Für macOS
npm run build:mac

# Für alle Plattformen
npm run build:all
```

Die fertigen Installer befinden sich im `dist/` Ordner.

### Android-App bauen

```bash
cd android-app

# Debug-Build
./gradlew assembleDebug

# Release-Build (benötigt Signing-Konfiguration)
./gradlew assembleRelease
```

## 📅 Feiertage und Schulferien in Rheinland-Pfalz 2025

### Feiertage

| Datum | Feiertag |
|-------|----------|
| 1. Januar 2025 | Neujahr |
| 18. April 2025 | Karfreitag |
| 21. April 2025 | Ostermontag |
| 1. Mai 2025 | Tag der Arbeit |
| 29. Mai 2025 | Christi Himmelfahrt |
| 9. Juni 2025 | Pfingstmontag |
| 19. Juni 2025 | Fronleichnam |
| 3. Oktober 2025 | Tag der Deutschen Einheit |
| 1. November 2025 | Allerheiligen |
| 25. Dezember 2025 | 1. Weihnachtstag |
| 26. Dezember 2025 | 2. Weihnachtstag |

### Schulferien

| Zeitraum | Ferien |
|----------|--------|
| 23.12.2024 - 03.01.2025 | Weihnachtsferien |
| 14.04.2025 - 25.04.2025 | Osterferien |
| 07.07.2025 - 15.08.2025 | Sommerferien |
| 13.10.2025 - 24.10.2025 | Herbstferien |
| 22.12.2025 - 07.01.2026 | Weihnachtsferien |

### Schulferien 2026

| Zeitraum | Ferien |
|----------|--------|
| 22.12.2025 - 07.01.2026 | Weihnachtsferien |
| 30.03.2026 - 10.04.2026 | Osterferien |
| 06.07.2026 - 14.08.2026 | Sommerferien |
| 05.10.2026 - 16.10.2026 | Herbstferien |
| 21.12.2026 - 06.01.2027 | Weihnachtsferien |

## 🛠️ Technische Details

### Web-Version

- **Framework**: Vanilla JavaScript (keine Frameworks!)
- **Sprachen**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Firebase Realtime Database (optional)
- **Datenspeicherung**: 
  - **Stufe 1**: Firebase (Echtzeit-Sync)
  - **Stufe 2**: localStorage (Fallback)
- **Hosting**: GitHub Pages ready

### Desktop-App

- **Framework**: Electron
- **Sprachen**: HTML, CSS, JavaScript
- **Build-Tool**: electron-builder
- **Datenspeicherung**: Lokales Dateisystem (userData) + optional Firebase

### Android-App

- **Sprache**: Java
- **SDK**: Android SDK
- **Min SDK**: Android 5.0 (API Level 21)
- **Build-Tool**: Gradle
- **WebView**: Mit Firebase-Integration

## 🔥 Firebase Multi-User Support

Die App unterstützt **Echtzeit-Synchronisation** zwischen mehreren Nutzern:

### Features

- ✅ **Automatische Synchronisation** - Änderungen erscheinen sofort bei allen Nutzern
- ✅ **Offline-First** - App funktioniert auch ohne Internet
- ✅ **Konflikt-Vermeidung** - Smart Update-System verhindert Datenüberschreibung
- ✅ **Keine Anmeldung** - Einfach URL teilen und loslegen
- ✅ **Kostenlos** - Firebase Spark Plan reicht für kleine Teams

### Setup

Siehe [FIREBASE_SETUP.md](FIREBASE_SETUP.md) für eine Schritt-für-Schritt-Anleitung.

**Quick Start:**
1. Firebase-Projekt erstellen
2. `firebase-config.js` mit Credentials ausfüllen
3. Fertig! 🎉

### Ohne Firebase

Die App funktioniert auch **ohne Firebase** und speichert dann nur lokal:
- **Web**: localStorage
- **Desktop**: Electron userData
- **Android**: SharedPreferences

## 📁 Projektstruktur

```
urlaubsplaner/
├── android-app/           # Android-App Quellcode
│   ├── app/
│   └── build.gradle
├── build/                 # Build-Ressourcen (Icons, etc.)
├── dist/                  # Build-Outputs (gitignored)
├── index.html            # Hauptdatei der Anwendung
├── firebase-config.js    # Firebase Konfiguration (credentials hier eintragen!)
├── main.js               # Electron Main Process
├── preload.js            # Electron Preload Script
├── package.json          # Node.js Konfiguration
├── FIREBASE_SETUP.md     # Firebase Setup-Anleitung
├── QUICK_UPDATE.md       # Git Quick-Guide
└── README.md             # Diese Datei
```

## 🤝 Beitragen

Contributions, Issues und Feature Requests sind willkommen!

1. [Fork das Projekt](https://github.com/tubackit/Planner/fork)
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen [Pull Request](https://github.com/tubackit/Planner/pulls)

## 📝 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE](LICENSE) Datei für Details.

## 👤 Autor

Dein Name / Dein Team

## 🙏 Danksagungen

- Feiertage und Schulferien-Daten für Rheinland-Pfalz
- Electron für das Desktop-Framework
- Alle Contributors, die an diesem Projekt mitgewirkt haben

## 📞 Support

Bei Fragen oder Problemen öffnen Sie bitte ein [Issue](https://github.com/tubackit/Planner/issues).

## 🌐 Live Demo

Teste die Anwendung online: **[https://tubackit.github.io/Planner/](https://tubackit.github.io/Planner/)**

---

<div align="center">
  Made with ❤️ in Rheinland-Pfalz
</div>
