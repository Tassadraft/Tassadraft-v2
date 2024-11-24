import { writable } from 'svelte/store';

export const decks = writable({});

export function setDeck(deck) {
    decks.update((currentDecks) => {
        const updatedDecks = { ...currentDecks };
        updatedDecks[deck.id] = deck;
        return updatedDecks;
    });
}

export function deleteDeck(deck) {
    decks.update((currentDecks) => {
        const updatedDecks = { ...currentDecks };
        delete updatedDecks[deck.id];
        return updatedDecks;
    });
}
