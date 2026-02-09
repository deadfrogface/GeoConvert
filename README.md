# GeoConvert

Desktop-App für die Koordinatenumrechnung: **Latitude/Longitude** (WGS84) → **Decimal Degrees** oder **UTM**. Läuft unter Windows, rein lokal, ohne Netzwerk.

---

## Für Endnutzer: App installieren (ohne Node.js)

So bekommst du die fertige Anwendung mit einem Doppelklick auf deinen PC:

1. Öffne die **Releases**-Seite dieses Repositorys:  
   **→ [Releases](https://github.com/deadfrogface/GeoConvert/releases)**
2. Lade die neueste **GeoConvert Setup x.x.x.exe** herunter.
3. Doppelklick auf die heruntergeladene Datei → Installationsassistent folgen.
4. Fertig. Die App erscheint im Startmenü und kann wie jede andere Windows-Anwendung genutzt werden. **Node.js ist nicht nötig.**

---

## Maintainer: Installer bereitstellen (ohne Node.js auf dem eigenen PC)

Du musst **kein Node.js** installieren. Der Windows-Installer wird von **GitHub Actions** in der Cloud gebaut:

1. Im Repo auf **Releases** gehen → **„Draft a new release“**.
2. Einen Tag anlegen (z. B. `v1.0.0`) und Release veröffentlichen (ohne Dateien).
3. Der Workflow **Build Windows Installer** startet automatisch, baut die `.exe` und hängt sie an das Release an.
4. Nach wenigen Minuten erscheint **GeoConvert Setup x.x.x.exe** im Release – Endnutzer können sie von dort herunterladen.

**Alternative:** Unter **Actions** → **Build Windows Installer** → **Run workflow** einmal ausführen. Die gebaute `.exe` findest du danach als Download unter **Artifacts** (ohne ein Release anlegen zu müssen).

---

## Für Entwickler (mit Node.js)

Falls du die App lokal starten oder den Installer selbst bauen willst:

```bash
git clone https://github.com/deadfrogface/GeoConvert.git
cd GeoConvert
npm install
npm start      # App starten
npm run build  # Installer in dist/ erzeugen
```

---

## Kurzüberblick

| Ziel | Aktion |
|------|--------|
| **Endnutzer:** fertige App nutzen | [Releases](https://github.com/deadfrogface/GeoConvert/releases) → **GeoConvert Setup x.x.x.exe** herunterladen → Doppelklick → installieren. **Keine zusätzliche Software nötig.** |
| **Maintainer:** Installer bereitstellen | Neues Release anlegen (mit Tag) → veröffentlichen → GitHub baut die `.exe` und hängt sie an. **Kein Node.js nötig.** |
| **Entwickler:** App lokal bauen/starten | Node.js installieren → `npm install` → `npm start` / `npm run build`. |

Die Anwendung arbeitet vollständig offline; es werden keine externen APIs oder Bibliotheken für die Koordinatenumrechnung verwendet.
