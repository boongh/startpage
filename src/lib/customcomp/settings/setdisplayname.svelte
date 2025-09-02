<script lang="ts">
    import Label from "$lib/components/ui/label/label.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    import { name, getName, setName} from "$lib/customcomp/sharedconfig/name.svelte"
	import { onMount } from "svelte";

    import { PushToast } from "../toast";

    let currentName : string = $state("User");

    onMount(() => {
        currentName = getName().name;
    })
</script>


<div class="max-w-screen w-fit outline-muted-foreground outline-2 m-2 rounded-sm">
    <Label class="text-md font-bold text-accent-foreground m-2">Display name</Label>
    <form class="flex flex-row">
        <Input bind:value={currentName} class="text-foreground font-semibold m-2" type="text"/>
        <Button onclick={() => {
            PushToast("Display Name", 
            `${currentName} set as your new display name`,
            "success",
            
        )
            setName(currentName);
        }}
        class="font-semibold m-2"
        >Save</Button>
    </form>
</div>