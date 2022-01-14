<script>
    export let disabled = false;
</script>

<button
    class="border-2 border-teal-900 bg-teal-900 text-slate-50 px-4 py-2 hover:bg-teal-50 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-teal-900 disabled:hover:text-slate-50 transition-colors"
    on:click
    {disabled}
>
    <slot></slot>
</button>