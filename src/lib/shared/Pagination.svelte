<script>
    import Icon from './Icon.svelte';
    import Button from './Button.svelte';
    import axios from '../../axiosConfig.js';
    import Loader from './Loader.svelte';

    let canGoBack = false;
    let canGoForward = false;
    let loading = false;

    export let baseUrl = '';
    export let paginatedObject = {};

    const handleClick = async (page, perPage) => {
        loading = true;
        const { data } = await axios.get(`${baseUrl}&page=${page}&per_page=${perPage}`);
        paginatedObject = data;
        loading = false;
    };

    $: {
        canGoBack = !paginatedObject.currentPage || paginatedObject.currentPage !== paginatedObject.firstPage;
        canGoForward = !paginatedObject.currentPage || paginatedObject.currentPage !== paginatedObject.lastPage;
        console.log(canGoBack, canGoForward, paginatedObject);
    }
</script>

<div class="my-2 flex flex-row gap-3 justify-center {paginatedObject.lastPage === 1 ? 'hidden' : ''}">
    {#if paginatedObject.currentPage}
        {#if !loading}
            <Button disabled={!canGoBack} on:click={() => handleClick(paginatedObject.firstPage, paginatedObject.perPage)}>
                <Icon name="doubleArrowLeft" />
            </Button>
            <Button disabled={!canGoBack} on:click={() => handleClick(paginatedObject.currentPage - 1, paginatedObject.perPage)}>
                <Icon name="chevronLeft" />
            </Button>
            <p class="dark:text-white">
                {paginatedObject.currentPage ?? 1} / {paginatedObject.lastPage}
            </p>
            <Button disabled={!canGoForward} on:click={() => handleClick(paginatedObject.currentPage + 1, paginatedObject.perPage)}>
                <Icon name="chevronRight" />
            </Button>
            <Button disabled={!canGoForward} on:click={() => handleClick(paginatedObject.lastPage, paginatedObject.perPage)}>
                <Icon name="doubleArrowRight" />
            </Button>
        {:else}
            <Loader bind:loading />
        {/if}
    {/if}
</div>
