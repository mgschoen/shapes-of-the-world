<script>
    import distance from '@turf/distance';
    import { onMount } from 'svelte';
    import { country, debug, geojson, highscore, history, isLoading, metadata, modal, pool, score, userCountry } from './store';
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
        const randomIndex = Math.floor(Math.random() * $pool.length);
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
        $score = 0;
        $history = [];
        $modal = 'game-over';
    }

    function restartGame() {
        $country = null;
        $geojson = null;
        hasHighscore = false;
        setNextCountry();
    }

    function onModalClosed(event) {
        if (event.detail === 'splash') {
            setNextCountry();
        } else if (event.detail === 'game-over') {
            restartGame();
        }
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

    async function initMetadata() {
        $metadata = await fetchJson('/data/_meta.json');
        $userCountry = $metadata.countries.find((country) => country.short === 'DEU');
        let processedCountries = $metadata.countries.map((country) => ({
            ...country,
            distance: distance($userCountry.center, country.center),
        }));

        const areaValues = processedCountries.map((country) => country.area);
        const areaMin = Math.min(...areaValues);
        const areaMax = Math.max(...areaValues);
        
        const distanceValues = processedCountries.map((country) => country.distance);
        const distanceMin = Math.min(...distanceValues);
        const distanceMax = Math.max(...distanceValues);

        processedCountries = processedCountries.map((country) => {
            // 1 for the largest remaining country, 0 for the smallest
            const areaScore = (country.area - areaMin) / (areaMax - areaMin);

            // 1 for the nearest remaining country, 0 for the furthest
            const distanceInverted = distanceMax - country.distance;
            const distanceScore = (distanceInverted - distanceMin) / (distanceMax - distanceMin);

            return {
                ...country,
                score: (areaScore + distanceScore) / 2,
            }
        });

        $metadata.countries = processedCountries;
    }

    onMount(async () => {
        $isLoading = true;
        await initMetadata();
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
        <Modal on:closed={onModalClosed}>
            {#if $modal == 'splash'}
                <ModalViewSplash />
            {:else if $modal == 'game-over'}
                <ModalViewGameOver showHighscore={hasHighscore} />
            {/if}
        </Modal>
    {/if}
</main>
