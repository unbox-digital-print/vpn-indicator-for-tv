# VPN Indicator for TV – öffentliche Website

Your VPN. In sight.

- Website: https://unbox-digital-print.github.io/vpn-indicator-for-tv/
- Datenschutz: https://unbox-digital-print.github.io/vpn-indicator-for-tv/privacy.html
- App-Übersicht: https://unbox-digital-print.github.io/apps/
- Downloads: https://github.com/unbox-digital-print/vpn-indicator-for-tv/releases

Statische Website ohne Build-Schritt, externe Schriftarten, Analyse-Skripte oder Zahlungs-Widgets. `index.html`, `styles.css`, `app.js` und `assets/` bilden die Landingpage. Die TV-Vorschau ist eine Illustration und erkennt kein echtes VPN.

## Sprachen

Die Landingpage unterstützt Deutsch, Englisch, Französisch und Spanisch. Übersetzungen liegen lokal in `translations.js`; `i18n.js` wählt zuerst eine gültige `?lang=`-Angabe, dann eine gespeicherte manuelle Auswahl, dann die erste unterstützte Browsersprache. Ohne Treffer wird Englisch verwendet. Eine manuelle Auswahl wird im lokalen Browserspeicher und in der URL gespeichert. Die Datenschutzerklärung bleibt zweisprachig Deutsch/Englisch; das Impressum ist deutsch, entsprechend gekennzeichnet in den übersetzten Footer-Links.

## Downloads aktualisieren

Die signierten APKs werden als GitHub-Release veröffentlicht. Version, Dateigröße und Release-URLs in `index.html` gemeinsam aktualisieren. Das Release enthält jeweils die Android-TV-APK, die Fire-TV-Kompatibilitäts-APK und `SHA256SUMS.txt`. Private Signaturschlüssel gehören niemals in dieses Repository.

## Spenden
PayPal und Buy Me a Coffee sind in support.json konfiguriert. Die PayPal-Empfängeradresse ist unbox.digital.printing@gmail.com. Die offizielle Buy-Me-a-Coffee-Grafik liegt lokal in assets/. Ohne gültige Adresse bleiben die Buttons deaktiviert. Nur offizielle PayPal- und Buy-Me-a-Coffee-Domains werden akzeptiert. Keine eingebetteten Zahlungswidgets.

Kontakt: unbox.digital.printing@gmail.com
