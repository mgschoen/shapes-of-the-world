<script>
    import { highscore, modal } from '../store';
</script>

<section class="fixed top-24 lg:top-4 left-4 z-10 flex items-center space-x-4">
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