<script>
    import Title from '../shared/Title.svelte';
    import { t } from 'svelte-i18n';
    import { onMount } from "svelte";
    import axios from 'axios';
    import { showToast } from "../../services/toastService.js";
    import { navigate } from '../../stores/locationStore.js';

    export let token = '';

    onMount(async () => {
       try {
           await axios.get(`/api/account-creation/confirm/${token}`);
       } catch (e) {
           showToast($t('toast.create-account.confirm.error'), 'error');
       } finally {
           showToast($t('toast.create-account.confirm.success'));
           navigate('/');
       }
    });


</script>

<Title title={$t('create-account.confirm.title')} hasBackground={true} />
