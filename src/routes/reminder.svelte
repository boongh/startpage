<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import { onMount } from "svelte";
    let reminders = $state<Record<string, { label: any, state: boolean }>>({});
    let newLabel = $state("");

    import { fade, slide } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { expoInOut } from "svelte/easing";

    onMount(()=>{
        if(window !== null){
            let localreminders = window.localStorage.getItem("@startpage/reminders");
            if(localreminders){
                reminders = JSON.parse(localreminders)
            }
        }
    })

    $inspect(reminders)
    function addReminder(){
        if(newLabel !== ""){
            const label = newLabel
            const id = label + new Date().getMilliseconds().toString()
            reminders[id] = {label: label, state: false}
            if(window !== null){
                window.localStorage.setItem("@startpage/reminders", JSON.stringify(reminders))
            }
            newLabel = "";
        }
    }
</script>

<div class="relative flex flex-col font-bold flex-initial">
    <div class="flex flex-row absolute top-0 right-0">
        <input type="text" bind:value={newLabel} class="focus:outline-none border-b-foreground border-b-2 text-foreground" onkeydown={(e) => {
            console.log("ley down", e.key)
            if(e.key === 'Enter'){
                addReminder();
            }
        }}>
        <button onclick={
            addReminder
        } aria-labelledby="Add new"
        class="hover:bg-black/5 rounded-sm">
            <svg class="fill-foreground" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </button>
    </div>
    <ul class="absolute right-0 top-8 overflow-y-scroll flex-col flex justify-start gap-1 h-full">
        {#each Object.entries(reminders) as [id, {state, label}]}
            {#if state === false}
                <div class="flex flex-row items-center gap-2 border-b-muted-foreground justify-end border-b-2 p-2 mr-4"
                transition:fade={{ duration: 400 }}>
                <span class="text-foreground">{label}</span>
                    <Checkbox id="terms" class="w-4 h-4 shadow-none" bind:checked= {reminders[id].state}/>
                </div>
            {:else}
                {delete reminders[id]}
                {window.localStorage.setItem("@startpage/reminders", JSON.stringify(reminders))}
            {/if}
        {/each}
    </ul>
</div>