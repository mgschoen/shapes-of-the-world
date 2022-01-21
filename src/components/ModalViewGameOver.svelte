<script>
    import { createEventDispatcher } from 'svelte';
    import { country, highscore } from '../store';
    import Button from './Button.svelte';
    import ModalHeadline from './ModalHeadline.svelte';
    import ModalParagraph from './ModalParagraph.svelte';

    export let showHighscore = false;

    let dispatch = createEventDispatcher();
    let solution = '';

    $: solution = $country && $country.name ? $country.name : '';
</script>

<ModalHeadline color="text-red-900">
    Game Over!
</ModalHeadline>

<ModalParagraph>
    Bummer, that was wrong! The country you just saw was <strong class="text-teal-900 font-bold">{solution}</strong>.
</ModalParagraph>

{#if showHighscore}
    <ModalParagraph disableGrow bold color="text-cyan-700">
        But hold your tears, you landed a new highscore:
    </ModalParagraph>

    <figure class="text-center text-cyan-700 mb-6 md:mb-10 w-64 m-auto">
        <p class="text-7xl font-black">{$highscore}</p>
        <figcaption class="text-2xl">countries identified correctly</figcaption>
    </figure>
{/if}

<div class="text-center">
    <Button on:click={() => dispatch('restart-game')}>Restart Game</Button>
</div>
