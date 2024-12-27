<script>
    import { onMount } from 'svelte';
    import Icon from '../shared/Icon.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';
    import Button from '../shared/Button.svelte';
    import IconButton from '../shared/IconButton.svelte';
    import CommonMenu from './CommonMenu.svelte';
    import FlagMenu from './FlagMenu.svelte';

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

<div class="relative z-20 flex justify-start">
    <div class="mt-3">
        <Button
            idName="menu-button"
            customStyle={true}
            className={`text-primary-500 hover:text-primary-800 duration-300 transition-colors ${isOpen ? 'opacity-0' : ''}`}
            on:click={() => (isOpen = !isOpen)}
        >
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
                <div class="flex gap-5 justify-center items-center">
                    <ThemeSwitch />
                    <div class="mt-2">
                        <FlagMenu />
                    </div>
                </div>
                <IconButton icon="close" on:click={closeMenu} />
            </div>

            <CommonMenu on:click={closeMenu} />
        </nav>
    </div>
</div>
