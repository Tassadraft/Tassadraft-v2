<script>
    import Modal from './Modal.svelte';
    import { t } from 'svelte-i18n';

    export let showModal;
    export let closable = true;
    export let fullWidth = false;
</script>

<Modal bind:showModal successText={$t('common.yes')} closeText={$t('common.no')} {closable} confirm={true} {fullWidth} on:success on:close>
    <slot name="header" slot="header" />
    <slot />
</Modal>
