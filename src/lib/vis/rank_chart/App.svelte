<script>
	import data_all from "./rank_data.json";
	import RankChart from "./RankChart.svelte";
	import RankLegend from "./RankLegend.svelte";
	
	export let years = [2011, 2021];
	export let padding = {left: 57, right: 287, top: 45, bottom: 28};
	export let colors = ["rgb(237, 115, 32)", "rgb(62, 85, 138)", "#333"];
    export let country = "E";
    export let selected = null;

	let showAll = false;
	
	function dataSeries(data, keys) {
		data.sort((a, b) => a.name.localeCompare(b.name));
		let sorted = {};
		let vals = {};
		for (const key of keys) {
			//data.forEach(d => d[key] = Math.round(d[key] / 1000) * 1000);
			sorted[key] = [...data].sort((a, b) => b[key] - a[key]).map(d => d.code);
			vals[key] = [...data].map(d => d[key]).sort((a, b) => b - a);
		}
		let newdata = [];
		for (const d of data) {
			let values = [];
			for (const key of keys) {
				let rank = sorted[key].indexOf(d.code) + 1;
				let rank_str = `${vals[key].indexOf(d[key]) + 1}`;
				if (vals[key].filter(v => v == d[key]).length > 1) rank_str = `${rank_str}=`;
				values.push({year: key, value: d[key], rank, rank_str});
			}
			newdata.push({code: d.code, name: d.name, values});
		}
		return newdata;
	} 

	function plusminus(val) {
		if (val > 0) {
			return `A rise of ${val} places`;
		} if (val < 0) {
			return `A fall of ${Math.abs(val)} places`;
		} else {
			return "No change";
		}
	}

	function makeTitle(data, selected) {
		if (data && selected) {
			let place = data.find(d => d.code == selected);
			return `${place.name} ranked ${place.values[1].rank_str} for population in 2021. ${plusminus(place.values[0].rank - place.values[1].rank)} since 2011.`
		} else {
			return null;
		}
	}
	
	$: data = dataSeries(data_all.filter(d => d.code.slice(0,1) == country), years);

	$: title = makeTitle(data, selected);
</script>

{#if title}
<h2 class="visually-hidden">{title}</h2>
{/if}
<div class="chart" aria-hidden="true">
    <RankLegend {data} keys={years} {padding} bind:showAll/>
	<RankChart {data} keys={years} {padding} {colors} {selected} {showAll}/>
</div>

<style>
	.chart {
		margin-top: 10px;
		position: relative;
		width: 100%;
		margin-bottom: 30px;
        font-size: 0.75em;
        line-height: 1.2;
	}
</style>