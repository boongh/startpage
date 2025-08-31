<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import Languages from '@lucide/svelte/icons/languages';
	import ArrowRightLeft from '@lucide/svelte/icons/arrow-right-left';
	import ArrowBigLeftDash from '@lucide/svelte/icons/arrow-big-left-dash';
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

	async function TranslationHandler(text: String, targetLang: String) {
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

{#key [parsedContent, _statusTranslating]}
	<Command.List>
		{#if _statusTranslating || translatedContent}
			<Command.Item value="Translation" onSelect={async () => {
				await navigator.clipboard.writeText(translatedContent.text)
				PushPopup("Clipboard", "Copied to clipboard!")
			}}>
				{#if translatedContent}
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
						class="spin lucide lucide-loader-circle-icon lucide-loader-circle"
						><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
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
