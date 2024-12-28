import { writable } from 'svelte/store';

export const language = writable('en');

export function setLanguage(value) {
    language.set(value);
}
