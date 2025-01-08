<script>
    import Title from '../shared/Title.svelte';
    import DeckForm from './DeckForm.svelte';
    import { t } from 'svelte-i18n';
    import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags description={$t('tassadecks.new.meta-description')} />

<Title title={$t('tassadecks.new.title')} hasBackground={true} />

<DeckForm />
