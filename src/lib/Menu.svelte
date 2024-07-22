<script>
    import MenuItem from './MenuItem.svelte';
    import { onMount } from 'svelte';
    import Icon from "./Icon.svelte";

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

<div>
    <button id="menu-button" class="cursor-pointer rounded {isOpen ? 'opacity-0' : ''}" on:click={toggleMenu}>
        <Icon name="burger" size="4" />
    </button>

    <nav id="menu" class="fixed top-0 left-0 w-64 h-full bg-gray-800 dark:bg-gray-900 text-white transform transition-transform duration-300 ease-in-out {isOpen ? '' : '-translate-x-full'}">
        <div class="flex justify-end p-4">
            <button class="text-2xl" on:click={closeMenu}>
                <Icon name="close" size="8" />
            </button>
        </div>
        <ul class="space-y-4 p-4">
            <MenuItem href="/tassadraft" onClick={closeMenu}>Tassadraft</MenuItem>
            <MenuItem href="/tassadecks" onClick={closeMenu}>Tassadecks</MenuItem>
            <MenuItem href="/tassacards" onClick={closeMenu}>Tassacards</MenuItem>
        </ul>
    </nav>
</div>
