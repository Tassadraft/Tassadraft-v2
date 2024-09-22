<script>
  import Title from '../shared/Title.svelte';
  import Menu from '../menu/Menu.svelte';
  import Card from '../shared/Card.svelte';
</script>

<Menu />
<Title title="New Deck" />

<div class="grid grid-cols-1 gap-4 p-5">
  <Card
    title="Create from scratch"
    icon="lego"
    href="/decks/new/scratch"
    description="Create deck from zero"
  />
  <Card
    title="Create from file"
    icon="upload"
    href="/decks/new/upload"
    description="Create deck from file"
  />
</div>
