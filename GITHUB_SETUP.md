# GitHub Setup Anleitung 🚀

Diese Anleitung hilft dir, dein Urlaubsplaner-Projekt auf GitHub hochzuladen.

## ✅ Vorbereitungs-Checkliste

Bevor du das Repository auf GitHub hochlädst, überprüfe folgende Punkte:

- [x] `.gitignore` wurde erstellt
- [x] `README.md` wurde aktualisiert
- [x] `LICENSE` wurde hinzugefügt
- [x] `.gitattributes` wurde erstellt
- [x] `CONTRIBUTING.md` wurde erstellt
- [ ] GitHub Account erstellt/vorhanden
- [ ] Git installiert auf deinem System
- [ ] Persönliche Informationen in README.md angepasst

## 📝 Vor dem Upload zu erledigen

### 1. README.md personalisieren

Öffne `README.md` und ersetze:
- `IHR-USERNAME` mit deinem GitHub-Benutzernamen (an mehreren Stellen)
- `Dein Name / Dein Team` im Autor-Abschnitt
- Füge ggf. weitere Informationen hinzu

### 2. package.json anpassen (optional)

Öffne `package.json` und füge hinzu:
```json
{
  "author": "Dein Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/IHR-USERNAME/urlaubsplaner.git"
  },
  "bugs": {
    "url": "https://github.com/IHR-USERNAME/urlaubsplaner/issues"
  },
  "homepage": "https://github.com/IHR-USERNAME/urlaubsplaner#readme"
}
```

### 3. Sensible Daten prüfen

Stelle sicher, dass keine sensiblen Daten im Code sind:
- Keine Passwörter
- Keine API-Keys
- Keine persönlichen Zugangsdaten
- Keine privaten Mitarbeiterdaten

## 🎯 Git Repository erstellen

### Schritt 1: Git initialisieren

```bash
# Im Projektverzeichnis
cd "/Users/pmac1/Meine Projekte/termine 3"

# Git initialisieren (falls noch nicht geschehen)
git init

# Überprüfe Git-Status
git status
```

### Schritt 2: Dateien hinzufügen

```bash
# Alle Dateien zur Staging Area hinzufügen
git add .

# Status überprüfen
git status
```

### Schritt 3: Ersten Commit erstellen

```bash
# Initial commit
git commit -m "Initial commit: Urlaubsplaner 2025 für Rheinland-Pfalz"
```

## 🌐 GitHub Repository erstellen

### Option A: Über die GitHub Webseite

