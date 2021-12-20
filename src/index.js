import './styles.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

const settingsElement = document.querySelector('script[type="settings+json"]');
let settings = {};
try {
    settings = JSON.parse(settingsElement.textContent)
} catch (_) {/* do nothing */}

mapboxgl.accessToken = atob(settings.mapboxPublicToken);
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/argonns/ckxf3oh2k2xmo15phqc819m15'
});