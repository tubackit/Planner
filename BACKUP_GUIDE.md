# 💾 Backup & Restore Anleitung

## 🎯 Übersicht

Mit Firebase hast du **automatische Cloud-Backups**, aber du kannst auch manuelle Backups erstellen.

## ✅ Automatische Sicherung (Firebase)

### Bereits aktiv! 🎉

Deine Daten werden automatisch in Firebase gesichert:
- ✅ Alle Änderungen werden sofort in die Cloud gespeichert
- ✅ Daten bleiben auch bei Computer-Ausfall erhalten
- ✅ Zugriff von überall
- ✅ Google-Infrastruktur = Sehr sicher

**Daten ansehen:**
https://console.firebase.google.com/project/urlaubsplaner-9439f/database

## 📥 Manuelle Backups

### Methode 1: Backup-Seite (Einfachste Methode)

1. Öffne: **https://tubackit.github.io/Planner/backup.html**
   - Oder klicke in der App auf den **💾 Backup** Button

2. Klicke auf **"⬇️ Alle Daten exportieren"**

3. Datei wird heruntergeladen: `urlaubsplaner-backup-2025-01-15.json`

4. Speichere die Datei an einem sicheren Ort:
   - **Cloud**: Google Drive, Dropbox, iCloud
   - **Lokal**: Externe Festplatte, USB-Stick
   - **Empfehlung**: Beides!

### Methode 2: Firebase Console

1. Gehe zu: https://console.firebase.google.com/
2. Wähle Projekt: "urlaubsplaner-9439f"
3. Linkes Menü: **Realtime Database**
4. Klicke auf ⋮ (3 Punkte) neben "urlaubsplaner"
5. Wähle: **"Export JSON"**
6. Speichere die Datei

### Methode 3: Browser-Console (Für Profis)

1. Öffne die App: https://tubackit.github.io/Planner/
2. Drücke **F12** (Developer Tools)
3. Gehe zu **Console**
4. Füge ein:

```javascript
firebase.database().ref('urlaubsplaner').once('value').then((snapshot) => {
  const data = snapshot.val();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
});
```

5. Drücke **Enter** → Datei wird heruntergeladen

## 📤 Backup wiederherstellen

### Von der Backup-Seite:

1. Öffne: **https://tubackit.github.io/Planner/backup.html**
2. Klicke: **"⬆️ Backup-Datei auswählen"**
3. Wähle deine Backup-Datei (`.json`)
4. Bestätige die Warnung
5. ✅ Daten werden wiederhergestellt!

### Aus Firebase Console:

1. Firebase Console → Realtime Database
2. Klicke auf ⋮ neben "urlaubsplaner"
3. Wähle: **"Import JSON"**
4. Wähle deine Backup-Datei
5. Bestätige

## 📅 Backup-Strategien

### Empfohlener Backup-Plan:

| Zeitpunkt | Methode | Speicherort |
|-----------|---------|-------------|
| **Täglich** | Automatisch | Firebase (aktiv) |
| **Wöchentlich** | Manuell Export | Cloud-Speicher |
| **Monatlich** | Manuell Export | Externe Festplatte |
| **Vor großen Änderungen** | Manuell Export | Lokal + Cloud |

### Backup vor wichtigen Aktionen:

Erstelle immer ein Backup **bevor** du:
- ✅ Viele Mitarbeiter auf einmal löschst
- ✅ Zum neuen Jahr wechselst
- ✅ Alte Daten importierst
- ✅ Die App updatest

## 🔄 Verschiedene Backup-Typen

### 1. Vollständiges Backup

**Was:** Alle Daten (alle Jahre, alle Mitarbeiter)

**Wann:** 
- Monatlich
- Vor großen Änderungen

**Wie:** 
```
Backup-Seite → "Alle Daten exportieren"
```

### 2. Jahres-Backup

**Was:** Nur ein bestimmtes Jahr (z.B. 2025)

**Wann:**
- Am Jahresende
- Für Archivierung

**Wie:**
```
Backup-Seite → "Nur 2025 exportieren"
```

### 3. Mitarbeiter-Backup

**Was:** Nur Mitarbeiterliste

**Wann:**
- Bei Änderungen im Team
- Für andere Teams

**Wie:** Browser Console:
```javascript
firebase.database().ref('urlaubsplaner/employees').once('value').then((snapshot) => {
  console.log(JSON.stringify(snapshot.val(), null, 2));
});
```

## 📊 Backup-Datei Struktur

