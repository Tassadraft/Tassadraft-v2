<script>
    import Title from '../shared/Title.svelte';
    import DeckForm from './DeckForm.svelte';
    import { t } from 'svelte-i18n';
</script>

<Title title={$t('tassadecks.new.title')} hasBackground={true} />

<DeckForm scratch={false} />
