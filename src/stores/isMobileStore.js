import { writable } from 'svelte/store';

const MOBILE_BREAKPOINT = 768;

export const isMobile = writable(false);

const updateIsMobile = () => {
    if (typeof window !== 'undefined') {
        isMobile.set(window.innerWidth <= MOBILE_BREAKPOINT);
    }
};

// Initialize the store value
updateIsMobile();

if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateIsMobile);
}
