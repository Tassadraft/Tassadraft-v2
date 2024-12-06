import { writable } from 'svelte/store';
import { navigate as svelteNavigate } from 'svelte-routing';

export const location = writable(window.location.pathname);

export function navigate(path, options = {}) {
    location.set(path);
    svelteNavigate(path, options);
}

window.addEventListener('popstate', () => {
    location.set(window.location.pathname);
});
