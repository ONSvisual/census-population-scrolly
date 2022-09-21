<script>
	import { scaleLinear } from "d3-scale";
	
	export let data;
	export let keys;
	export let selected = null;
	export let colors = ["rgb(237, 115, 32)", "rgb(62, 85, 138)", "#555"];
	export let showAll = false;
	export let minItems = 30;
	
	export let padding = {left: 50, right: 250, top: 70, bottom: 30}; // padding around chart (pixels)
	export let spacing = 20; // vertical spacing between items (pixels)
	export let radius = 6.5; // radius of circles
	
	let w = 500;
	$: items = showAll || data.length < minItems ? data.length : minItems;
	$: h = ((items - 1) * spacing) + padding.top + padding.bottom;
	
	const change = (int) => int > 0 ? "&#x25B2;":
		int < 0 ? "&#x25BC;":"&#x2B24";

	const changeNum = (int) => Math.abs(int)

	function getOffset(data, selected, h, showAll) {
		let d = data.find(d => d.code == selected);
		if (d && !showAll && minItems < data.length) {
			let count = data.length;
			let in_view = Math.floor((h - padding.top - padding.bottom) / spacing);
			let ranks = d.values.map(v => v.rank);
			let minmax = [Math.min(...ranks), Math.max(...ranks)];
			if (minmax[1] - minmax[0] > in_view) {
				if (ranks[ranks.length - 1] < ranks[0]) {
					return ranks[ranks.length - 1];
				} else {
					return ranks[ranks.length - 1] - in_view;
				}
			} else {
				let offset = Math.floor(((minmax[0] + minmax[1]) / 2) - (in_view / 2));
				return offset < 0 ? 0 : offset > count - in_view ? count - in_view : offset;
			}
		} else {
			return 0;
		}
	}
	
	function truncate(text) {
		return text.length > 21 ? `${text.slice(0,18)}...` : text;
	}
	
	$: yOffset = getOffset(data, selected, h, showAll);
	$: xScale = scaleLinear().domain([keys[0], keys[keys.length - 1]]).range([(padding.left - 22), w - (padding.right - 22)]);
	$: yScale = scaleLinear().domain([yOffset, data.length + yOffset]).range([padding.top, padding.top + (spacing * (data.length - 1))]);
	
	$: makePath = (values) => {
		let r = radius;
		let out = "M" + values.map(v => `${xScale(v.year) - r} ${yScale(v.rank)}A${r} ${r} 0 1 1 ${xScale(v.year) + r} ${yScale(v.rank)}`).join("L");
		let rtn = "L" + [...values].reverse().map(v => `${xScale(v.year) + r} ${yScale(v.rank)}A${r} ${r} 0 1 1 ${xScale(v.year) - r} ${yScale(v.rank)}`).join("L") + "Z";
		return out + rtn;
	}
</script>

<div class="chart-container" bind:clientWidth={w} style:height="{h}px">
	<svg class="chart" viewBox="0 0 {w} {h}">
		{#each data.filter(d => d.code != selected) as d}
		<g>
			<path d="{makePath(d.values)}"/>
			<text class="right" x="{xScale(d.values[0].year)}" y="{yScale(d.values[0].rank)}" dx={-9} dy={1}>{d.values[0].rank_str}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" dx={9} dy={1}>{d.values[d.values.length - 1].rank_str}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" text-anchor=middle dx={55} dy={1}>{@html change(d.values[0].rank - d.values[d.values.length - 1].rank)}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" text-anchor=left dx={65} dy={1}>{@html changeNum(d.values[0].rank - d.values[d.values.length - 1].rank)}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" dx={102} dy={1}>{truncate(d.name)}</text>
		</g>
		{/each}
		{#each [data.find(d => d.code == selected)] as d}
		<g class="selected" style:--selectedColor="{d.values[0].rank - d.values[d.values.length - 1].rank > 0 ? colors[0] : d.values[0].rank - d.values[d.values.length - 1].rank < 0 ? colors[1] : colors[2]}">
			<path d="{makePath(d.values)}"/>
			<text class="right" x="{xScale(d.values[0].year)}" y="{yScale(d.values[0].rank)}" dx={-9} dy={1}>{d.values[0].rank_str}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" dx={9} dy={1}>{d.values[d.values.length - 1].rank_str}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" text-anchor=middle dx={55} dy={1}>{@html change(d.values[0].rank - d.values[d.values.length - 1].rank)}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" text-anchor=left dx={65} dy={1}>{@html changeNum(d.values[0].rank - d.values[d.values.length - 1].rank)}</text>
			<text x="{xScale(d.values[d.values.length - 1].year)}" y="{yScale(d.values[d.values.length - 1].rank)}" dx={102} dy={1}>{truncate(d.name)}</text>
		</g>
		{/each}
	</svg>
</div>

<style>
	.chart-container {
		width: 100%;
	}
	svg {
		width: 100%;
		height: 100%;
	}
	path {
		fill: #aaa;
		stroke: #aaa;
		stroke-width: 2;
	}
	text {
		fill: #666;
		dominant-baseline: middle;
		letter-spacing: -0.5px;
	}
	text.right {
		text-anchor: end;
	}
	.selected path {
		fill: var(--selectedColor, #206095);
		stroke: var(--selectedColor, #206095);
	}
	.selected text {
		fill: var(--selectedColor, #206095);
		font-weight: bold;
	}
</style>