<script>
    import { onMount } from 'svelte';
    import { country, geojson, metadata, isLoading, isModalOpen } from './store';
    import { fetchJson } from './utils';

    import Button from './components/Button.svelte';
    import ControlsDebuggingHandles from './components/ControlsDebuggingHandles.svelte';
    import ControlsDebuggingOutput from './components/ControlsDebuggingOutput.svelte';
    import Map from './components/Map.svelte';
    import Modal from './components/Modal.svelte';

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

<main class="text-slate-800">
    <ControlsDebuggingHandles bind:showMap={showMap} on:update-requested={updateCountry}/>
    <ControlsDebuggingOutput />
    
    {#if showMap}
        <Map geojson={$geojson}></Map>
    {/if}
    
    {#if $isModalOpen}
        <Modal>
            <Button on:click={() => $isModalOpen = false}>Schließen</Button>
        </Modal>
    {/if}
</main>
