<script>
    import ThemeSwitch from '../ThemeSwitch.svelte';
    import Product from '../Product.svelte';

    const products = [
        { href: '/tassadraft', title: 'Tassadraft', icon: 'camera', description: 'test fdsfds fds fsdf sdfsdfdsf sdf sdfdsfsdfsdf sdfsdfsd' },
        // { href: '/tassacards', title: 'Tassacards', icon: 'book', description: 'Description for Tassacards' },
        // { href: '/tassadecks', title: 'Tassadecks', icon: 'camera', description: 'Description for Tassadecks' },
    ];
</script>

<ThemeSwitch />
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each products as product}
        <Product title={product.title} icon={product.icon} href={product.href} description={product.description} />
    {/each}
</div>