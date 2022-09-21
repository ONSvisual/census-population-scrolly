<script>
	export let d,centroid,fill,title,value,pop,metric,y,selected,area_cd,zoom,n_centroid,stroke_opacity,stroke,r_centroid,animation
</script>
<g class='shapeholder'>
 <path
			id={selected?"selected":null}
      d={$d}
			centroid={centroid}
			n_centroid={n_centroid}
			{r_centroid}
      		class="shape"
      		fill={$fill} 
			title={$title}
			fill-opacity={1}
			stroke-opacity={stroke_opacity}
			stroke-width={1}
			stroke={stroke?stroke:selected?"black":$fill}
			value={$value}
			pop={pop}
			metric={$metric}
			y={$y}
			area_cd={$area_cd}
			zoom={zoom}
			vector-effect=non-scaling-stroke
			 >

	{#if selected}
<animate attributeName="stroke-width" values="2;4;2" dur="2s" begin="0s" repeatCount="indefinite"/>

	 {/if}
</path>


</g>

<style>
.title{
    font-weight: bold;
    paint-order: stroke;
    stroke: #F4F4F4;
    stroke-opacity: 0.8;
    stroke-width: 3.5px;
    stroke-linecap: butt;
    stroke-linejoin: miter;
    pointer-events: none;
}
/*.shapeholder:hover .title{
    display: block;
}*/
</style>