<script>
    export let options;
    export let legend;
    export let userSelected = options[0].value;
    export let fontSize = 16;
    export let flexDirection = 'column'

    const uniqueID = Math.floor(Math.random() * 100)

    const slugify = (str = "") =>
        str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div role="radiogroup"
     class={`group-container flex ${flexDirection === 'column' ? 'flex-col' : 'flex-row'}`}
     aria-labelledby={`label-${uniqueID}`}
     style="font-size: {fontSize}px"
     id={`group-${uniqueID}`}>
    <div class="legend font-bold mb-2"
         id={`label-${uniqueID}`}>{legend}
    </div>
    {#each options as {value, label}}
        <input
                class="sr-only"
                type="radio"
                id={slugify(label)}
                bind:group={userSelected}
                value={value}/>
        <label for={slugify(label)} class="relative block text-left pl-8 cursor-pointer">
            {label}
            <span class="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
                <span class="w-2 h-2 rounded-full bg-primary-500 transform scale-0 transition-transform"></span>
            </span>
        </label>
    {/each}
</div>

<style>
    input[type="radio"]:checked + label .w-2.h-2 {
        transform: scale(1);
    }

    input[type="radio"]:focus + label .w-4.h-4 {
        box-shadow: 0 0 0 1px var(--primary-500);
    }

    input[type="radio"]:disabled + label {
        color: #b0b0b0;
    }

    input[type="radio"]:disabled + label .w-4.h-4 {
        background: #ccc;
    }
</style>
