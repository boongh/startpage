<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import ArrowBigLeftDash from '@lucide/svelte/icons/arrow-big-left-dash';
	let { query, commandinpref, SetMode } = $props();

	let iframeref = $state();
	let framewindow;

	$effect(() => {
		if (iframeref) {
			framewindow = iframeref.contentWindow;
		}
	});

	let returnList: string[] = $state(['2', '5']);

	$inspect(returnList);
</script>

<Command.List>
	<Command.Item
		onclick={() => {
			returnList = [...returnList, framewindow.eval(query).toString()];
			commandinpref.value = '';
		}}
	>
		Execute {query}
	</Command.Item>
	<Command.Item
		onclick={() => {
			SetMode('default');
		}}
	>
		<ArrowBigLeftDash />
		Leave playground
	</Command.Item>
	{#key returnList}
		<Command.Group>
			{#each returnList as returnval}
				<Command.Item>
					{returnval}
				</Command.Item>
			{/each}
		</Command.Group>
	{/key}
	<iframe class="w-full" title="Javascript environment" bind:this={iframeref}> </iframe>
</Command.List>
