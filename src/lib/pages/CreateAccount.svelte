<script>
    import Form from '../shared/Form.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import Title from '../shared/Title.svelte';
    import { showToast } from '../../services/toastService.js';
    import { t } from 'svelte-i18n';
    import Input from "../shared/Input.svelte";
    import {checkPassword, isValidEmail} from "../../services/checkStringService.js";
    import Switch from "../shared/Switch.svelte";

    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let consent = false;

    let canSubmit = false;
    let message = '';

    const handleSuccess = () => {
        showToast($t('toast.create-account.send-mail.success'));
    };

    const handleFailure = () => {
        showToast($t('toast.create-account.send-mail.error'), 'error');
    };

    $: {
        if (username && email && isValidEmail(email) && password && confirmPassword && consent) {
            message = $t(checkPassword(password, confirmPassword));
            canSubmit = password === confirmPassword && !message;
        }
    }
</script>

<Title title={$t('create-account.title')} hasBackground={true} />

<Form action="/api/account-creation/send-mail" method="POST" on:success={handleSuccess} on:error={handleFailure} bind:isValid={canSubmit}>
    <input type="hidden" name="frontClient" value="Tassadraft" />
    <input type="hidden" name="frontUri" value={`${process.env.VITE_FRONT_URI}/create-account/confirm`} />
    <Input name="username" placeholder={$t('common.username.placeholder')} label={$t('common.username.label')} bind:value={username} required={true} />
    <Input type="email" name="email" placeholder={$t('common.email.placeholder')} label={$t('common.email.label')} bind:value={email} required={true} />
    <PasswordInput name="password" bind:value={password} />
    <PasswordInput name="confirmPassword" label={$t('common.confirm-password.label')} bind:value={confirmPassword} />
    <Switch name="consent" size="6" label={$t('create-account.consent')} bind:value={consent} required={true} />
</Form>

{#if message}
    <p class="text-red-500 text-sm mt-2">{message}</p>
{/if}
