<script>
    import MenuItem from './MenuItem.svelte';
    import { onMount } from 'svelte';
    import Icon from '../shared/Icon.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';
    import Button from '../shared/Button.svelte';
    import IconButton from '../shared/IconButton.svelte';
    import { t } from 'svelte-i18n';

    let isOpen = false;
    let connected = false;

    $: {
        const token = localStorage.getItem('apiToken');
        connected = token !== '' && token !== null && token !== undefined;
    }

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

            <ul class="space-y-4 p-4">
                <MenuItem iconLeft="home" href="/">{$t('menu.home')}</MenuItem>
                <MenuItem iconLeft="camera" href="/tassadraft">{$t('common.tassadraft')}</MenuItem>
                <MenuItem iconLeft="book" href="/tassadecks">{$t('common.tassadecks')}</MenuItem>
                <MenuItem iconLeft="camera" href="#">{$t('common.tassacards')}</MenuItem>
                <MenuItem iconLeft="settings" href="/settings">{$t('menu.settings')}</MenuItem>
                {#if connected}
                    <MenuItem iconLeft="user" href="/account">{$t('menu.account')}</MenuItem>
                    <MenuItem iconLeft="userRemove" href="/logout">{$t('menu.logout')}</MenuItem>
                {:else}
                    <MenuItem iconLeft="user" href="/login">{$t('menu.login')}</MenuItem>
                {/if}
            </ul>
        </nav>
    </div>
</div>
