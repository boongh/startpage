<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { onMount } from 'svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Label from '$lib/components/ui/label/index.js';

	let query = $state(``);
	let ModeComponent = $state();
	let filter: {
		Filter: (commandValue: string, search: string, commandKeywords?: string[]) => number;
	} = $state({
		Filter: () => {
			return 0;
		}
	});
	let commandinpref: HTMLElement | null | undefined = $state(null);

	let commandmode = $state('default');

	async function LoadMode(mode: string) {
		filter = await import(`$lib/customcomp/modeEngine/modesComponent/${mode}/filter.svelte.ts`);
		ModeComponent = (
			await import(`$lib/customcomp/modeEngine/modesComponent/${mode}/component.svelte`)
		).default;
		console.log('new mode: ', mode);
		SetMode(mode);
	}

	function SetMode(mode: string) {
		commandmode = mode;
	}

	$effect(() => {
		LoadMode(commandmode);
	});

	let alertContent = $state('');
	let alertHeader = $state('');

	function PushPopup(Header: string, Content: string) {
		alertHeader = Header;
		alertContent = Content;
	}

	$inspect(alertContent);
</script>

<div class="h-96 w-[90%] duration-75 md:w-[70%]">
	<Label.Root
		id="terms-label"
		for="commandinput"
		class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed select-none peer-disabled:opacity-70 text-muted-foreground m-2"
	>
		Mode: {commandmode}
	</Label.Root>
	<Command.Root class="h-fit w-full overflow-ellipsis" filter={filter.Filter}>
		<Command.Input
			id="commandinput"
			placeholder="Type a command or search..."
			bind:value={query}
			bind:ref={commandinpref}
		/>
		<Command.Empty>No results found.</Command.Empty>
		{#if ModeComponent}
			<ModeComponent {query} {commandinpref} {SetMode} {PushPopup}></ModeComponent>
		{/if}
	</Command.Root>
	{#if alertContent}
		<Alert.Root>
			<Alert.Title>{alertHeader}</Alert.Title>
			<Alert.Description>{alertContent}</Alert.Description>
		</Alert.Root>
	{/if}
	
</div>
