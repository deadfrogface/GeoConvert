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

Falls noch keine Release-Datei vorhanden ist, muss zuerst ein Maintainer den Build erzeugen und die `.exe` in den Releases hochladen (siehe Abschnitt „Für Entwickler“).

---

## Für Entwickler: Repo bauen und starten

Voraussetzung: **Node.js** und **npm** sind installiert und im PATH (z. B. neue PowerShell oder „Node.js command prompt“).

### Repo klonen

```bash
git clone https://github.com/deadfrogface/GeoConvert.git
cd GeoConvert
```

### Abhängigkeiten installieren

```bash
npm install
```

### App im Entwicklungsmodus starten

```bash
npm start
```

Es öffnet sich das GeoConvert-Fenster; du kannst Koordinaten eingeben und umrechnen.

### Windows-Installer erzeugen

```bash
npm run build
```

Der Installer wird im Ordner **dist/** erzeugt, z. B.:

- `dist/GeoConvert Setup 1.0.0.exe`

Diese Datei kannst du weitergeben oder in den **GitHub Releases** hochladen. Dann können Endnutzer genau diese Datei herunterladen und per Doppelklick installieren (siehe Abschnitt „Für Endnutzer“).

---

## Kurzüberblick

| Ziel | Aktion |
|------|--------|
| **Endnutzer:** fertige App nutzen | Releases → **GeoConvert Setup x.x.x.exe** herunterladen → Doppelklick → installieren. |
| **Entwickler:** App lokal starten | `npm install` → `npm start` |
| **Entwickler:** Installer bauen | `npm run build` → Datei liegt in `dist/` |
| **Maintainer:** für Endnutzer bereitstellen | `npm run build` ausführen, dann die `.exe` aus `dist/` bei GitHub als Release hochladen. |

Die Anwendung arbeitet vollständig offline; es werden keine externen APIs oder Bibliotheken für die Koordinatenumrechnung verwendet.
