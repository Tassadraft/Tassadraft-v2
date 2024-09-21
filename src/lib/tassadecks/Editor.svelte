<script>
    import Menu from "../menu/Menu.svelte";
    import Title from "../shared/Title.svelte";
    import { onMount } from "svelte";
    import axios from "../../axiosConfig.js";
    import Panel from '../shared/Panel.svelte';
    import Switch from '../shared/Switch.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import { showToast, storeToast } from '../../service/toastService.js';
    import Modal from '../shared/Modal.svelte';
    import Button from '../shared/Button.svelte';
    import Search from "../shared/Search.svelte";
    import IconButton from "../shared/IconButton.svelte";
    import CardSearchItem from "./CardSearchItem.svelte";
    import Icon from "../shared/Icon.svelte";
    import DisplayingMode from "../shared/DisplayingMode.svelte";
    import { asDropZone } from 'svelte-drag-and-drop-actions'
    import EditorCardDetails from "./EditorCardDetails.svelte";
    import EditorCard from "./EditorCard.svelte";
    import Pagination from "../shared/Pagination.svelte";
    import Editable from "../shared/Editable.svelte";

    export let deckId = "";

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
        public: false
    };
    let selectedCard = {card: {}};
    let draggedCard = {card: {}};
    let draggedCategory = null;
    let dragging = false;
    let hoveredCardIndex = -1;
    let hoveredCategoryIndex = -1;

    let showCardModal = false;
    let showSearchModal = false;

    let searchedCards = {cards: []};
    let cardSearchBaseUrl = '';
    const searchBarName = 'searchCard';
    let displayingMode = 'grid';

    onMount(async () => {
        try {
            const {data: deckData} = await axios.get(`/api/auth/reserved/decks/${deckId}?languageCode=${localStorage.getItem('languageCode')}`);
            deck = deckData;
            const rawUpdatedAt = new Date(deck.updatedAt);
            const rawCreatedAt = new Date(deck.createdAt);
            updatedAt = rawUpdatedAt.toLocaleString();
            createdAt = rawCreatedAt.toLocaleString();
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
        console.log(categoryObject);
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
    }

    const handleCardHover = (cardIndex, categoryIndex) => {
        hoveredCardIndex = cardIndex;
        hoveredCategoryIndex = categoryIndex;
    };

    const handleCardUnhover = () => {
        hoveredCardIndex = -1;
        hoveredCategoryIndex = -1;
    };

    const handleSearch = async (query) => {
        try {
            cardSearchBaseUrl = `/api/auth/reserved/cards/search?query=${query}&languageCode=${localStorage.getItem('languageCode')}`;
            const {data: paginated} = await axios.get(cardSearchBaseUrl);
            searchedCards = paginated;
        } catch (e) {
            showToast('Error while searching', 'error');
        }
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
        draggedCategory.cards = draggedCategory.cards.filter(cardObject => cardObject.card.scryfallId !== draggedCard.card.scryfallId);

        deck = {...deck};
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
        const isCardInDeck = deck.categories.some(categoryObject => {
            return categoryObject.cards.some(cardObject => cardObject.card.scryfallId === e.detail.card.scryfallId);
        });
        if (!isCardInDeck) {
            deck.categories = deck.categories.map(categoryObject => {
                if (categoryObject.category.name === selectedCard.card.translation.mainType) {
                    categoryObject.cards = [...categoryObject.cards, selectedCard];
                }
                return categoryObject;
            });
        }
        selectedCard.quantity++;
        deck = {...deck};
    };

    const handleDecrement = async (e) => {
        for (const categoryObject of deck.categories) {
            for (const cardObject of categoryObject.cards) {
                if (cardObject.card.scryfallId === e.detail.card.scryfallId) {
                    const removed = await removeCardRequest(cardObject.card);
                    if (!removed) {
                        return;
                    }
                    cardObject.quantity = (cardObject.quantity || 0) - 1;
                    if (cardObject.quantity <= 0) {
                        categoryObject.cards = categoryObject.cards.filter(
                            co => co.card.scryfallId !== cardObject.card.scryfallId
                        );
                        showCardModal = false;
                    }
                    categoryObject.cards = [...categoryObject.cards];
                    deck = {...deck};
                    return;
                }
            }
        }
    };

    $: {
        cardsLength = deck.categories?.reduce((acc, categoryObject) => {
            return acc + categoryObject.cards.reduce((a, cardObject) => {
                return a + cardObject.quantity
            }, 0)
        }, 0);
    }
</script>

<Menu/>
<Editable bind:value={deck.name} className="text-3xl font-bold mb-2" iconClassName="mt-1" on:rename={metadataRequest}>
    <Title bind:title={deck.name}/>
</Editable>

<Panel>
    <div class="grid grid-cols-3 gap-4 text-center">
        <div class="m-auto">
            <Switch size=4 bind:value={deck.enabled} label="Enabled" on:change={metadataRequest}/>
        </div>
        <div class="m-auto">
            <Switch size=4 bind:value={deck.public} label="Public" on:change={metadataRequest}/>
        </div>
        <p>{cardsLength} cards</p>
        <p>Updated on {updatedAt}</p>
        <p>Created on {createdAt}</p>
        <Editable bind:value={deck.description} on:rename={metadataRequest}>
            <p>{deck.description}</p>
        </Editable>
    </div>
</Panel>

<Panel>
    <div class="flex flex-row gap-5">
        <Button on:click={() => showSearchModal = true}>
            <div class="flex flex-row gap-1">
                <Icon name="search"/>
                <p>Search</p>
            </div>
        </Button>
        <div class="flex justify-end w-full">
            <DisplayingMode bind:displayingMode/>
        </div>
    </div>
</Panel>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each deck.categories as categoryObject, categoryIndex}
        {#if categoryObject.cards.length > 0 || categoryObject.category.name === 'Commander'}
            <div
                    role="listbox"
                    tabindex="0"
                    class="shadow-md rounded-lg p-4 relative"
                    style={displayingMode === 'grid' ? `height: ${268 + 50 + 30 * categoryObject.cards.length - 1}px;` : ''}
                    on:drop={() => handleDrop(categoryObject)}
                    use:asDropZone={{
                TypesToAccept:{ 'card':'copy' },
              }}
                    data-dropzone-id={categoryIndex}
            >
                <div class="relative flex flex-row gap-3 bg-gray-900 rounded-xl px-3 pt-3" style="z-index: 5000">
                    <Editable bind:value={categoryObject.category.name} className="text-xl font-bold text-black dark:text-white relative" on:rename={() => renameCategoryRequest(categoryObject)}>
                        <Subtitle>{categoryObject.category.name}</Subtitle>
                    </Editable>
                    ({categoryObject.cards.length})
                </div>
                {#if displayingMode === 'list'}
                    <ul class="flex flex-col gap-1 mt-3">
                        {#each categoryObject.cards as cardObject}
                            <li class="flex flex-row gap-1">
                                <Button customStyle={true}
                                        class="text-left hover:text-primary-500 transition-colors duration-300 {cardObject.card.legality?.commander === 'legal' ? '' : 'text-red-700'}"
                                        on:click={() => {selectedCard = cardObject; showCardModal = true;}}>
                                    {cardObject.card.translation?.name}
                                </Button>
                                <div class="mt-2">
                                    <IconButton icon="minus" on:click={() => handleDecrement({detail: cardObject})}/>
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
                                bind:showCardModal
                                bind:selectedCard
                                on:hover={() => handleCardHover(index, categoryIndex)}
                                on:unHover={handleCardUnhover}
                                on:dragStart={() => handleDragStart(cardObject, categoryObject)}
                                bind:draggedCard
                                bind:hoveredCategoryIndex
                                bind:hoveredCardIndex
                                bind:deck
                                on:cardRemoved={handleDecrement}
                                {addCardRequest}
                        />
                    {/each}
                {/if}
                {#if dragging && draggedCategory.id !== categoryObject.id}
                    <div class="absolute inset-0 bg-cover"
                         style="z-index: 2000; background-size: 20px 20px; background-image:
                         linear-gradient(45deg, #A5371B 25%, transparent 25%),
                         linear-gradient(-45deg, #A5371B 25%, transparent 25%),
                         linear-gradient(45deg, transparent 75%, #A5371B 75%),
                         linear-gradient(-45deg, transparent 75%, #A5371B 75%);
                     ">
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</div>

<Modal bind:showModal={showCardModal} closeText="Close" on:success={() => showCardModal = false}>
    <Subtitle slot="header">{selectedCard?.card?.translation?.name}</Subtitle>
    <EditorCardDetails bind:selectedCard on:cardDecrement={handleDecrement} on:cardIncrement={handleIncrement} />
</Modal>

<Modal bind:showModal={showSearchModal} closeText="Close" fullWidth={true}>
    <Subtitle slot="header">Search cards</Subtitle>

    <Search bind:selectedObserver={showSearchModal} selected={true} bind:results={searchedCards.cards} placeholder="Forest"
            label="Search cards by name" name={searchBarName} {handleSearch}/>

    <div class="flex flex-row flex-wrap gap-5 justify-center">
        {#each searchedCards.cards as card}
            <CardSearchItem bind:deck {card} {addCardRequest} {removeCardRequest}/>
        {/each}
    </div>
    <Pagination bind:paginatedObject={searchedCards} bind:baseUrl={cardSearchBaseUrl} />
</Modal>
