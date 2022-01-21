<script>
    import { onMount } from 'svelte';
    import { country, debug, geojson, highscore, history, isLoading, metadata, modal, pool, score } from './store';
    import { fetchJson } from './utils';

    import ControlsDebuggingHandles from './components/ControlsDebuggingHandles.svelte';
    import ControlsDebuggingOutput from './components/ControlsDebuggingOutput.svelte';
    import ControlsInput from './components/ControlsInput.svelte';
    import ControlsScore from './components/ControlsScore.svelte';
    import Map from './components/Map.svelte';
    import Modal from './components/Modal.svelte';
    import ModalViewGameOver from './components/ModalViewGameOver.svelte';
    import ModalViewSplash from './components/ModalViewSplash.svelte';

    let hasHighscore = false;

    async function setNextCountry() {
        $isLoading = true;
        const randomIndex = Math.round(Math.random() * $pool.length);
        const nextCountryShort = $pool[randomIndex];
        $country = $metadata.countries.find((country) => country.short === nextCountryShort);
        $geojson = await fetchJson(`/data/${$country.short}.geojson`);
        $isLoading = false;
    }

    function endGame() {
        if ($score > $highscore) {
            $highscore = $score;
            hasHighscore = true;
        }
        $modal = 'game-over';
    }

    function onStartGame() {
        $modal = '';
        setNextCountry();
    }

    function onSubmit (event) {
        if (event.detail === $country.name || event.detail === $country.short) {
            $score += 1;
            $history = [...$history, $country.short];
            setNextCountry();
        } else {
            endGame();
        }
    }

    function onRestartGame() {
        $score = 0;
        $history = [];
        $country = null;
        $geojson = null;
        $modal = '';
        hasHighscore = false;
        setNextCountry();
    }

    onMount(async () => {
        $isLoading = true;
        $metadata = await fetchJson('/data/_meta.json');
        $isLoading = false;
    });
</script>

<main class="text-slate-800">
    {#if !$modal}
        <ControlsInput on:submit={onSubmit} />
        <ControlsScore />
    {/if}

    {#if $debug}
        <ControlsDebuggingHandles />
        <ControlsDebuggingOutput />
    {/if}
    
    <Map geojson={$geojson}></Map>
    
    {#if $modal}
        <Modal>
            {#if $modal == 'splash'}
                <ModalViewSplash on:start-game={onStartGame} />
            {:else if $modal == 'game-over'}
                <ModalViewGameOver
                    showHighscore={hasHighscore}
                    on:restart-game={onRestartGame}
                />
            {/if}
        </Modal>
    {/if}
</main>
