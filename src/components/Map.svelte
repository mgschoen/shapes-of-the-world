<script>
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
    import bbox from '@turf/bbox'
    import { onDestroy, onMount } from 'svelte';
    import { settings, modal } from '../store';

    export let geojson;
    export let cameraBoundingBox;

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
                'line-color': '#134e4a',
                'line-width': 8
            }
        });
        const boundingBox = bbox(geojson);
        map.fitBounds([
            boundingBox.slice(0,2),
            boundingBox.slice(2,4),
        ], { padding: 100 });
    }

    $: if (map && isMapLoaded && Array.isArray(cameraBoundingBox) && cameraBoundingBox.length >= 4) {
        map.fitBounds([
            cameraBoundingBox.slice(0,2),
            cameraBoundingBox.slice(2,4),
        ]);
    }

    onMount(() => {
        if (!mapboxgl.accessToken && $settings.mapboxPublicToken) {
            mapboxgl.accessToken = $settings.mapboxPublicToken;
        }
        map = new mapboxgl.Map({
            attributionControl: false,
            container: 'mapbox-root',
            renderWorldCopies: false,
            style: 'mapbox://styles/argonns/ckxf3oh2k2xmo15phqc819m15',
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

<div
    id="mapbox-root"
    class="absolute inset-0 w-full h-full bg-orange-100 transition duration-300 ease-in-out"
    class:blur-md={!!$modal}
></div>
