<script>
    import Title from '../shared/Title.svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import { onMount } from 'svelte';
    import { showToast } from '../../services/toastService.js';
    import { t } from 'svelte-i18n';
    import { profile } from '../../stores/profileStore.js';
    import { isValidEmail } from '../../services/checkStringService.js';

    let email = '';
    let readonly = false;
    let isValid = false;

    onMount(async () => {
        if ($profile && $profile.email) {
            email = $profile.email;
            readonly = true;
        }
    });

    const handleSuccess = () => {
        showToast($t('toast.reset-password.mail.success'));
    };

    const handleFailure = () => {
        showToast($t('toast.reset-password.mail.error'), 'error');
    };

    $: isValid = email && isValidEmail(email);
</script>

<Title title={$t('reset-password.title')} hasBackground={true} />

<Form action="/api/reset-password/send-mail" method="POST" on:success={handleSuccess} on:error={handleFailure} bind:isValid>
    <input type="hidden" name="frontUri" value={`${process.env.VITE_FRONT_URI}/reset-password/confirm`} />
    <Input
        label={$t('common.email.label')}
        placeholder={$t('common.email.placeholder')}
        type="email"
        name="email"
        bind:value={email}
        required={true}
        {readonly}
    />
</Form>
