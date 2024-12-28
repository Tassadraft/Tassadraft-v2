<script>
    import Title from '../shared/Title.svelte';
    import { t } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Product from '../subscribe/Product.svelte';
    import { language } from '../../stores/languageStore.js';

    let products = [];

    onMount(async () => {
        const { data } = await axios.get(`/api/auth/subscribe/products?language=${$language}`);
        products = data.products;
    });
</script>

<Title title={$t('subscribe.title')} />

<div class="w-full flex gap-5 flex-wrap justify-around mt-3">
    {#each products as product}
        <Product {product} />
    {/each}
</div>
