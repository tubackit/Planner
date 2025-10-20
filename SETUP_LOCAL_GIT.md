# 🔄 Lokales Git mit GitHub verbinden

Da du die Dateien über die GitHub-Webseite hochgeladen hast, musst du jetzt dein lokales Verzeichnis mit dem GitHub-Repository verbinden.

## Schritt-für-Schritt Anleitung

### Option A: Repository klonen (Empfohlen - Einfachste Methode)

Diese Methode erstellt ein neues Verzeichnis mit allen Dateien von GitHub:

```bash
# Gehe zu einem übergeordneten Verzeichnis
cd ~/Desktop

# Klone dein Repository (ersetze DEIN-USERNAME mit deinem GitHub-Namen)
git clone https://github.com/DEIN-USERNAME/urlaubsplaner.git urlaubsplaner-github

# Wechsle ins neue Verzeichnis
cd urlaubsplaner-github
```

✅ **Vorteil**: Alles ist automatisch verbunden und konfiguriert!

### Option B: Bestehendes Verzeichnis verbinden

Falls du weiter in deinem aktuellen Verzeichnis arbeiten möchtest:

```bash
# Gehe zu deinem Projektverzeichnis
cd "/Users/pmac1/Meine Projekte/termine 3"

# Git initialisieren
git init

# Remote Repository hinzufügen (ersetze DEIN-USERNAME)
git remote add origin https://github.com/DEIN-USERNAME/urlaubsplaner.git

# Hole die Dateien von GitHub
git fetch origin

# Setze den Branch
git branch -M main

# Merge mit dem Remote-Repository
git pull origin main --allow-unrelated-histories

# Bei Merge-Konflikten: Löse sie manuell oder verwende:
# git reset --hard origin/main  (⚠️ VORSICHT: Überschreibt lokale Änderungen!)
```

## 🔄 Zukünftige Änderungen hochladen

Sobald dein Git eingerichtet ist, funktioniert der normale Workflow:

### 1. Änderungen ansehen
```bash
git status
git diff
```

### 2. Änderungen hinzufügen
```bash
# Alle Änderungen
git add .

# Oder einzelne Dateien
git add index.html
git add main.js
```

### 3. Commit erstellen
```bash
git commit -m "Beschreibung deiner Änderungen"
```

Beispiele für gute Commit-Messages:
- `"feat: Add new feature for holiday calculation"`
- `"fix: Fix calendar display bug on mobile"`
- `"docs: Update README with installation instructions"`
- `"style: Improve CSS for better mobile view"`

### 4. Zu GitHub pushen
```bash
git push origin main
```

## 📥 Änderungen von GitHub holen

Falls du Änderungen über die Webseite gemacht hast:

```bash
git pull origin main
```

## 🌿 Mit Branches arbeiten

Für größere Features empfiehlt sich ein Branch:

```bash
# Neuen Branch erstellen
git checkout -b feature/neues-feature

# Arbeite an deinen Änderungen...
git add .
git commit -m "Add neues Feature"

# Branch zu GitHub pushen
git push origin feature/neues-feature

# Dann auf GitHub: Pull Request erstellen
```

## ⚙️ Git-Konfiguration

Setze deinen Namen und E-Mail (falls noch nicht geschehen):

```bash
git config --global user.name "Dein Name"
git config --global user.email "deine-email@example.com"
```

Überprüfe deine Konfiguration:
```bash
git config --list
```

## 🔐 Authentifizierung

### HTTPS (Einfacher für Anfänger)

Beim ersten Push wirst du nach Username und Passwort gefragt:
- **Username**: Dein GitHub-Username
- **Password**: ⚠️ NICHT dein GitHub-Passwort! Verwende einen **Personal Access Token**

#### Personal Access Token erstellen:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. Name: z.B. "Urlaubsplaner Development"
4. Expiration: 90 days (oder länger)
5. Scopes auswählen: ✅ `repo` (alle repo-Berechtigungen)
6. "Generate token"
7. ⚠️ **Kopiere den Token sofort** (er wird nur einmal angezeigt!)

Beim Push: Verwende den Token als Passwort.

### SSH (Für fortgeschrittene Nutzer)

```bash
# SSH-Key generieren
ssh-keygen -t ed25519 -C "deine-email@example.com"

# SSH-Agent starten
eval "$(ssh-agent -s)"

# Key hinzufügen
ssh-add ~/.ssh/id_ed25519

# Public Key anzeigen und kopieren
cat ~/.ssh/id_ed25519.pub

# Füge den Key auf GitHub hinzu:
# GitHub → Settings → SSH and GPG keys → New SSH key
```

Dann ändere die Remote-URL:
```bash
git remote set-url origin git@github.com:DEIN-USERNAME/urlaubsplaner.git
```

## 🆘 Häufige Probleme

### "fatal: not a git repository"
```bash
git init
git remote add origin https://github.com/DEIN-USERNAME/urlaubsplaner.git
```

### "Updates were rejected because the remote contains work"
```bash
git pull origin main --rebase
# Oder, falls du lokale Änderungen verwerfen willst:
git reset --hard origin/main
```

### "Authentication failed"
Verwende einen Personal Access Token statt deines Passworts (siehe oben).

### Merge-Konflikte
```bash
# Konflikte manuell in den Dateien lösen
# Dann:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

## 📚 Nützliche Git-Befehle

```bash
# Status anzeigen
git status

# Änderungen ansehen
git diff

# Log ansehen
git log --oneline --graph --all

# Letzten Commit rückgängig machen (vor push)
git reset HEAD~1

# Datei aus Staging entfernen
git reset HEAD dateiname

# Alle lokalen Änderungen verwerfen
git checkout .

# Zu einem bestimmten Commit zurück
git checkout COMMIT-HASH

# Remote-URL anzeigen
git remote -v

# Branch-Liste anzeigen
git branch -a
```

## ✅ Test: Ist alles verbunden?

```bash
# Überprüfe Remote-Verbindung
git remote -v
# Sollte zeigen:
# origin  https://github.com/DEIN-USERNAME/urlaubsplaner.git (fetch)
# origin  https://github.com/DEIN-USERNAME/urlaubsplaner.git (push)

# Test mit einem kleinen Change
echo "# Test" >> test.txt
git add test.txt
git commit -m "test: Connection test"
git push origin main
# Wenn das funktioniert: ✅ Alles verbunden!

# Cleanup
git rm test.txt
git commit -m "chore: Remove test file"
git push origin main
```

## 🎉 Fertig!

Jetzt bist du bereit für produktives Arbeiten mit Git und GitHub!

---

**Tipp**: Installiere [GitHub Desktop](https://desktop.github.com/) für eine grafische Oberfläche, falls dir die Kommandozeile zu kompliziert ist.

