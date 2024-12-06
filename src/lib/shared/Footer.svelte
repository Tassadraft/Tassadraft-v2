<script>
    import FooterMenu from '../menu/FooterMenu.svelte';
    import MenuItem from '../menu/MenuItem.svelte';
    import { t } from 'svelte-i18n';
</script>

<footer class="w-full dark:bg-gray-950 p-5">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div class="px-1">
            <ul class="p-4">
                <MenuItem target="_blank" footer={true} iconLeft="openSource" href={process.env.VITE_GITHUB_REPOSITORY}
                    >{$t('menu.source-code')}</MenuItem
                >
            </ul>
        </div>
        <div class="px-1">
            <FooterMenu />
        </div>
        <div class="px-1">
            <ul class="p-4">
                <MenuItem footer={true} iconLeft="gavel" href="/legals">{$t('menu.legals')}</MenuItem>
                <MenuItem footer={true} iconLeft="search" href="/terms-and-conditions">{$t('menu.terms-and-conditions')}</MenuItem>
                <MenuItem footer={true} iconLeft="pen" href="/contact">{$t('menu.contact')}</MenuItem>
            </ul>
        </div>
    </div>
</footer>
