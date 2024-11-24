<script>
    import { navigate } from 'svelte-routing'; // or your routing utility

    export let href = '';
    export let className = '';
    export let target = '';
    export let ariaLabel = '';
    export let style = '';

    const handleClick = (event) => {
        if (target === '' || target === '_self') {
            event.preventDefault();
            if (href) {
                navigate(href);
            }
        }
    };
</script>

<a {href} aria-label={ariaLabel} {target} class={className} {style} on:mouseenter on:mouseleave on:click={handleClick}>
    <slot />
</a>
