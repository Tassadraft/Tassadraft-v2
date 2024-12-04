<script>
    import Title from '../shared/Title.svelte';
    import Menu from '../menu/Menu.svelte';
    import { t } from 'svelte-i18n';
    import BackTo from '../shared/BackTo.svelte';
</script>

<Menu />

<div class="absolute top-0 left-0 w-full h-screen flex flex-col gap-5 justify-center align-middle text-center pointer-events-none">
    <div class="flex flex-col gap-5 pointer-events-auto">
        <Title title={$t('not-found.title')} />
        <BackTo href="/" text={$t('common.back-to-home')} />
    </div>
</div>
