# 🚀 Schnell-Anleitung: Änderungen zu GitHub pushen

Dein Repository ist live unter: **https://github.com/tubackit/Planner**  
Live Demo: **https://tubackit.github.io/Planner/**

## ⚡ Lokales Git einrichten (einmalig)

Wähle **eine** der folgenden Optionen:

### Option A: Repository klonen (Empfohlen - Einfachste Methode)

```bash
# Gehe zu einem Verzeichnis deiner Wahl
cd ~/Desktop

# Klone dein Repository
git clone https://github.com/tubackit/Planner.git

# Wechsle ins Verzeichnis
cd Planner

# Fertig! Ab jetzt hier arbeiten.
```

### Option B: Bestehendes Verzeichnis verbinden

```bash
# Gehe zu deinem aktuellen Projektverzeichnis
cd "/Users/pmac1/Meine Projekte/termine 3"

# Git initialisieren
git init

# Remote Repository verbinden
git remote add origin https://github.com/tubackit/Planner.git

# Branch setzen
git branch -M main

# Mit GitHub synchronisieren
git pull origin main --allow-unrelated-histories
```

## 📤 Änderungen hochladen (Normal-Workflow)

Sobald Git eingerichtet ist, verwende diese 4 Befehle:

```bash
# 1. Status checken (optional, aber empfohlen)
git status

# 2. Alle Änderungen hinzufügen
git add .

# 3. Commit mit Message erstellen
git commit -m "Beschreibung deiner Änderungen"

# 4. Zu GitHub pushen
git push origin main
```

### Beispiel-Workflow

```bash
# Du hast index.html geändert...

git status                                    # Was wurde geändert?
git add .                                     # Alle Änderungen hinzufügen
git commit -m "feat: Add new calendar view"   # Commit mit Message
git push origin main                          # Hochladen
```

## 💡 Gute Commit-Messages

Verwende prägnante, beschreibende Messages:

```bash
git commit -m "feat: Add new feature for employee management"
git commit -m "fix: Fix calendar display bug"
git commit -m "docs: Update README with new instructions"
git commit -m "style: Improve mobile responsiveness"
git commit -m "refactor: Simplify date calculation"
```

Präfixe:
- `feat:` - Neues Feature
- `fix:` - Bugfix
- `docs:` - Dokumentation
- `style:` - Styling/Design
- `refactor:` - Code-Umstrukturierung
- `chore:` - Wartung/Cleanup

## 📥 Änderungen von GitHub holen

Falls du auf GitHub.com etwas geändert hast:

```bash
git pull origin main
```

## 🔐 Authentifizierung

Beim ersten `git push` wirst du nach Zugangsdaten gefragt:

**Username**: `tubackit`  
**Password**: ⚠️ **Nicht dein GitHub-Passwort!**

### Personal Access Token erstellen

1. Gehe zu: https://github.com/settings/tokens
2. Klicke "Generate new token" → "Generate new token (classic)"
3. Token-Name: `Planner Development`
4. Expiration: `90 days` (oder länger)
5. Scopes: ✅ `repo` (alle auswählen)
6. "Generate token"
7. **Kopiere den Token sofort!** (wird nur einmal angezeigt)

Beim `git push`: Verwende den Token als Passwort.

### Token speichern (macOS)

```bash
# Git soll Credentials im Keychain speichern
git config --global credential.helper osxkeychain
```

Nach dem ersten erfolgreichen Push musst du den Token nicht mehr eingeben.

## 🆘 Häufige Probleme

### "fatal: not a git repository"
```bash
git init
git remote add origin https://github.com/tubackit/Planner.git
```

### "Updates were rejected"
```bash
# Erst die neuesten Änderungen von GitHub holen
git pull origin main --rebase

# Dann pushen
git push origin main
```

### "Authentication failed"
Du brauchst einen Personal Access Token (siehe oben), nicht dein Passwort.

### Welcher Branch?
```bash
# Aktuellen Branch anzeigen
git branch

# Sollte "main" zeigen (mit *)
# Falls nicht:
git branch -M main
```

## ✅ Quick-Test

Teste ob alles funktioniert:

```bash
# 1. Status checken
git status

# 2. Test-Datei erstellen
echo "Test" > test.txt

# 3. Hinzufügen und committen
git add test.txt
git commit -m "test: Connection test"

# 4. Pushen
git push origin main

# Hat funktioniert? Super! Cleanup:
git rm test.txt
git commit -m "chore: Remove test file"
git push origin main
```

## 📱 Für GitHub Pages Updates

Änderungen an `index.html` werden automatisch auf der Live-Demo sichtbar:

1. Ändere `index.html`
2. Push zu GitHub (siehe oben)
3. Warte ~1-2 Minuten
4. Besuche https://tubackit.github.io/Planner/ 
5. ✅ Änderungen sind live!

## 🎨 Repository verschönern

### About Section (auf GitHub)

1. Gehe zu: https://github.com/tubackit/Planner
2. Klicke auf ⚙️ neben "About" (rechts oben)
3. Fülle aus:
   - **Description**: "Ein übersichtlicher Urlaubsplaner für 2025/2026 mit Feiertagen und Schulferien für Rheinland-Pfalz"
   - **Website**: https://tubackit.github.io/Planner/
   - **Topics**: `electron`, `javascript`, `calendar`, `vacation-planner`, `german`, `rheinland-pfalz`, `desktop-app`

### Repository Settings

Gehe zu: https://github.com/tubackit/Planner/settings

- ✅ Issues aktiviert (für Bug-Reports)
- ✅ Discussions aktiviert (für Community-Fragen)

## 📚 Nützliche Git-Befehle

```bash
# Status & Info
git status                    # Welche Dateien wurden geändert?
git log --oneline            # Commit-Historie
git remote -v                # Remote-URL anzeigen

# Änderungen rückgängig machen
git checkout -- dateiname    # Einzelne Datei zurücksetzen
git reset HEAD~1             # Letzten Commit rückgängig (vor push)
git reset --hard HEAD        # ALLE lokalen Änderungen verwerfen

# Branches
git branch                   # Alle Branches anzeigen
git checkout -b neuer-branch # Neuen Branch erstellen und wechseln
git checkout main            # Zurück zu main

# Remote
git fetch origin             # Änderungen holen (ohne merge)
git pull origin main         # Änderungen holen und mergen
git push origin main         # Hochladen
```

## 🎉 Fertig!

Jetzt bist du ready für produktive Git-Arbeit!

**Dein Repository**: https://github.com/tubackit/Planner  
**Live Demo**: https://tubackit.github.io/Planner/

---

**Tipp**: Installiere [GitHub Desktop](https://desktop.github.com/) für eine grafische Oberfläche!

