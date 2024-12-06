<script>
    import Link from '../shared/Link.svelte';
    import Icon from '../shared/Icon.svelte';

    export let href = '';
    export let iconLeft = '';
    export let iconRight = 'chevronRight';
    const notClickable = href === window.location.pathname;
</script>

<Link
    href={notClickable ? null : href}
    className={`hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer flex flex-row transition-colors duration-300 rounded ${notClickable ? 'cursor-not-allowed opacity-50' : ''}`}
>
    <div class="mt-2.5 text-primary-500">
        <Icon name={iconLeft} />
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
