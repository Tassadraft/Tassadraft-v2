<script>
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';
    import {profile, setProfile} from '../../stores/profileStore.js';
    import {showToast} from '../../services/toastService.js';
    import {t} from 'svelte-i18n';
    import {onMount} from 'svelte';
    import FileUpload from '../shared/FileUpload.svelte';
    import {language} from '../../stores/languageStore.js';
    import Icon from "../shared/Icon.svelte";

    let subscriptionEndsOn = '';
    let subscriptionCreatedOn = '';
    let formValues = {
        username: '',
        email: '',
    };
    let path = '';
    let isValid = false;

    let lastSubscriptionEndedAt;

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const lightDateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

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

    $: if ($profile?.activeSubscription) {
        subscriptionEndsOn = new Date($profile.activeSubscription.endAt).toLocaleDateString($language, lightDateOptions);
        subscriptionCreatedOn = new Date($profile.activeSubscription.createdAt).toLocaleDateString($language, lightDateOptions);
    }

    $: isValid = formValues.username && formValues.email;
    $: {
        if ($profile.lastSubscription) {
            lastSubscriptionEndedAt = new Date($profile.lastSubscription.endAt).toLocaleString($language, dateOptions);
        }
    }

    console.log($profile);
</script>

<Title title={$t('profile.title')} hasBackground={true}/>

<Form action="/api/auth/profile/update" method="POST" on:success={handleSuccess} on:error={handleError} bind:isValid>
    <Input
        name="username"
        placeholder={$t('common.username.label')}
        label={$t('common.username.label')}
        bind:value={formValues.username}
        min={3}
        max={50}
    />
    <Input name="email" placeholder={$t('common.email.label')} label={$t('common.email.label')}
           bind:value={formValues.email} disabled={true}/>
    <Link href="/reset-password" className="text-primary-500 hover:text-primary-800 transition-colors duration-300">
        {$t('profile.reset-password')}
    </Link>
    <FileUpload
        name="profilePicture"
        accept="png jpg gif jpeg webp"
        path={$profile.profilePicture?.path}
        fileName={$profile.profilePicture?.name}
        title={$t('profile.profile-picture.title')}
        description={$t('profile.profile-picture.description')}
    />
    {#if $profile?.activeSubscription}
        <Input label={$t('profile.subscription')} value={$profile.activeSubscription.product.translation.name} disabled={true}/>
        <Input label={$t('profile.subscription-ends')} value={subscriptionEndsOn} disabled={true}/>
        <Input label={$t('profile.subscribed-on')} value={subscriptionCreatedOn} disabled={true}/>
    {/if}
    <div slot="other-option">
        {#if !$profile?.activeSubscription && $profile?.role === 'user'}
            <Link
                href="/subscribe"
                className="inline-flex justify-center bg-green-700 hover:bg-green-800 transition-all duration-300 py-2 px-4 rounded-xl text-2xl font-bold"
            >
                <div class="inline-block">
                    <div class="flex flex-row gap-1 items-center">
                        <p class="text-white">{$t('profile.subscribe')}</p>
                        <div class="text-primary-500">
                            <Icon name="arrowRight"/>
                        </div>
                    </div>
                </div>
            </Link>
        {:else}
            <Link
                href={`/subscribe/product/${$profile.activeSubscription.product.translation.stripePriceId}`}
                className="inline-flex justify-center bg-green-700 hover:bg-green-800 transition-all duration-300 py-2 px-4 rounded-xl text-2xl font-bold"
            >
                <div class="inline-block">
                    <div class="flex flex-row gap-1 items-center">
                        <p class="text-white">{$t('common.view-product')}</p>
                        <div class="text-primary-500">
                            <Icon name="arrowRight"/>
                        </div>
                    </div>
                </div>
            </Link>
        {/if}
    </div>
</Form>
