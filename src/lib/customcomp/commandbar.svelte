<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Label from '$lib/components/ui/label/index.js';
	import { toast } from "svelte-sonner"
	import { toastconfig, getToastConfig } from './sharedconfig/toastconfig.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import {  PushToast as PushPopup } from './toast';

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
	let extraParam = $state({});

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

	function SetExtraParam(Param: Object) {
		extraParam = Param;
	}

	$effect(() => {
		LoadMode(commandmode);
	});
</script>


<div class="h-96 w-[90%] max-w-sm md:max-w-2xl lg:bg-red lg:max-w-4xl duration-75 md:w-[100%]">
	{#key [commandmode, extraParam]}
		<Label.Root
			id="terms-label"
			for="commandinput"
			class="m-2 text-sm leading-none font-medium text-muted-foreground select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Mode: {commandmode}
			{#each Object.entries(extraParam) as [key, val]}
				{key} : {val}&nbsp;
			{/each}
		</Label.Root>
	{/key}
	<Command.Root class="h-fit w-full overflow-ellipsis" filter={filter.Filter}>
		<Command.Input
			id="commandinput"
			placeholder="Type a command or search..."
			bind:value={query}
			bind:ref={commandinpref}
		/>
		<Command.Empty>No results found.</Command.Empty>
		{#if ModeComponent}
			<ModeComponent {query} {commandinpref} {SetMode} {PushPopup} {SetExtraParam}></ModeComponent>
		{/if}
	</Command.Root>
</div>
