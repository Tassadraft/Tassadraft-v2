<script>
    import { showToast } from '../../services/toastService.js';
    import { navigate } from '../../stores/locationStore.js';
    import { clearProfile } from '../../stores/profileStore.js';
    import Subtitle from '../shared/Subtitle.svelte';
    import { t } from 'svelte-i18n';
    import Title from '../shared/Title.svelte';
    import ConfirmModal from '../shared/ConfirmModal.svelte';
    import axios from 'axios';

    let showModal = true;

    const handleSuccess = async () => {
        try {
            await axios.get('/api/auth/logout');
            localStorage.removeItem('apiToken');
            localStorage.removeItem('subscribed');
            clearProfile();
        } catch (error) {
            showToast($t('toast.logout.error'), 'error');
            navigate('/');
        } finally {
            showToast($t('toast.logout.success'));
            navigate('/login');
        }
    };

    const handleClose = () => {
        navigate('/');
    };
</script>

<Title title={$t('logout.title')} />

<ConfirmModal bind:showModal on:success={handleSuccess} on:close={handleClose}>
    <Subtitle slot="header">{$t('logout.modal.title')}</Subtitle>
    <p>{$t('logout.modal.text')}</p>
</ConfirmModal>
