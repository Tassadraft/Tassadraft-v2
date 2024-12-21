<script>
    import Card from '../shared/Card.svelte';
    import Title from '../shared/Title.svelte';
    import { t } from 'svelte-i18n';

    let choices = [];

    $: choices = [
        {
            href: '/decks/new',
            title: $t('tassadecks.new.card.title'),
            icon: 'upload',
            description: $t('tassadecks.new.card.description'),
        },
        {
            href: '/decks/me',
            title: $t('tassadecks.my-decks.card.title'),
            icon: 'pen',
            description: $t('tassadecks.my-decks.card.description'),
        },
        {
            href: '/decks',
            title: $t('tassadecks.browse.card.title'),
            icon: 'search',
            description: $t('tassadecks.browse.card.description'),
        },
    ];
</script>

<Title title={$t('common.tassadecks')} hasBackground={true} />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
    {#each choices as choice}
        <Card title={choice.title} icon={choice.icon} href={choice.href} description={choice.description} />
    {/each}
</div>
