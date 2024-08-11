<script>
    import Icon from "./Icon.svelte";

    let fileName = '';
    let file = null;
    let isDragging = false;

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
</script>

<div
        class="w-64 h-48 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-colors duration-300"
        class:bg-blue-50="{isDragging}"
        class:border-blue-500="{isDragging}"
        on:click={() => document.getElementById('file-upload').click()}
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
        on:drop={handleDrop}
>
    <input
            id="file-upload"
            type="file"
            class="hidden"
            on:change="{handleFileChange}"
    />
    <Icon name="upload" size="35" />
    <p class="text-center text-sm text-gray-500 mt-2">
        {#if fileName}
            {fileName}
        {:else}
            Drag & drop or click to select a file
        {/if}
    </p>
</div>
