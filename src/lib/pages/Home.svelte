<script>
    import Card from '../shared/Card.svelte';
    import { t } from 'svelte-i18n';

    let products = [];

    $: {
        document.title = $t('home.title');
        products = [
            {
                href: '/tassadraft',
                title: $t('common.tassadraft'),
                icon: 'camera',
                description: $t('home.tassadraft.description'),
            },
            {
                href: '#',
                title: $t('common.tassacards'),
                icon: 'book',
                description: $t('home.tassacards.description'),
            },
            {
                href: '/tassadecks',
                title: $t('common.tassadecks'),
                icon: 'camera',
                description: $t('home.tassadecks.description'),
            },
        ];
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
    {#each products as product}
        <Card title={product.title} icon={product.icon} href={product.href} description={product.description} />
    {/each}
</div>
