<script>
    import { onMount } from 'svelte';
    import { country, geojson, metadata, isLoading } from './store';
    import { fetchJson } from './utils';

    import Map from './components/Map.svelte';
    import ControlsDebuggingHandles from './components/ControlsDebuggingHandles.svelte';
    import ControlsDebuggingOutput from './components/ControlsDebuggingOutput.svelte';

    let showMap = true;

    async function updateCountry() {
        $isLoading = true;
        const randomIndex = Math.round(Math.random() * $metadata.countries.length);
        $country = $metadata.countries[randomIndex];
        $geojson = await fetchJson(`/data/${$country.short}.geojson`);
        $isLoading = false;
    }

    onMount(async () => {
        $isLoading = true;
        $metadata = await fetchJson('/data/_meta.json');
        $isLoading = false;
        updateCountry();
    });
</script>


<ControlsDebuggingHandles bind:showMap={showMap} on:update-requested={updateCountry}/>
<ControlsDebuggingOutput />

{#if showMap}
    <Map geojson={$geojson}></Map>
{/if}
