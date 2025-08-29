<script lang="ts">
	import '../app.css';
	import { ModeWatcher, mode } from "mode-watcher";
	import { cn } from '$lib/utils';
	import Navbar from '../lib/customcomp/Navbar.svelte';
	let { children } = $props();
</script>

<ModeWatcher/>
<div class={cn(
    "bg-gradient-to-br w-screen h-screen justify-center flex items-center text-foreground duration-500 from-blue-400 via-20% via-pink-300 to-indigo-500",
    mode.current == 'dark' ? "from-gray-700 via-pink-950 to-gray-950" : '',
)}>
	<div class={`duration-300 bg-background w-[97%] h-[95%] rounded-2xl border-muted-foreground border-4 shadow-2xl flex flex-col text-black/85`}>
		<Navbar/>
		{@render children()}
	</div>
</div>
