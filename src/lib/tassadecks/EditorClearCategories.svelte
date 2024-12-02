<script>
    import Icon from '../shared/Icon.svelte';
    import Button from '../shared/Button.svelte';
    import { t } from 'svelte-i18n';
    import axios from '../../axiosConfig.js';
    import { showToast } from '../../service/toastService.js';

    export let deck;

    const handleClear = async () => {};
</script>

<Button on:click={handleClear}>
    <div class="flex flex-row gap-1">
        <Icon name="clear" />
        <p>{$t('tassadecks.editor.clear-categories')}</p>
    </div>
</Button>
