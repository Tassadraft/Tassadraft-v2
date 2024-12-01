<script>
    import IconButton from "../shared/IconButton.svelte";
    import Button from "../shared/Button.svelte";
    import CardBadge from "./CardBadge.svelte";
    import { t } from 'svelte-i18n';

    export let selectedRelatedCard;
    export let switching;

    let isTransforming = false;
    let isFlip = false;

    let cardFace = 0;
    let flipped = false;

    const handleTransform = (e) => {
        e.stopPropagation();
        if (isTransforming) {
            cardFace = cardFace === 0 ? 1 : 0;
        } else if (isFlip) {
            flipped = !flipped;
        }
    };

    $: {
        isTransforming = selectedRelatedCard?.related?.print?.layout !== 'flip' && selectedRelatedCard?.related?.print?.faces?.length > 1;
        isFlip = selectedRelatedCard?.related?.print?.layout === 'flip';
    }
</script>

{#if selectedRelatedCard}
    <div class="flex flex-col gap-3">
        <div class="flex flex-row justify-center">
            <div class="relative group">
                <img
                    class="w-64 {isTransforming || isFlip ? 'group-hover:opacity-50 transition-opacity duration-300' : ''} rounded-lg {flipped
                            ? 'transform rotate-180'
                            : ''}"
                    src={isTransforming ? selectedRelatedCard.related.print.faces[cardFace]?.imageUri?.normal : selectedRelatedCard.related.print.imageUri?.normal}
                    alt={isTransforming ? selectedRelatedCard.related.print.faces[cardFace]?.translation.name : selectedRelatedCard.related.print.translation.name}
                />
                {#if isTransforming || isFlip}
                    <div
                        class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <div class="absolute top-3 right-3">
                            <IconButton icon="exchange" size={32} on:click={handleTransform} />
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex flex-col gap-2 justify-center">
            {#if isTransforming || isFlip}
                <div class="sm:hidden flex justify-center">
                    <IconButton icon="exchange" size={32} on:click={handleTransform} />
                </div>
            {/if}
                <div class="flex justify-center gap-10">
                    <Button ariaLabel={$t('tassadecks.editor.print.switch')} on:click={() => (switching = true)}
                    >{$t('tassadecks.editor.print.switch')}</Button
                    >
                </div>
        </div>
    </div>
{/if}
