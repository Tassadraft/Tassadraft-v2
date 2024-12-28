<script>
    import Modal from './Modal.svelte';
    import { t } from 'svelte-i18n';

    export let showModal;
    export let closable = true;
    export let fullWidth = false;
    export let successText = $t('common.yes');
    let containerRef = null;

    const handleOpen = () => {
        if (containerRef) {
            containerRef.scrollTo({
                top: 0,
            });
        }
    };
</script>

<Modal
    bind:showModal
    {successText}
    closeText={$t('common.no')}
    {closable}
    confirm={true}
    {fullWidth}
    on:open={handleOpen}
    on:success
    on:close
    bind:dialog={containerRef}
>
    <slot name="header" slot="header" />
    <slot />
</Modal>
