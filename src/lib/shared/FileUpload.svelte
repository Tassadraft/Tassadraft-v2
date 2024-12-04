<script>
    import Icon from './Icon.svelte';
    import { t } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import { raw } from '../../service/stringService.js';

    export let name = '';
    export let description = '';
    export let title = null;
    export let width = '96';
    export let accept = '';
    export let path = '';
    export let fileName = '';

    let acceptedFormats = '';
    let file = null;
    let isDragging = false;
    let previewSrc = `${process.env.VITE_TASSADAPI_BASE_URL}/${path}`;

    onMount(() => {
        title = title ?? $t('common.file.description');
        description = description ?? $t('common.file.description');
        acceptedFormats = accept
            .split(' ')
            .map((format) => `.${format}`)
            .join(',');
    });

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            file = files[0];
            fileName = file.name;

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                previewSrc = '';
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        isDragging = true;
    };

    const handleDragLeave = () => {
        isDragging = false;
    };

    const handleDrop = (event) => {
        event.preventDefault();
        isDragging = false;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            file = files[0];
            fileName = file.name;

            // Generate a preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                previewSrc = '';
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            document.getElementById('file-upload').click();
        }
    };
</script>

<div class="flex flex-col w-full my-5">
    {#if title}
        <h3 class="font-semibold text-center mb-2">{title}</h3>
    {/if}
    <button
        type="button"
        class={`w-${width} flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 m-auto p-3`}
        class:bg-blue-50={isDragging}
        class:border-blue-500={isDragging}
        on:click={() => document.getElementById('file-upload').click()}
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
        on:drop={handleDrop}
        on:keydown={handleKeyDown}
        aria-label="File uploader"
    >
        <input id="file-upload" type="file" class="hidden" {name} accept={acceptedFormats} on:change={handleFileChange} />
        <Icon name="upload" size="35" color="primary" />
        <span class="text-center text-sm text-gray-500 my-3">
            {#if fileName}
                {#if previewSrc}
                    <div class="mt-3 flex justify-center">
                        <img src={previewSrc} alt="Preview" class="w-24 h-24 object-cover rounded" />
                    </div>
                {:else}
                    {fileName}
                {/if}
            {:else}
                {@html raw(description)}
            {/if}
        </span>
    </button>
</div>
