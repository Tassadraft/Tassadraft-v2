<script>
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import { showToast } from '../../service/toastService.js';
    import axios from 'axios';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';
    import { navigate } from '../../stores/locationStore.js';
    import { updateProfile } from '../../stores/profileStore.js';
    import { t } from 'svelte-i18n';

    let email = '';
    let password = '';

    const handleSuccess = async (event) => {
        localStorage.setItem('apiToken', event.detail.token.token);
        localStorage.setItem('apiTokenExpiration', event.detail.token.expiresAt);
        axios.defaults.headers.common['Authorization'] = `Bearer ${event.detail.token.token}`;

        // Profile
        try {
            await updateProfile();
        } catch (e) {
            showToast($t('toast.profile.get.error'), 'error');
        }

        // Subscription
        try {
            await axios.get('/api/auth/reserved');
            localStorage.setItem('subscribed', 'true');
        } catch (error) {
            localStorage.setItem('subscribed', 'false');
        }
        showToast($t('toast.login.success'));
        navigate('/');
    };

    const handleFailure = () => {
        showToast($t('toast.login.error'), 'error');
    };
</script>

<Title title={$t('login.title')} />

<Form action="/api/login" method="post" on:success={handleSuccess} on:error={handleFailure}>
    <Input type="email" name="email" placeholder={$t('common.email.placeholder')} label={$t('common.email.label')} value={email} required={true} />
    <PasswordInput value={password} required={true} />
    <div class="w-full mb-3">
        <Link href="/reset-password" className="text-primary-500 hover:text-white duration-300 transition-colors">Forgot password ?</Link>
    </div>
</Form>
