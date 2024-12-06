<script>
    import Icon from './Icon.svelte';
    import Link from './Link.svelte';

    export let title = '';
    export let icon = '';
    export let href = '';
    export let description = '';

    let hovering = false;
</script>

<Link {href} on:mouseenter={() => (hovering = true)} on:mouseleave={() => (hovering = false)}>
    <div class="flex flex-col md:flex-row items-center p-6 rounded-lg shadow-lg dark:bg-gray-700 h-40">
        <div
            class="flex flex-col items-center justify-center order-1 md:order-2 text-center transition-opacity duration-300 {description && hovering
                ? 'opacity-50'
                : ''}"
        >
            <p class="text-gray-800 text-2xl mb-1">{title}</p>
            <div class="size-12 dark:bg-gray-700 text-primary-500 shadow-lg rounded-full flex items-center justify-center">
                <Icon name={icon} size="32" />
            </div>
        </div>
        <div
            class="flex flex-col items-center justify-center text-center text-gray-600 dark:text-gray-400 order-2 md:order-3 transition-opacity duration-300 md:ml-10 {description &&
            hovering
                ? ''
                : 'opacity-0'}"
        >
            <p>{description}</p>
        </div>
    </div>
</Link>