Eine Backup-Datei sieht so aus:

```json
{
  "employees": [
    "Max Mustermann",
    "Maria Schmidt"
  ],
  "vacationData": {
    "2025": {
      "Max Mustermann": [
        {
          "date": "01.01.2025",
          "value": "u"
        }
      ]
    }
  },
  "currentYear": 2025
}
```

## 🛡️ Backup-Sicherheit

### Wo solltest du Backups speichern?

✅ **Empfohlen:**
- Cloud-Speicher (Google Drive, Dropbox)
- Externe Festplatte
- USB-Stick (an sicherem Ort)

❌ **Nicht empfohlen:**
- Nur auf dem gleichen Computer
- Unverschlüsselte E-Mail
- Öffentliche Cloud ohne Verschlüsselung

### Backup-Datei enthält:

- ⚠️ Mitarbeiternamen (personenbezogen!)
- ⚠️ Urlaubstage (personenbezogen!)
- ⚠️ Krankheitstage (sensibel!)

**→ Behandle Backups wie vertrauliche Dokumente!**

## 🔥 Notfall-Wiederherstellung

### Szenario 1: "Ich habe versehentlich Daten gelöscht!"

**Lösung:**
1. SOFORT Backup-Datei holen
2. Backup-Seite öffnen
3. Backup importieren
4. ✅ Daten wiederhergestellt

**Zeitfenster:** 
- Firebase: Solange noch jemand online war
- Lokales Backup: Unbegrenzt

### Szenario 2: "Firebase ist nicht erreichbar!"

**Lösung:**
- Die App funktioniert weiter mit localStorage
- Daten werden lokal gespeichert
- Automatische Sync wenn Firebase wieder online

### Szenario 3: "Ich brauche Daten von vor 3 Monaten!"

**Lösung:**
- Altes Backup importieren
- Oder: Firebase Support kontaktieren (haben längere Retention)

## 📱 Automatische Backup-Erinnerung

Füge einen Kalender-Eintrag hinzu:
- **Wöchentlich Sonntags**: Backup erstellen
- **Letzter Tag im Monat**: Monats-Backup
- **31. Dezember**: Jahres-Archiv

## 🔧 Erweiterte Optionen

### Backup per Script (Automatisierung)

Für regelmäßige Backups kannst du ein Script erstellen:

```javascript
// backup-script.js
const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json'),
  databaseURL: 'https://urlaubsplaner-9439f-default-rtdb.europe-west1.firebasedatabase.app'
});

async function backup() {
  const snapshot = await admin.database().ref('urlaubsplaner').once('value');
  const data = snapshot.val();
  const date = new Date().toISOString().split('T')[0];
  fs.writeFileSync(`backup-${date}.json`, JSON.stringify(data, null, 2));
  console.log('✅ Backup erstellt!');
}

backup();
```

### Cloud Functions für automatische Backups

Firebase Cloud Functions können automatische tägliche Backups erstellen (kostenpflichtig).

## 📋 Backup-Checkliste

Vor einem Backup:
- [ ] Alle Nutzer haben ihre Änderungen gespeichert
- [ ] Keine gleichzeitigen Bearbeitungen
- [ ] Genug Speicherplatz auf dem Gerät

Nach einem Backup:
- [ ] Datei wurde heruntergeladen
- [ ] Datei ist nicht leer (> 1 KB)
- [ ] Datei an sicherem Ort gespeichert
- [ ] Backup-Datum notiert

## 💡 Best Practices

1. **3-2-1 Regel:**
   - **3** Kopien deiner Daten
   - **2** verschiedene Medien (Cloud + USB)
   - **1** Kopie extern/offsite

2. **Regelmäßigkeit:**
   - Automatisch: Firebase (immer)
   - Manuell: Mindestens wöchentlich

3. **Test:**
   - Teste deine Backups regelmäßig
   - Stelle sicher, dass Import funktioniert

4. **Versionierung:**
   - Behalte mehrere Backup-Versionen
   - Lösche alte Backups nicht sofort

## 🆘 Support

Bei Problemen:
- [Firebase Support](https://firebase.google.com/support)
- [GitHub Issues](https://github.com/tubackit/Planner/issues)

## 🎉 Fertig!

Deine Daten sind jetzt mehrfach gesichert:
- ✅ Firebase Cloud (automatisch)
- ✅ Manuelle Backups (regelmäßig)
- ✅ Wiederherstellung möglich

**Schlaf ruhig - deine Daten sind sicher! 😊**

