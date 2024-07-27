<script>
    import { onMount } from 'svelte';
    import { storeToast } from '../../service/toastService.js';

    onMount(() => {
        document.title = 'Logout';
        localStorage.removeItem('apiToken');
        localStorage.removeItem('subscribed');
        storeToast('Logged out', 'success');
        window.location.href = '/';
    });
</script>
