<script>
    import { metadata, country, geojson, isLoading } from '../store';
    import { createEventDispatcher } from 'svelte'
    let dispatch = createEventDispatcher();

    export let showMap = false;
    let refreshDisabled = false;
    $: refreshDisabled = !$metadata || !$country || !$geojson || $isLoading;
</script>

<section class="fixed top-4 left-4 z-10 flex items-center space-x-4">
    <label for="showMap">
        <input id="showMap" type="checkbox" bind:checked={showMap} />
        Karte anzeigen
    </label>

    <button
        class="border-2 border-black px-2 py-1 hover:bg-lime-200 disabled:opacity-50"
        on:click={() => dispatch('update-requested')}
        disabled={refreshDisabled}
    >Neues Land laden</button>
</section>