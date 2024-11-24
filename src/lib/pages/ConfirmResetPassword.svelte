<script>
    import Form from '../shared/Form.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import Title from '../shared/Title.svelte';
    import Menu from '../menu/Menu.svelte';
    import { showToast } from '../../service/toastService.js';
    import { navigate } from 'svelte-routing';
    import { t } from 'svelte-i18n';

    export let token = '';

    let password = '';
    let confirmPassword = '';
    let canSubmit = false;
    let message = '';

    const checkPassword = () => {
        if (password !== confirmPassword) {
            return $t('reset-password.confirm.password.match');
        } else if (password.length < 8) {
            return $t('reset-password.confirm.password.length');
        } else if (!password.match(/[a-z]/)) {
            return $t('reset-password.confirm.password.lowercase');
        } else if (!password.match(/[A-Z]/)) {
            return $t('reset-password.confirm.password.uppercase');
        } else if (!password.match(/[0-9]/)) {
            return $t('reset-password.confirm.password.number');
        } else if (!password.match(/[^a-zA-Z0-9]/)) {
            return $t('reset-password.confirm.password.special-character');
        } else {
            return '';
        }
    };

    const handleSuccess = () => {
        showToast($t('reset-password.confirm.password.success'));
        navigate('/login');
    };

    const handleFailure = (response) => {
        showToast(response, 'error');
    };

    $: {
        message = checkPassword();
        canSubmit = password === confirmPassword && message === '';
    }
</script>

<Menu />

<Title title={$t('reset-password.confirm.title')} />

<Form action={`/api/reset-password/confirm/${token}`} method="POST" {handleSuccess} {handleFailure} bind:submittable={canSubmit}>
    <PasswordInput name="password" bind:value={password} />
    <PasswordInput name="confirmPassword" label={$t('common.confirm-password.label')} bind:value={confirmPassword} />
</Form>

{#if message}
    <p class="text-red-500 text-sm mt-2">{message}</p>
{/if}
