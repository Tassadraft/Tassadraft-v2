<script>
    import Card from '../shared/Card.svelte';
    import { onMount } from 'svelte';
    import Menu from '../menu/Menu.svelte';

    onMount(() => {
        document.title = 'Home';
    });

    const products = [
        {
            href: '/tassadraft',
            title: 'Tassadraft',
            icon: 'camera',
            description: 'Your batch card recognition tool',
        },
        {
            href: '#',
            title: 'Tassacards',
            icon: 'book',
            description: 'Coming soon',
        },
        {
            href: '/tassadecks',
            title: 'Tassadecks',
            icon: 'camera',
            description: 'Your dedicated deck editor',
        },
    ];
</script>

<Menu />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
    {#each products as product}
        <Card title={product.title} icon={product.icon} href={product.href} description={product.description} />
    {/each}
</div>
