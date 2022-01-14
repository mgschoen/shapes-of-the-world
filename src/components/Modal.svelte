<script>
    import { fade } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';
</script>

<section
    class="absolute inset-0 flex items-center justify-center"
    transition:fade="{{ duration: 300, easing: cubicInOut }}"
>
    <div class="absolute inset-0 bg-white opacity-40 z-10"></div>
    <div class="bg-white border-8 border-teal-900 bg-gradient-to-tr from-yellow-50 via-lime-50 to-emerald-50 p-10 m-10 w-full max-w-screen-md z-20 shadow-lg rounded-md">
        <slot></slot>
    </div>
</section>