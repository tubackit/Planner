package com.urlaubsplaner.app;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.webkit.JavascriptInterface;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.IOException;

/**
 * JavaScript-Bridge für die Kommunikation zwischen WebView und Android.
 * Ermöglicht das Speichern und Laden von Daten.
 */
public class DataBridge {
    private static final String TAG = "DataBridge";
    private static final String PREFS_NAME = "UrlaubsplanerPrefs";
    private static final String EMPLOYEES_KEY = "employees";
    
    private Context context;
    
    /**
     * Konstruktor für die DataBridge.
     * 
     * @param context Der Anwendungskontext
     */
    public DataBridge(Context context) {
        this.context = context;
    }
    
    /**
     * Lädt die Mitarbeiterdaten aus den SharedPreferences.
     * 
     * @return JSON-String mit den Mitarbeiterdaten
     */
    @JavascriptInterface
    public String loadEmployees() {
        try {
            SharedPreferences sharedPrefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            String employees = sharedPrefs.getString(EMPLOYEES_KEY, "[]");
            Log.d(TAG, "Mitarbeiterdaten geladen: " + employees);
            return employees;
        } catch (Exception e) {
            Log.e(TAG, "Fehler beim Laden der Mitarbeiterdaten", e);
            return "[]";
        }
    }
    
    /**
     * Speichert die Mitarbeiterdaten in den SharedPreferences.
     * 
     * @param employeesJson JSON-String mit den Mitarbeiterdaten
     * @return true bei Erfolg, false bei Fehler
     */
    @JavascriptInterface
    public boolean saveEmployees(String employeesJson) {
        try {
            SharedPreferences sharedPrefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPrefs.edit();
            editor.putString(EMPLOYEES_KEY, employeesJson);
            boolean result = editor.commit();
            Log.d(TAG, "Mitarbeiterdaten gespeichert: " + employeesJson);
            return result;
        } catch (Exception e) {
            Log.e(TAG, "Fehler beim Speichern der Mitarbeiterdaten", e);
            return false;
        }
    }
    
    /**
     * Lädt die Urlaubsdaten für ein bestimmtes Jahr.
     * 
     * @param year Das Jahr, für das die Daten geladen werden sollen
     * @return JSON-String mit den Urlaubsdaten
     */
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
            reader.close();
            fis.close();
            
            String result = content.toString();
            Log.d(TAG, "Urlaubsdaten für " + year + " geladen: " + result);
            return result;
        } catch (IOException e) {
            Log.d(TAG, "Keine Urlaubsdaten für " + year + " gefunden");
            return "{}";
        } catch (Exception e) {
            Log.e(TAG, "Fehler beim Laden der Urlaubsdaten für " + year, e);
            return "{}";
        }
    }
    
    /**
     * Speichert die Urlaubsdaten für ein bestimmtes Jahr.
     * 
     * @param year Das Jahr, für das die Daten gespeichert werden sollen
     * @param vacationDataJson JSON-String mit den Urlaubsdaten
     * @return true bei Erfolg, false bei Fehler
     */
    @JavascriptInterface
    public boolean saveVacationData(int year, String vacationDataJson) {
        try {
            String fileName = "vacation_data_" + year + ".json";
            FileOutputStream fos = context.openFileOutput(fileName, Context.MODE_PRIVATE);
            fos.write(vacationDataJson.getBytes());
            fos.close();
            Log.d(TAG, "Urlaubsdaten für " + year + " gespeichert: " + vacationDataJson);
            return true;
        } catch (Exception e) {
            Log.e(TAG, "Fehler beim Speichern der Urlaubsdaten für " + year, e);
            return false;
        }
    }
    
    /**
     * Prüft, ob die App zum ersten Mal gestartet wird.
     * 
     * @return true, wenn es der erste Start ist, sonst false
     */
    @JavascriptInterface
    public boolean isFirstRun() {
        SharedPreferences sharedPrefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        boolean firstRun = sharedPrefs.getBoolean("first_run", true);
        
        if (firstRun) {
            SharedPreferences.Editor editor = sharedPrefs.edit();
            editor.putBoolean("first_run", false);
            editor.apply();
            Log.d(TAG, "Erster Start der App");
        }
        
        return firstRun;
    }
    
    /**
     * Setzt alle gespeicherten Daten zurück.
     * 
     * @return true bei Erfolg, false bei Fehler
     */
    @JavascriptInterface
    public boolean resetAllData() {
        try {
            // Mitarbeiterdaten zurücksetzen
            SharedPreferences sharedPrefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPrefs.edit();
            editor.clear();
            editor.putBoolean("first_run", false); // Erster Start bleibt auf false
            editor.apply();
            
            // Urlaubsdaten löschen
            String[] files = context.fileList();
            for (String file : files) {
                if (file.startsWith("vacation_data_")) {
                    context.deleteFile(file);
                }
            }
            
            Log.d(TAG, "Alle Daten zurückgesetzt");
            return true;
        } catch (Exception e) {
            Log.e(TAG, "Fehler beim Zurücksetzen der Daten", e);
            return false;
        }
    }
}
