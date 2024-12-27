<script>
    import { t } from 'svelte-i18n';
    import IconInfo from '../shared/IconInfo.svelte';
    import Icon from '../shared/Icon.svelte';
    import Link from '../shared/Link.svelte';

    export let product;
</script>

<div class="p-3 w-full md:w-64 rounded-xl shadow-xl dark:bg-gray-700 flex flex-col gap-3">
    <div class="p-4 flex flex-col gap-2 flex-grow">
        <div class="flex gap-3">
            <h3 class="font-semibold text-2xl">{product.translation.name}</h3>
            <div class="">
                <IconInfo>
                    <li>
                        {#each product.translation.features as feature}
                            <ul class="text-gray-700 text-left">
                                {feature.name}
                            </ul>
                        {/each}
                    </li>
                </IconInfo>
            </div>
        </div>
        <p class="text-gray-700 text-base">
            {product.translation.description}
        </p>
    </div>
    <div class="flex flex-col gap-3">
        <div class="flex justify-around">
            <div class="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 h-8">
                <p>
                    <span class="text-gray-800">
                        {product.price > 0 ? `${product.price}€` : $t('subscribe.product.free')}
                    </span>
                </p>
            </div>
            <div class="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 h-8">
                <p>
                    <span class="text-gray-800">
                        {product.intervalCount}
                        {$t(`subscribe.product.${product.interval}${product.intervalCount > 1 ? 's' : ''}`)}
                    </span>
                </p>
            </div>
        </div>
        <Link
            href={`/subscribe/product/${product.translation.stripePriceId}`}
            className="justify-center bg-green-600 hover:bg-green-700 transition-all duration-300 py-2 px-4 rounded-xl text-xl font-bold"
        >
            <div class="inline-block">
                <div class="flex flex-row gap-1 items-center">
                    <p>{$t('subscribe.product.learn-more')}</p>
                    <div class="text-primary-500">
                        <Icon name="arrowRight" />
                    </div>
                </div>
            </div>
        </Link>
    </div>
</div>
