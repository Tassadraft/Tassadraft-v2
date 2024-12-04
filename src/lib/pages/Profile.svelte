<script>
    import Menu from '../menu/Menu.svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';
    import { profile, setProfile } from '../../stores/profileStore.js';
    import { showToast } from "../../service/toastService.js";
    import { t } from 'svelte-i18n';
    import { onMount } from "svelte";

    let subscriptionEndsOn = '';
    let subscriptionCreatedOn = '';
    let formValues = {
        username: '',
        email: '',
    };

    onMount(() => {
        formValues = {
            username: $profile?.username || '',
            email: $profile?.email || '',
        };
    });

    const handleSuccess = (data) => {
        setProfile(data.detail);
        showToast($t('toast.profile.update.success'));
    };

    const handleError = () => {
        showToast($t('toast.profile.update.error'), 'error');
        formValues = {
            username: $profile.username,
            email: $profile.email,
        };
    };

    $: if ($profile?.subscription) {
        subscriptionEndsOn = new Date($profile.subscription.endAt).toLocaleDateString();
        subscriptionCreatedOn = new Date($profile.subscription.createdAt).toLocaleDateString();
    }
</script>

<Menu/>

<Title title={$t('profile.title')}/>
<Form action="/api/auth/profile/update" method="POST" on:success={handleSuccess} on:error={handleError}>
    <Input name="username" placeholder={$t('common.username.label')} label={$t('common.username.label')}
           bind:value={formValues.username} min/>
    <Input name="email" placeholder={$t('common.email.label')} label={$t('common.email.label')}
           bind:value={formValues.email} disabled={true}/>
</Form>

{#if $profile?.subscription}
    <Form submittable={false}>
        <Input label={$t('profile.subscription')} value={$profile.subscription.productName} disabled={true}/>
        <Input label={$t('profile.subscription-ends')} value={subscriptionEndsOn} disabled={true}/>
        <Input label={$t('profile.subscribed-on')} value={subscriptionCreatedOn} disabled={true}/>
    </Form>
{:else if $profile?.role === 'user'}
    <Link href="/subscribe" target="_blank">{$t('profile.subscribe')}</Link>
{/if}
<Link href="/reset-password" className="text-primary-500 hover:text-white duration-300 transition-colors">{$t('common.reset-password')}</Link>
