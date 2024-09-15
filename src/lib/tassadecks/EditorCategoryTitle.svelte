<script>
    import IconButton from "../shared/IconButton.svelte";
    import Subtitle from "../shared/Subtitle.svelte";

    export let categoryObject;
    export let canEdit = true;

    let editing = false;
    let icon = 'pen';
    let subTitleClassName = '';
    let inputElement;

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            editing = false;
        }
    };

    $: icon = editing ? 'check' : 'pen';
    $: if (editing && inputElement) {
        inputElement.focus();
    }
</script>

<Subtitle style="z-index: 3000" bind:className={subTitleClassName}>
    <div class="flex flex-row">
        {#if editing}
            <input
                bind:this={inputElement}
                class="bg-transparent border-none mb-2.5 w-3/4 {subTitleClassName}"
                type="text" bind:value={categoryObject.category.name}
                on:keydown={handleKeyDown}
                on:blur={() => editing = false}
            />
        {:else}
            <span class="w-3/4">{categoryObject.category.name} ({categoryObject.cards.reduce((acc, cur) => acc + cur.quantity, 0)})</span>
        {/if}
        {#if canEdit}
            <div class="mt-0.5 ml-1">
                <IconButton bind:icon on:click={() => editing = !editing} />
            </div>
        {/if}
    </div>
</Subtitle>