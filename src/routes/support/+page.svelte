
<script>
    import Separator from "$lib/components/ui/separator/separator.svelte";
</script>

<svelte:head>
	<title>Support!</title>
	<meta name="" content="Support the project" />
</svelte:head>

<div class="w-full h-full flex flex-col md:flex-row">

    <section id="creator" class="m-4 gap-2 w-[50%]">
        <h2 class="font-extrabold text-6xl text-muted-foreground">Creator</h2>
        <Separator class="my-4"/>
        <span class="text-2xl">span</span>
        <h2>Me</h2>
        <p></p>
    </section>
    <section id="creator" class="m-4 gap-2 w-[50%]">
        <div class="flex flex-row">
            <h2 class="font-extrabold text-4xl text-muted-foreground">Contributor</h2>
            
        </div>
        <Separator class="my-4"/>
        <span class="text-2xl">span</span>
        <h2>Me</h2>
        <p></p>
    </section>
</div>