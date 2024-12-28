<script>
    import { onMount } from 'svelte';
    import Button from '../shared/Button.svelte';
    import Icon from '../shared/Icon.svelte';
    import { locale } from 'svelte-i18n';
    import { setLanguage } from '../../stores/languageStore.js';

    let flags = [
        { icon: 'englishFlag', label: 'English', value: 'en' },
        { icon: 'frenchFlag', label: 'Français', value: 'fr' },
    ];
    let selectedFlag = flags[0];
    let chevronIcon = 'chevronDown';
    let isExpanded = false;
    let popoverEl;
    let buttonEl;

    const togglePopover = () => {
        isExpanded = !isExpanded;
    };

    const selectFlag = (flag) => {
        localStorage.setItem('language', flag.value);
        setLanguage(flag.value);
        locale.set(flag.value);
        selectedFlag = flag;
        isExpanded = false;
    };

    const handleClickOutside = (event) => {
        if (popoverEl && !popoverEl.contains(event.target) && !buttonEl.contains(event.target)) {
            isExpanded = false;
        }
    };

    onMount(() => {
        selectedFlag = flags.find((flag) => flag.value === localStorage.getItem('language')) || flags[0];

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    });
</script>

<div class="relative inline-block" bind:this={buttonEl}>
    <Button customStyle={true} className="mb-2 flex items-center space-x-2" on:click={togglePopover}>
        <Icon bind:name={selectedFlag.icon} />
        <div class="dark:text-primary-500 transform transition-transform duration-300" class:rotate-180={isExpanded}>
            <Icon bind:name={chevronIcon} />
        </div>
    </Button>

    {#if isExpanded}
        <div
            class="absolute mt-2 bg-white dark:bg-gray-800 shadow-md rounded-lg z-50 w-32 p-2 border border-gray-200"
            bind:this={popoverEl}
            style="right: 0;"
        >
            {#each flags as flag}
                <Button
                    customStyle={true}
                    className="w-full flex items-center space-x-2 mb-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md shadow-md {selectedFlag.value ===
                    flag.value
                        ? 'shadow-green-500'
                        : ''}"
                    on:click={() => selectFlag(flag)}
                >
                    <Icon name={flag.icon} />
                    <p class="capitalize">{flag.label}</p>
                </Button>
            {/each}
        </div>
    {/if}
</div>
