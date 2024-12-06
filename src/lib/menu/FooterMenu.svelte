<script>
    import MenuItem from './MenuItem.svelte';
    import { profile } from '../../stores/profileStore.js';
    import { t } from 'svelte-i18n';
</script>

<ul class="p-4">
    <MenuItem footer={true} iconLeft="home" href="/">{$t('menu.home')}</MenuItem>
    <MenuItem footer={true} iconLeft="camera" href="/tassadraft">{$t('common.tassadraft')}</MenuItem>
    <MenuItem footer={true} iconLeft="book" href="/tassadecks">{$t('common.tassadecks')}</MenuItem>
    <MenuItem footer={true} iconLeft="camera" href="#">{$t('common.tassacards')}</MenuItem>
    <MenuItem footer={true} iconLeft="settings" href="/settings">{$t('menu.settings')}</MenuItem>
    {#if $profile}
        <MenuItem footer={true} iconLeft="user" href="/profile">{$t('menu.profile')}</MenuItem>
        <MenuItem footer={true} iconLeft="userRemove" href="/logout">{$t('menu.logout')}</MenuItem>
    {:else}
        <MenuItem footer={true} iconLeft="user" href="/login">{$t('menu.login')}</MenuItem>
    {/if}
</ul>
