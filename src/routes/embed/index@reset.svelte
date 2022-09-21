<script context="module">
	export const prerender = true;
</script>
<script>
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	import items from "$lib/vis/dropdown/items.json";
	import regions from "$lib/vis/dropdown/regions.json";
	import Section from "$lib/layout/Section.svelte";
	import Media from "$lib/layout/Media.svelte";
	import Select from "$lib/vis/dropdown/Select.svelte";

	function doSelect(e) {
		let selected = e.detail;
		window.top.location.href = `${base}/${selected.areacd}/`;
	}

	onMount(() => {
		const pymChild = new pym.Child({polling: 1000});
	});
</script>

<svelte:head>
	<script src="https://cdn.ons.gov.uk/vendor/pym/1.3.2/pym.min.js"></script>
</svelte:head>

<Section>
	<div class="dropdown-container">
		<label for="select">Select a local authority</label>
		<Select id="select" {items} idKey="areacd" labelKey="areanm" on:select={doSelect}/>
	</div>
</Section>

<Media col="wide" grid="narrow">
	{#each [...regions].sort((a, b) => a.code.localeCompare(b.code)) as region}
	<div class="text-small">
		<strong>{region.name}</strong><br />
		{#each items.filter((d) => d.regioncd == region.code) as place}
		<a href="{base}/{place.areacd}/" target="_top" sveltekit:reload >{place.areanm}</a><br />
		{/each}
	</div>
	{/each}
</Media>

<style>
	.dropdown-container {
		color: #206095;
		background-color: rgb(188, 207, 222);
		padding: 12px;
		margin: 0 -24px;
		font-size: 1.1rem;
	}
	.dropdown-container > label {
		font-size: 1.1em;
		font-weight: bold;
	}
</style>