<script>
    export let disabled = false;
</script>

<button
    class="
        border-2 border-teal-900
        bg-teal-900 hover:bg-teal-50 disabled:hover:bg-teal-900
        text-xl font-bold tracking-wider
        text-slate-50 hover:text-slate-900 disabled:hover:text-slate-50
        px-4 py-2
        disabled:opacity-50
        transition-colors
    "
    on:click
    {disabled}
>
    <slot></slot>
</button>