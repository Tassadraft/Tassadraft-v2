<script>
    import Form from '../shared/Form.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import Title from '../shared/Title.svelte';
    import Menu from '../menu/Menu.svelte';
    import { showToast } from '../../service/toastService.js';
    import { navigate } from '../../stores/locationStore.js';
    import { t } from 'svelte-i18n';
    import Input from "../shared/Input.svelte";
    import { checkPassword } from "../../service/checkStringService.js";

    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';

    let canSubmit = false;
    let message = '';

    const handleSuccess = () => {
        showToast($t('toast.create-account.send-mail.success'));
        navigate('/login');
    };

    const handleFailure = () => {
        showToast($t('toast.create-account.send-mail.error', 'error'));
    };

    $: {
        if (password && confirmPassword) {
            message = $t(checkPassword(password, confirmPassword));
            canSubmit = password === confirmPassword && message === '';
        }
    }
</script>

<Menu />

<Title title={$t('create-account.title')} />

<Form action="/api/account-creation/send-mail" method="POST" on:success={handleSuccess} on:error={handleFailure} bind:submittable={canSubmit}>
    <input type="hidden" name="frontClient" value="Tassadraft" />
    <input type="hidden" name="frontUri" value={`${process.env.VITE_FRONT_URI}/create-account/confirm`} />
    <Input name="username" placeholder={$t('common.username.placeholder')} label={$t('common.username.label')} value={username} required={true} />
    <Input type="email" name="email" placeholder={$t('common.email.placeholder')} label={$t('common.email.label')} value={email} required={true} />
    <PasswordInput name="password" bind:value={password} />
    <PasswordInput name="confirmPassword" label={$t('common.confirm-password.label')} bind:value={confirmPassword} />
</Form>

{#if message}
    <p class="text-red-500 text-sm mt-2">{message}</p>
{/if}
