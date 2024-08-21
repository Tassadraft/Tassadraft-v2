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

    export let deckId = "";

    let updatedAt = new Date();
    let createdAt = new Date();
    let cardsLength = 0;
    let deck = {name: 'Deck editor', cards: [], description: '', categories: [], updatedAt, enabled: false, public: false};
    let selectedCard = {card: {}};

    let showCardModal = false;

    onMount(async () => {
        try {
            const {data: deckData } = await axios.get(`/api/auth/reserved/decks/${deckId}?languageCode=${localStorage.getItem('languageCode')}`);
            deck = deckData;
        } catch (e) {
            storeToast('Error while loading the deck', 'error');
            window.location = '/decks/new';
        }
    });

    const save = async () => {
        // TODO: update the deck (back => check if owner and add TODO: check if shared)
        showToast('Deck saved', 'success');
    }

    $: {
        const rawUpdatedAt = new Date(deck.updatedAt);
        const rawCreatedAt = new Date(deck.createdAt);
        updatedAt = rawUpdatedAt.toLocaleString();
        createdAt = rawCreatedAt.toLocaleString();
        cardsLength = deck.categories?.reduce((acc, category) => acc + category.cards.length, 0) || 0;
    }

    $: {
        for (const categoryObject of deck.categories) {
            for (const cardObject of categoryObject.cards) {
                if (cardObject.card.translation?.name.includes('//')) {
                    console.log(cardObject.card);
                }
            }
        }
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

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each deck.categories as categoryObject}
        {#if categoryObject.cards.length}
            <div class="shadow-md rounded-lg p-4" >
                <Subtitle>{categoryObject.category.name} ({categoryObject.cards.length})</Subtitle>
                <ul class="flex flex-col gap-1 mt-3">
                    {#each categoryObject.cards as cardObject}
                        <li>
                            <Button customStyle={true} className="text-left hover:text-primary-500 transition-colors duration-300 {cardObject.card.legality?.commander === 'legal' ? '' : 'text-red-700'}" on:click={() => {selectedCard = cardObject; showCardModal = true;}}>
                                {cardObject.card.translation?.name}
                            </Button>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    {/each}
</div>

<Modal bind:showModal={showCardModal} closeText="Close" on:success={() => showCardModal = false}>
    <Subtitle slot="header">{selectedCard?.card?.translation?.name}</Subtitle>
    <div class="flex flex-col items-center gap-2">
        <img class="w-60" src={selectedCard?.card?.imageUri?.normal} alt={selectedCard.card.translation?.name} />
        <p class="text-white">{selectedCard?.card?.translation?.typeLine}</p>
    </div>
</Modal>
