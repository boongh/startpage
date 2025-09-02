<script lang="ts">
	import '../app.css';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { cn } from '$lib/utils';
	import Navbar from '../lib/customcomp/Navbar.svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import {toastconfig, getToastConfig } from '$lib/customcomp/sharedconfig/toastconfig.svelte.ts'
	let { children } = $props();
</script>

<ModeWatcher />
<Toaster
	duration={toastconfig.duration}
	toastOptions={{
		unstyled: true,
		classes: {
			toast:
				'bg-muted w-full max-w-screen backdrop-blur-md h-fit flex flex-row m-4 p-2 gap-4 justify-start items-center rounded-md',
			title: 'pr-2 font-semibold text-toast-header-text',
			description: 'pr-2 text-toast-description-text',
			closeButton: 'absolute top-[-0.3rem] left-[-0.3rem] bg-muted rounded-full w-5 h-5 flex justify-center items-center',
			actionButton:
				'p-2 m-2 bg-foreground text-muted select-none disable rounded-sm font-semibold w-fit text-nowrap',
			loader: 'ml-2 mr-2',
			icon: 'relative p-2',
			warning: 'toast-warning-bg',
			success: 'bg-toast-success-bg',
			error: 'bg-error-bg',
			info: 'bg-toast-info-bg',
		}
	}}
	closeButton = {toastconfig.closeButton}
	richColors = {toastconfig.richColors}
	expand = {toastconfig.expand}
	position = {toastconfig.position}
>	
	{#snippet loadingIcon()}
		<style>
			.spin {
				animation: spin 2s cubic-bezier(0.42, 0, 0.58, 1) infinite;
			}

			@keyframes spin {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
		</style>

		<LoaderCircle class="spin" />
	{/snippet}
</Toaster>


<div
	class={cn(
		'flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 via-20% to-indigo-500 text-foreground duration-500',
		mode.current == 'dark' ? 'from-gray-700 via-pink-950 to-gray-950' : ''
	)}
>
	<div
		class={`flex h-[95%] w-[97%] flex-col rounded-2xl border-4 border-muted-foreground bg-background text-black/85 shadow-2xl duration-300`}
	>
		<Navbar />
		{@render children()}
	</div>
</div>
