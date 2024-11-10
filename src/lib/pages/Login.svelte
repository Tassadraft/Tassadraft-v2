<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import { showToast, storeToast } from '../../service/toastService.js';
    import axios from '../../axiosConfig.js';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';

    onMount(() => {
        if (localStorage.getItem('apiToken')) {
            storeToast('You are already logged in', 'warning');
            window.location.href = '/';
        }
    });

    let email = '';
    let password = '';

    const handleSuccess = async (response) => {
        localStorage.setItem('apiToken', response.token.token);
        localStorage.setItem('apiTokenExpiration', response.token.expiresAt);
        try {
            await axios.get('/api/auth/reserved');
            localStorage.setItem('subscribed', 'true');
        } catch (error) {
            localStorage.setItem('subscribed', 'false');
        }
        storeToast('You are now logged in');
        window.location.href = '/';
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
