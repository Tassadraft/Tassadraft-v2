<script>
    import { onMount } from 'svelte';
    import { showToast } from '../../service/toastService.js';
    import { navigate } from 'svelte-routing';
    import { clearCurrentAccount } from '../../stores/authStore.js';

    onMount(() => {
        document.title = 'Logout';
        localStorage.removeItem('apiToken');
        localStorage.removeItem('subscribed');
        clearCurrentAccount();
        showToast('Logged out', 'success');
        navigate('/login');
    });
</script>
