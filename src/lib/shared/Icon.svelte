<script>
    export let name = '';
    export let size = 24;

    let IconComponent = null;
    const validIcons = [
        'Book',
        'Camera',
        'Moon',
        'Sun',
        'Burger',
        'Close',
        'Settings',
        'ChevronLeft',
        'ChevronRight',
        'DoubleArrowLeft',
        'DoubleArrowRight',
        'Home',
        'User',
        'UserRemove',
        'Eye',
        'EyeSlash',
        'Trash',
        'Undo',
        'ArrowDown',
        'ArrowUp',
        'Euro',
        'Dollar',
        'Upload',
        'Search',
        'Pen',
        'Lego',
        'List',
        'Grid',
        'Plus',
        'Minus',
        'Save',
        'Check',
        'Exchange',
        'PaperClip',
        'Send',
        'Download',
        'Help',
        'Clear',
        'ArrowLeft',
        'ArrowRight',
        'Gavel',
        'OpenSource',
        'ChevronDown',
        'ChevronUp',
        'EnglishFlag',
        'FrenchFlag',
        'Mastercard',
    ];

    const toCamelCase = (str) => {
        if (str.length === 0) {
            return '';
        }
        return str[0].toUpperCase() + str.slice(1);
    };

    const setIcon = async (name) => {
        const camelCaseName = toCamelCase(name);
        if (validIcons.includes(camelCaseName)) {
            IconComponent = (await import(`../icons/${camelCaseName}.svelte`)).default;
        } else {
            throw new Error(`Invalid icon name: ${name}`);
        }
    };

    $: {
        setIcon(name);
    }
</script>

{#if IconComponent}
    <svelte:component this={IconComponent} {size} className="transition-all duration-300" />
{/if}
