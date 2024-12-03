<script>
    import Switch from '../../shared/Switch.svelte';
    import EditorDeckPrintOptionsItem from './EditorDeckPrintOptionsItem.svelte';
    import Popover from '../../shared/Popover.svelte';

    export let list;
    export let disabled;
    export let label;
    export let switchValue;

    let showPopover = false;
    let popoverTarget;
    let currentItem;

    const handleDecrement = (event) => {
        list = list.map((item) => {
            if (item.related.print.oracleId === event.detail.related.print.oracleId) {
                return {
                    ...item,
                    quantity: Math.max(0, item.quantity - 1), // Prevent below zero
                };
            }
            return item;
        });
    };

    const handleIncrement = (event) => {
        list = list.map((item) => {
            if (item.related.print.oracleId === event.detail.related.print.oracleId) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
    };

    const handleMouseEnterItem = (event) => {
        popoverTarget = event.detail.ref;
        currentItem = event.detail.item;
        showPopover = true;
    };

    const handleMouseLeaveItem = () => {
        showPopover = false;
        popoverTarget = undefined;
        currentItem = undefined;
    };
</script>

<Switch size="5" bind:disabled {label} bind:value={switchValue} />

<div
    class="flex flex-col items-start gap-3 m-3 transition-all duration-300"
    style="overflow: hidden; max-height: {switchValue ? '1000px' : '0px'}; opacity: {switchValue ? '1' : '0'};"
>
    {#each list as item}
        <EditorDeckPrintOptionsItem
            bind:item
            on:decrement={handleDecrement}
            on:increment={handleIncrement}
            on:mouseenter={handleMouseEnterItem}
            on:mouseleave={handleMouseLeaveItem}
        />
    {/each}
</div>

<Popover target={popoverTarget} show={showPopover}>
    <div class="flex flex-row gap-3 justify-center">
        {#if currentItem.related.print.layout !== 'flip' && currentItem.related.print.faces.length > 1}
            {#each currentItem.related.print.faces as face}
                <img class="w-64 rounded-lg" src={face.imageUri.normal} alt={face.translation.name} />
            {/each}
        {:else}
            <img class="w-64 rounded-lg" src={currentItem.related.print.imageUri.normal} alt={currentItem.related.print.translation.name} />
        {/if}
    </div>
</Popover>
