<script>
    import { onMount } from 'svelte';
    import Icon from '../shared/Icon.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';
    import Button from '../shared/Button.svelte';
    import IconButton from '../shared/IconButton.svelte';
    import CommonMenu from './CommonMenu.svelte';

    let isOpen = false;

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

<div class="flex justify-start">
    <div class="mt-3">
        <Button idName="menu-button" className={isOpen ? 'opacity-0' : ''} on:click={() => (isOpen = !isOpen)}>
            <Icon name="burger" />
        </Button>

        <nav
            id="menu"
            class="fixed top-0 left-0 w-64 h-full bg-gray-700 dark:bg-gray-800 text-white transform transition-transform duration-300 ease-in-out {isOpen
                ? ''
                : '-translate-x-full'}"
            style="z-index: 10000"
        >
            <div class="flex justify-between items-center p-4">
                <div class="flex items-center space-x-0">
                    <ThemeSwitch />
                </div>
                <IconButton icon="close" on:click={closeMenu} />
            </div>

            <CommonMenu />
        </nav>
    </div>
</div>
