(function () {
  'use strict';

  const latInput = document.getElementById('lat');
  const lonInput = document.getElementById('lon');
  const targetSelect = document.getElementById('target');
  const convertBtn = document.getElementById('convert');
  const errorEl = document.getElementById('error');
  const resultEl = document.getElementById('result');

  function parseNumber(value) {
    if (value === '' || value === null || value === undefined) {
      return NaN;
    }
    const str = String(value).trim().replace(',', '.');
    return parseFloat(str, 10);
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
    resultEl.textContent = '';
  }

  function hideError() {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }

  function setResult(text) {
    resultEl.textContent = text;
  }

  function validate(lat, lon) {
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return 'Please enter valid numbers for latitude and longitude.';
    }
    if (lat < -90 || lat > 90) {
      return 'Latitude must be between −90 and +90.';
    }
    if (lon < -180 || lon > 180) {
      return 'Longitude must be between −180 and +180.';
    }
    return null;
  }

  function onConvert() {
    hideError();

    const lat = parseNumber(latInput.value);
    const lon = parseNumber(lonInput.value);
    const err = validate(lat, lon);
    if (err) {
      showError('Error: ' + err);
      return;
    }

    const target = targetSelect.value;
    if (target === 'dd') {
      setResult(GeoConvert.formatDecimalDegrees(lat, lon));
    } else if (target === 'utm') {
      setResult(GeoConvert.formatUtm(lat, lon));
    } else {
      setResult('');
    }
  }

  convertBtn.addEventListener('click', onConvert);
})();
