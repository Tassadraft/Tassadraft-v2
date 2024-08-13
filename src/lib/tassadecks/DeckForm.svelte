<script>
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Switch from '../shared/Switch.svelte';
    import FileUpload from '../shared/FileUpload.svelte';
    import { showToast } from '../../service/toastService.js';

    export let scratch = true;

    export let deck = {
        id: -1,
        name: '',
        description: '',
        public: false,
        enabled: false
    };

    const handleSuccess = (response) => {
        showToast(response.message, 'success');
        window.location = `/decks/edit/${response.deckId}`;
    };

    const handleError = (error) => {
        showToast(error, 'error');
    };
</script>

<Form method="POST" action={deck.id > 0 ? `/api/auth/reserved/decks/edit/${deck.id}` : '/api/auth/reserved/decks/new'} {handleSuccess} {handleError}>
    {#if deck.name}
        <input type="hidden" name="deckId" value={deck.id} />
    {/if}
    <Input label="Name" type="text" name="name" bind:value={deck.name} required={true} />
    <Input label="Description" type="text" name="description" bind:value={deck.description} required={true} />
    <Switch size="6" name="public" bind:value={deck.public} label="Public" />
    <div class="mt-3 mb-3">
        <Switch size="6" name="enabled" bind:value={deck.enabled} label="Enabled" />
    </div>
    {#if !scratch}
        <FileUpload name="file" title="Import deck list file" accept="txt" />
    {/if}
</Form>
