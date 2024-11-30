<script>
    import { Splide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';

    export let options = {
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: '25px',
        arrows: true,
        pagination: true,
        breakpoints: {
            1024: { perPage: 3, perMove: 3 },
            640: { perPage: 2, perMove: 2 },
            380: { perPage: 1, perMove: 1 },
        },
    };
</script>

<Splide {options} aria-label="Svelte Splide Example">
    <slot />
</Splide>
