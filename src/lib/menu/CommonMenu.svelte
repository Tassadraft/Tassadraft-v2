<script>
    import MenuItem from './MenuItem.svelte';
    import { t } from 'svelte-i18n';
    import { profile } from '../../stores/profileStore.js';

    export let footer = false;
</script>

<ul class={`${footer ? '' : 'space-y-4'} p-4`}>
    <MenuItem {footer} iconLeft="home" href="/">{$t('menu.home')}</MenuItem>
    <MenuItem {footer} iconLeft="camera" href="/tassadraft">{$t('common.tassadraft')}</MenuItem>
    <MenuItem {footer} iconLeft="book" href="/tassadecks">{$t('common.tassadecks')}</MenuItem>
    <MenuItem {footer} iconLeft="camera" href="#">{$t('common.tassacards')}</MenuItem>
    <MenuItem {footer} iconLeft="settings" href="/settings">{$t('menu.settings')}</MenuItem>
    {#if $profile}
        <MenuItem {footer} iconLeft="user" href="/profile">{$t('menu.profile')}</MenuItem>
        <MenuItem {footer} iconLeft="userRemove" href="/logout">{$t('menu.logout')}</MenuItem>
    {:else}
        <MenuItem {footer} iconLeft="user" href="/login">{$t('menu.login')}</MenuItem>
    {/if}
</ul>
