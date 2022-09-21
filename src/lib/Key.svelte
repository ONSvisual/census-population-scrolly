<script>
	import BreaksChart from "./BreaksChart.svelte";
	export let paramsObject,
	h=100,
	width=100,
	legend_height,
	legend=true,
	nomargin=false


</script>

<BreaksChart {...paramsObject}  {legend_height} {legend} bind:h bind:width {nomargin}/>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
	:global(body) {
		font-family: 'Open Sans', sans-serif;
	}
</style>