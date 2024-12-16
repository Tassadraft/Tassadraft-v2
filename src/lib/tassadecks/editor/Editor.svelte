<script>
    import Menu from '../../menu/Menu.svelte';
    import Title from '../../shared/Title.svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Panel from '../../shared/Panel.svelte';
    import Switch from '../../shared/Switch.svelte';
    import Subtitle from '../../shared/Subtitle.svelte';
    import { showToast } from '../../../service/toastService.js';
    import Modal from '../../shared/Modal.svelte';
    import Button from '../../shared/Button.svelte';
    import IconButton from '../../shared/IconButton.svelte';
    import DisplayingMode from '../../shared/DisplayingMode.svelte';
    import EditorCardDetails from './EditorCardDetails.svelte';
    import EditorCard from './EditorCard.svelte';
    import Pagination from '../../shared/Pagination.svelte';
    import Editable from '../../shared/Editable.svelte';
    import Photo from '../../shared/Photo.svelte';
    import getBase64Strings from '../../../service/base64Service.js';
    import Loader from '../../shared/Loader.svelte';
    import CardPrintItem from '../CardPrintItem.svelte';
    import IconInfo from '../../shared/IconInfo.svelte';
    import { navigate } from '../../../stores/locationStore.js';
    import { setDeck, decks } from '../../../stores/deckStore.js';
    import { t } from 'svelte-i18n';
    import EditorDeckPrint from './EditorDeckPrint.svelte';
    import EditorRelatedCards from './EditorRelatedCards.svelte';
    import EditorSearch from './EditorSearch.svelte';
    import EditorNewCategory from './EditorNewCategory.svelte';
    import EditorClearCategories from './EditorClearCategories.svelte';

    export let deckId = '';

    let updatedAt = new Date();
    let createdAt = new Date();
    let cardsLength = 0;
    let deck = {
        name: 'Deck editor',
        cards: [],
        description: '',
        categories: [],
        updatedAt,
        enabled: false,
        public: false,
        enableDetailedCategories: false,
        format: 'Commander',
    };
    let selectedCard = { print: {} };
    let selectedCategory = { category: {} };
    let isSelectedCardSwitchingPrint = false;
    let hoveredCardIndex = -1;
    let hoveredCategoryIndex = -1;

    let categoryOptions = [];

    let showCardModal = false;

    let displayingMode = 'grid';

    let paginatedCardPrints = { cards: [] };
    let switchCardPrintBaseUrl = '';

    let cardDetailsContainerRef;
    let relatedCards = [];

    let loading = false;
    let isLegal = false;

    onMount(async () => {
        if ($decks[deckId]) {
            deck = $decks[deckId];
        } else {
            try {
                const { data: deckData } = await axios.get(`/api/auth/reserved/decks/${deckId}?language=${localStorage.getItem('language')}`);
                deck = deckData;
                setDeck(deck);
            } catch (e) {
                showToast($t('toast.editor.load.error'), 'error');
                navigate('/decks');
            }
        }
        const rawUpdatedAt = new Date(deck.updatedAt);
        const rawCreatedAt = new Date(deck.createdAt);
        updatedAt = rawUpdatedAt.toLocaleString();
        createdAt = rawCreatedAt.toLocaleString();
    });

    const metadataRequest = async () => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}/metadata`, {
                name: deck.name,
                description: deck.description,
                enabled: deck.enabled,
                public: deck.public,
            });
            showToast(`${deck.name} metadata updated`);
        } catch (e) {
            showToast(`Error while updating ${deck.name} metadata`, 'error');
            return {};
        }
    };

    const addCardRequest = async (print) => {
        try {
            const response = await axios.post(`/api/auth/reserved/decks/edit/${deck.id}/add-card`, {
                cardId: print.oracleId,
            });
            showToast(`1 ${print?.translation?.name} added to ${deck.name}`);
            await updateLegalityRequest();
            return response.data;
        } catch (e) {
            showToast(`Error adding ${print?.translation?.name} to ${deck.name}`, 'error');
            return null;
        }
    };

    const removeCardRequest = async (card) => {
        try {
            const response = await axios.post(`/api/auth/reserved/decks/edit/${deck.id}/remove-card`, {
                cardId: card.oracleId,
            });
            showToast(`1 ${card.translation.name} removed from ${deck.name}`);
            await updateLegalityRequest();
            return response.data;
        } catch (e) {
            showToast(`Error deleting ${card.translation.name} from ${deck.name}`, 'error');
            return false;
        }
    };

    const moveCardRequest = async (cardObject, categoryObject) => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}/move-card`, {
                categoryId: categoryObject.id,
                cardId: cardObject.print.oracleId,
            });
            showToast(`${cardObject.print.translation.name} moved to ${categoryObject.category.name}`);
            return true;
        } catch (e) {
            showToast(`Error while moving ${cardObject.print.translation.name} to ${categoryObject.category.name}`, 'error');
            return false;
        }
    };

    const renameCategoryRequest = async (categoryObject) => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}/rename-category`, {
                actionType: 'renameCategory',
                deckId: deck.id,
                categoryId: categoryObject.id,
                name: categoryObject.category.name,
            });
            showToast(`${categoryObject.category.name} category renamed`);
            return true;
        } catch (e) {
            showToast(`Error while renaming ${categoryObject.category.name} category`, 'error');
            return false;
        }
    };

    const switchCardPrintRequest = async (cardObject, print) => {
        try {
            await axios.post(`/api/auth/reserved/cards/prints/${cardObject.id}/switch`, {
                printId: print.scryfallId,
            });
            showToast(`${cardObject.print.translation.name} print switched to ${print.set.name}`);
            return true;
        } catch (e) {
            showToast(`Error while switching ${cardObject.print.translation.name} print`, 'error');
            return false;
        }
    };

    const updateLegalityRequest = async () => {
        try {
            const { data } = await axios.get(`/api/auth/reserved/decks/${deckId}/is-legal`);
            isLegal = data;
        } catch (e) {
            showToast($t('toast.editor.legality.error'), 'error');
        }
    };

    const handleCardHover = (cardIndex, categoryIndex, categoryObject) => {
        if (cardIndex === categoryObject.cards.length - 1) {
            return;
        }
        hoveredCardIndex = cardIndex;
        hoveredCategoryIndex = categoryIndex;
    };

    const handleCardUnhover = () => {
        hoveredCardIndex = -1;
        hoveredCategoryIndex = -1;
    };

    const handleIncrement = async (e) => {
        const added = await addCardRequest(e.detail.print);
        if (!added) {
            return;
        }
        const isCardInDeck = deck.categories.some((categoryObject) => {
            return categoryObject.cards.some((cardObject) => cardObject.print.oracleId === e.detail.print.oracleId);
        });
        if (!isCardInDeck) {
            deck.categories = deck.categories.map((categoryObject) => {
                if (categoryObject.category.name === selectedCard.print.translation.mainType) {
                    categoryObject.cards = [...categoryObject.cards, selectedCard];
                }
                return categoryObject;
            });
        } else {
            deck.categories = deck.categories.map((categoryObject) => {
                categoryObject.cards = categoryObject.cards.map((cardObject) => {
                    if (cardObject.print.oracleId === e.detail.print.oracleId) {
                        cardObject.quantity++;
                    }
                    return cardObject;
                });
                return categoryObject;
            });
        }
        selectedCard = { ...selectedCard, quantity: selectedCard.quantity + 1 };
        deck = { ...deck };
    };

    const handleDecrement = async (e) => {
        for (const categoryObject of deck.categories) {
            for (const cardObject of categoryObject.cards) {
                if (cardObject.print.oracleId === e.detail.print.oracleId) {
                    const removed = await removeCardRequest(cardObject.print);
                    if (!removed) {
                        return;
                    }
                    cardObject.quantity = cardObject.quantity - 1;
                    if (cardObject.quantity <= 0) {
                        categoryObject.cards = categoryObject.cards.filter((co) => co.id !== cardObject.id);
                        showCardModal = false;
                    }
                    selectedCard = { ...selectedCard, quantity: selectedCard.quantity - 1 };
                    deck = { ...deck };
                    return;
                }
            }
        }
    };

    const handleChangeCategory = async (e) => {
        const categoryObject = deck.categories.find((co) => co.id === e.detail.value);
        const moved = await moveCardRequest(selectedCard, categoryObject);
        if (!moved) {
            return;
        }
        categoryObject.cards.push(selectedCard);
        categoryObject.cards.sort((a, b) => a.print.translation.name.localeCompare(b.print.translation.name));
        selectedCategory.cards = selectedCategory.cards.filter((cardObject) => cardObject.id !== selectedCard.id);

        deck = { ...deck };
    };

    const handleProcessPhoto = async (e) => {
        try {
            loading = true;
            const base64Strings = await getBase64Strings([{ uri: e.detail.photo.webPath }]);
            const response = await axios.post(`/api/auth/reserved/process?language=${localStorage.getItem('language')}`, {
                photos: base64Strings,
            });
            for (const processedCard of response.data.cards) {
                let addedCardObject = await addCardRequest(processedCard.print);
                if (!addedCardObject) {
                    continue;
                }
                const isCardInDeck = deck.categories.some((categoryObject) => {
                    return categoryObject.cards.some((co) => co.print.oracleId === addedCardObject.card.print.oracleId);
                });
                if (!isCardInDeck) {
                    deck.categories = deck.categories.map((categoryObject) => {
                        if (categoryObject.category.name === addedCardObject.card.print.translation.mainType) {
                            categoryObject.cards = [...categoryObject.cards, addedCardObject.card];
                            categoryObject.cards.sort((a, b) => a.print.translation.name.localeCompare(b.print.translation.name));
                        }
                        return categoryObject;
                    });
                } else {
                    // if card is basic land, it'll be checked by server and addedCardObject.card will be undefined
                    deck.categories = deck.categories.map((categoryObject) => {
                        categoryObject.cards = categoryObject.cards.map((co) => {
                            if (co.print.oracleId === processedCard.print.oracleId) {
                                co.quantity++;
                            }
                            return co;
                        });
                        return categoryObject;
                    });
                }
            }
            deck = { ...deck };
            loading = false;
        } catch (error) {
            loading = false;
            if (error.response?.status === 401) {
                showToast($t('toast.photo.unauthorized'), 'error');
            } else {
                showToast($t('toast.photo.error'), 'error');
            }
        }
    };

    const handleCloseCardDetails = () => {
        showCardModal = false;
        isSelectedCardSwitchingPrint = false;
    };

    const handleCardPrintsDisplay = async (selectedCard) => {
        if (selectedCard?.print?.oracleId) {
            try {
                switchCardPrintBaseUrl = `/api/auth/reserved/cards/prints/${selectedCard.print.oracleId}?`;
                const { data: paginated } = await axios.get(switchCardPrintBaseUrl);
                return paginated;
            } catch (e) {
                showToast($t('toast.editor.card-prints.error'), 'error');
            }
        }
    };

    const handleCardPrintChoice = async (e) => {
        if (await switchCardPrintRequest(selectedCard, e.detail)) {
            selectedCard = { ...selectedCard, print: e.detail };
            deck.categories = deck.categories.map((categoryObject) => {
                categoryObject.cards = categoryObject.cards.map((cardObject) => {
                    if (cardObject.id === selectedCard.id) {
                        cardObject.print = selectedCard.print;
                    }
                    return cardObject;
                });
                return categoryObject;
            });
            isSelectedCardSwitchingPrint = false;
        }
    };

    const handleUpdateSelectedCard = async (e) => {
        selectedCard = { ...e.detail };
        paginatedCardPrints = await handleCardPrintsDisplay(selectedCard);
    };

    $: {
        cardsLength = deck.categories?.reduce((acc, categoryObject) => {
            return (
                acc +
                categoryObject.cards.reduce((a, cardObject) => {
                    return a + cardObject.quantity;
                }, 0)
            );
        }, 0);

        categoryOptions = deck.categories.map((categoryObject) => {
            return {
                value: categoryObject.id,
                label: categoryObject.category.name,
            };
        });
    }
</script>

<Menu />
<Editable bind:value={deck.name} className="text-3xl font-bold mb-2" iconClassName="mt-1" on:rename={metadataRequest}>
    <Title bind:title={deck.name} />
</Editable>

<Loader bind:loading />

<Panel>
    <div class="flex flex-row flex-wrap gap-5 justify-center mb-3">
        <div class="m-auto">
            <Switch size="4" bind:value={deck.enabled} label={$t('common.enabled')} on:change={metadataRequest} />
        </div>
        <div class="m-auto">
            <Switch size="4" bind:value={deck.public} label={$t('common.public')} on:change={metadataRequest} />
        </div>
        <div class="m-auto">
            <Switch
                size="4"
                bind:value={deck.enableDetailedCategories}
                label={$t('tassadecks.editor.detailed-categories')}
                on:change={metadataRequest}
                disabled={true}
            />
        </div>
    </div>
    <div class="flex flex-row flex-wrap gap-20 justify-center mb-3">
        <p>{cardsLength} cards</p>
        <p>{$t(`common.${isLegal ? 'legal' : 'not-legal'}`)}</p>
        <Subtitle>{deck.format}</Subtitle>
    </div>
    <div class="flex justify-center mb-3">
        <Editable bind:value={deck.description} on:rename={metadataRequest} min={0}>
            <p>{deck.description}</p>
        </Editable>
    </div>
    <div class="grid grid-cols-2 text-center">
        <p>{$t('common.updated-on')} {updatedAt}</p>
        <p>{$t('common.created-on')} {createdAt}</p>
    </div>
</Panel>

<Panel>
    <div class="flex">
        <div class="flex flex-row flex-wrap flex-grow justify-center gap-5 md:gap-10">
            <EditorSearch bind:deck {addCardRequest} {removeCardRequest} />
            <EditorDeckPrint bind:deck bind:relatedCards />
            <Photo mode="inline" on:photo={handleProcessPhoto}>
                <p>{$t('tassadecks.editor.batch.photo')}</p>
            </Photo>
            <EditorNewCategory bind:deck />
            <EditorClearCategories bind:deck />
        </div>
        <DisplayingMode bind:displayingMode />
    </div>
</Panel>

<div class="flex flex-row justify-center flex-wrap gap-4">
    {#each deck.categories as categoryObject, categoryIndex}
        {#if categoryObject.cards.length > 0 || (deck.format === 'commander' && categoryObject.category.name === 'Commander')}
            <div
                role="listbox"
                tabindex="0"
                class="shadow-md rounded-lg p-4 relative transition-all duration-300 min-w-56"
                style={displayingMode === 'grid'
                    ? `height: ${268 + 80 + 30 * categoryObject.cards.length + (hoveredCategoryIndex === categoryIndex ? 235 : 0)}px;`
                    : ''}
            >
                <div class="flex flex-row justify-center items-center gap-3 bg-gray-200 dark:bg-gray-900 rounded-xl" style="z-index: 1001">
                    <Editable
                        bind:value={categoryObject.category.name}
                        className="text-xl font-bold relative"
                        on:rename={() => renameCategoryRequest(categoryObject)}
                        editable={categoryObject.category.name !== 'Commander' && categoryObject.category.name !== 'Visual representation'}
                    >
                        <Subtitle>{categoryObject.category.name}</Subtitle>
                    </Editable>
                    <p>({categoryObject.cards.length})</p>
                    {#if categoryObject.category.name === 'Visual representation'}
                        <IconInfo>{$t('tassadecks.editor.visuals.help')}</IconInfo>
                    {/if}
                </div>
                {#if displayingMode === 'list'}
                    <ul class="flex flex-col gap-1 mt-3">
                        {#each categoryObject.cards as cardObject}
                            <li class="flex flex-row gap-1">
                                <Button
                                    customStyle={true}
                                    className="text-left hover:text-primary-500 transition-colors duration-300 {cardObject.print.legality
                                        ?.commander === 'legal'
                                        ? ''
                                        : 'text-red-700'}"
                                    on:click={() => {
                                        selectedCard = cardObject;
                                        selectedCategory = categoryObject;
                                        showCardModal = true;
                                    }}
                                >
                                    {cardObject.print.translation?.name}
                                </Button>
                                <div class="mt-2">
                                    <IconButton icon="minus" on:click={() => handleDecrement({ detail: cardObject })} />
                                </div>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    {#each categoryObject.cards as cardObject, index (cardObject.print.scryfallId)}
                        <EditorCard
                            {index}
                            {categoryIndex}
                            bind:cardObject
                            {categoryObject}
                            bind:showCardModal
                            bind:selectedCategory
                            on:hover={() => handleCardHover(index, categoryIndex, categoryObject)}
                            on:unHover={handleCardUnhover}
                            bind:hoveredCategoryIndex
                            bind:hoveredCardIndex
                            bind:deck
                            on:cardRemoved={handleDecrement}
                            on:cardAdded={handleIncrement}
                            on:cardSelected={handleUpdateSelectedCard}
                        />
                    {/each}
                {/if}
            </div>
        {/if}
    {/each}
</div>

<EditorRelatedCards bind:deck bind:relatedCards bind:switchCardPrintBaseUrl {handleCardPrintsDisplay} />

<!-- Editor card modal -->
<Modal bind:showModal={showCardModal} on:close={handleCloseCardDetails} fullWidth="{true}}">
    <Subtitle slot="header">{selectedCard?.print?.translation?.name}</Subtitle>
    {#if isSelectedCardSwitchingPrint}
        <div bind:this={cardDetailsContainerRef} class="flex flex-row flex-wrap gap-5 justify-center overflow-y-auto max-h-[75vh]">
            {#each paginatedCardPrints.cards as print}
                <CardPrintItem bind:card={print} bind:selectedCard on:choosePrint={handleCardPrintChoice} />
            {/each}
        </div>
        <Pagination bind:paginatedObject={paginatedCardPrints} bind:baseUrl={switchCardPrintBaseUrl} containerRef={cardDetailsContainerRef} />
    {:else}
        <EditorCardDetails
            bind:selectedCard
            bind:options={categoryOptions}
            bind:selectedCategory
            bind:switching={isSelectedCardSwitchingPrint}
            format={deck?.format}
            on:cardDecrement={handleDecrement}
            on:cardIncrement={handleIncrement}
            on:changeCategory={handleChangeCategory}
        />
    {/if}
</Modal>
