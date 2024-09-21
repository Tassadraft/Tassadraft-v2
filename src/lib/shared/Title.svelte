<script>
    export let title;

    $: document.title = title;
</script>

<h1 class="text-3xl font-bold mb-2">{title}</h1>
