<script>
    import { Splide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';

    export let ariaLabel = "This is a carousel"
    export let itemsNumber;
    const options = {
        type: 'fade',
        perPage: 4,
        perMove: 1,
        gap: '25px',
        arrows: true,
        pagination: true,
        breakpoints: {
            1024: { perPage: 3, perMove: 3, arrows: itemsNumber > 3, pagination: itemsNumber > 3 },
            640: { perPage: 2, perMove: 2, arrows: itemsNumber > 2, pagination: itemsNumber > 3 },
            380: { perPage: 1, perMove: 1, arrows: itemsNumber > 1, pagination: itemsNumber > 3 },
        },
    };
</script>

<Splide {options} aria-label={ariaLabel}>
    <slot />
</Splide>
