<script>
    import CardRow from './CardRow.svelte';

    export let cards = [];
    let currency;

    $: currency = localStorage.getItem('currency');
</script>

<div class="overflow-hidden rounded-lg border border-primary-700 mt-5">
    <table class="w-full">
        <thead>
            <tr class="h-10 border-b border-primary-700">
                <th class="tr-first text-left border-r border-primary-700">
                    <p class="text-sm truncate">Name</p>
                </th>
                <th class="text-center border-r border-primary-700">
                    <p class="text-sm truncate">Foil</p>
                </th>
                <th class="text-center">
                    <p class="text-sm truncate">Price</p>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each cards as card}
                <CardRow bind:card={card} bind:currency={currency} />
            {/each}
        </tbody>
    </table>
</div>
