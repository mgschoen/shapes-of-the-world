<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
    import { onDestroy, onMount } from 'svelte';
    import { settings } from '../store';

    export let geojson;
    // export let center = [0,0];
    // export let scale = 16;

    let map;
    let isMapLoaded = false;

    $: if (map && isMapLoaded && geojson) {
        if (map.getLayer('country-layer')) {
            map.removeLayer('country-layer');
        }
        if (map.getSource('country-source')) {
            map.removeSource('country-source');
        }
        map.addSource('country-source', {
            type: 'geojson',
            data: geojson,
        });
        map.addLayer({
            'id': 'country-layer',
            'type': 'line',
            'source': 'country-source',
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

    onMount(() => {
        if (!mapboxgl.accessToken && $settings.mapboxPublicToken) {
            mapboxgl.accessToken = $settings.mapboxPublicToken;
        }
        map = new mapboxgl.Map({
            container: 'mapbox-root',
            style: 'mapbox://styles/argonns/ckxf3oh2k2xmo15phqc819m15'
        });
        map.on('load', () => isMapLoaded = true);
    });

    onDestroy(() => {
        if (map) {
            map.remove();
            map = null;
        }
        isMapLoaded = false;
    });
</script>

<div id="mapbox-root" class="absolute inset-0 w-full h-full bg-orange-100"></div>
