<script>
    import IconButton from '../../shared/IconButton.svelte';
    import CardBadge from '../CardBadge.svelte';
    import { t } from 'svelte-i18n';

    export let baseCard = null;
    export let format = '';

    let cardFace = 0;
    let isTransforming = false;
    let isFlip = false;
    let isLegal = false;
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
        isTransforming = baseCard.print.layout !== 'flip' && baseCard.print.faces.length > 1;
        isFlip = baseCard.print.layout === 'flip';
        if (baseCard.print.legality) {
            isLegal = baseCard.print.legality[format] === 'legal';
        }
    }
</script>

{#if baseCard.print.translation}
    <div class="flex flex-col gap-3">
        <div class="flex flex-row justify-center">
            <div class="relative group">
                <img
                    class="w-64 {isTransforming || isFlip ? 'group-hover:opacity-50 transition-opacity duration-300' : ''} rounded-lg {flipped
                        ? 'transform rotate-180'
                        : ''}"
                    src={isTransforming ? baseCard.print.faces[cardFace].imageUri.normal : baseCard.print.imageUri.normal}
                    alt={isTransforming ? baseCard.print.faces[cardFace].translation.name : baseCard.print.translation.name}
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
                {#if !isLegal}
                    <CardBadge type="error">{$t('badge.banned')}</CardBadge>
                {/if}
            </div>
        </div>
        <div class="flex flex-col gap-2 justify-center">
            {#if isTransforming || isFlip}
                <div class="sm:hidden flex justify-center">
                    <IconButton icon="exchange" size={32} on:click={handleTransform} />
                </div>
            {/if}
        </div>
    </div>
{/if}
