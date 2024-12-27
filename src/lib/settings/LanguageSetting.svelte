<script>
    import FlagMenu from '../menu/FlagMenu.svelte';
    import { t } from 'svelte-i18n';
</script>

<div class="legend font-bold mt-3 mb-2">
    <p>{$t('common.language')}</p>
</div>
<FlagMenu />
