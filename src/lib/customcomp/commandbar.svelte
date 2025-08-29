<script lang="ts">
    import * as Command from "$lib/components/ui/command/index.js";
    import { computeCommandScore } from "bits-ui";
	import { Item, List } from "$lib/components/ui/navigation-menu";
    import CalculatorIcon from "@lucide/svelte/icons/calculator";
    import CalendarIcon from "@lucide/svelte/icons/calendar";
    import CreditCardIcon from "@lucide/svelte/icons/credit-card";
    import SettingsIcon from "@lucide/svelte/icons/settings";
    import SmileIcon from "@lucide/svelte/icons/smile";
    import UserIcon from "@lucide/svelte/icons/user";


    let suggestions = $state([{word: "Suggestion1"}, {word: "Suggestion2"},{word: "Suggestion3"}]);

    let myState = $state("");
    $inspect(myState)

	const SearchEngine = {
		Google: "https://www.google.com/search?q=",
		DuckDuckGo: "https://duckduckgo.com/?q=",
	}

	const suggestionsAPI = 'https://api.datamuse.com/sug?s=';

	let query = $state(``);

	$effect(()=>{
		if(query != ""){
			fetch(suggestionsAPI + query + "&max=10").then((response) =>{
                let a = response.json()
				return a
			}).then((response) =>{
				suggestions = response;
			})
		}
	})
	function onKeyDown(e){
	}

    function SearchHandler(query: string, engineURL: string){
        window.location.href = `${engineURL}${query}`
    }

    function customFilter(
        commandValue: string,
        search: string,
        commandKeywords?: string[]
    ): number {
        const score = computeCommandScore(commandValue, search, commandKeywords);
        // Add custom logic here
        return score;
    }
</script>

<Command.Root class="h-96 overflow-ellipsis" bind:value={myState}
filter={customFilter}>
    <Command.Input placeholder="Type a command or search..." bind:value={query}/>
    <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    {#key query}
        {#if query !== ""}
            <Command.Group heading="Direct Search">
                <Command.LinkItem
                    value={query}
                    onSelect={() => SearchHandler(query, SearchEngine.Google)}
                >
                    <span>{query}</span>
                </Command.LinkItem>
            </Command.Group>
        {/if}
    {/key}
        <Command.Group heading="Suggestions">
            <Command.Item>
                <CalendarIcon />
                <span>Calendar</span>
            </Command.Item>
            <Command.Item>
                <SmileIcon />
                <span>Search Emoji</span>
            </Command.Item>
            <Command.Item disabled>
                <CalculatorIcon />
                <span>Calculator</span>
            </Command.Item>
        </Command.Group>
        {#key suggestions}
        {#if suggestions.length > 0}
        <Command.Group heading="Search Suggestion">
            {#each suggestions as suggestion (suggestion.word)}
            <Command.LinkItem
                value={suggestion.word}
                onSelect={() => SearchHandler(suggestion.word, SearchEngine.Google)}
            >
                <span>{suggestion.word}</span>
            </Command.LinkItem>
            {/each}
        </Command.Group>
        {/if}    
        {/key}
    </Command.List>
        
</Command.Root>