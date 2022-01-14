<script>
    import { metadata, country, geojson, isLoading, modal } from '../store';
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
    </ul>

    <Button
        on:click={() => dispatch('update-requested')}
        disabled={refreshDisabled}
    >Neues Land laden</Button>

    <label for="modal">
        Modal anzeigen
        <select id="modal" bind:value={$modal}>
            <option value="">-</option>
            <option value="splash">Splash</option>
            <option value="game-over">Game Over</option>
        </select>
    </label>
</section>