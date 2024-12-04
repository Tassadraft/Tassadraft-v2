<script>
    import { showToast } from '../../service/toastService.js';
    import { navigate } from 'svelte-routing';
    import { clearProfile } from '../../stores/profileStore.js';
    import Subtitle from "../shared/Subtitle.svelte";
    import { t } from 'svelte-i18n';
    import Menu from "../menu/Menu.svelte";
    import Title from "../shared/Title.svelte";
    import ConfirmModal from "../shared/ConfirmModal.svelte";

    let showModal = true;

    const handleSuccess = () => {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('subscribed');
        clearProfile();
        showToast('Logged out', 'success');
        navigate('/login');
    };

    const handleClose = () => {
        navigate('/');
    };
</script>

<Menu />
<Title title={$t('logout.title')} />
<ConfirmModal bind:showModal on:success={handleSuccess} on:close={handleClose}>
    <Subtitle slot="header">{$t('logout.modal.title')}</Subtitle>
    <p class="text-black dark:text-white">{$t('logout.modal.text')}</p>
</ConfirmModal>
