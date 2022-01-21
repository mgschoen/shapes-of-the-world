<script>
    import { highscore, score } from '../store';
</script>

<section class="fixed top-4 md:top-8 lg:top-auto lg:bottom-7 left-4 md:left-8 lg:left-auto right-4 md:right-8 lg:right-8 flex items-end justify-between z-10">
    <h2 class="hidden">Score</h2>
    <figure
        class="flex flex-col items-start lg:items-center w-1/2 lg:w-auto border-slate-800"
        class:lg:border-r-2={$highscore > 0}
        class:lg:pr-4={$highscore > 0}
    >
        <span class="text-cyan-700 text-5xl md:text-6xl font-black">
            {$score}
        </span>
        <span class="text-l text-right font-black leading-tight">
            countries identified
        </span>
    </figure>
    {#if $highscore > 0}
        <figure class="flex flex-col lg:flex-col items-end lg:items-center w-1/2 lg:w-auto lg:pl-4">
            <span class="text-4xl md:text-6xl font-black">
                {$highscore}
            </span>
            <span class="text-l font-black">
                Highscore
            </span>
        </figure>
    {/if}
</section>