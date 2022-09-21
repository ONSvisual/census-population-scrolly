<script>

	
    export let region_bell_decoration, labelled, selected, animation, opc_bell_dec
    
 
    // $: console.log(labelled)
        
    </script>
    {#if region_bell_decoration}
    {#each region_bell_decoration as arr} 
    <text opacity ={$opc_bell_dec} x={arr.x} y={arr.y} text-anchor={arr.anchor} transform={arr.transform} content={arr.content} font-size={arr['font-size']}>{arr.content}</text>
    {/each}
    
    {#if animation=='g'}{#each labelled[0] as label, i} 
    <text opacity ={$opc_bell_dec} class="titles" x={label.bell_centroid[0]} y={i==1?400:i==0?300:i==2?400:300} text-anchor='end' font-size=16 fill=black>{label.properties.AREANM}</text>
    <line opacity ={$opc_bell_dec} x1={label.bell_centroid[0]} x2={label.bell_centroid[0]} y1={i==1?400:i==0?300:i==2?400:300} y2={label.bell_centroid[1]} stroke=black></line>
     {/each}{/if}
     {#if animation=='h'}{#each labelled[1] as label, i} 
     <text opacity ={$opc_bell_dec} class="titles" x={label.bell_centroid[0]} y={i==0?400:i==1?300:i==2?400:300} text-anchor='start' font-size=16 fill=black>{label.properties.AREANM}</text>
     <line opacity ={$opc_bell_dec} x1={label.bell_centroid[0]} x2={label.bell_centroid[0]} y1={i==0?400:i==1?300:i==2?400:300} y2={label.bell_centroid[1]} stroke=black></line>
      {/each}{/if}
    {/if}

    <style>
      text {
        font-size: 15px;
        letter-spacing: -0.6px;
      }
    </style>