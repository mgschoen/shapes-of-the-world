<script>
    import { onMount } from 'svelte';
    import { country, geojson, metadata, isLoading, modal } from './store';
    import { fetchJson } from './utils';

    import Button from './components/Button.svelte';
    import ControlsDebuggingHandles from './components/ControlsDebuggingHandles.svelte';
    import ControlsDebuggingOutput from './components/ControlsDebuggingOutput.svelte';
    import ControlsInput from './components/ControlsInput.svelte';
    import Map from './components/Map.svelte';
    import Modal from './components/Modal.svelte';
    import ModalViewGameOver from './components/ModalViewGameOver.svelte';
    import ModalViewSplash from './components/ModalViewSplash.svelte';

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

    {#if !$modal}
        <ControlsInput />
    {/if}
    
    {#if showMap}
        <Map geojson={$geojson}></Map>
    {/if}
    
    {#if !!$modal}
        <Modal>
            {#if $modal == 'splash'}
                <ModalViewSplash/>
            {:else if $modal == 'game-over'}
                <ModalViewGameOver/>
            {/if}
        </Modal>
    {/if}
</main>
