<script>
    import { onMount } from 'svelte';
    export let name = '';
    export let size = 24;
    export let color = 'gray';

    let IconComponent = null;
    const validIcons = [
        'Book',
        'Camera',
        'Moon',
        'Sun',
        'Burger',
        'Close',
        'Settings',
        'RightChevron',
        'Home',
        'User',
        'UserRemove',
        'Eye',
        'EyeSlash',
        'Trash'
    ];

    const toCamelCase = (str) => {
        if (str.length === 0) {
            return '';
        }
        return str[0].toUpperCase() + str.slice(1);
    }

    const getTailwindColorClass = (color) => {
        if (!color) return 'text-current';
        const colorMap = {
            'primary': 'text-primary-500',
            'primary-50': 'text-primary-50',
            'primary-100': 'text-primary-100',
            'primary-200': 'text-primary-200',
            'primary-300': 'text-primary-300',
            'primary-400': 'text-primary-400',
            'primary-500': 'text-primary-500',
            'primary-600': 'text-primary-600',
            'primary-700': 'text-primary-700',
            'primary-800': 'text-primary-800',
            'primary-900': 'text-primary-900'
        };
        return colorMap[color] || 'text-current';
    }

    onMount(async () => {
        const camelCaseName = toCamelCase(name);
        if (validIcons.includes(camelCaseName)) {
            IconComponent = (await import(`../icons/${camelCaseName}.svelte`)).default;
        } else {
            throw new Error(`Invalid icon name: ${name}`);
        }
    });
</script>

{#if IconComponent}
    <svelte:component this={IconComponent} {size} className={`${getTailwindColorClass(color) || 'text-gray-800 dark:text-white'}`} />
{/if}
