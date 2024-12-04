<script>
    import Icon from './Icon.svelte';
    import Button from './Button.svelte';
    import Link from './Link.svelte';

    export let href;
    export let text;
</script>

<Button>
    <Link {href}>
        <div class="inline-block">
            <div class="flex flex-row gap-1">
                <Icon name="arrowLeft" />
                <p>{text}</p>
            </div>
        </div>
    </Link>
</Button>
