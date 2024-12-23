<script>
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';
    import { profile, setProfile } from '../../stores/profileStore.js';
    import { showToast } from '../../services/toastService.js';
    import { t } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import FileUpload from '../shared/FileUpload.svelte';

    let subscriptionEndsOn = '';
    let subscriptionCreatedOn = '';
    let formValues = {
        username: '',
        email: '',
    };
    let path = '';
    let isValid = false;

    onMount(() => {
        formValues = {
            username: $profile?.username || '',
            email: $profile?.email || '',
        };

        if ($profile.profilePicture) {
            path = `/api/auth/profile/profile-picture/${$profile.profilePicture?.name}`;
        }
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

    $: isValid = formValues.username && formValues.email;
</script>

<Title title={$t('profile.title')} hasBackground={true} />

<Form action="/api/auth/profile/update" method="POST" on:success={handleSuccess} on:error={handleError} bind:isValid>
    <Input name="username" placeholder={$t('common.username.label')} label={$t('common.username.label')} bind:value={formValues.username} min={3} max={50} />
    <Input name="email" placeholder={$t('common.email.label')} label={$t('common.email.label')} bind:value={formValues.email} disabled={true} />
    <Link href="/reset-password" className="text-primary-500 hover:text-primary-800 transition-colors duration-300">{$t('profile.reset-password')}</Link>
    <FileUpload
        name="profilePicture"
        accept="png jpg gif jpeg webp"
        path={$profile.profilePicture?.path}
        fileName={$profile.profilePicture?.name}
        title={$t('profile.profile-picture.title')}
        description={$t('profile.profile-picture.description')}
    />
</Form>

{#if $profile?.subscription}
    <Form submittable={false}>
        <Input label={$t('profile.subscription')} value={$profile.subscription.productName} disabled={true} />
        <Input label={$t('profile.subscription-ends')} value={subscriptionEndsOn} disabled={true} />
        <Input label={$t('profile.subscribed-on')} value={subscriptionCreatedOn} disabled={true} />
    </Form>
{:else if $profile?.role === 'user'}
    <Link href="/subscribe" target="_blank">{$t('profile.subscribe')}</Link>
{/if}
<Link href="/reset-password" className="text-primary-500 hover:text-white duration-300 transition-colors">{$t('common.reset-password')}</Link>
