<script>
    import Title from '../shared/Title.svelte';
    import Menu from '../menu/Menu.svelte';
    import DeckForm from './DeckForm.svelte';
    import { t } from 'svelte-i18n';
</script>

<Menu />
<Title title={$t('tassadecks.new.title')} />

<DeckForm scratch={false} />
