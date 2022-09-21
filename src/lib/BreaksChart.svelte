<script>
	import Icon from "./Icon.svelte";
	
	export let title = null;
	export let subtitle = null;
	export let avgVal;
	export let avgName = "Average";
	export let selectedVal;
	export let selectedName = "";
	export let selectedColor = "#ED7320";
	export let lineWidth = 2;
	export let height = 13;
	export let breaks;
	export let colours;// = breaks.length==5?["#e9e9e9","#FED4A6","#FDA13C","#ED7320"]:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"];
  export let formatTick = d => (d > 0 ? '+' : '') + d.toFixed(0);
	export let formatVal = d => (d > 0 ? '+' : '') + d.toFixed(1);
  export let suffix = "";
	export let snapTicks = true;
	export let marks = true;
	export let highlow = []//["Greatest decrease", "Greatest increase"];
	export let progress = null;
	export let currentHeader = null; // This is not currently used, but catches errors
	export let h = 100, width=100;
	export let legend_height;
	export let legend;
	export let nomargin = false;

	let w = {};
	
	const pos = (val, breaks) => {
		let i = 0;
		while (val > breaks[i + 1]) i += 1;
		let unit = 100 / (breaks.length - 1);
		let offset = (val - breaks[i]) / (breaks[i + 1] - breaks[i]);
		return (i + offset) * unit;
	}
	
	function calcLoc(w) {
		if (w.chart && w.avg && w.sel) {
			let avgPos = pos(avgVal, breaks) * w.chart * 0.01;
			let selPos = pos(selectedVal, breaks) * w.chart * 0.01;
			if (avgPos + w.avg + 4 > w.chart || selPos + w.sel + 4 > w.chart) {
				return {avg: {long: avgPos >= selPos, left: true}, sel: {long: !(avgPos >= selPos), left: true}};
			} else {
				return {avg: {long: !(avgPos >= selPos), left: false}, sel: {long: avgPos >= selPos, left: false}};
			}
		} else {
			return null;
		}
	}
	$: loc = calcLoc(w);
</script>

<div class="key_container" class:nomargin bind:clientHeight={h} bind:clientWidth={width} >
	{#if title}<h3 style="--selectedColor: {selectedColor}">{@html title}</h3>{/if}
	{#if progress}{progress}{/if}
	{#if subtitle}<div class="subtitle">{@html subtitle}</div>{/if}
	{#if colours}
	{#if breaks.length && Array.isArray(highlow) && highlow.length}
	<div class="highlow">
		hello
		{#each highlow.slice(0,2) as hl, i}
		{#if i == 0}
		<span style:color="{colours[0]}"><Icon rotation={180} position="left"/>{hl}</span>
		{:else}
		<span style:color="{colours[breaks.length - 2]}">{hl}<Icon position="right"/></span>
		{/if}
		{/each}
	</div>
	{/if}{/if}
	{#if breaks.length}
	<div bind:clientWidth={w.chart}  class="container" style="height: {height}px">
		{#each breaks.slice(1) as brk, i}
			<div class="block" style="width: {100 / (breaks.length - 1)}%; left: {i * (100 / (breaks.length - 1))}%; background-color: {colours[i]};"/>
			{#if marks}<div class="line" style="left: {i * (100 / (breaks.length - 1))}%;"/>{/if}
			<div class="tick" style="left: {i * (100 / (breaks.length - 1))}%; transform: translateX({i == 0 && snapTicks ? '-2px' : '-50%'});">{formatTick(breaks[i])}</div>
		{/each}
		{#if marks}<div class="line" style="right: 0;"/>{/if}
		<div class="tick" style="right: 0; transform: translateX({snapTicks ? '2px' : '50%'});">{formatTick(breaks[breaks.length - 1])}{suffix}</div>
		{#if selectedVal}
		<div class="marker" style="width: {lineWidth}px; left: calc({pos(selectedVal, breaks)}% - {lineWidth / 2}px);" class:long={loc && loc.sel.long}/>
		<div bind:clientWidth={w.sel} class="value value-selected" style="left: {pos(selectedVal, breaks)}%" class:left={loc && loc.sel.left} class:long={loc && loc.sel.long}><strong style="--selectedColor: {selectedColor}">{selectedName}</strong> {formatVal(selectedVal)}{suffix}</div>
	{/if}
	{#if avgVal}
		<div class="marker" style="width: {lineWidth}px; left: calc({pos(avgVal, breaks)}% - {lineWidth / 2}px);" class:long={loc && loc.avg.long}/>
		<div bind:clientWidth={w.avg} class="value" style="left: {pos(avgVal, breaks)}%" class:left={loc && loc.avg.left} class:long={loc && loc.avg.long}><strong>{avgName}</strong> {formatVal(avgVal)}{suffix}</div>
	{/if}
	</div>
	{/if}
</div>

<style>
	h3 {
		margin: 0;
		line-height: 1.2;
	}
	:global(h3 > strong, .value-selected > strong) {
		background-color: #ddd;
	}
	.subtitle {
		margin-top: 3px;
		font-weight: bold;
	}
	.highlow {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		margin-top: 3px;
		font-size: 0.9em;
	}
	.container {
		margin: 27px 0 8px 0;
		box-sizing: border-box;
		position: relative;
		width: 100%;
		background-color: white;
    	z-index: 100;
		}
	.block {
		position: absolute;
		top: 0;
		height: 100%;
	}
	.line {
		position: absolute;
		bottom: 0;
		height: calc(100% + 6px);
		border-left: solid 1px black;
	}
	.tick {
		position: absolute;
		z-index: 1;
		bottom: calc(100% + 5px);
		text-align: center;
		transform: translateX(-50%);
	}
	.marker {
		position: absolute;
		z-index: 2;
		top: 0;
		height: calc(100% + 20px);
		background-color: black;
	}
	.value {
		position: absolute;
		bottom: -24px;
		text-align: center;
		white-space: nowrap;
		transform: translateX(4px)
	}
	.value.left {
		transform: translateX(calc(-100% - 4px)) !important;
	}
	.value.long {
		bottom: -44px !important;
	}
	.marker.long {
		height: calc(100% + 40px) !important;
	}
	.key_container {
		box-sizing: border-box;
		font-size: 0.75em;
		margin: 0 10px 0;
		padding: 5px 0 0 0;
	}
	.nomargin {
		margin: 0 !important;
	}
</style>