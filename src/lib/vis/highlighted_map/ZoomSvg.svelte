<script>
  // import {chart_height} from '$lib/BreaksChart.svelte'
   export let width, all_data, svg = null, svg_height = null, // default values to suppress errors
   title="10-year population change in local authority areas near <strong>Ceredigion</strong>",
   subtitle="Percentage growth",
   avgVal=3.8,
   avgName="Average",
   selectedVal=8,
   selectedName="Ceredigion",
   suffix="%",
   breaks=[0,3,6,8,10]
   export let id=null,zm=null,x=null,y=null,k=null,xx=null,yy=null,height=null,key=null,arr4=null,corners=null,edges=null,header=null // to supress errors
 
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
 {#if width && svg_height && all_data}
 
 <svg id="canvas2" viewBox="{0} {50} {width} {svg_height}" height={svg_height} width={width} style="width: calc({width}px);" bind:this={svg} role="img" label="population maps and charts" focusable="false" aria-hidden="true">
 
     <slot></slot>
 
 
   </svg>
   {/if}
 
 <style>
   #canvas2 {
   right:0;
     height: 100%;
     margin-right: 5px;
     position: fixed;
   left:0;
   }
 </style>