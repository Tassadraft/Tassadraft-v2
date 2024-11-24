<script>
    import Menu from '../menu/Menu.svelte';
    import Title from '../shared/Title.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import { t } from 'svelte-i18n';
</script>

<Menu />
<Title title={$t('subscribe.title')} />
<Subtitle>{$t('common.coming-soon')}</Subtitle>
