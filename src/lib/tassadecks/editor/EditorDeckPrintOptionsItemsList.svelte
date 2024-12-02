<script>
    import Switch from "../../shared/Switch.svelte";
    import EditorDeckPrintOptionsItem from "./EditorDeckPrintOptionsItem.svelte";

    export let list;
    export let disabled;
    export let label;
    export let switchValue;

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
        console.log('Updated list (decrement):', list);
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
        console.log('Updated list (increment):', list);
    };
</script>

<Switch size="5" bind:disabled={disabled} {label} bind:value={switchValue}/>

<div
    class="flex flex-col items-start gap-3 m-3 transition-all duration-300"
    style="overflow: hidden; max-height: {switchValue ? '1000px' : '0px'}; opacity: {switchValue ? '1' : '0'};"
>
    {#each list as item}
        <EditorDeckPrintOptionsItem bind:item on:decrement={handleDecrement} on:increment={handleIncrement}/>
    {/each}
</div>
