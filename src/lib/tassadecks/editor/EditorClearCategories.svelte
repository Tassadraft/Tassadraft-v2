<script>
    import Icon from '../../shared/Icon.svelte';
    import Button from '../../shared/Button.svelte';
    import { t } from 'svelte-i18n';
    import axios from 'axios';
    import { showToast } from '../../../service/toastService.js';
    import Subtitle from '../../shared/Subtitle.svelte';
    import ConfirmModal from '../../shared/ConfirmModal.svelte';

    export let deck;

    let showModal = false;

    const handleClear = async () => {
        try {
            const { data } = await axios.delete(`/api/auth/reserved/decks/edit/${deck.id}/clear-categories`);
            deck = { ...data.deck };
            showModal = false;
            showToast(`${deck.name} categories cleared`);
        } catch (e) {
            showToast(`Error while clearing ${deck.name} categories`, 'error');
        }
    };
</script>

<Button on:click={() => (showModal = true)}>
    <div class="flex flex-row gap-1">
        <Icon name="clear" />
        <p>{$t('tassadecks.editor.clear-categories.title')}</p>
    </div>
</Button>

<ConfirmModal bind:showModal on:success={handleClear}>
    <Subtitle slot="header">{$t('tassadecks.editor.clear-categories.title')}</Subtitle>
    <p>{$t('tassadecks.editor.clear-categories.text')}</p>
</ConfirmModal>
