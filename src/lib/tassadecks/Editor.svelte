<script>
    import Menu from '../menu/Menu.svelte';
    import Title from '../shared/Title.svelte';
    import { onMount } from 'svelte';
    import axios from '../../axiosConfig.js';
    import Panel from '../shared/Panel.svelte';
    import Switch from '../shared/Switch.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import { showToast, storeToast } from '../../service/toastService.js';
    import Modal from '../shared/Modal.svelte';
    import Button from '../shared/Button.svelte';
    import Search from '../shared/Search.svelte';
    import IconButton from '../shared/IconButton.svelte';
    import CardSearchItem from './CardSearchItem.svelte';
    import Icon from '../shared/Icon.svelte';
    import DisplayingMode from '../shared/DisplayingMode.svelte';
    import { asDropZone } from 'svelte-drag-and-drop-actions';
    import EditorCardDetails from './EditorCardDetails.svelte';
    import EditorCard from './EditorCard.svelte';
    import Pagination from '../shared/Pagination.svelte';
    import Editable from '../shared/Editable.svelte';
    import Photo from '../shared/Photo.svelte';
    import getBase64Strings from '../../service/base64Service.js';
    import Loader from '../shared/Loader.svelte';
    import { capitalizeFirstChar } from '../../service/stringService.js';
    import CardPrintItem from "./CardPrintItem.svelte";

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
    let selectedCard = { card: {} };
    let selectedCategory = { category: {} };
    let isSelectedCardSwitchingPrint = false;
    let draggedCard = { card: {} };
    let draggedCategory = null;
    let dragging = false;
    let hoveredCardIndex = -1;
    let hoveredCategoryIndex = -1;

    let categoryOptions = [];

    let showCardModal = false;
    let showSearchModal = false;

    let paginatedSearchedCards = { cards: [] };
    let cardSearchBaseUrl = '';
    const searchBarName = 'searchCard';
    let displayingMode = 'grid';

    let paginatedCardPrints = { cards: [] };
    let switchCardPrintBaseUrl = '';

    let cardDetailsContainerRef;

    let loading = false;

    onMount(async () => {
        try {
            const { data: deckData } = await axios.get(`/api/auth/reserved/decks/${deckId}?languageCode=${localStorage.getItem('languageCode')}`);
            deck = deckData;
            const rawUpdatedAt = new Date(deck.updatedAt);
            const rawCreatedAt = new Date(deck.createdAt);
            updatedAt = rawUpdatedAt.toLocaleString();
            createdAt = rawCreatedAt.toLocaleString();
            categoryOptions = deck.categories.map((categoryObject) => {
                return {
                    value: categoryObject.id,
                    label: categoryObject.category.name,
                };
            });
        } catch (e) {
            storeToast('Error while loading the deck', 'error');
            window.location = '/decks';
        }
    });

    const addCardRequest = async (card) => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
                actionType: 'addCard',
                cardId: card.scryfallId,
            });
            showToast(`1 ${card?.translation?.name} added to the deck`);
            return true;
        } catch (e) {
            showToast('Error adding card to the deck', 'error');
            return false;
        }
    };

    const removeCardRequest = async (card) => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
                actionType: 'removeCard',
                cardId: card.scryfallId,
            });
            showToast(`1 ${card.translation.name} removed from ${deck.name}`);
            return true;
        } catch (e) {
            showToast(`Error deleting ${card.translation.name} from the ${deck.name}`, 'error');
            return false;
        }
    };

    const metadataRequest = async () => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
                actionType: 'metadata',
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

    const renameCategoryRequest = async (categoryObject) => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
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

    const moveCardRequest = async (cardObject, categoryObject) => {
        try {
            await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
                actionType: 'moveCard',
                deckId: deck.id,
                categoryId: categoryObject.id,
                cardId: cardObject.card.scryfallId,
            });
            showToast(`${cardObject.card.translation.name} moved to ${categoryObject.category.name}`);
            return true;
        } catch (e) {
            showToast(`Error while moving ${cardObject.card.translation.name} to ${categoryObject.category.name}`, 'error');
            return false;
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

    const handleDrop = async (categoryObject) => {
        if (!dragging) {
            return;
        }
        dragging = false;
        if (categoryObject.id === draggedCategory.id) {
            return;
        }
        const moved = await moveCardRequest(draggedCard, categoryObject);
        if (!moved) {
            return;
        }
        categoryObject.cards.push(draggedCard);
        categoryObject.cards.sort((a, b) => a.card.translation.name.localeCompare(b.card.translation.name));
        draggedCategory.cards = draggedCategory.cards.filter((cardObject) => cardObject.card.scryfallId !== draggedCard.card.scryfallId);

        deck = { ...deck };
    };

    const handleDragStart = (cardObject, categoryObject) => {
        draggedCard = cardObject;
        draggedCategory = categoryObject;
        dragging = true;
    };

    const handleIncrement = (e) => {
        const added = addCardRequest(e.detail.card);
        if (!added) {
            return;
        }
        const isCardInDeck = deck.categories.some((categoryObject) => {
            return categoryObject.cards.some((cardObject) => cardObject.card.scryfallId === e.detail.card.scryfallId);
        });
        if (!isCardInDeck) {
            deck.categories = deck.categories.map((categoryObject) => {
                if (categoryObject.category.name === selectedCard.card.translation.mainType) {
                    categoryObject.cards = [...categoryObject.cards, selectedCard];
                }
                return categoryObject;
            });
        }
        selectedCard.quantity++;
        deck = { ...deck };
    };

    const handleDecrement = async (e) => {
        for (const categoryObject of deck.categories) {
            for (let cardObject of categoryObject.cards) {
                if (cardObject.card.scryfallId === e.detail.card.scryfallId) {
                    const removed = await removeCardRequest(cardObject.card);
                    if (!removed) {
                        return;
                    }
                    console.log(cardObject.card.translation.name, cardObject.quantity);
                    console.log(selectedCard.card.translation.name, selectedCard.quantity);
                    cardObject.quantity = cardObject.quantity - 1;
                    if (cardObject.quantity <= 0) {
                        categoryObject.cards = categoryObject.cards.filter((co) => co.card.scryfallId !== cardObject.card.scryfallId);
                        showCardModal = false;
                    }
                    selectedCard = { ...selectedCard };
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
        categoryObject.cards.sort((a, b) => a.card.translation.name.localeCompare(b.card.translation.name));
        selectedCategory.cards = selectedCategory.cards.filter((cardObject) => cardObject.card.scryfallId !== selectedCard.card.scryfallId);

        deck = { ...deck };
    };

    const handleProcessPhoto = async (e) => {
        try {
            loading = true;
            const base64Strings = await getBase64Strings([{ uri: e.detail.photo.webPath }]);
            const response = await axios.post(`/api/auth/reserved/process?languageCode=${localStorage.getItem('languageCode')}`, {
                photos: base64Strings,
            });
            for (const cardObject of response.data.cards) {
                const isCardInDeck = deck.categories.some((categoryObject) => {
                    return categoryObject.cards.some((co) => co.card.scryfallId === cardObject.card.scryfallId);
                });
                if (!isCardInDeck) {
                    deck.categories = deck.categories.map((categoryObject) => {
                        if (categoryObject.category.name === cardObject.card.translation.mainType) {
                            categoryObject.cards = [...categoryObject.cards, cardObject];
                        }
                        return categoryObject;
                    });
                } else {
                    deck.categories = deck.categories.map((categoryObject) => {
                        categoryObject.cards = categoryObject.cards.map((co) => {
                            if (co.card.scryfallId === cardObject.card.scryfallId) {
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
            console.log(error);
            if (error.response?.status === 401) {
                showToast('You are not authorized to process photos', 'error');
            } else {
                showToast('An error occurred while processing photos', 'error');
            }
        }
    };

    const handleSearch = async (query) => {
        try {
            cardSearchBaseUrl = `/api/auth/reserved/cards/search?query=${query}&languageCode=${localStorage.getItem('languageCode')}`;
            const { data: paginated } = await axios.get(cardSearchBaseUrl);
            paginatedSearchedCards = paginated;
        } catch (e) {
            showToast('Error while searching', 'error');
        }
    };

    const handleCardPrintSelection = async () => {
        if (selectedCard.card?.scryfallId) {
            try {
                switchCardPrintBaseUrl = `/api/auth/reserved/cards/prints/${selectedCard.card.scryfallId}?`;
                const { data: paginated } = await axios.get(switchCardPrintBaseUrl);
                paginatedCardPrints = paginated;
            } catch (e) {
                showToast('Error while fetching card prints', 'error');
            }
        }
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
    }

    $: {
        if (selectedCard.card?.scryfallId) {
            handleCardPrintSelection();
        }
    }
</script>

<Menu />
<Editable bind:value={deck.name} className="text-3xl font-bold mb-2" iconClassName="mt-1" on:rename={metadataRequest}>
    <Title bind:title={deck.name} />
</Editable>

<Loader bind:loading />

<Panel>
    <div class="grid grid-cols-3 gap-4 text-center">
        <div class="m-auto">
            <Switch size="4" bind:value={deck.enabled} label="Enabled" on:change={metadataRequest} />
        </div>
        <div class="m-auto">
            <Switch size="4" bind:value={deck.public} label="Public" on:change={metadataRequest} />
        </div>
        <p>{cardsLength} cards</p>
        <Subtitle>{capitalizeFirstChar(deck.format)}</Subtitle>
        <div class="m-auto">
            <Switch size="4" bind:value={deck.enableDetailedCategories} label="Detailed categories" on:change={metadataRequest} disabled={true} />
        </div>
        <Editable bind:value={deck.description} on:rename={metadataRequest}>
            <p>{deck.description}</p>
        </Editable>
    </div>
    <div class="grid grid-cols-2 text-center mt-4">
        <p>Updated on {updatedAt}</p>
        <p>Created on {createdAt}</p>
    </div>
</Panel>

<Panel>
    <div class="flex flex-row gap-5">
        <Button on:click={() => (showSearchModal = true)}>
            <div class="flex flex-row gap-1">
                <Icon name="search" />
                <p>Search</p>
            </div>
        </Button>
        <div class="flex justify-end w-full">
            <DisplayingMode bind:displayingMode />
        </div>
    </div>
</Panel>

<div class="flex flex-row justify-center flex-wrap gap-4">
    {#each deck.categories as categoryObject, categoryIndex}
        {#if categoryObject.cards.length > 0 || categoryObject.category.name === 'Commander'}
            <div
                role="listbox"
                tabindex="0"
                class="shadow-md rounded-lg p-4 relative transition-all duration-300 min-w-56"
                style={displayingMode === 'grid'
                    ? `height: ${268 + 80 + 30 * categoryObject.cards.length + (hoveredCategoryIndex === categoryIndex ? 235 : 0)}px;`
                    : ''}
                on:drop={() => handleDrop(categoryObject)}
                use:asDropZone={{
                    TypesToAccept: { card: 'copy' },
                }}
                data-dropzone-id={categoryIndex}
            >
                <div class="relative flex flex-row gap-3 bg-gray-200 dark:bg-gray-900 rounded-xl px-3 pt-3" style="z-index: 1001">
                    <Editable
                        bind:value={categoryObject.category.name}
                        className="text-xl font-bold text-black dark:text-white relative"
                        on:rename={() => renameCategoryRequest(categoryObject)}
                    >
                        <Subtitle>{categoryObject.category.name}</Subtitle>
                    </Editable>
                    ({categoryObject.cards.length})
                </div>
                {#if displayingMode === 'list'}
                    <ul class="flex flex-col gap-1 mt-3">
                        {#each categoryObject.cards as cardObject}
                            <li class="flex flex-row gap-1">
                                <Button
                                    customStyle={true}
                                    class="text-left hover:text-primary-500 transition-colors duration-300 {cardObject.card.legality?.commander ===
                                    'legal'
                                        ? ''
                                        : 'text-red-700'}"
                                    on:click={() => {
                                        selectedCard = cardObject;
                                        selectedCategory = categoryObject;
                                        showCardModal = true;
                                    }}
                                >
                                    {cardObject.card.translation?.name}
                                </Button>
                                <div class="mt-2">
                                    <IconButton icon="minus" on:click={() => handleDecrement({ detail: cardObject })} />
                                </div>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    {#each categoryObject.cards as cardObject, index (cardObject.card.scryfallId)}
                        <EditorCard
                            {index}
                            {categoryIndex}
                            {cardObject}
                            {categoryObject}
                            bind:showCardModal
                            bind:selectedCard
                            bind:selectedCategory
                            on:hover={() => handleCardHover(index, categoryIndex, categoryObject)}
                            on:unHover={handleCardUnhover}
                            on:dragStart={() => handleDragStart(cardObject, categoryObject)}
                            bind:hoveredCategoryIndex
                            bind:hoveredCardIndex
                            bind:deck
                            on:cardRemoved={handleDecrement}
                            {addCardRequest}
                        />
                    {/each}
                {/if}
                {#if dragging && draggedCategory.id !== categoryObject.id}
                    <div
                        class="absolute inset-0 bg-cover hidden md:block"
                        style="z-index: 1000; background-size: 20px 20px; background-image:
                         linear-gradient(45deg, #A5371B 25%, transparent 25%),
                         linear-gradient(-45deg, #A5371B 25%, transparent 25%),
                         linear-gradient(45deg, transparent 75%, #A5371B 75%),
                         linear-gradient(-45deg, transparent 75%, #A5371B 75%);
                     "
                    ></div>
                {/if}
            </div>
        {/if}
    {/each}
</div>

<Photo on:photo={handleProcessPhoto} />

<Modal bind:showModal={showCardModal} closeText="Close" on:success={() => { showCardModal = false; isSelectedCardSwitchingPrint = false }}>
    <Subtitle slot="header">{selectedCard?.card?.translation?.name}</Subtitle>
    {#if isSelectedCardSwitchingPrint}
        <div bind:this={cardDetailsContainerRef} class="flex flex-row flex-wrap gap-5 justify-center overflow-y-auto max-h-[75vh]">
            {#each paginatedCardPrints.cards as print}
                <CardPrintItem card={print} bind:selectedCard />
            {/each}
        </div>
        <Pagination bind:paginatedObject={paginatedCardPrints} baseUrl={switchCardPrintBaseUrl} containerRef={cardDetailsContainerRef} />
            {:else}
         <EditorCardDetails
            bind:selectedCard
            bind:options={categoryOptions}
            bind:selectedCategory
            bind:switching={isSelectedCardSwitchingPrint}
            on:cardDecrement={handleDecrement}
            on:cardIncrement={handleIncrement}
            on:changeCategory={handleChangeCategory}
        />
    {/if}
</Modal>

<Modal bind:showModal={showSearchModal} closeText="Close" fullWidth={true}>
    <Subtitle slot="header">Search cards</Subtitle>

    <Search
        bind:selectedObserver={showSearchModal}
        selected={true}
        bind:results={paginatedSearchedCards.cards}
        placeholder="Forest"
        label="Search cards by name"
        name={searchBarName}
        {handleSearch}
    />

    <div class="flex flex-row flex-wrap gap-5 justify-center">
        {#each paginatedSearchedCards.cards as card}
            <CardSearchItem bind:deck {card} {addCardRequest} {removeCardRequest} />
        {/each}
    </div>
    <Pagination bind:paginatedObject={paginatedSearchedCards} bind:baseUrl={cardSearchBaseUrl} />
</Modal>
