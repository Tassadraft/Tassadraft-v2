<script>
    import Card from '../shared/Card.svelte';
    import Menu from '../menu/Menu.svelte';
    import Title from '../shared/Title.svelte';

    const choices = [
        {
            href: '/decks/new',
            title: 'New deck',
            icon: 'upload',
            description: 'Create a new deck from zero or by importing a file',
        },
        {
            href: '/decks/me',
            title: 'Edit a deck',
            icon: 'pen',
            description: 'Edit one of your decks, or one shared with you',
        },
        {
            href: '/decks',
            title: 'Browse all decks',
            icon: 'search',
            description: 'Browse all public, shared with you, and your decks',
        },
    ];
</script>

<Menu />
<Title title="Tassadecks" />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
    {#each choices as choice}
        <Card title={choice.title} icon={choice.icon} href={choice.href} description={choice.description} />
    {/each}
</div>
