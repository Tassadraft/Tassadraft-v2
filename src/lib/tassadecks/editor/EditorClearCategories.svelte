<script>
    import Icon from '../../shared/Icon.svelte';
    import Button from '../../shared/Button.svelte';
    import { t } from 'svelte-i18n';
    import axios from '../../../axiosConfig.js';
    import { showToast } from '../../../service/toastService.js';
    import Modal from "../../shared/Modal.svelte";
    import Subtitle from "../../shared/Subtitle.svelte";

    export let deck;

    let showModal = false;

    const handleClear = async () => {
        try {
            const { data } = await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
                actionType: 'clearCategories',
            });
            deck = {...data.deck};
            showModal = false;
            showToast(`${deck.name} categories cleared`);
        } catch (e) {
            showToast(`Error while clearing ${deck.name} categories`, 'error');
        }
    };
</script>

<Button on:click={() => showModal = true}>
    <div class="flex flex-row gap-1">
        <Icon name="clear" />
        <p>{$t('tassadecks.editor.clear-categories.title')}</p>
    </div>
</Button>

<Modal bind:showModal successText={$t('common.yes')} closeText={$t('common.no')} on:success={handleClear}>
    <Subtitle slot="header">{$t('tassadecks.editor.clear-categories.title')}</Subtitle>
    <p class="text-black dark:text-white">{$t('tassadecks.editor.clear-categories.text')}</p>
</Modal>
