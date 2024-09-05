<script>
    import Menu from "../menu/Menu.svelte";
    import Title from "../shared/Title.svelte";
    import {onMount} from "svelte";
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

    export let deckId = "";

    let updatedAt = new Date();
    let createdAt = new Date();
    let cardsLength = 0;
    let deck = {name: 'Deck editor', cards: [], description: '', categories: [], updatedAt, enabled: false, public: false};
    let selectedCard = {card: {}};

    let showCardModal = false;
    let showSearchModal = false;

    let searchedCards = [];
    const searchBarName = 'searchCard';
    let displayingMode = 'list';

    let currentHoveredCard = null;
    let hoveredCategoryIndex = null;

    onMount(async () => {
        try {
            const {data: deckData } = await axios.get(`/api/auth/reserved/decks/${deckId}?languageCode=${localStorage.getItem('languageCode')}`);
            deck = deckData;
        } catch (e) {
            storeToast('Error while loading the deck', 'error');
            window.location = '/decks/new';
        }
    });

    const handleCardHover = (catIndex, cardIndex) => {
        currentHoveredCard = cardIndex;
        hoveredCategoryIndex = catIndex;
        updateStackPositions();
    };

    const resetStack = (catIndex) => {
        currentHoveredCard = null;
        hoveredCategoryIndex = catIndex;
        updateStackPositions();
    };

    const updateStackPositions = () => {
        if (hoveredCategoryIndex === null) return;

        const categoryCards = deck.categories[hoveredCategoryIndex]?.cards;
        if (!categoryCards) return;  // Ensure categoryCards exists

        // Iterate over each card in the category
        categoryCards.forEach((card, i) => {
            // Get the card elements by class name
            const cardElement = document.querySelectorAll(`.category-${hoveredCategoryIndex} .absolute`)[i];
            if (!cardElement) return;  // Ensure the cardElement exists

            if (currentHoveredCard !== null && i < currentHoveredCard) {
                // Cards before the hovered one: stack them with decreasing z-index and slight upward translation
                cardElement.style.transform = `translateY(${i * 10}px) scale(0.95)`;
                cardElement.style.zIndex = `${i}`;
            } else if (currentHoveredCard !== null && i === currentHoveredCard) {
                // Hovered card: bring it to the front, no translation, full scale
                cardElement.style.transform = `translateY(0px) scale(1)`;
                cardElement.style.zIndex = `1000`;  // Bring the hovered card to the front
            } else {
                // Cards after the hovered one: stack them with more significant translation but behind the hovered card
                cardElement.style.transform = `translateY(${i * 30}px)`;
                cardElement.style.zIndex = `${i}`;
            }
        });
    };


    const handleSearch = async (query) => {
        try {
            const {data} = await axios.get(`/api/auth/reserved/cards/search?query=${query}&maxResults=10`);
            searchedCards = data;
        } catch (e) {
            storeToast('Error while searching', 'error');
        }
    };

    const addCard = (e) => {
        for (const categoryObject of deck.categories) {
            const card = e.detail;
            if (categoryObject.category.name === card.translation.mainType) {
                if (categoryObject.cards.find(cardObject => cardObject.card.scryfallId === card.scryfallId)) {
                    showToast('Card already in the deck', 'error');
                    return;
                }
                categoryObject.cards = [...categoryObject.cards, {card}];
                showToast(`${card.translation?.name} added to the deck`, 'success');
                deck = {...deck};
                return;
            }
        }
    };

    const removeCard = (e) => {
        for (const categoryObject of deck.categories) {
            if (categoryObject.cards.find(cardObject => cardObject.card.scryfallId === e.detail.scryfallId)) {
                categoryObject.cards = categoryObject.cards.filter(cardObject => cardObject.card.scryfallId !== e.detail.scryfallId);
                showToast(`${e.detail.translation.name} removed from the deck`, 'success');
                deck = {...deck};
                return;
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
        cardsLength = deck.categories?.reduce((acc, category) => acc + category.cards.length, 0) || 0;
    }
</script>

<Menu />
<Title bind:title={deck.name} />

<Panel>
    <div class="grid grid-cols-3 gap-4 text-center">
        <div class="m-auto">
            <Switch size=4 bind:value={deck.enabled} label="Enabled" on:change={() => save()} />
        </div>
        <div class="m-auto">
            <Switch size=4 bind:value={deck.public} label="Public" on:change={() => save()} />
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
                <Icon name="save" />
                <p>Save</p>
            </div>
        </Button>
        <Button on:click={() => showSearchModal = true}>
            <div class="flex flex-row gap-1">
                <Icon name="search" />
                <p>Search</p>
            </div>
        </Button>
        <div class="w-full flex flex-row justify-end">
            <IconButton
                    icon="list"
                    disabled={displayingMode === 'list'}
                    on:click={() => displayingMode = 'list'}
            />
            <IconButton
                    icon="grid"
                    disabled={displayingMode === 'grid'}
                    on:click={() => displayingMode = 'grid'}
            />
        </div>
    </div>
</Panel>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each deck.categories as categoryObject, categoryIndex}
        {#if categoryObject.cards.length}
            <div class="shadow-md rounded-lg p-4 relative">
                <Subtitle>{categoryObject.category.name} ({categoryObject.cards.length})</Subtitle>
                <ul class="flex flex-col gap-1 mt-3">
                    {#each categoryObject.cards.reverse() as cardObject, cardIndex}
                        {#if displayingMode === 'list'}
                            <li class="flex flex-row gap-1">
                                <Button customStyle={true} class="text-left hover:text-primary-500 transition-colors duration-300 {cardObject.card.legality?.commander === 'legal' ? '' : 'text-red-700'}" on:click={() => {selectedCard = cardObject; showCardModal = true;}}>
                                    {cardObject.card.translation?.name}
                                </Button>
                                <div class="mt-2">
                                    <IconButton icon="minus" on:click={() => removeCard({detail: cardObject.card})} />
                                </div>
                            </li>
                        {:else}
                            <div
                                class="relative group transition-transform duration-300"
                                style="z-index: {currentHoveredCard === cardIndex && hoveredCategoryIndex === categoryIndex ? 1000 : 1};"
                                role="button"
                                tabindex="0"
                                aria-label="Card: {cardObject.card.translation?.name}"
                                on:mouseenter={() => handleCardHover(categoryIndex, cardIndex)}
                                on:mouseleave={() => resetStack(categoryIndex)}
                                on:focus={() => handleCardHover(categoryIndex, cardIndex)}
                                on:blur={() => resetStack(categoryIndex)}
                            >
                                <img
                                    src={cardObject.card.imageUri?.small}
                                    alt={cardObject.card.translation?.name}
                                    class="w-48 flex-shrink-0"
                                    style="transform: translateY({cardIndex * 30}px);"
                                />
                                <div class="absolute inset-0 flex justify-center items-center flex-col gap-5 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                                    <IconButton icon="search" on:click={() => {selectedCard = cardObject; showCardModal = true;}} />
                                    <IconButton icon="trash" on:click={() => removeCard({detail: cardObject.card})} />
                                </div>
                            </div>
                        {/if}
                    {/each}
                </ul>
            </div>
        {/if}
    {/each}
</div>

<Modal bind:showModal={showCardModal} closeText="Close" on:success={() => showCardModal = false} fullWidth={selectedCard?.card?.layout === 'transform'}>
    <Subtitle slot="header">{selectedCard?.card?.translation?.name}</Subtitle>
    <div class="flex items-center justify-center gap-3 {selectedCard?.card?.layout === 'transform' ? 'flex-row' : 'flex-col'} mx-auto">
        {#if selectedCard?.card?.layout === 'transform'}
            <img class="w-64" src={selectedCard?.card?.cardFaces[0]?.imageUri.normal} alt={selectedCard?.card?.cardFaces[0]?.translation?.name} />
            <img class="w-64" src={selectedCard?.card?.cardFaces[1]?.imageUri.normal} alt={selectedCard?.card?.cardFaces[1]?.translation?.name} />
        {:else}
            <img class="w-64" src={selectedCard?.card?.imageUri?.normal} alt={selectedCard?.card?.translation?.name} />
        {/if}
    </div>
</Modal>

<Modal bind:showModal={showSearchModal} closeText="Close" on:success={() => null} fullWidth={true} on:open={() => null}>
    <Subtitle slot="header">Search cards</Subtitle>

    <Search bind:selectedObserver={showSearchModal} selected={true} bind:results={searchedCards} placeholder="Forest" label="Search cards by name" name={searchBarName} {handleSearch} />

    <div class="flex flex-col items-center gap-2">
        {#each searchedCards as card}
            <CardSearchItem bind:deck bind:card on:add={addCard} on:delete={removeCard} />
        {/each}
    </div>
</Modal>
