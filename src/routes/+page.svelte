<script lang="ts">
	import Reminder from "./reminder.svelte"
	import Commandbar from "../lib/customcomp/commandbar.svelte";
	import Welcomename from "./welcomename.svelte";

	let name = "Boon"
</script>

<svelte:head>
	<title>Start</title>
	<meta name="" content="Simple start page" />
</svelte:head>

<div id="topSlot" class="w-full grow-1">
</div>
<div class="w-full grow-3 flex flex-row">
	<div id="leftSlot" class="h-full grow-1">
	</div>
	<div class="relative justify-center items-center h-full grow-2 rounded-2xl flex flex-col">
		<Welcomename/>
		<Commandbar/>
	</div>

	<div id="rightSlot" class="relative h-full grow-1 flex flex-row-reverse">
		<Reminder/>
	</div>
</div>
<div id="bottomSlot"class="w-full grow-1 flex justify-center">
</div>