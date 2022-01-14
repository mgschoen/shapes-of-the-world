<script>
    import { metadata, country, geojson, isLoading, isModalOpen } from '../store';
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();

    import Button from './Button.svelte';

    export let showMap = false;
    let refreshDisabled = false;
    $: refreshDisabled = !$metadata || !$country || !$geojson || $isLoading;
</script>

<section class="fixed top-4 left-4 z-10 flex items-center space-x-4">
    <ul class="flex flex-col">
        <li>
            <label for="showMap">
                <input id="showMap" type="checkbox" bind:checked={showMap} />
                Karte anzeigen
            </label>
        </li>
        <li>
            <label for="showModal">
                <input id="showModal" type="checkbox" bind:checked={$isModalOpen} />
                Modal anzeigen
            </label>
        </li>
    </ul>

    <Button
        on:click={() => dispatch('update-requested')}
        disabled={refreshDisabled}
    >Neues Land laden</Button>
</section>