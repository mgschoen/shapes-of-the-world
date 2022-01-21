<script>
    import { onMount } from 'svelte';
    import { country, debug, geojson, isLoading, metadata, modal } from './store';
    import { fetchJson } from './utils';

    import ControlsDebuggingHandles from './components/ControlsDebuggingHandles.svelte';
    import ControlsDebuggingOutput from './components/ControlsDebuggingOutput.svelte';
    import ControlsInput from './components/ControlsInput.svelte';
    import ControlsScore from './components/ControlsScore.svelte';
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
    {#if !$modal}
        <ControlsInput on:update-requested={updateCountry} />
        <ControlsScore />
    {/if}

    {#if $debug}
        <ControlsDebuggingHandles bind:showMap={showMap} />
        <ControlsDebuggingOutput />
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
