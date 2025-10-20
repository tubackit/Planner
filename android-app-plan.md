# Android-App-Plan: Urlaubsplaner für Rheinland-Pfalz

## Technische Spezifikationen

### Architektur
- **Ansatz**: Native Android-App mit WebView für die Benutzeroberfläche
- **Programmiersprache**: Java/Kotlin für Android-spezifischen Code
- **UI**: HTML/CSS/JavaScript für die Benutzeroberfläche (WebView)
- **Datenspeicherung**: SharedPreferences und lokale Dateien

### Datenspeicherung
Die App wird die Daten lokal auf dem Gerät speichern:

1. **Mitarbeiterdaten**:
   ```java
   // Speichern
   SharedPreferences sharedPrefs = getSharedPreferences("UrlaubsplanerPrefs", MODE_PRIVATE);
   SharedPreferences.Editor editor = sharedPrefs.edit();
   editor.putString("employees", employeesJson);
   editor.apply();
   
   // Laden
   String employeesJson = sharedPrefs.getString("employees", "[]");
   ```

2. **Urlaubsdaten**:
   ```java
   // Speichern
   String fileName = "vacation_data_" + year + ".json";
   FileOutputStream fos = openFileOutput(fileName, MODE_PRIVATE);
   fos.write(vacationDataJson.getBytes());
   fos.close();
   
   // Laden
   String fileName = "vacation_data_" + year + ".json";
   FileInputStream fis = openFileInput(fileName);
   BufferedReader reader = new BufferedReader(new InputStreamReader(fis));
   StringBuilder content = new StringBuilder();
   String line;
   while ((line = reader.readLine()) != null) {
       content.append(line);
   }
   String vacationDataJson = content.toString();
   ```

### JavaScript-Bridge
Um die Kommunikation zwischen WebView und Android zu ermöglichen:

```java
public class DataBridge {
    private Context context;
    
    public DataBridge(Context context) {
        this.context = context;
    }
    
    @JavascriptInterface
    public String loadEmployees() {
        // Laden der Mitarbeiterdaten
        SharedPreferences sharedPrefs = context.getSharedPreferences("UrlaubsplanerPrefs", MODE_PRIVATE);
        return sharedPrefs.getString("employees", "[]");
    }
    
    @JavascriptInterface
    public void saveEmployees(String employeesJson) {
        // Speichern der Mitarbeiterdaten
        SharedPreferences sharedPrefs = context.getSharedPreferences("UrlaubsplanerPrefs", MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPrefs.edit();
        editor.putString("employees", employeesJson);
        editor.apply();
    }
    
    @JavascriptInterface
    public String loadVacationData(int year) {
        try {
            String fileName = "vacation_data_" + year + ".json";
            FileInputStream fis = context.openFileInput(fileName);
            BufferedReader reader = new BufferedReader(new InputStreamReader(fis));
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
            return content.toString();
        } catch (Exception e) {
            return "{}";
        }
    }
    
    @JavascriptInterface
    public void saveVacationData(int year, String vacationDataJson) {
        try {
            String fileName = "vacation_data_" + year + ".json";
            FileOutputStream fos = context.openFileOutput(fileName, Context.MODE_PRIVATE);
            fos.write(vacationDataJson.getBytes());
            fos.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## Projektstruktur

```
app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── urlaubsplaner/
│   │   │           └── app/
│   │   │               ├── MainActivity.java
│   │   │               └── DataBridge.java
│   │   ├── assets/
│   │   │   └── index.html
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   │   └── activity_main.xml
│   │   │   ├── values/
│   │   │   │   ├── strings.xml
│   │   │   │   ├── colors.xml
│   │   │   │   └── styles.xml
│   │   │   └── drawable/
│   │   │       └── ic_launcher.xml
│   │   └── AndroidManifest.xml
│   └── build.gradle
└── build.gradle
```

## Hauptkomponenten

### 1. MainActivity.java

```java
package com.urlaubsplaner.app;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        WebSettings webSettings = webView.getSettings();
        
        // JavaScript aktivieren
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        
        // Dateizugriff erlauben
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        
        // Mobile Optimierung
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        
        // JavaScript-Bridge registrieren
        webView.addJavascriptInterface(new DataBridge(this), "AndroidBridge");
        
        // WebViewClient setzen
        webView.setWebViewClient(new WebViewClient());
        
        // HTML-Datei laden
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
```

### 2. activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>
```

