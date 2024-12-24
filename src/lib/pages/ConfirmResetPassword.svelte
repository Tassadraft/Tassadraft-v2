<script>
    import Form from '../shared/Form.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import Title from '../shared/Title.svelte';
    import { showToast } from '../../services/toastService.js';
    import { navigate } from '../../stores/locationStore.js';
    import { t } from 'svelte-i18n';
    import { checkPassword } from '../../services/checkStringService.js';
    import { profile } from '../../stores/profileStore.js';

    export let token = '';

    let password = '';
    let confirmPassword = '';
    let canSubmit = false;
    let message = '';

    const handleSuccess = () => {
        showToast($t('toast.reset-password.confirm.success'));
        if (!$profile) {
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    const handleFailure = () => {
        showToast($t('toast.reset-password.confirm.error', 'error'));
    };

    $: {
        if (password && confirmPassword) {
            message = $t(checkPassword(password, confirmPassword));
            canSubmit = password === confirmPassword && message === '';
        }
    }
</script>

<Title title={$t('reset-password.confirm.title')} hasBackground={true} />

<Form action={`/api/reset-password/confirm/${token}`} method="POST" on:success={handleSuccess} on:error={handleFailure} bind:isValid={canSubmit}>
    <PasswordInput name="password" bind:value={password} />
    <PasswordInput name="confirmPassword" label={$t('common.confirm-password.label')} bind:value={confirmPassword} />
</Form>

{#if message}
    <p class="text-red-500 text-sm mt-2">{message}</p>
{/if}
