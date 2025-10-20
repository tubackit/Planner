# Urlaubsplaner Android App

Die Android-Version des Urlaubsplaners als native App mit WebView.

## 🚀 App bauen

Die APK-Datei wird nach dem Build hier erstellt:
- **`android-app/app/build/outputs/apk/debug/app-debug.apk`** (~5.4 MB)

## Installation auf Android-Gerät

### Methode 1: Per USB-Kabel (empfohlen)
1. Aktivieren Sie auf Ihrem Android-Gerät die **Entwickleroptionen**:
   - Gehen Sie zu Einstellungen → Über das Telefon
   - Tippen Sie 7x auf "Build-Nummer"
   - Gehen Sie zurück zu Einstellungen → Entwickleroptionen
   - Aktivieren Sie "USB-Debugging"

2. Verbinden Sie Ihr Android-Gerät per USB mit dem Mac

3. Installieren Sie die APK:
   ```bash
   adb install android-app/app/build/outputs/apk/debug/app-debug.apk
   ```

### Methode 2: Direkter Download
1. Laden Sie die APK-Datei auf Ihr Android-Gerät (z.B. per E-Mail, Cloud-Speicher, oder USB)
2. Öffnen Sie die APK-Datei auf dem Gerät
3. Erlauben Sie die Installation aus unbekannten Quellen, wenn gefragt
4. Installieren Sie die App

## Funktionen

Die Android-App hat die gleichen Funktionen wie die Desktop-Version:
- ✅ Urlaubsplanung für mehrere Mitarbeiter
- ✅ Kalenderjahresansicht mit allen Tagen
- ✅ Farb-Codierung (Urlaub, Krank, Feiertag)
- ✅ Deutsche Feiertage automatisch
- ✅ Persistente Datenspeicherung
- ✅ Mitarbeiter-Verwaltung
- ✅ Standard-Mitarbeiter: "Max Mustermann"

## Technische Details

- **Minimum Android Version**: Android 5.0 (API 21)
- **Target Android Version**: Android 13 (API 33)
- **Build-Tool**: Gradle 8.5
- **Java-Version**: Java 21
- **Größe**: ~5.4 MB

## Entwicklung

### Voraussetzungen
- Java Development Kit (JDK) 11 oder höher
- Android SDK (empfohlen: über Android Studio)
- Gradle (über Wrapper verfügbar - kein separater Download nötig)

### App neu bauen
```bash
cd android-app
./gradlew clean assembleDebug
```

Die APK wird erstellt unter:
`android-app/app/build/outputs/apk/debug/app-debug.apk`

### Release-Version bauen
```bash
./gradlew assembleRelease
```

## Fehlerbehebung

### Alle Java-Fehler behoben ✅
Die Kompilierung war erfolgreich ohne Fehler!

### Bekannte Warnungen (harmlos)
- Warnung über veraltete Java-Quellversion 8 (kann ignoriert werden)
- Warnung über veraltete Android-APIs (kann ignoriert werden)

## Datenspeicherung

Die App speichert Daten lokal auf dem Android-Gerät:
- **Mitarbeiter**: SharedPreferences
- **Urlaubsdaten**: Lokale Dateien im App-Verzeichnis

Daten bleiben auch nach App-Neustart erhalten.
