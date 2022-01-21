<script>
    import { country } from '../store';
</script>

<section class="fixed top-24 lg:top-4 right-4 z-10 flex items-center space-x-4">
    {#if $country}
        <div>Country: <strong>{$country.name} ({$country.short})</strong></div>
    {/if}
</section>
