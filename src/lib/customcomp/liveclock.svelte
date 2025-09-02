<script lang="ts">
	import { onMount } from "svelte";

    let localTime = $state("");
    let localDate = $state("");

    let intervalId : number | undefined = undefined;

    onMount(() => {
        
        if(intervalId) clearInterval(intervalId);
        
        localTime = new Date().toLocaleTimeString()
        localDate = new Date().toLocaleDateString()

        intervalId = setInterval(() => {
            localTime = new Date().toLocaleTimeString()
            localDate = new Date().toLocaleDateString()
        }, 1000);
    

    })

</script>


<div class="text-foreground flex flex-col items-center justify-center">
    <span class="font-bold text-6xl">{localTime}</span>
    <span class="font-bold text-md">{localDate}</span>  
</div>