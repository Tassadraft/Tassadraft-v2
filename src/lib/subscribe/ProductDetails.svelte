<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import Loader from '../shared/Loader.svelte';
    import Title from '../shared/Title.svelte';
    import { t } from 'svelte-i18n';
    import Subtitle from '../shared/Subtitle.svelte';
    import Icon from '../shared/Icon.svelte';
    import Link from '../shared/Link.svelte';
    import Button from "../shared/Button.svelte";
    import ConfirmModal from "../shared/ConfirmModal.svelte";
    import { updateProfile } from "../../stores/profileStore.js";
    import {showToast} from "../../services/toastService.js";

    export let stripePriceId;

    let loading = true;
    let title;
    let product;
    let purchaseUri;
    let showModal = false;

    onMount(async () => {
        await createCheckoutSession();
    });

    const createCheckoutSession = async () => {
        try {
            const { data } = await axios.post(`/api/auth/subscribe/session/create/${stripePriceId}`, {
                frontUri: process.env.VITE_FRONT_URI,
            });
            product = data.product;
            purchaseUri = data.uri;
        } catch (e) {
            console.log(e.response);
        }
        loading = false;
    };

    const handleCancel = async () => {
        showModal = false;
        loading = true;
        try {
            await axios.get('/api/auth/subscribe/cancel');
            showToast($t('toast.subscribe.cancel.success'));
            await updateProfile();
            await createCheckoutSession();
        } catch (e) {
            showToast($t('toast.subscribe.cancel.error'), 'error');
        }
        loading = false;
    };

    $: title = product?.translation?.name ?? $t('subscribe.product.details.title');
</script>

<Loader bind:loading />

<Title bind:title />

{#if product && !loading}
    <p class="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 h-8 inline-block">
        <span class="text-gray-800">
            {product.price > 0 ? `${product.price}€` : $t('subscribe.product.free')}
        </span>
    </p>

    <div class="p-4 flex flex-col gap-2">
        <Subtitle>
            {product.intervalCount}
            {$t(`subscribe.product.${product.interval}${product.intervalCount > 1 ? 's' : ''}`)}
        </Subtitle>
        <p class="text-xl">
            {product.translation.description}
        </p>
        <div>
            <ul class="ml-3">
                {#each product.translation.features as feature}
                    <li class="text-gray-700 text-xl text-left list-disc">
                        {feature.name}
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    {#if purchaseUri}
        <Link
            href={purchaseUri}
            target="_blank"
            className="inline-flex justify-center bg-green-600 hover:bg-green-700 transition-all duration-300 py-2 px-4 rounded-xl text-2xl font-bold"
        >
            <div class="inline-block">
                <div class="flex flex-row gap-1 items-center">
                    <p>{$t('subscribe.product.subscribe')}</p>
                    <div class="text-primary-500">
                        <Icon name="arrowRight" />
                    </div>
                </div>
            </div>
        </Link>
    {:else}
        <Button
            customStyle={true}
            className="inline-flex justify-center bg-red-600 hover:bg-red-700 transition-all duration-300 py-2 px-4 rounded-xl text-2xl font-bold"
            on:click={() => showModal = true}
        >
            <p>{$t('subscribe.product.details.cancel.title')}</p>
        </Button>
    {/if}
{/if}

<ConfirmModal
    bind:showModal
    on:success={handleCancel}
>
    <Title title={$t('subscribe.product.details.cancel.title')} slot="header" />
    <p>{$t('subscribe.product.details.cancel.text')}</p>
</ConfirmModal>
