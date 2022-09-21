<script>
 // import {chart_height} from '$lib/BreaksChart.svelte'
  export let width, all_data, svg = null, svg_height, // default vals to suppress errors
  title="10-year population change in local authority areas near <strong>Ceredigion</strong>",
	subtitle="Percentage growth",
	avgVal=3.8,
	avgName="Average",
	selectedVal=8,
	selectedName="Ceredigion",
	suffix="%",
	breaks=[0,3,6,8,10]
	export let id=null,zm=null,x=null,y=null,k=null,xx=null,yy=null,key=null,arr4=null,corners=null,edges=null,header=null // to supress errors


	let params={
	title:title,
	subtitle:subtitle,
	avgVal:avgVal,
	avgName:avgName,
	selectedVal:selectedVal,
	selectedName:selectedName,
	suffix:suffix,
	breaks:breaks
	}

</script>
{#if width && all_data}
	<svg role="img" viewBox='{0} {0} {width} {svg_height}' width='{width}px' height='{svg_height}px' label="population maps and charts" focusable="false" aria-hidden="true" style='height:{svg_height}px; width:100%; position:absolute; bottom:0'>
		<slot></slot>
	</svg>
{/if}

<style>

</style>