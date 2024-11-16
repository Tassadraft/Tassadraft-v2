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
    import EditorCardDetails from './EditorCardDetails.svelte';
    import EditorCard from './EditorCard.svelte';
    import Pagination from '../shared/Pagination.svelte';
    import Editable from '../shared/Editable.svelte';
    import Photo from '../shared/Photo.svelte';
    import getBase64Strings from '../../service/base64Service.js';
    import Loader from '../shared/Loader.svelte';
    import { capitalizeFirstChar } from '../../service/stringService.js';
    import CardPrintItem from './CardPrintItem.svelte';
    import IconInfo from "../shared/IconInfo.svelte";

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
    let showSearchModal = false;

    let paginatedSearchedCards = { cards: [] };
    let cardSearchBaseUrl = '';
    const searchBarName = 'searchCard';
    let displayingMode = 'grid';

    let paginatedCardPrints = { cards: [] };
    let switchCardPrintBaseUrl = '';

    let cardDetailsContainerRef;

    let loading = false;
    let isLegal = false;

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

    const addCardRequest = async (print) => {
        try {
            const response = await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
                actionType: 'addCard',
                cardId: print.oracleId,
            });
            showToast(`1 ${print?.translation?.name} added to the deck`);
            return response.data;
        } catch (e) {
            showToast('Error adding card to the deck', 'error');
            return false;
        } finally {
            await updateLegalityRequest();
        }
    };

    const removeCardRequest = async (card) => {
        try {
            const response = await axios.post(`/api/auth/reserved/decks/edit/${deck.id}`, {
                actionType: 'removeCard',
                cardId: card.oracleId,
            });
            showToast(`1 ${card.translation.name} removed from ${deck.name}`);
            return response.data;
        } catch (e) {
            showToast(`Error deleting ${card.translation.name} from the ${deck.name}`, 'error');
            return false;
        } finally {
            await updateLegalityRequest();
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
                cardId: cardObject.print.oracleId,
            });
            showToast(`${cardObject.print.translation.name} moved to ${categoryObject.category.name}`);
            return true;
        } catch (e) {
            showToast(`Error while moving ${cardObject.print.translation.name} to ${categoryObject.category.name}`, 'error');
            return false;
        }
    };

    const changeCardPrintRequest = async (cardObject, print) => {
        try {
            await axios.post(`/api/auth/reserved/cards/prints/${cardObject.id}/change`, {
                printId: print.scryfallId,
            });
            showToast(`${cardObject.print.translation.name} print changed to ${print.set.name}`);
            return true;
        } catch (e) {
            showToast(`Error while changing ${cardObject.print.translation.name} print`, 'error');
            return false;
        }
    };

    const updateLegalityRequest = async () => {
        try {
            const { data } = await axios.get(`/api/auth/reserved/decks/${deckId}/is-legal`);
            isLegal = data;
        } catch (e) {
            showToast('Error while fetching deck legality', 'error');
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
            for (let cardObject of categoryObject.cards) {
                if (cardObject.print.oracleId === e.detail.print.oracleId) {
                    const removed = await removeCardRequest(cardObject.print);
                    if (!removed) {
                        return;
                    }
                    cardObject.quantity = cardObject.quantity - 1;
                    if (cardObject.quantity <= 0) {
                        categoryObject.cards = categoryObject.cards.filter((co) => co.id !== co.id);
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

    // TODO: check if this works
    const handleProcessPhoto = async (e) => {
        try {
            loading = true;
            const base64Strings = await getBase64Strings([{ uri: e.detail.photo.webPath }]);
            const response = await axios.post(`/api/auth/reserved/process?languageCode=${localStorage.getItem('languageCode')}`, {
                photos: base64Strings,
            });
            for (const cardObject of response.data.cards) {
                const isCardInDeck = deck.categories.some((categoryObject) => {
                    return categoryObject.cards.some((co) => co.id === cardObject.id);
                });
                if (!isCardInDeck) {
                    deck.categories = deck.categories.map((categoryObject) => {
                        if (categoryObject.category.name === cardObject.print.translation.mainType) {
                            categoryObject.cards = [...categoryObject.cards, cardObject];
                        }
                        return categoryObject;
                    });
                } else {
                    deck.categories = deck.categories.map((categoryObject) => {
                        categoryObject.cards = categoryObject.cards.map((co) => {
                            if (co.id === cardObject.id) {
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
            console.error(error);
            if (error.response?.status === 401) {
                showToast('You are not authorized to process photos', 'error');
            } else {
                showToast('An error occurred while processing photos', 'error');
            }
        }
    };

    const handleCloseCardDetails = () => {
        showCardModal = false;
        isSelectedCardSwitchingPrint = false;
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

    const handleCardPrintsDisplay = async (selectedCard) => {
        if (selectedCard.print?.scryfallId) {
            try {
                switchCardPrintBaseUrl = `/api/auth/reserved/cards/prints/${selectedCard.print.oracleId}?`;
                const { data: paginated } = await axios.get(switchCardPrintBaseUrl);
                paginatedCardPrints = paginated;
            } catch (e) {
                showToast('Error while fetching card prints', 'error');
            }
        }
    };

    const handleCardPrintChoice = async (e) => {
        if (await changeCardPrintRequest(selectedCard, e.detail)) {
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
        await handleCardPrintsDisplay(selectedCard);
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
</script>

<Menu />
<Editable bind:value={deck.name} className="text-3xl font-bold mb-2" iconClassName="mt-1" on:rename={metadataRequest}>
    <Title bind:title={deck.name} />
</Editable>

<Loader bind:loading />

<Panel>
    <div class="flex flex-row flex-wrap gap-5 justify-center mb-3">
        <div class="m-auto">
            <Switch size="4" bind:value={deck.enabled} label="Enabled" on:change={metadataRequest} />
        </div>
        <div class="m-auto">
            <Switch size="4" bind:value={deck.public} label="Public" on:change={metadataRequest} />
        </div>
        <div class="mb-4 m-auto">
            <Switch size="4" bind:value={deck.enableDetailedCategories} label="Detailed categories" on:change={metadataRequest} disabled={true} />
        </div>
    </div>
    <div class="flex flex-row flex-wrap gap-20 justify-center mb-3">
        <p>{cardsLength} cards</p>
        <p>{isLegal ? 'Legal' : 'Not legal'}</p>
        <Subtitle>{capitalizeFirstChar(deck.format)}</Subtitle>
    </div>
    <div class="flex justify-center mb-3">
        <Editable bind:value={deck.description} on:rename={metadataRequest} min={0}>
            <p>{deck.description}</p>
        </Editable>
    </div>
    <div class="grid grid-cols-2 text-center">
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
        {#if categoryObject.cards.length > 0 || (deck.format === 'commander' && categoryObject.category.name === 'Commander')}
            <div
                role="listbox"
                tabindex="0"
                class="shadow-md rounded-lg p-4 relative transition-all duration-300 min-w-56"
                style={displayingMode === 'grid'
                    ? `height: ${268 + 80 + 30 * categoryObject.cards.length + (hoveredCategoryIndex === categoryIndex ? 235 : 0)}px;`
                    : ''}
            >
                <div class="relative flex flex-row gap-3 bg-gray-200 dark:bg-gray-900 rounded-xl px-3 pt-3" style="z-index: 1001">
                    <Editable
                        bind:value={categoryObject.category.name}
                        className="text-xl font-bold text-black dark:text-white relative"
                        on:rename={() => renameCategoryRequest(categoryObject)}
                        editable={categoryObject.category.name !== 'Commander' && categoryObject.category.name !== 'Visual representation'}
                    >
                        <Subtitle>{categoryObject.category.name}</Subtitle>
                    </Editable>
                    ({categoryObject.cards.length})
                    {#if categoryObject.category.name === 'Visual representation'}
                        <IconInfo>This category is used to pick deck illustrations in addition to commanders : if multiple cards are present, a random will be picked</IconInfo>
                    {/if}
                </div>
                {#if displayingMode === 'list'}
                    <ul class="flex flex-col gap-1 mt-3">
                        {#each categoryObject.cards as cardObject}
                            <li class="flex flex-row gap-1">
                                <Button
                                    customStyle={true}
                                    class="text-left hover:text-primary-500 transition-colors duration-300 {cardObject.print.legality?.commander ===
                                    'legal'
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

<Photo on:photo={handleProcessPhoto} />

<Modal bind:showModal={showCardModal} on:close={handleCloseCardDetails} fullWidth={true}>
    <Subtitle slot="header">{selectedCard?.print?.translation?.name}</Subtitle>
    {#if isSelectedCardSwitchingPrint}
        <div bind:this={cardDetailsContainerRef} class="flex flex-row flex-wrap gap-5 justify-center overflow-y-auto max-h-[75vh]">
            {#each paginatedCardPrints.cards as print}
                <CardPrintItem bind:card={print} bind:selectedCard on:choosePrint={handleCardPrintChoice} />
            {/each}
        </div>
        <Pagination bind:paginatedObject={paginatedCardPrints} baseUrl={switchCardPrintBaseUrl} containerRef={cardDetailsContainerRef} />
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

<Modal bind:showModal={showSearchModal} fullWidth={true}>
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
