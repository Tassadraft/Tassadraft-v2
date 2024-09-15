<script>
    import Switch from '../../shared/Switch.svelte';
    import Button from '../../shared/Button.svelte';
    import Icon from '../../shared/Icon.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let card;
    export let currency;

    let displayFoil = false;
    card.displayedPrice = 0;

    $: {
        switch(displayFoil) {
            case true:
                if (!!card.price.usdFoil) {
                    card.displayedPrice = card.price.usdFoil;
                } else if (!!card.price.eurFoil) {
                    card.displayedPrice = card.price.eurFoil;
                } else {
                    card.displayedPrice = card.price.usd;
                    displayFoil = false;
                }
                break;
            case false:
                switch(currency) {
                    case 'usd':
                        card.displayedPrice = card.price.usd;
                        break;
                    case 'euro':
                        card.displayedPrice = card.price.eur;
                        break;
                }
                break;
        }
    }

    const handleDelete = () => {
        dispatch('delete', card);
    };
</script>

<tr class="h-10">
    <td class="tr-first text-left border-r border-primary-700">
        <p class="text-xs truncate">{card.translation.name}</p>
    </td>
    <td class="text-center border-r border-primary-700">
        <div class="mt-2">
            {#if !!card.price.usdFoil}
                <Switch size="4" bind:value={displayFoil} />
            {/if}
        </div>
    </td>
    <td class="text-center border-r border-primary-700">
        <p class="text-xs truncate">{card.displayedPrice}</p>
    </td>
    <td class="text-center">
        <Button additionalStyle="mt-2" on:click={handleDelete}>
            <Icon name="trash" />
        </Button>
    </td>
</tr>
