<script>
	import { onMount } from "svelte";
    import { name, setName, getName} from "./name.svelte"
    onMount(() => {
        getName();
    })
    $inspect(name)
</script>

<div class=" text-foreground flex flex-col items-end justify-end">
    <span class="font-bold mb-4 text-3xl">Hi, <span class="text-muted-foreground font-extrabold">{name.name}</span></span>
</div>