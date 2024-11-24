<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import { showToast } from '../../service/toastService.js';
    import axios from '../../axiosConfig.js';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';
    import { navigate } from 'svelte-routing';
    import { updateAccount } from '../../stores/authStore.js';
    import { t } from 'svelte-i18n';

    onMount(() => {
        if (localStorage.getItem('apiToken')) {
            showToast('You are already logged in', 'warning');
            navigate('/');
        }
    });

    let email = '';
    let password = '';

    const handleSuccess = async (response) => {
        localStorage.setItem('apiToken', response.token.token);
        localStorage.setItem('apiTokenExpiration', response.token.expiresAt);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.token.token}`;

        // Account
        try {
            await updateAccount();
        } catch (e) {
            showToast($t('toast.account.error'));
        }

        // Subscription
        try {
            await axios.get('/api/auth/reserved');
            localStorage.setItem('subscribed', 'true');
        } catch (error) {
            localStorage.setItem('subscribed', 'false');
        }
        showToast('You are now logged in');
        navigate('/');
    };

    const handleFailure = (response) => {
        showToast(response, 'error');
    };
</script>

<Menu />

<Title title="Login" />

<Form action="/api/login" method="post" {handleSuccess} {handleFailure}>
    <Input type="email" name="email" placeholder="jean.dupont@gmail.com" label="Email" value={email} required={true} />
    <PasswordInput value={password} required={true} />
    <div class="w-full mb-3">
        <Link href="/reset-password" className="text-primary-500 hover:text-white duration-300 transition-colors">Forgot password ?</Link>
    </div>
</Form>
