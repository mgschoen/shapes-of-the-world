<script>
    import { createEventDispatcher } from 'svelte';
    import { highscore } from '../store';
    import Button from './Button.svelte';
    import ModalHeadline from './ModalHeadline.svelte';
    import ModalParagraph from './ModalParagraph.svelte';

    export let disabled = false;

    const dispatch = createEventDispatcher();
</script>

<ModalHeadline color="text-teal-900">
    Shapes of the World
</ModalHeadline>

<ModalParagraph>
    How many countries can you identify just by their shape and location?
</ModalParagraph>

{#if $highscore}
    <ModalParagraph bold disableGrow color="text-teal-900">
        Your highscore: {$highscore}
    </ModalParagraph>
{/if}

<div class="text-center">
    <Button
        on:click={() => dispatch('start-game')}
        bind:disabled={disabled}
    >Start Game</Button>
</div>
