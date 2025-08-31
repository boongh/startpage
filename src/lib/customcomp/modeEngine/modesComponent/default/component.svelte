<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { computeCommandScore } from 'bits-ui';
	import CalculatorIcon from '@lucide/svelte/icons/calculator';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import Languages from "@lucide/svelte/icons/languages"
	import SmileIcon from '@lucide/svelte/icons/smile';
	import UserIcon from '@lucide/svelte/icons/user';

	const SearchEngine = {
		Google: 'https://www.google.com/search?q=',
		DuckDuckGo: 'https://duckduckgo.com/?q='
	};

	const suggestionsAPI = 'https://api.datamuse.com/sug?s=';

	let suggestions = $state([]);

	let { query, commandinpref, children, SetMode } = $props();

	$effect(() => {
		if (query != '') {
			fetch(suggestionsAPI + query + '&max=10')
				.then((response) => {
					let a = response.json();
					return a;
				})
				.then((response) => {
					suggestions = response;
				});
		}
	});

	function SearchHandler(query: string, engineURL: string) {
		window.location.href = `${engineURL}${query}`;
	}
</script>

{#if query == ''}
	<Command.List>
		<Command.Group heading="Commands">
			<Command.Item onSelect={(() => {query = ""})}>
				<CalendarIcon />
				<span>Clear</span>
			</Command.Item>
			<Command.Item onSelect={(() => {
				commandinpref.value = ""
				SetMode("translate")
				})}
				value="Translate"
				>
				<Languages />
				<span>Translate</span>
			</Command.Item>
			<Command.Item disabled>
				<CalculatorIcon />
				<span>Calculator</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
{:else}
	<Command.List>
		<Command.Group>
			<Command.Item onSelect={(() => {commandinpref.value = ""})}>
				<CalendarIcon />
				<span>Clear</span>
			</Command.Item>
			<Command.Item onSelect={(() => {
				commandinpref.value = ""
				SetMode("translate")
				})}
				value="Translate"
				>
				<Languages />
				<span>Translate</span>
			</Command.Item>
			<Command.Item disabled>
				<CalculatorIcon />
				<span>Calculator</span>
			</Command.Item>
		</Command.Group>
		{#key query}
			<Command.Group heading="Direct Search">
				<Command.LinkItem
					value={' ' + query}
					onSelect={() => SearchHandler(query, SearchEngine.Google)}
				>
					<span>{query}</span>
				</Command.LinkItem>
			</Command.Group>
		{/key}
		{#key suggestions}
			<Command.Group>
				{#if suggestions.length > 0}
					{#each suggestions as suggestion}
						<Command.LinkItem
							value={suggestion.word}
							onSelect={() => SearchHandler(suggestion.word, SearchEngine.Google)}
						>
							<span>{suggestion.word}</span>
						</Command.LinkItem>
					{/each}
				{/if}
			</Command.Group>
		{/key}
	</Command.List>
{/if}
