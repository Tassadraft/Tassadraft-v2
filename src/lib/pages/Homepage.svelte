<script>
    import Product from '../home/Product.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        document.title = 'Home';
    });

    const products = [
        { href: '/tassadraft', title: 'Tassadraft', icon: 'camera', description: 'Your batch card recognition tool' },
        { href: '#', title: 'Tassacards', icon: 'book', description: 'Coming soon' },
        { href: '#', title: 'Tassadecks', icon: 'camera', description: 'Coming soon' },
    ];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
    {#each products as product}
        <Product title={product.title} icon={product.icon} href={product.href} description={product.description} />
    {/each}
</div>
