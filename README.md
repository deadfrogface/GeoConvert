# GeoConvert

Desktop app for coordinate conversion: **Latitude/Longitude** (WGS84) → **Decimal Degrees** or **UTM**. Runs on Windows, fully local, no network required.

---

## For end users: Install the app (no Node.js)

To get the ready-to-use application with a double-click on your PC:

1. Open the **Releases** page of this repository:  
   **→ [Releases](https://github.com/deadfrogface/GeoConvert/releases)**
2. Download the latest **GeoConvert Setup x.x.x.exe**.
3. Double-click the downloaded file → follow the installation wizard.
4. Done. The app appears in the Start menu and can be used like any other Windows application. **Node.js is not required.**

---

## Maintainer: Provide the installer (no Node.js on your own PC)

You do **not** need to install Node.js. The Windows installer is built by **GitHub Actions** in the cloud:

1. In the repo go to **Releases** → **"Draft a new release"**.
2. Create a tag (e.g. `v1.0.0`) and publish the release (without files).
3. The **Build Windows Installer** workflow starts automatically, builds the `.exe` and attaches it to the release.
4. After a few minutes **GeoConvert Setup x.x.x.exe** appears in the release – end users can download it from there.

**Alternative:** Under **Actions** → **Build Windows Installer** → **Run workflow** run it once. The built `.exe` can then be found as a download under **Artifacts** (without creating a release).

---

## For developers (with Node.js)

If you want to run the app locally or build the installer yourself:

```bash
git clone https://github.com/deadfrogface/GeoConvert.git
cd GeoConvert
npm install
npm start      # Start app
npm run build  # Build installer in dist/
```

---

## Quick overview

| Goal | Action |
|------|--------|
| **End user:** use the ready-made app | [Releases](https://github.com/deadfrogface/GeoConvert/releases) → download **GeoConvert Setup x.x.x.exe** → double-click → install. **No additional software required.** |
| **Maintainer:** provide the installer | Create a new release (with tag) → publish → GitHub builds the `.exe` and attaches it. **No Node.js required.** |
| **Developer:** build/run app locally | Install Node.js → `npm install` → `npm start` / `npm run build`. |

The application runs fully offline; no external APIs or libraries are used for coordinate conversion.
