<script>
    import Icon from './Icon.svelte';
    import Button from './Button.svelte';
    import axios from 'axios';
    import Loader from './Loader.svelte';

    let canGoBack = false;
    let canGoForward = false;
    let loading = false;

    export let baseUrl;
    export let paginatedObject;
    export let containerRef = window;

    const handleClick = async (page, perPage) => {
        try {
            loading = true;
            const { data } = await axios.get(`${baseUrl}&page=${page}&perPage=${perPage}`);
            paginatedObject = data;
        } catch (error) {
            console.error('Failed to fetch paginated data:', error);
        } finally {
            loading = false;
            if (containerRef) {
                containerRef.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    };
    $: canGoBack = paginatedObject.currentPage > paginatedObject.firstPage;
    $: canGoForward = paginatedObject.currentPage < paginatedObject.lastPage;
</script>

<div class="my-2 flex flex-row gap-3 justify-center" class:hidden={paginatedObject.lastPage === 1}>
    {#if paginatedObject.currentPage}
        {#if !loading}
            <!-- First Page Button -->
            <Button disabled={!canGoBack} on:click={() => handleClick(paginatedObject.firstPage, paginatedObject.perPage)}>
                <Icon name="doubleArrowLeft" />
            </Button>
            <!-- Previous Page Button -->
            <Button disabled={!canGoBack} on:click={() => handleClick(paginatedObject.currentPage - 1, paginatedObject.perPage)}>
                <Icon name="chevronLeft" />
            </Button>
            <!-- Page Indicator -->
            <p>
                {paginatedObject.currentPage} / {paginatedObject.lastPage}
            </p>
            <!-- Next Page Button -->
            <Button disabled={!canGoForward} on:click={() => handleClick(paginatedObject.currentPage + 1, paginatedObject.perPage)}>
                <Icon name="chevronRight" />
            </Button>
            <!-- Last Page Button -->
            <Button disabled={!canGoForward} on:click={() => handleClick(paginatedObject.lastPage, paginatedObject.perPage)}>
                <Icon name="doubleArrowRight" />
            </Button>
        {:else}
            <Loader bind:loading />
        {/if}
    {/if}
</div>
