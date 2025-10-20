package com.urlaubsplaner.app;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;

/**
 * Hauptaktivität der Urlaubsplaner-App.
 * Verwendet eine WebView, um die HTML-basierte Benutzeroberfläche anzuzeigen.
 */
public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Bildschirm aktiv halten während der Nutzung
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        
        // WebView initialisieren
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
        
        // Cache aktivieren
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        
        // JavaScript-Bridge registrieren
        webView.addJavascriptInterface(new DataBridge(this), "AndroidBridge");
        
        // WebViewClient setzen, um Navigation innerhalb der App zu behalten
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Hier können wir JavaScript-Code ausführen, wenn die Seite geladen ist
            }
        });
        
        // HTML-Datei aus dem Assets-Ordner laden
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        // Zurück-Button überschreiben, um in der WebView zurückzunavigieren
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        // WebView pausieren, um Ressourcen zu sparen
        webView.onPause();
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        // WebView fortsetzen
        webView.onResume();
    }
}