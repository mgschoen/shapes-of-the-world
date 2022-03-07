<script>
    import { highscore, modal } from '../store';
    import Button from './Button.svelte';
    import ModalHeadline from './ModalHeadline.svelte';
    import ModalParagraph from './ModalParagraph.svelte';

    export let disabled = false;
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
        on:click={() => $modal = ''}
        bind:disabled={disabled}
    >Start Game</Button>
</div>
