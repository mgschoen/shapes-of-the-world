<script>
import { onMount } from 'svelte';

    import Map from './components/Map.svelte';

    let metadata;
    let shortcode;
    let longcode;
    let geojson;
    let showMap = true;

    async function fetchJson(url) {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            return { error: error.message };
        }
    }

    async function updateCountry() {
        const randomIndex = Math.round(Math.random() * metadata.countries.length);
        shortcode = metadata.countries[randomIndex].short;
        longcode = metadata.countries[randomIndex].name;
        geojson = await fetchJson(`/data/${shortcode}.geojson`);
    }

    onMount(async () => {
        metadata = await fetchJson('/data/_meta.json');
        updateCountry();
    });
</script>

<section class="fixed top-4 left-4 z-10 flex items-center space-x-4">
    <label for="showMap">
        <input id="showMap" type="checkbox" bind:checked={showMap} />
        Karte anzeigen
    </label>

    <button
        class="border-2 border-black px-2 py-1 hover:bg-lime-200"
        on:click={updateCountry}
    >Neues Land laden</button>
</section>

<section class="fixed top-4 right-4 z-10 flex items-center space-x-4">
    {#if shortcode}
        <div>Country: <strong>{longcode} ({shortcode})</strong></div>
    {/if}
</section>

{#if showMap}
    <Map {geojson}></Map>
{/if}