1. Gehe zu [GitHub](https://github.com)
2. Klicke auf das "+" Icon oben rechts
3. Wähle "New repository"
4. Fülle die Details aus:
   - **Repository name**: `urlaubsplaner` (oder einen anderen Namen)
   - **Description**: "Ein übersichtlicher Urlaubsplaner für 2025/2026"
   - **Visibility**: Wähle Public oder Private
   - ⚠️ **WICHTIG**: Erstelle **KEINE** README, .gitignore oder LICENSE (wir haben diese bereits!)
5. Klicke auf "Create repository"

### Option B: Über die GitHub CLI

```bash
# GitHub CLI installieren: https://cli.github.com/
gh repo create urlaubsplaner --public --source=. --remote=origin
```

## 📤 Code zu GitHub pushen

### Wenn du ein neues Repository über die Webseite erstellt hast:

```bash
# Remote Repository verbinden
git remote add origin https://github.com/IHR-USERNAME/urlaubsplaner.git

# Main Branch umbenennen (optional, aber empfohlen)
git branch -M main

# Code hochladen
git push -u origin main
```

### Wenn du GitHub CLI verwendet hast:

```bash
# Einfach pushen
git push -u origin main
```

## 🔄 Zukünftige Änderungen hochladen

```bash
# Änderungen ansehen
git status

# Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Beschreibung der Änderungen"

# Hochladen
git push
```

## 📋 Nützliche Git-Befehle

```bash
# Status anzeigen
git status

# Änderungen ansehen
git diff

# Commit-Historie anzeigen
git log --oneline

# Letzte Änderung rückgängig machen (vor commit)
git reset HEAD~1

# Bestimmte Datei zurücksetzen
git checkout -- dateiname

# Alle lokalen Änderungen verwerfen
git reset --hard HEAD

# Remote Repository anzeigen
git remote -v

# Branch erstellen
git checkout -b feature/neues-feature

# Branches anzeigen
git branch
```

## 🎨 GitHub Repository verschönern

Nach dem Upload kannst du dein Repository noch verschönern:

### 1. About Section

Auf der GitHub-Seite rechts:
- Klicke auf ⚙️ (Settings) neben "About"
- Füge Description hinzu
- Füge Topics hinzu: `electron`, `calendar`, `vacation-planner`, `german`, `rheinland-pfalz`
- Füge Website hinzu (falls vorhanden)

### 2. Topics hinzufügen

Empfohlene Topics für dein Projekt:
- `electron`
- `javascript`
- `calendar`
- `vacation-planner`
- `holiday-calendar`
- `german`
- `rheinland-pfalz`
- `desktop-app`
- `android-app`

### 3. Releases erstellen

```bash
# Tag für Version 1.0.0 erstellen
git tag -a v1.0.0 -m "Version 1.0.0 - Erste stabile Version"

# Tag zu GitHub pushen
git push origin v1.0.0
```

Dann auf GitHub:
1. Gehe zu "Releases"
2. Klicke auf "Create a new release"
3. Wähle den Tag `v1.0.0`
4. Füge Release Notes hinzu
5. Lade die fertigen Installer hoch (`.dmg`, `.exe`, `.apk`)

## 🔒 Sicherheitshinweise

### Wichtig: android-app/local.properties

Die Datei `android-app/local.properties` enthält lokale Pfade und wird von `.gitignore` ausgeschlossen. Das ist korrekt so!

### Gradle Wrapper

Die Gradle Wrapper Dateien (`gradlew`, `gradle-wrapper.jar`) sollten **NICHT** in `.gitignore` sein. Sie werden benötigt, damit andere das Projekt bauen können.

## 🐛 Häufige Probleme

### Problem: "remote origin already exists"

```bash
# Lösung: Remote entfernen und neu hinzufügen
git remote remove origin
git remote add origin https://github.com/IHR-USERNAME/urlaubsplaner.git
```

### Problem: "Your branch is ahead of 'origin/main'"

```bash
# Lösung: Änderungen pushen
git push
```

### Problem: Große Dateien (> 100 MB)

GitHub erlaubt keine Dateien > 100 MB. Überprüfe:
```bash
# Große Dateien finden
find . -type f -size +50M
```

Wenn du große Dateien hast:
1. Füge sie zur `.gitignore` hinzu
2. Entferne sie aus dem Repository:
   ```bash
   git rm --cached pfad/zur/grossen-datei
   git commit -m "Remove large files"
   ```

## 📱 Android-App auf GitHub

Wenn du die APK-Dateien auf GitHub bereitstellen möchtest:

### Option 1: GitHub Releases (empfohlen)

Lade die APK-Datei als Release-Asset hoch (siehe Releases erstellen oben).

### Option 2: Branch für Builds

```bash
# Separater Branch für Build-Artefakte
git checkout --orphan builds
git rm -rf .
cp path/to/app.apk .
git add app.apk
git commit -m "Add Android APK"
git push origin builds
```

## ✅ Abschluss-Checkliste

Nach dem erfolgreichen Upload:

- [ ] Repository ist auf GitHub sichtbar
- [ ] README.md wird korrekt angezeigt
- [ ] LICENSE ist sichtbar
- [ ] Topics wurden hinzugefügt
- [ ] About Section ist ausgefüllt
- [ ] Optional: Release mit Installern erstellt
- [ ] Optional: Repository mit Kollegen/Team geteilt

## 🎉 Fertig!

Dein Projekt ist jetzt auf GitHub! 🎊

Link zu deinem Repository:
```
https://github.com/IHR-USERNAME/urlaubsplaner
```

---

## 📚 Weiterführende Links

- [GitHub Docs](https://docs.github.com)
- [Git Dokumentation](https://git-scm.com/doc)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Desktop](https://desktop.github.com/) (GUI für Git)

## 💡 Tipps

1. **Regelmäßige Commits**: Committe oft und mit aussagekräftigen Messages
2. **Branches verwenden**: Für neue Features immer einen Branch erstellen
3. **Issues nutzen**: Verwende GitHub Issues für Bug-Tracking und Feature-Requests
4. **Wiki erstellen**: Für ausführliche Dokumentation
5. **GitHub Actions**: Automatisiere Builds und Tests

Viel Erfolg mit deinem GitHub-Repository! 🚀

