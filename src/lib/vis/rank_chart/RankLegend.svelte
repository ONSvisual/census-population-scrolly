<script>
	import { scaleLinear } from "d3-scale";
	
	export let keys;
	export let padding = {left: 50, right: 250, top: 70, bottom: 30}; // padding around chart (pixels)
	export let showAll = false;
	export let minItems = 22;
	export let data;
	
	$: xScale = scaleLinear().domain([keys[0], keys[keys.length - 1]]).range([0, 100]);
</script>

<div class="legend-container" style:padding-left="{padding.left}px" style:padding-right="{padding.right}px">
	{#if data.length > minItems}
	<button class="btn-text" tabindex="-1" on:click={() => showAll = !showAll}>{@html showAll ? 'Shrink &udarr;' : 'Expand &udarr;'}</button>
	{/if}
	<div class="legend">
		{#each [keys[0], keys[keys.length - 1]] as key, i}
		<div style:left="{xScale(key)}%" class="tick" class:rank-start={i == 0} class:rank-end={i != 0}>{key}<br/>rank</div>
		{/each}
		<div style:left="calc({xScale(keys[keys.length - 1])}% + 70px)" class="tick">Chng<br/>&#x25B2;&#x25BC;</div>
		<div style:left="calc({xScale(keys[keys.length - 1])}% + 125px)" class="tick">Local<br/>authority</div>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}
	.legend-container {
		position: absolute;
		z-index: 1;
		top: 0;
		width: 100%;
		height: 55px;
		background-color: white;
		letter-spacing: -0.5px;
	}
	.legend {
		position: relative;
		width: 100%;
		font-weight: bold;
	}
	.rank-start {
		text-align: right !important;
		transform: translateX(calc(-100% - 15px)) !important;
	}
	.rank-end {
		transform: translateX(15px) !important;
	}
	.tick {
		position: absolute;
		top: 5px;
		text-align: left;
	}
	.btn-text {
		position: absolute;
		top: 4px;
		right: 8px;
		border: none;
		background: none !important;
		text-decoration: underline;
		cursor: pointer;
		padding: 0;
		margin: 0;
		white-space: nowrap;
		color: #206095;
	}
	.btn-text:hover {
		color: #222;
	}
</style>