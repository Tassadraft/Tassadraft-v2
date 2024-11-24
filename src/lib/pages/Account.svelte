<script>
    import Menu from '../menu/Menu.svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';
    import { t } from 'svelte-i18n';
    import { currentAccount } from '../../stores/authStore';

    let subscriptionEndsOn = '';
    let subscriptionCreatedOn = '';

    $: if ($currentAccount?.subscription) {
        subscriptionEndsOn = new Date($currentAccount.subscription.endAt).toLocaleDateString();
        subscriptionCreatedOn = new Date($currentAccount.subscription.createdAt).toLocaleDateString();
    }
</script>

<Menu />

<Title title={$t('account.title')} />

<Form submittable={false}>
    <Input label={$t('common.username.label')} value={$currentAccount?.username || ''} disabled={true} />
    <Input label={$t('common.email.label')} value={$currentAccount?.email || ''} disabled={true} />
    {#if $currentAccount?.subscription}
        <Input label={$t('account.subscription')} value={$currentAccount.subscription.productName} disabled={true} />
        <Input label={$t('account.subscription-ends')} value={subscriptionEndsOn} disabled={true} />
        <Input label={$t('account.subscribed-on')} value={subscriptionCreatedOn} disabled={true} />
    {:else if $currentAccount?.role === 'user'}
        <Link href="/subscribe" target="_blank">{$t('account.subscribe')}</Link>
    {/if}
    <Link href="/reset-password" className="text-primary-500 hover:text-white duration-300 transition-colors">{$t('common.reset-password')}</Link>
</Form>
