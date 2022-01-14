<script>
    export let bold = false;
    export let color = 'text-black';
    export let disableGrow = false;
</script>

<p
    class="text-xl text-center mb-6 md:mb-10 {color}"
    class:md:text-2xl={!disableGrow}
    class:font-bold={bold}
>
    <slot></slot>
</p>
