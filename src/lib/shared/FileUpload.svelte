<script>
    import Icon from "./Icon.svelte";

    export let name = '';
    export let description = 'Drag & drop or click to select a file.';
    export let title = null;
    export let width = '64';
    export let accept = '';

    let fileName = '';
    let file = null;
    let isDragging = false;

    $: acceptedFormats = accept.split(' ').map(format => `.${format}`).join(',');

    function handleFileChange(event) {
        const files = event.target.files;
        if (files.length > 0) {
            file = files[0];
            fileName = file.name;
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        isDragging = true;
    }

    function handleDragLeave() {
        isDragging = false;
    }

    function handleDrop(event) {
        event.preventDefault();
        isDragging = false;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            file = files[0];
            fileName = file.name;
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            document.getElementById('file-upload').click();
        }
    }
</script>

<div class="flex flex-col w-full my-5">
    {#if title}
        <h3 class="font-semibold text-center mb-2">{title}</h3>
    {/if}
    <button
            type="button"
            class={`w-${width} flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 m-auto`}
            class:bg-blue-50="{isDragging}"
            class:border-blue-500="{isDragging}"
            on:click={() => document.getElementById('file-upload').click()}
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            on:drop={handleDrop}
            on:keydown={handleKeyDown}
            aria-label="File uploader">
        <input
                id="file-upload"
                type="file"
                class="hidden"
                {name}
                accept={acceptedFormats}
        on:change={handleFileChange}
        />
        <Icon name="upload" size="35" color="primary" />
        <span class="text-center text-sm text-gray-500 mt-2">
            {#if fileName}
                {fileName}
            {:else}
                {description}
            {/if}
        </span>
    </button>
</div>
