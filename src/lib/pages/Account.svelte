<script>
    import Menu from '../menu/Menu.svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';
    import { currentAccount, setCurrentAccount } from '../../stores/authStore';
    import { showToast } from "../../service/toastService.js";
    import { t } from 'svelte-i18n';
    import {onMount} from "svelte";

    let subscriptionEndsOn = '';
    let subscriptionCreatedOn = '';
    let formValues = {
        username: '',
        email: '',
    };

    onMount(() => {
        formValues = {
            username: $currentAccount?.username || '',
            email: $currentAccount?.email || '',
        };
    });

    const handleSuccess = (data) => {
        setCurrentAccount(data.detail);
        showToast($t('toast.account.update.success'));
    };

    const handleError = () => {
        showToast($t('toast.account.update.error'), 'error');
        formValues = {
            username: $currentAccount.username,
            email: $currentAccount.email,
        };
    };

    $: if ($currentAccount?.subscription) {
        subscriptionEndsOn = new Date($currentAccount.subscription.endAt).toLocaleDateString();
        subscriptionCreatedOn = new Date($currentAccount.subscription.createdAt).toLocaleDateString();
    }
</script>

<Menu/>

<Title title={$t('account.title')}/>
<Form action="/api/auth/account/update" method="POST" on:success={handleSuccess} on:error={handleError}>
    <Input name="username" placeholder={$t('common.username.label')} label={$t('common.username.label')}
           bind:value={formValues.username} min/>
    <Input name="email" placeholder={$t('common.email.label')} label={$t('common.email.label')}
           bind:value={formValues.email} disabled={true}/>
</Form>

{#if $currentAccount?.subscription}
    <Form submittable={false}>
        <Input label={$t('account.subscription')} value={$currentAccount.subscription.productName} disabled={true}/>
        <Input label={$t('account.subscription-ends')} value={subscriptionEndsOn} disabled={true}/>
        <Input label={$t('account.subscribed-on')} value={subscriptionCreatedOn} disabled={true}/>
    </Form>
{:else if $currentAccount?.role === 'user'}
    <Link href="/subscribe" target="_blank">{$t('account.subscribe')}</Link>
{/if}
<Link href="/reset-password" className="text-primary-500 hover:text-white duration-300 transition-colors">{$t('common.reset-password')}</Link>
