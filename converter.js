/**
 * Coordinate conversion (local, WGS84).
 * No external libraries – formulas per USGS/standard UTM.
 */

(function (global) {
  'use strict';

  const WGS84 = {
    a: 6378137,
    f: 1 / 298.257223563
  };

  const DEG2RAD = Math.PI / 180;
  const UTM_K0 = 0.9996;
  const UTM_FE = 500000;
  const UTM_FN_NORTH = 0;
  const UTM_FN_SOUTH = 10000000;

  function toRad(deg) {
    return deg * DEG2RAD;
  }

  /**
   * Format Lat/Lon as Decimal Degrees (6 decimal places).
   */
  function formatDecimalDegrees(lat, lon) {
    const latStr = Number(lat).toFixed(6);
    const lonStr = Number(lon).toFixed(6);
    return 'Lat: ' + latStr + ', Lon: ' + lonStr;
  }

  /**
   * UTM zone from longitude (1–60).
   */
  function getZone(lon) {
    return Math.floor((lon + 180) / 6) + 1;
  }

  /**
   * Central meridian of zone in degrees.
   */
  function getCentralMeridian(zone) {
    return (zone - 1) * 6 - 180 + 3;
  }

  /**
   * Meridian arc M from equator to lat (in metres). WGS84.
   */
  function meridianArc(latRad) {
    const a = WGS84.a;
    const f = WGS84.f;
    const e2 = 2 * f - f * f;
    const e4 = e2 * e2;
    const e6 = e4 * e2;

    const c0 = 1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256;
    const c2 = (3 * e2) / 8 + (3 * e4) / 32 + (45 * e6) / 1024;
    const c4 = (15 * e4) / 256 + (45 * e6) / 1024;
    const c6 = (35 * e6) / 3072;

    return a * (c0 * latRad - c2 * Math.sin(2 * latRad) + c4 * Math.sin(4 * latRad) - c6 * Math.sin(6 * latRad));
  }

  /**
   * Lat/Lon (degrees) → UTM (zone, hemisphere, easting, northing). WGS84.
   */
  function latLonToUtm(lat, lon) {
    const zone = Math.max(1, Math.min(60, getZone(lon)));
    const lon0 = getCentralMeridian(zone) * DEG2RAD;
    const latRad = toRad(lat);
    const lonRad = toRad(lon);

    const a = WGS84.a;
    const f = WGS84.f;
    const e2 = 2 * f - f * f;
    const ep2 = e2 / (1 - e2);

    const sinLat = Math.sin(latRad);
    const cosLat = Math.cos(latRad);
    const tanLat = Math.tan(latRad);
    const N = a / Math.sqrt(1 - e2 * sinLat * sinLat);
    const T = tanLat * tanLat;
    const C = ep2 * cosLat * cosLat;
    const A = (lonRad - lon0) * cosLat;
    const A2 = A * A;
    const A3 = A2 * A;
    const A4 = A2 * A2;
    const A5 = A4 * A;
    const A6 = A3 * A3;

    const M = meridianArc(latRad);
    const M0 = 0;

    const x = UTM_K0 * N * (A + (1 - T + C) * A3 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * A5 / 120);
    let y = UTM_K0 * (M - M0 + N * tanLat * (A2 / 2 + (5 - T + 9 * C + 4 * C * C) * A4 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * A6 / 720));

    const easting = UTM_FE + x;
    let northing = y;
    const hemisphere = lat >= 0 ? 'N' : 'S';
    if (lat < 0) {
      northing += UTM_FN_SOUTH;
    } else {
      northing += UTM_FN_NORTH;
    }

    return {
      zone: zone,
      hemisphere: hemisphere,
      easting: Math.round(easting * 100) / 100,
      northing: Math.round(northing * 100) / 100
    };
  }

  /**
   * Output as text for UTM.
   */
  function formatUtm(lat, lon) {
    const u = latLonToUtm(lat, lon);
    return 'Zone ' + u.zone + u.hemisphere + '\nEasting: ' + u.easting + ' m\nNorthing: ' + u.northing + ' m';
  }

  global.GeoConvert = {
    formatDecimalDegrees: formatDecimalDegrees,
    latLonToUtm: latLonToUtm,
    formatUtm: formatUtm
  };
})(typeof window !== 'undefined' ? window : this);
