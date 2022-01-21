<script>
    import { highscore, modal } from '../store';

    export let showMap = false;
</script>

<section class="fixed top-24 lg:top-4 left-4 z-10 flex items-center space-x-4">
    <ul class="flex flex-col">
        <li>
            <label for="showMap">
                <input id="showMap" type="checkbox" bind:checked={showMap} />
                Karte anzeigen
            </label>
        </li>
    </ul>

    <label for="highscore">
        Highscore
        <input
            type="number"
            bind:value={$highscore}
            class="w-10 mx-1 px-2"
        />
    </label>

    <label for="modal">
        Modal anzeigen
        <select id="modal" bind:value={$modal}>
            <option value="">-</option>
            <option value="splash">Splash</option>
            <option value="game-over">Game Over</option>
        </select>
    </label>
</section>