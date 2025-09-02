<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import Languages from '@lucide/svelte/icons/languages';
	import ArrowRightLeft from '@lucide/svelte/icons/arrow-right-left';
	import ArrowBigLeftDash from '@lucide/svelte/icons/arrow-big-left-dash';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import translationConfig from "./config.json"
	const defaulttranslationProxy = 'https://startpagebackend.vercel.app/api/translate';
	let { query, commandinpref, children, SetMode, PushPopup, alertContent } = $props();

	function ParseTranslation(input: String) {
		const regex = /^\[?([^\]\s]+)\]?\s+"?(.+?)"?$/;

		const match = input.match(regex);

		console.log(query);
		if (match) {
			return {
				languageCode: match[1].trim(),
				text: match[2].replace(/\\"/g, '"'),
				success: true
			};
		} else {
			return {
				languageCode: null,
				text: null,
				success: false,
				error: 'Input doesn\'t match expected format: [language code] "text"'
			};
		}
	}

	async function TranslationHandler(text: string, targetLang: string) {
		_statusTranslating = true;
		let response = await (
			await fetch(defaulttranslationProxy, {
				method: 'POST',
				body: JSON.stringify({
					text: text,
					targetLang: targetLang
				})
			})
		).json();

		if (response) {
			translatedContent = response;
			translatedContent.source = parsedContent.text;
			translatedContent.sourceLang = response.detectedSourceLang;
		}

		_statusTranslating = false;
	}

	let parsedContent = $derived(ParseTranslation(query));
	let translatedContent = $state(null);
	let _statusTranslating = $state(false);

	$inspect(parsedContent);
</script>

{#key [query, _statusTranslating]}
	<Command.List>
		{#if _statusTranslating || translatedContent}
			<Command.Item
				value="Translation"
				onSelect={async () => {
					await navigator.clipboard.writeText(translatedContent.text);
					PushPopup('Clipboard', 'Copied to clipboard!');
				}}
			>
				{#if translatedContent && !_statusTranslating}
					Translated {translatedContent.source} into {translatedContent.text}
				{:else if _statusTranslating}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="spin lucide lucide-loader-pinwheel-icon lucide-loader-pinwheel"
						><path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" /><path
							d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"
						/><path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" /><circle
							cx="12"
							cy="12"
							r="10"
						/></svg
					>
					Translating
				{/if}
			</Command.Item>
		{/if}
		<Command.Group heading="Language Code 'translation content'">
			<Command.Item
				onSelect={() => {
					SetMode('default');
				}}
				value="Return"
			>
				<ArrowBigLeftDash />
				<span class="wrap-anywhere">Return to default</span>
			</Command.Item>
			{#if query !== ''}
				{#if parsedContent.success}
					<Command.Item
						value="Translate"
						onSelect={() => {
							TranslationHandler(parsedContent.text, parsedContent.languageCode);
						}}
					>
						<ArrowRightLeft />
						{parsedContent.text} into {parsedContent.languageCode}
					</Command.Item>
				{:else}
					{#each translationConfig.langCode as [code, lang]}
					<Command.Item
						value={code}
						keywords={[lang]}
						onSelect={() => {
							commandinpref.value = code
						}}
					>
						<div class="justify-between flex w-full flex-row">
							<span class="text-foreground">
								{code}
							</span>
							<span class="text-muted-foreground">
								{lang}
							</span>
						</div>
					</Command.Item>
					{/each}
				{/if}
			{/if}
		</Command.Group>
	</Command.List>
{/key}

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
