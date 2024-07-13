<script>
    import Link from './Link.svelte';

    export let href = '';
    export let onClick;
    export let iconLeft = '';
    export let iconRight = '';
</script>

<li class="hover:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer">
    <Link href={href} className="block text-xl p-2 rounded" onClick={onClick}>
        <slot></slot>
    </Link>

</li>