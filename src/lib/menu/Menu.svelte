<script>
    import MenuItem from './MenuItem.svelte';
    import { onMount } from 'svelte';
    import Icon from "../shared/Icon.svelte";
    import ThemeSwitch from '../settings/ThemeSwitch.svelte';
    import Button from '../shared/Button.svelte';

    const token = localStorage.getItem('apiToken');

    let isOpen = false;
    let connected = token !== '' && token !== null && token !== undefined;

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
    <Button idName="menu-button" className={isOpen ? 'opacity-0' : ''} handleClick={() => isOpen = !isOpen}>
        <Icon name="burger" />
    </Button>

    <nav id="menu" class="fixed top-0 left-0 w-64 h-full bg-gray-700 dark:bg-gray-800 text-white transform transition-transform duration-300 ease-in-out {isOpen ? '' : '-translate-x-full'}">
        <div class="flex justify-end p-4">
            <Button disabled={true} className="text-2xl" handleClick={closeMenu}>
                <Icon name="close" color="primary-500" />
            </Button>
        </div>
        <ul class="space-y-4 p-4">
            <MenuItem iconLeft="home" href="/" onClick={closeMenu}>Home</MenuItem>
            <MenuItem iconLeft="camera" href="/tassadraft" onClick={closeMenu}>Tassadraft</MenuItem>
            <MenuItem iconLeft="book" href="#" onClick={closeMenu}>Tassadecks</MenuItem>
            <MenuItem iconLeft="camera" href="#" onClick={closeMenu}>Tassacards</MenuItem>
            <MenuItem iconLeft="settings" href="/settings" onClick={closeMenu}>Settings</MenuItem>
            {#if connected}
                <MenuItem iconLeft="userRemove" href="/logout" onClick={closeMenu}>Logout</MenuItem>
            {:else}
                <MenuItem iconLeft="user" href="/login" onClick={closeMenu}>Login</MenuItem>
            {/if}
            <ThemeSwitch />
        </ul>
    </nav>
</div>
