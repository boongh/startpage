<script lang="ts">
	import { Switch } from '$lib/components/ui/switch/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import { toastconfig, setToastConfig, getToastConfig } from '../sharedconfig/toastconfig.svelte';
	import { onMount } from 'svelte';
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
    import ArrowUpLeft from '@lucide/svelte/icons/arrow-up-left'
    import ArrowUp from '@lucide/svelte/icons/arrow-up'
    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right'
    import ArrowDownLeft from '@lucide/svelte/icons/arrow-down-left'
    import ArrowDown from '@lucide/svelte/icons/arrow-down'
    import ArrowDownRight from '@lucide/svelte/icons/arrow-down-right'    
    import Button from '$lib/components/ui/button/button.svelte';
    import { PushToast } from '../toast';
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';

    function OnSave(){
        setToastConfig(toastconfig)
        PushToast("Config", "Toast Config Saved", "success", () => {
            for (const key in CachedConfig) {
                
                if (Object.prototype.hasOwnProperty.call(CachedConfig, key)) {
                    toastconfig[key] = CachedConfig[key];
                }
            }
            preValidatedDuration = toastconfig.duration.toString()
        }, "Undo")
    }

    let preValidatedDuration = $state("");
    const CachedConfig = $state({});

    $effect(() => {
        if(preValidatedDuration !== ""){
            preValidatedDuration = preValidatedDuration.replace(/[^0-9]/g, '');
            toastconfig.duration = parseInt(preValidatedDuration);
        }
        // toastconfig.duration = parseInt(preValidatedDuration)
    })

    $inspect(CachedConfig)
	onMount(() => {
        getToastConfig();
        preValidatedDuration = toastconfig.duration.toString();
        for (const key in toastconfig) {
            if (Object.prototype.hasOwnProperty.call(toastconfig, key)) {
                 CachedConfig[key] = toastconfig[key];
            }
        }
        // localCopy = JSON.parse(JSON.stringify(localCopy));
        // preValidatedDuration = localCopy.duration.toString();
	});
</script>

<div
	class="m-2 flex w-fit max-w-screen flex-col gap-2 rounded-sm text-foreground outline-2 outline-muted-foreground"
>
	<h1 class="m-2 text-md font-bold">Toast Config</h1>
	<div class="m-2 flex flex-row gap-2">
		<Switch id="rich-color" bind:checked={toastconfig.richColors} />
		<Label for="rich-color" class="text-foreground">Rich Color</Label>
	</div>

	<div class="m-2 flex flex-row gap-2">
		<Switch id="expand" bind:checked={toastconfig.expand} />
		<Label for="expand" class="text-foreground">Expand</Label>
	</div>

    <div class="m-2 flex flex-col justify-start gap-2">
        <Label for="positions" class="font-semibold text-foreground">Positions</Label>
        <ToggleGroup.Root size="lg" id="positions" type="single" class="flex flex-col" bind:value={toastconfig.position}> 
            <div class="flex flex-row">
                
                <ToggleGroup.Item value='top-left' aria-label="Position top left" class="rounded-b-none">
                    <ArrowUpLeft />
                </ToggleGroup.Item>
                <ToggleGroup.Item value='top-center'  aria-label="Position top center" class="rounded-b-none">
                    <ArrowUp />
                </ToggleGroup.Item>
                <ToggleGroup.Item value='top-right' aria-label="Position top right" class="rounded-b-none">
                    <ArrowUpRight />
                </ToggleGroup.Item>
            </div>
            <div class="flex flex-row">
                <ToggleGroup.Item value='bottom-left' aria-label="Position bottom left">
                    <ArrowDownLeft />
                </ToggleGroup.Item>
                <ToggleGroup.Item value='bottom-center' aria-label="Position bottom center">
                    <ArrowDown />
                </ToggleGroup.Item>
                <ToggleGroup.Item value='bottom-right' aria-label="Position bottom right">
                    <ArrowDownRight />
                </ToggleGroup.Item>
            </div>
        </ToggleGroup.Root>
        <Input type="text" bind:value={preValidatedDuration} class="w-full" placeholder="Duration in ms"/>
        <Button class="w-full" onclick={() => {PushToast("Toasty init!", "It's getting toasty", "info")}}>Push Toast!</Button>
        <Button class="w-full" onclick={OnSave}>Save</Button>
    </div>
</div>
