import './styles.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

function getSettings() {
    const settingsElement = document.querySelector('script[type="settings+json"]');
    let settings = {};
    try {
        settings = JSON.parse(settingsElement.textContent)
    } catch (_) {/* do nothing */}
    return settings;    
}

function createMap() {
    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/argonns/ckxf3oh2k2xmo15phqc819m15'
    });
}

function fetchMetadata() {
    return fetch('/data/_meta.json')
        .then((response) => response.json())
        .catch((error) => ({
            error:'failed to fetch countries metadata: ' + error.message
        }));
}

function fetchGeojson(shortcode) {
    return fetch(`/data/${shortcode}.geojson`)
        .then((response) => response.json())
        .catch((error) => ({
            error:'failed to fetch countries metadata: ' + error.message
        }));
}

function onMapLoaded() {
    isMapLoaded = true;
    if (isGeojsonLoaded) {
        initLayer();
    }
}

function onMetadataLoaded(metadata) {
    const randomIndex = Math.round(Math.random() * metadata.countries.length);
    const shortcode = metadata.countries[randomIndex].short;
    return fetchGeojson(shortcode);
}

function onGeojsonLoaded(responseGeojson) {
    geojson = responseGeojson;
    isGeojsonLoaded = true;
    if (isMapLoaded) {
        initLayer();
    }
}

function initLayer() {
    map.addSource('country', {
        type: 'geojson',
        data: geojson,
    });
    map.addLayer({
        'id': 'country',
        'type': 'line',
        'source': 'country',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    });
}

const settings = getSettings();

let isMapLoaded = false;
mapboxgl.accessToken = atob(settings.mapboxPublicToken);
const map = createMap();
map.on('load', onMapLoaded);

let isGeojsonLoaded = false;
let geojson = null;
fetchMetadata()
    .then(onMetadataLoaded)
    .then(onGeojsonLoaded);