<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();

    import { isLoading, metadata } from '../store';
    import Button from './Button.svelte';

    let input;
    let list;
    let value = '';
    let suggestions = [];
    let canSubmit = false;

    onMount(() => {
        input.focus();
    });

    function updateSuggestions() {
        if (!$metadata || !Array.isArray($metadata.countries) || !value) {
            suggestions = [];
            return;
        }
        const inputLowercase = value.toLowerCase();
        suggestions = $metadata.countries.filter((country) => {
            const nameLowercase = country.name ? country.name.toLowerCase() : '';
            const shortLowercase = country.short ? country.short.toLowerCase() : '';
            return nameLowercase.indexOf(inputLowercase) > -1
                || shortLowercase.indexOf(inputLowercase) > -1;
        });
    }

    function onKeyUp (event) {
        if (![38, 40].includes(event.keyCode) || !list) {
            return;
        }
        const direction = event.keyCode === 38 ? -1 : 1;
        const listButtons = Array.from(list.querySelectorAll('button'));
        const activeIndex = listButtons.findIndex((button) => button === document.activeElement);
        if (activeIndex === -1 && direction === -1) {
            listButtons.pop().focus();
        } else if (activeIndex === 0 && direction === -1) {
            input.focus();
        } else if (activeIndex === listButtons.length - 1 && direction === 1) {
            input.focus();
        } else if (listButtons[activeIndex + direction]) {
            listButtons[activeIndex + direction].focus();
        }
    }

    function onListSelect (event) {
        if (!event.target.dataset.value || !$metadata || !$metadata.countries) {
            return;
        }
        const selectedValue = event.target.dataset.value
        const selectedCountry = $metadata.countries.find((country) => country.short === selectedValue);
        if (selectedCountry && selectedCountry.name) {
            value = selectedCountry.name;
            input.focus();
        }
    }

    function onButtonClick() {
        dispatch('submit', value);
        value = '';
    }

    $: value & updateSuggestions();
    $: canSubmit = $metadata && $metadata.countries && $metadata.countries.filter((country) => country.name === value).length === 1;
    $: isButtonDisabled = $isLoading || !canSubmit;
</script>

<section class="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto z-10">
    <h2 class="hidden">Select your answer</h2>
    {#if suggestions.length && !canSubmit}
        <ul
            class="bg-white mb-2 rounded-md shadow-sm flex flex-col max-h-48 md:max-h-80 overflow-y-scroll"
            bind:this={list}
            on:keyup={onKeyUp}
        >
            {#each suggestions as suggestion, index}
                <li>
                    <button
                        class="w-full p-4 text-left hover:bg-slate-100 focus:bg-slate-100"
                        class:rounded-t-md={index === 0}
                        class:rounded-b-md={index === suggestions.length - 1}
                        data-value={suggestion.short}
                        on:click={onListSelect}
                    >
                        {suggestion.name}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
    <div class="flex space-x-4">
        <input
            type="text"
            placeholder="Your answer..."
            class="p-4 text-xl shadow-md rounded-md flex-grow md:w-96"
            bind:this={input}
            bind:value={value}
            on:keyup={onKeyUp}
            disabled={$isLoading}
        />
        <Button
            disabled={isButtonDisabled}
            on:click={onButtonClick}
        >
            <svg width="24" height="24">
                <polyline
                    points="8,4 16,12 8,20"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                ></polyline>
            </svg>
        </Button>
    </div>
</section>