<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { computeCommandScore } from 'bits-ui';
	import CalculatorIcon from '@lucide/svelte/icons/calculator';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import Languages from '@lucide/svelte/icons/languages';
	import SmileIcon from '@lucide/svelte/icons/smile';
	import UserIcon from '@lucide/svelte/icons/user';
	import Eraser from '@lucide/svelte/icons/eraser';
	import AllModes from '$lib/customcomp/modeEngine/modesConfig.json';
	import { Icon } from 'svelte-sonner';

	const SearchEngine = {
		Google: {
			Default: 'https://www.google.com/search?q=',
			Image: 'https://www.google.com/search?udm=2&q=',
			Map: 'https://www.google.com/maps/search/'
		},
		DuckDuckGo: {
			Default: 'https://duckduckgo.com/?q=',
			Image: `https://duckduckgo.com/?t=h_&ia=images&iax=images&q=`,
			Map: 'https://duckduckgo.com/?t=h_&iaxm=maps&source=places&q='
		}
	};

	let option = $state({ Engine: 'Google', 'Search Mode': 'Default' });

	const AllOptions = {
		Engine: [
			[
				'Google',
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>'
			],
			[
				'DuckDuckGo',
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>'
			]
		],
		'Search Mode': [
			[
				'Default',
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>'
			],
			[
				'Image',
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>'
			],
			[
				'Map',
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>'
			]
		]
	};

	const suggestionsAPI = 'https://api.datamuse.com/sug?s=';

	let suggestions: { word: string }[] = $state([{}]);

	let { query, commandinpref, children, SetMode, PushPopup, SetExtraParam } = $props();

	$inspect(option);

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

	function SearchHandler(query: string, option: Object) {
		option = JSON.parse(JSON.stringify(option));
		let engineURL = SearchEngine[option.Engine][option['Search Mode']];

		// console.log(option)
		// console.log(option.Engine);
		// console.log(option["Search Mode"]);
		// console.log(SearchEngine[option.Engine]);
		// console.log(SearchEngine[option.Engine][option["Search Mode"]]);
		//PushPopup("", `${engineURL}${query}`)
		window.location.href = `${engineURL}${query}`;
	}
</script>

{#snippet SearchOptions(useHeading : boolean = false, useHint : boolean = false)}
	<Command.Group heading={useHeading ? 'Options' : undefined}>
		{#each Object.entries(AllOptions) as [key, vals]}
			{#each vals as [name, icon]}
				<Command.Item
					onSelect={() => {
						SetExtraParam(option);
						option[key] = name;
					}}
					value={`${name}`}
					keywords={["Options", "op"]}
				>
					{@html icon}
					<span class="text-center align-middle text-foreground">{name}</span>
					{#if useHint}
						<Command.Shortcut>Options</Command.Shortcut>
					{/if}
				</Command.Item>
			{/each}
		{/each}
	</Command.Group>
{/snippet}

{#snippet ModeSelector(useHeading: boolean, useHint: boolean)}
	<Command.Group heading={useHeading ? 'Modes' : undefined}>
		{#each AllModes.modes as { name, icon, source, disabled }}
			<Command.Item
				onSelect={() => {
					commandinpref.value = '';
					SetMode(source);
				}}
				value={`${name}`}
				keywords={["mode", "m"]}
				{disabled}
			>
				{@html icon}
				{name}
				{#if useHint}
					<Command.Shortcut>Modes</Command.Shortcut>
				{/if}
			</Command.Item>
		{/each}
	</Command.Group>
{/snippet}

{#snippet test()}
	<Command.Item
		onSelect={() => {
			PushPopup('Normal', "Content", "default");
		}}
		value="a61tgs9SUA9AWWAmJO55sN9XahhXAIeT"
	>
		Ping Toast
	</Command.Item>
	<Command.Item
		onSelect={() => {
			PushPopup('Warning', "Content", "warning");
		}}
		value="bHKZYTBQexgAnkKCF6GRrB40mWY3ygMO"
	>
		Ping warning
	</Command.Item>
	<Command.Item
		onSelect={() => {
			PushPopup('Error', "Content", "error");
		}}
		value="cxW0Ecdm2NYCiba71hB1yN0dga4M9I6h"
	>
		Ping error
	</Command.Item>
	<Command.Item
		onSelect={() => {
			PushPopup('Success', "Content", "success");
		}}
		value="1TOOrDm23jUBrekvGZOHf4A8B126cuNh"
	>
		Ping success
	</Command.Item>
		<Command.Item
		onSelect={() => {
			PushPopup('Info', "Content", "info");
		}}
		value="r3OKTJlnVSGtqygUi8k6HBXzlq57IXvg"
	>
		Ping info
	</Command.Item>
{/snippet}

{#if query == ''}
	<Command.List>
		<!-- {@render test()} -->
		{@render ModeSelector(true, false)}
		{@render SearchOptions(true, false)}
	</Command.List>
{:else}
	<Command.List>
		{#key query}
			<Command.Group heading="Direct Search">
				<Command.LinkItem value={' ' + query} onSelect={() => SearchHandler(query, option)}>
					<span class="w-full overflow-x-scroll">{query}</span>
				</Command.LinkItem>
			</Command.Group>
		{/key}
		<!-- {@render test()} -->
		{@render ModeSelector(false, true)}
		{@render SearchOptions(false, true)}
		{#key suggestions}
			{#if suggestions.length > 0}
				<Command.Group>
					{#each suggestions as suggestion}
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
{/if}
