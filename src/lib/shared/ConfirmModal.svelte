<script>
    import Modal from './Modal.svelte';
    import { t } from 'svelte-i18n';

    export let showModal;
</script>

<Modal bind:showModal successText={$t('common.yes')} closeText={$t('common.no')} confirm={true} on:success on:close>
    <slot name="header" slot="header" />
    <slot />
</Modal>
