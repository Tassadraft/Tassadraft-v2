<script>
    import Link from '../shared/Link.svelte';
    import Icon from '../shared/Icon.svelte';

    export let href = '';
    export let onClick;
    export let iconLeft = '';
    export let iconRight = 'rightChevron';
    const notClickable = href === window.location.pathname;
</script>

<Link
        href={notClickable ? null : href}
        className={`hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer flex flex-row transition-colors duration-300 rounded ${notClickable ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={notClickable ? null : onClick}
>
    <div class="mt-2.5">
        <Icon name={iconLeft} color="primary-500" />
    </div>
    <p class="text-xl p-2">
        <slot />
    </p>
    {#if iconRight}
        <div class="mt-3 w-full flex">
            <Icon name={iconRight} />
        </div>
    {/if}
</Link>
