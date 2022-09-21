<script>
import {csvGenerator} from '$lib/csv_generator.js';

//import { read, writeFileXLSX } from "xlsx"
export let title="Percentage population change in Leeds and surrounding districts from census 2011 to census 2021",
		caption="source: census of England and Wales 2021",
		summary="percentages are rounded to whole numbers",
		tableData=[['District name', 'Percentage change'],['Leeds', 8],['Huddersfiled', 7],['Barnsley', 7],['Sheffield', 6],['Halifax', 5],['York', 4]],
		table = null
/*
let tableData=JSON.parse(JSON.stringify(data)).shift()
function downloadHandler() {
let tableHeader = data[0];
let tableKeys = Array(data.length).fill(0).map((e,i)=>i)
csvGenerator(tableData, tableKeys, tableHeader, `${title.replace(" ","_")}.csv`);
}
*/	

let sortBy = {col: "id", ascending: true};
	
	$: sort = (column) => {
		
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = (sortBy.ascending) ? 1 : -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
		
		array = array.sort(sort);
	}
</script>

<div>
<h4>Table: {title}</h4>
<p>note: {summary}</p>
<p>{caption}</p><br>
<table title={title}  caption={caption}	 summary={summary}>
			 
	<tr>
{#each tableData[0] as th,i}
<th 	bind:this={table}  tabindex=0 >{th}</th>
{/each}</tr>
{#each tableData as row,i}
<tr>	
{#if i>0}
{#each row as td}
<td>{td}</td>
{/each}
{/if}
</tr>
{/each}
<!--	<button on:click={downloadHandler}>
		download csv
	</button>-->
</table>
</div>