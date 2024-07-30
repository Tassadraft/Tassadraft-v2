<script>
    import Switch from '../../shared/Switch.svelte';

    export let card;
    export let currency;
    let displayFoil = false;
    let displayedPrice = 0;

    $: {
        switch(displayFoil) {
            case true:
                if (!!card.price.usdFoil) {
                    displayedPrice = card.price.usdFoil;
                } else if (!!card.price.eurFoil) {
                    displayedPrice = card.price.eurFoil;
                } else {
                    displayedPrice = card.price.usd;
                    displayFoil = false;
                }
                break;
            case false:
                switch(currency) {
                    case 'usd':
                        displayedPrice = card.price.usd;
                        break;
                    case 'euro':
                        displayedPrice = card.price.eur;
                        break;
                }
                break;
        }
    }
</script>

<tr class="h-10">
    <td class="tr-first text-left border-r border-primary-700">
        <p class="text-xs truncate">{card.name}</p>
    </td>
    <td class="text-center border-r border-primary-700">
        <div class="mt-2">
            <Switch size="4" bind:value={displayFoil} />
        </div>
    </td>
    <td class="text-center">
        <p class="text-xs truncate">{displayedPrice}</p>
    </td>
</tr>
