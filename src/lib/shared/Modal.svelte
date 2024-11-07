<script>
    import Button from './Button.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let showModal = false;
    export let closeText = 'Close';
    export let successText = '';
    export let fullWidth = false;
    let dialog;

    const handleSuccess = () => {
        dispatch('success');
        dialog.close();
    };

    $: if (dialog) {
        if (showModal) {
            dialog.showModal();
            dispatch('open');
        } else {
            dialog.close();
        }
    }
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)} class="rounded-lg border-none p-0 {fullWidth ? 'w-9/10' : 'max-w-lg'}">
    <Button
        type="button"
        ariaLabel="Close modal"
        className="fixed inset-0 w-full h-full cursor-default"
        customStyle={true}
        on:click={() => dialog.close()}
    />

    <div class="p-4 bg-white dark:bg-gray-700 rounded-lg relative">
        <slot name="header" />
        <hr class="my-2" />
        <slot />
        <hr class="my-2" />
        <div class="flex flex-row justify-center">
            {#if successText}
                <div class="flex flex-row justify-center space-x-12 w-full">
                    <Button on:click={handleSuccess}>
                        {successText}
                    </Button>
                    <Button on:click={() => dialog.close()}>
                        {closeText}
                    </Button>
                </div>
            {:else}
                <Button className="mx-auto" on:click={() => dialog.close()}>
                    {closeText}
                </Button>
            {/if}
        </div>
    </div>
</dialog>

<style>
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
