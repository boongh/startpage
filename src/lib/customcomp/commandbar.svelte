<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { onMount } from 'svelte';

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
</script>

<div class="h-96 w-[90%] md:w-[70%] duration-75">
	<Command.Root class="h-fit w-full overflow-ellipsis" filter={filter.Filter}>
		<Command.Input
			placeholder="Type a command or search..."
			bind:value={query}
			bind:ref={commandinpref}
		/>
		<Command.Empty>No results found.</Command.Empty>
		{#if ModeComponent}
			<ModeComponent {query} {commandinpref} {SetMode}></ModeComponent>
		{/if}
	</Command.Root>
</div>
