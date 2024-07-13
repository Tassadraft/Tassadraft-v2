<script>
    import { onMount } from 'svelte';
    export let name = '';
    export let size = 4;

    let IconComponent = null;
    const validIcons = ['Book', 'Camera', 'Moon', 'Sun'];

    const toCamelCase = (str) => {
        if (str.length === 0) {
            return '';
        }
        return str[0].toUpperCase() + str.slice(1);
    }

    onMount(async () => {
        const camelCaseName = toCamelCase(name);
        if (validIcons.includes(camelCaseName)) {
            IconComponent = (await import(`./icons/${camelCaseName}.svelte`)).default;
        } else {
            throw new Error(`Invalid icon name: ${name}`);
        }
    });
</script>

{#if IconComponent}
    <svelte:component this={IconComponent} {size} />
{/if}
