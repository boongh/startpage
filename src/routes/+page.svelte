<script lang="ts">


	let name = "Boon"
	let suggestions = $state([]);

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
		} else {
			suggestions = []
		}
	})
	function Search(e){
		if (e.keyCode == 13){
			window.location.href = `${SearchEngine.Google}${query}`
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="bg-black w-screen h-screen flex flex-col justify-center items-center text-white">
	<div class="w-full grow-1">
		<span>Test text</span>
	</div>
	<div class="w-full grow-2 flex flex-row">
		<div class="h-full grow-1">
			<span>Test text</span>
		</div>
		<div class="relative justify-center items-center h-full grow-2 bg-white/1 rounded-2xl flex flex-col">
			<div class="grow-4 flex flex-col items-end justify-end">
				<span class="font-bold mb-4 text-3xl">Hi, {name}</span>
			</div>
			<div class="grow-1">
				<input type="text" bind:value={query}
				class="text-center align-text-bottom text-2xl bg-black/85 border-b-2 border-white h-12 pl-2 w-64 rounded-b-sm outline-none duration-100 md:w-full font-bold"
				onkeydown={Search}>
			</div>
			<div class="h-[200px]">
				<div id="Search suggestion"
					class="grow max-h-[200px] flex flex-col overflow-scroll">
					{#if suggestions.length > 0}
						{#each suggestions as suggestion}
							<a href={`${SearchEngine.Google}${suggestion.word}`}>{suggestion.word}</a>
						{/each}
						{/if}
				</div>
			</div>
		</div>
		
		<div class="h-full grow-1">
			<span>Test text</span>
		</div>
	</div>
	<div class="w-full grow-1">
		<span>{query}</span>
	</div>
</div>