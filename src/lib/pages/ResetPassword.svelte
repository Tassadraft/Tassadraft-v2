<script>
    import Title from '../shared/Title.svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import { onMount } from 'svelte';
    import axios from '../../axiosConfig.js';
    import Menu from '../menu/Menu.svelte';
    import { showToast } from '../../service/toastService.js';
    import { t } from 'svelte-i18n';

    let email = '';
    let readonly = false;

    onMount(async () => {
        if (localStorage.getItem('apiToken')) {
            try {
                const { data } = await axios.get('/api/auth/get-email');
                email = data.email;
                readonly = true;
            } catch (error) {
                console.error(error);
            }
        }
    });

    const handleSuccess = () => {
        showToast($t('toast.reset-password.mail.success'));
    };

    const handleFailure = () => {
        showToast($t('toast.reset-password.mail.error'), 'error');
    };
</script>

<Menu />

<Title title={$t('reset-password.title')} />

<Form action="/api/reset-password/send-mail" method="POST" on:success={handleSuccess} on:error={handleFailure}>
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
