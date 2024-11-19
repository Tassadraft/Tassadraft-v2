<script>
    import Switch from '../../shared/Switch.svelte';
    import Button from '../../shared/Button.svelte';
    import Icon from '../../shared/Icon.svelte';
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    export let card;
    export let currency;

    let displayFoil = false;
    let svgContent = '';
    card.displayedPrice = 0;

    onMount(async () => {
        try {
            const response = await fetch(card.set.iconSvgUri);
            if (!response.ok) throw new Error('Failed to fetch SVG');
            let rawSvg = await response.text();

            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(rawSvg, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            if (svgElement) {
                svgElement.querySelectorAll('*').forEach((el) => {
                    el.removeAttribute('fill');
                    el.removeAttribute('stroke');
                    el.removeAttribute('fill-rule');
                });

                svgContent = new XMLSerializer().serializeToString(svgElement);
            } else {
                svgContent = rawSvg;
            }
        } catch (error) {
            console.error('Error loading SVG:', error);
        }

        updateDisplayedPrice();
    });

    const updateDisplayedPrice = () => {
        if (displayFoil) {
            if (card.price.usdFoil) {
                card.displayedPrice = card.price.usdFoil;
            } else if (card.price.eurFoil) {
                card.displayedPrice = card.price.eurFoil;
            } else {
                card.displayedPrice = card.price.usd;
                displayFoil = false;
            }
        } else {
            switch (currency) {
                case 'usd':
                    card.displayedPrice = card.price.usd;
                    break;
                case 'euro':
                    card.displayedPrice = card.price.eur;
                    break;
            }
        }
    };

    const handleDelete = () => {
        dispatch('delete', card);
    };
</script>

<tr class="h-10">
    <td class="tr-first text-center border-r border-primary-700">
        <p class="text-xs truncate">{card.translation.name}</p>
    </td>
    <td class="text-center border-r border-primary-700">
        {#if svgContent}
            <div
                class="text-primary-500 fill-current max-h-7 w-auto flex justify-center items-center overflow-visible"
                aria-label={card.set.name}
                title={card.set.name}
                style="max-height: 1.75rem;"
            >
                {@html svgContent}
            </div>
        {/if}
    </td>
    <td class="text-center border-r border-primary-700">
        <div class="mt-2">
            {#if !!card.price.usdFoil}
                <Switch size="4" bind:value={displayFoil} on:change={updateDisplayedPrice} />
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
