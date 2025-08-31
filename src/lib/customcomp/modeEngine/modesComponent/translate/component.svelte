<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import Languages from "@lucide/svelte/icons/languages"
	import ArrowRightLeft from "@lucide/svelte/icons/arrow-right-left"
	import ArrowBigLeftDash from "@lucide/svelte/icons/arrow-big-left-dash"
	const defaulttranslationProxy = "https://startpagebackend.vercel.app/api/translate"
	let { query, commandinpref, children, SetMode } = $props();


	function ParseTranslation(input: String) {
		const regex = /^\[?([^\]\s]+)\]?\s+"?(.+?)"?$/;

		const match = input.match(regex);
		
		console.log(query)
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
				error: "Input doesn't match expected format: [language code] \"text\""
			};
		}
	}
	

	async function TranslationHandler(text: String, targetLang : String){
		let response = await (await fetch(defaulttranslationProxy, {
			method: "POST",
			body: JSON.stringify({
				text: text,
				targetLang: targetLang,
			}),
		})).json()

		console.log(response)
		if(response){
			translatedContent = response
			translatedContent.source = parsedContent.text
			translatedContent.sourceLang = response.detectedSourceLang
		}
	}

	let parsedContent = $derived(ParseTranslation(query));
	let translatedContent = $state(null);

	$inspect(parsedContent)
</script>

{#key parsedContent}	
<Command.List>
	<Command.Group heading="Language Code 'translation content'">
		<Command.Item onSelect={(() => {SetMode("default")})}
			value="Return">
			<ArrowBigLeftDash/>
				<span class="wrap-anywhere">Return to default</span>
		</Command.Item>
		{#if parsedContent.success}
			<Command.Item
				value="Translate"
				onSelect={() => {
					TranslationHandler(parsedContent.text, parsedContent.languageCode)
				}}>
				<ArrowRightLeft />
					{parsedContent.text} into {parsedContent.languageCode}
			</Command.Item>
		{/if}
		{#if translatedContent}
		<Command.Item
			value="Translation">
			<Languages />
				Translated {translatedContent.source} into {translatedContent.text}
		</Command.Item>
		{/if}
	</Command.Group>
	
</Command.List>
{/key}