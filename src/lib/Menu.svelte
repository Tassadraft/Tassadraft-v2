<script>
    import MenuItem from './MenuItem.svelte';
    import { onMount } from 'svelte';

    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;
    };

    const closeMenu = () => {
        isOpen = false;
    };

    const handleClickOutside = (event) => {
        const menu = document.getElementById('menu');
        const button = document.getElementById('menu-button');
        if (menu && !menu.contains(event.target) && button && !button.contains(event.target)) {
            closeMenu();
        }
    };

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<style>
    /* You can add custom styles here if needed */
</style>

<div class="relative">
    <button id="menu-button" class="fixed top-4 left-4 cursor-pointer text-2xl p-2 rounded {isOpen ? 'hidden' : ''}" on:click={toggleMenu}>
        <svg class="size-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
        </svg>
    </button>

    <nav id="menu" class="fixed top-0 left-0 w-64 h-full bg-gray-800 dark:bg-gray-900 text-white transform transition-transform duration-300 ease-in-out {isOpen ? '' : '-translate-x-full'}">
        <div class="flex justify-end p-4">
            <button class="text-2xl" on:click={closeMenu}>&times;</button>
        </div>
        <ul class="space-y-4 p-4">
            <MenuItem href="/tassadraft" onClick={closeMenu}>Tassadraft</MenuItem>
            <MenuItem href="/tassadecks" onClick={closeMenu}>Tassadecks</MenuItem>
            <MenuItem href="/tassacards" onClick={closeMenu}>Tassacards</MenuItem>
        </ul>
    </nav>
</div>
