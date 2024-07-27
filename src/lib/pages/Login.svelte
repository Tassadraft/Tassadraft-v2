<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import PasswordInput from '../shared/PasswordInput.svelte';
    import { showToast, storeToast } from '../../service/toastService.js';
    import axios from '../../axiosConfig.js';

    onMount(() => {
        document.title = 'Login';
        if (localStorage.getItem('apiToken')) {
            storeToast('You are already logged in', 'warning');
            window.location.href = '/';
        }
    });

    let email = '';
    let password = '';

    const handleSuccess = async (response) => {
        localStorage.setItem('apiToken', response.token);
        try {
            await axios.get('/api/auth/reserved');
            localStorage.setItem('subscribed', 'true');
        } catch (error) {
            localStorage.setItem('subscribed', 'false');
        }
        storeToast('You are now logged in');
        window.location.href = '/';
    }

    const handleFailure = (response) => {
        showToast(response, 'error')
    }
</script>

<div class="flex justify-start">
    <div class="mt-3">
        <Menu />
    </div>
</div>

<Form action="/api/login" method="post" handleSuccess={handleSuccess} handleFailure={handleFailure}>
    <Input type="email" name="email" placeholder="jean.dupont@gmail.com" label="Email" value={email} required={true} />
    <PasswordInput value={password} required={true} />
</Form>
