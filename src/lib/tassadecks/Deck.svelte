<script>
    import Menu from "../menu/Menu.svelte";
    import Title from "../shared/Title.svelte";
    import {onMount} from "svelte";
    import axios from "../../axiosConfig.js";

    export let deckId = "";

    onMount(async () => {
        const {data: deck } = await axios.post(`/api/auth/reserved/decks/${deckId}`, {
            languageCode: localStorage.getItem('languageCode'),
        });
        console.log(deck);
    });
</script>

<Menu />
<Title title="Deck editor" />
