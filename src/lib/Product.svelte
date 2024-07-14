<script>
    import Icon from './Icon.svelte';

    export let title = '';
    export let icon = '';
    export let href = '';
    export let description = '';

    let hovering = false;

    const handleMouseEnter = () => {
        hovering = true;
    };

    const handleMouseLeave = () => {
        hovering = false;
    };
</script>

<a href={href} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} class="block">
    <div class="flex flex-col md:flex-row items-center p-6 rounded-lg shadow-lg dark:bg-gray-800 h-40">
        <div class="flex flex-col items-center justify-center order-1 md:order-2 text-center {description && hovering ? 'hidden' : ''}">
            <p class="text-gray-800 dark:text-white text-2xl mb-1">{title}</p>
            <div class="size-10 dark:bg-gray-700 shadow-lg rounded-full flex items-center justify-center">
                <Icon name={icon} size="8"/>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center text-center text-gray-600 dark:text-gray-400 order-2 md:order-3 {description && hovering ? '' : 'hidden'}">
            <p>{description}</p>
        </div>
    </div>
</a>