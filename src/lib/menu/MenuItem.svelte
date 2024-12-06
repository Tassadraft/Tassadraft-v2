<script>
    import { location } from '../../stores/locationStore.js';
    import Link from '../shared/Link.svelte';
    import Icon from '../shared/Icon.svelte';

    export let href = '';
    export let iconLeft = '';
    export let iconRight = 'chevronRight';
    export let footer = false;
    export let target = '';

    let notClickable = true;

    $: notClickable = href === $location;
</script>

<Link
    href={notClickable ? null : href}
    className={`hover:${footer ? 'bg-gray-300 flex justify-center' : 'bg-gray-600'} dark:hover:bg-gray-700 px-2 cursor-pointer flex flex-row transition-colors duration-300 rounded ${notClickable ? 'cursor-not-allowed opacity-50' : ''}`}
    {target}
>
    <div class="text-primary-500 left">
        <Icon name={iconLeft} />
    </div>
    <p class="{footer ? '' : 'text-xl'} text-nowrap p-2">
        <slot />
    </p>
    {#if iconRight}
        <div class="flex dark:text-white right">
            <Icon name={iconRight} />
        </div>
    {/if}
</Link>

<style>
    .left {
        margin-top: 0.5rem;
    }
    .right {
        margin-top: 0.55rem;
    }
</style>
