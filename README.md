# VPN Indicator for TV – öffentliche Website

Your VPN. In sight.

- Website: https://unbox-digital-printing.github.io/vpn-indicator-for-tv/
- Datenschutz: https://unbox-digital-printing.github.io/vpn-indicator-for-tv/privacy.html
- App-Übersicht: https://unbox-digital-printing.github.io/apps/
- Downloads: https://github.com/unbox-digital-printing/vpn-indicator-for-tv/releases

Statische Website ohne Build-Schritt, externe Schriftarten, Analyse-Skripte oder Zahlungs-Widgets. `index.html`, `styles.css`, `app.js` und `assets/` bilden die Landingpage. Die TV-Vorschau ist eine Illustration und erkennt kein echtes VPN.

## Sprachen

Die Landingpage unterstützt Deutsch, Englisch, Französisch und Spanisch. Übersetzungen liegen lokal in `translations.js`; `i18n.js` wählt zuerst eine gültige `?lang=`-Angabe, dann eine gespeicherte manuelle Auswahl, dann die erste unterstützte Browsersprache. Ohne Treffer wird Englisch verwendet. Eine manuelle Auswahl wird im lokalen Browserspeicher und in der URL gespeichert. Die Datenschutzerklärung bleibt zweisprachig Deutsch/Englisch; das Impressum ist deutsch, entsprechend gekennzeichnet in den übersetzten Footer-Links.

## Downloads aktualisieren

Die signierten APKs werden als GitHub-Release veröffentlicht. Version, Dateigröße und Release-URLs in `index.html` gemeinsam aktualisieren. Das Release enthält jeweils die Android-TV-APK, die Fire-TV-Kompatibilitäts-APK und `SHA256SUMS.txt`. Private Signaturschlüssel gehören niemals in dieses Repository.

## Spätere Unterstützung

PayPal und Buy Me a Coffee sind vorbereitet, aber noch deaktiviert. In `support.json` können später die vom Eigentümer bestätigten öffentlichen Empfängerlinks hinterlegt werden:

```json
{
  "paypal": "",
  "buyMeACoffee": ""
}
```

Leere Werte lassen die jeweilige Option deaktiviert. `app.js` akzeptiert ausschließlich HTTPS-Links auf den vorgesehenen Anbieter-Domains und erstellt normale Links. Auf der Landingpage werden keine externen Zahlungsskripte geladen. Keine geheimen Schlüssel oder privaten Zugangsdaten eintragen. Vor der Aktivierung den öffentlichen Hinweistext und die Datenschutzerklärung an die tatsächliche Zahlungsabwicklung anpassen. Beträge wählt der Unterstützer beim Zahlungsanbieter; die Website verarbeitet selbst keine Zahlung.

Kontakt: unbox.digital.printing@gmail.com
