<script lang="ts">
	import NavBar from "./Navbar.svelte"
	import Reminder from "./reminder.svelte"
	import { cn } from "$lib/utils";
	import { mode } from "mode-watcher";

	let name = "Boon"
	let suggestions = $state(["suggestion1", "suggestion2", "suggestion3"]);

	const SearchEngine = {
		Google: "https://www.google.com/search?q=",
		DuckDuckGo: "https://duckduckgo.com/?q=",
	}

	const suggestionsAPI = 'https://api.datamuse.com/sug?s=';

	let query = $state(``);

	$effect(()=>{
		if(query != ""){
			fetch(suggestionsAPI + query + "&max=10").then((response) =>{
				return response.json()
			}).then((response) =>{
				suggestions = response;
			})
		}
	})
	function Search(e){
		if (e.keyCode == 13){
			window.location.href = `${SearchEngine.Google}${query}`
		}
	}
</script>

<svelte:head>
	<title>Start</title>
	<meta name="" content="Simple start page" />
</svelte:head>

<div class={cn(
    "bg-gradient-to-br w-screen h-screen justify-center flex items-center text-foreground duration-500 from-blue-400 via-20% via-pink-300 to-indigo-500",
    mode.current == 'dark' ? "from-gray-700 via-pink-950 to-gray-950" : '',
)}>
	<div class={`duration-300 bg-background w-[97%] h-[95%] rounded-2xl border-foreground border-4 shadow-2xl flex flex-col duration-50 text-black/85`}>

		<div id="topSlot" class="w-full grow-1">
			<NavBar/>
		</div>
			<div class="w-full grow-1 flex flex-row">
				<div id="leftSlot" class="h-full grow-1">
				</div>
				<div class="relative justify-center items-center h-full grow-2 rounded-2xl flex flex-col">
					<div class=" text-foreground grow-4 flex flex-col items-end justify-end">
						<span class="font-bold mb-4 text-3xl">Hi, <span class="text-muted-foreground font-extrabold">{name}</span></span>
					</div>
					<div class="grow-1 w-full justify-center items-center flex">
						<input type="text" bind:value={query}
						class="text-center grow-1 align-text-bottom text-2xl text-foreground bg-black-[99%] border-b-2 border-foreground h-12 pl-2 w-64 rounded-b-sm outline-none duration-100 md:w-full font-bold"
						onkeydown={Search}>
					</div>
					<div class="flex flex-row grow-4 relative w-full justify-center">
						<div id="Search suggestion"
						class="flex flex-col absolute left-0 overflow-scroll text-muted-foreground text-2xl font-semibold w-full items-center">
						{#if suggestions.length > 0}
							{#each suggestions as suggestion}
							<a class="text-center w-fit"
							href={`${SearchEngine.Google}${suggestion.word}`}>{suggestion.word}</a>
							{/each}
						{/if}
						</div>
					</div>
				</div>
			
				<div id="rightSlot" class="relative h-full grow-1 flex flex-row-reverse flex-none">
					<Reminder/>
				</div>
			</div>
		<div id="bottomSlot"class="w-full grow-5 flex justify-center">
		</div>
	</div>
</div>