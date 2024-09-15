<script>
    import Menu from "../menu/Menu.svelte";
    import Title from "../shared/Title.svelte";
    import { onMount } from "svelte";
    import axios from "../../axiosConfig.js";
    import Panel from '../shared/Panel.svelte';
    import Switch from '../shared/Switch.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import { showToast } from '../../service/toastService.js';
    import Modal from '../shared/Modal.svelte';
    import Button from '../shared/Button.svelte';
    import Search from "../shared/Search.svelte";
    import IconButton from "../shared/IconButton.svelte";
    import CardSearchItem from "./CardSearchItem.svelte";
    import Icon from "../shared/Icon.svelte";
    import DisplayingMode from "../shared/DisplayingMode.svelte";
    import { asDropZone } from 'svelte-drag-and-drop-actions'
    import EditorCardDetails from "./EditorCardDetails.svelte";
    import EditorCategoryTitle from "./EditorCategoryTitle.svelte";
    import EditorCard from "./EditorCard.svelte";
    import Pagination from "../shared/Pagination.svelte";

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
        } catch (e) {
            showToast('Error while loading the deck', 'error');
            window.location = '/decks';
        }
    });

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

    const handleDrop = (categoryObject) => {
        if (!dragging) {
            return;
        }
        dragging = false;
        if (categoryObject.id === draggedCategory.id) {
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

    const handleDecrement = (e) => {
        for (const categoryObject of deck.categories) {
            for (const cardObject of categoryObject.cards) {
                if (cardObject.card.scryfallId === e.detail.scryfallId) {
                    cardObject.quantity = (cardObject.quantity || 0) - 1;
                    if (cardObject.quantity <= 0) {
                        console.log('ici');
                        categoryObject.cards = categoryObject.cards.filter(
                            co => co.card.scryfallId !== e.detail.scryfallId
                        );
                        showToast(`${e.detail.translation.name} totally removed from the ${deck.name}`, 'success');
                        showCardModal = false;
                    } else {
                        console.log('là');
                        showToast(`1 ${e.detail.translation.name} removed from ${deck.name}`, 'success');
                    }
                    categoryObject.cards = [...categoryObject.cards];
                    deck = {...deck};
                    return;
                }
            }
        }
    };

    const save = async () => {
        // TODO: update the deck (back => check if owner and add TODO: check if shared)
        showToast('Deck saved', 'success');
    };

    $: {
        const rawUpdatedAt = new Date(deck.updatedAt);
        const rawCreatedAt = new Date(deck.createdAt);
        updatedAt = rawUpdatedAt.toLocaleString();
        createdAt = rawCreatedAt.toLocaleString();
        cardsLength = deck.categories?.reduce((acc, categoryObject) => {
            return acc + categoryObject.cards.reduce((a, cardObject) => {
                return a + cardObject.quantity
            }, 0)
        }, 0);
    }

    $: console.log(showCardModal);
</script>

<Menu/>
<Title bind:title={deck.name}/>

<Panel>
    <div class="grid grid-cols-3 gap-4 text-center">
        <div class="m-auto">
            <Switch size=4 bind:value={deck.enabled} label="Enabled" on:change={() => save()}/>
        </div>
        <div class="m-auto">
            <Switch size=4 bind:value={deck.public} label="Public" on:change={() => save()}/>
        </div>
        <p>{cardsLength} cards</p>
        <p>Updated on {updatedAt}</p>
        <p>Created on {createdAt}</p>
        <p>{deck.description}</p>
    </div>
</Panel>

<Panel>
    <div class="flex flex-row gap-5">
        <Button on:click={save}>
            <div class="flex flex-row gap-1">
                <Icon name="save"/>
                <p>Save</p>
            </div>
        </Button>
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
            <EditorCategoryTitle bind:categoryObject />
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
                                <IconButton icon="minus" on:click={() => handleDecrement({detail: cardObject.card})}/>
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
    {/each}
</div>

<Modal bind:showModal={showCardModal} closeText="Close" on:success={() => showCardModal = false}>
    <Subtitle slot="header">{selectedCard?.card?.translation?.name}</Subtitle>
    <EditorCardDetails bind:selectedCard bind:deck on:cardRemoved={() => showCardModal = false} />
</Modal>

<Modal bind:showModal={showSearchModal} closeText="Close" fullWidth={true}>
    <Subtitle slot="header">Search cards</Subtitle>

    <Search bind:selectedObserver={showSearchModal} selected={true} bind:results={searchedCards.cards} placeholder="Forest"
            label="Search cards by name" name={searchBarName} {handleSearch}/>

    <div class="flex flex-row flex-wrap gap-5 justify-center">
        {#each searchedCards.cards as card}
            <CardSearchItem bind:deck {card}/>
        {/each}
    </div>
    <Pagination bind:paginatedObject={searchedCards} bind:baseUrl={cardSearchBaseUrl} />
</Modal>
