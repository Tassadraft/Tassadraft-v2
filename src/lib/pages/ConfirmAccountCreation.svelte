<script>
    import Title from '../shared/Title.svelte';
    import { t } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { showToast } from '../../services/toastService.js';
    import { navigate } from '../../stores/locationStore.js';
    import { updateProfile } from '../../stores/profileStore.js';

    export let token = '';

    onMount(async () => {
        try {
            const { data } = await axios.get(`/api/account-creation/confirm/${token}`);
            localStorage.setItem('apiToken', data.token.token);
            localStorage.setItem('apiTokenExpiration', data.token.expiresAt);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token.token}`;

            await updateProfile(data.user);

            // Subscription
            try {
                await axios.get('/api/auth/reserved');
                localStorage.setItem('subscribed', 'true');
            } catch (error) {
                localStorage.setItem('subscribed', 'false');
            }
        } catch (e) {
            showToast($t('toast.create-account.confirm.error'), 'error');
        } finally {
            showToast($t('toast.create-account.confirm.success'));
            navigate('/');
        }
    });
</script>

<meta name="robots" content="noindex" />

<Title title={$t('create-account.confirm.title')} hasBackground={true} />
