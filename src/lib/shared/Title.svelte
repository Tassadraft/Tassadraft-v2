<script>
    import {MetaTags} from "svelte-meta-tags";

    export let title;
    export let hasBackground = false;

    $: document.title = title;
</script>

<MetaTags bind:title />

<h1 class="relative z-10 text-3xl {hasBackground ? 'text-white' : ''} font-bold mb-2">{title}</h1>