### 3. AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.urlaubsplaner.app">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

## JavaScript-Integration

Der HTML-Code muss angepasst werden, um die Android-Bridge zu nutzen:

```javascript
// Prüfen, ob die App in Android läuft
const isAndroid = window.AndroidBridge !== undefined;

// Mitarbeiterdaten laden
async function initializeEmployees() {
    let savedEmployees = null;
    
    if (isAndroid) {
        try {
            // Laden über Android-Bridge
            const employeesJson = window.AndroidBridge.loadEmployees();
            savedEmployees = JSON.parse(employeesJson);
        } catch (error) {
            console.error('Fehler beim Laden der Mitarbeiter:', error);
        }
    } else {
        // Fallback zu localStorage für Web-Version
        const savedData = localStorage.getItem('vacationPlannerEmployees');
        if (savedData) {
            savedEmployees = JSON.parse(savedData);
        }
    }
    
    if (savedEmployees) {
        employees = savedEmployees;
    } else {
        // Default-Mitarbeiter
        employees = ['Max Mustermann'];
        await saveEmployees();
    }
    renderEmployeesList();
}

// Mitarbeiterdaten speichern
async function saveEmployees() {
    if (isAndroid) {
        try {
            // Speichern über Android-Bridge
            window.AndroidBridge.saveEmployees(JSON.stringify(employees));
        } catch (error) {
            console.error('Fehler beim Speichern der Mitarbeiter:', error);
        }
    } else {
        // Fallback zu localStorage für Web-Version
        localStorage.setItem('vacationPlannerEmployees', JSON.stringify(employees));
    }
}

// Urlaubsdaten laden
async function loadVacationData() {
    if (isAndroid) {
        try {
            // Laden über Android-Bridge
            const vacationDataJson = window.AndroidBridge.loadVacationData(currentYear);
            vacationData = JSON.parse(vacationDataJson);
            updateVacationDisplay();
        } catch (error) {
            console.error('Fehler beim Laden der Urlaubsdaten:', error);
            vacationData = {};
        }
    } else {
        // Fallback zu localStorage für Web-Version
        const savedData = localStorage.getItem(`vacationPlanner${currentYear}`);
        if (savedData) {
            vacationData = JSON.parse(savedData);
            updateVacationDisplay();
        } else {
            vacationData = {};
        }
    }
}

// Urlaubsdaten speichern
async function saveVacationData() {
    if (isAndroid) {
        try {
            // Speichern über Android-Bridge
            window.AndroidBridge.saveVacationData(currentYear, JSON.stringify(vacationData));
        } catch (error) {
            console.error('Fehler beim Speichern der Urlaubsdaten:', error);
        }
    } else {
        // Fallback zu localStorage für Web-Version
        localStorage.setItem(`vacationPlanner${currentYear}`, JSON.stringify(vacationData));
    }
}
```

## Anpassungen für mobile Geräte

1. **Responsive Design**: Die HTML/CSS wurde für mobile Geräte optimiert
2. **Touch-Gesten**: Anpassung der Benutzerinteraktion für Touch-Eingaben
3. **Bottom Navigation**: Einfache Navigation am unteren Bildschirmrand
4. **Optimierte Dialoge**: Für die mobile Nutzung optimierte Eingabedialoge

## Entwicklungs- und Testplan

1. **Entwicklung**:
   - Erstellen des Android-Projekts
   - Implementierung der WebView und JavaScript-Bridge
   - Anpassung der HTML/CSS/JavaScript für mobile Geräte
   - Implementierung der lokalen Datenspeicherung

2. **Tests**:
   - Funktionalitätstests auf verschiedenen Android-Versionen
   - UI-Tests auf verschiedenen Bildschirmgrößen
   - Datenspeicherungstests
   - Offline-Funktionalitätstests

3. **Veröffentlichung**:
   - APK-Erstellung für direkte Installation
   - Optional: Veröffentlichung im Google Play Store
