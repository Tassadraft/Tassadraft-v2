<script>
    import Icon from '../shared/Icon.svelte';
    import Button from '../shared/Button.svelte';
    import { t } from 'svelte-i18n';
    import Subtitle from '../shared/Subtitle.svelte';
    import Modal from '../shared/Modal.svelte';
    import Input from '../shared/Input.svelte';
    import Form from '../shared/Form.svelte';
    import { showToast } from '../../service/toastService.js';

    export let deck;

    let showModal = false;
    let newName = '';
    let inputRef;

    const handleOpen = () => {
        newName = '';
        showModal = true;
    };

    const onModalOpen = () => {
        if (inputRef) {
            inputRef.focus();
        }
    };

    const handleSuccess = (event) => {
        showToast($t('toast.editor.add-category.success'));
        console.log(deck.categories[0]);
        console.log(event.detail);
        deck = { ...deck, categories: [...deck.categories, event.detail.category] };
        deck.categories.sort((a, b) => {
            if (a.category.name === 'Commander' || b.category.name === 'Commander') {
                return -1;
            }
            return a.category.name.localeCompare(b.category.name);
        });
        showModal = false;
    };

    const handleError = () => {
        showToast($t('toast.editor.add-category.error', 'error'));
    };
</script>

<Button on:click={handleOpen}>
    <div class="flex flex-row gap-1">
        <Icon name="plus" />
        <p>{$t('tassadecks.editor.new-category.title')}</p>
    </div>
</Button>

<Modal bind:showModal fullWidth={true} on:open={onModalOpen}>
    <Subtitle slot="header">{$t('tassadecks.editor.new-category.title')}</Subtitle>
    <Form action={`/api/auth/reserved/decks/edit/${deck.id}`} method="POST" on:success={handleSuccess} on:error={handleError}>
        <input type="hidden" name="actionType" value="addCategory" />
        <Input
            bind:inputRef
            name="name"
            label={$t('tassadecks.editor.new-category.label')}
            placeholder={$t('tassadecks.editor.new-category.placeholder')}
            bind:value={newName}
        />
    </Form>
</Modal>
