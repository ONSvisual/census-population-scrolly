<script>
	export let title,value,metric,selected,label_opacity,n_centroid,svg_height
</script>

<g class="label">
<text class="titles" x={n_centroid[0]} y={n_centroid[1]} text-anchor=middle font-size=18 opacity={$label_opacity} style="pointer-events: none;" id={selected?"selectedText":null} vector-effect="non-scaling-stroke">
	{$title}
</text>
<text class="titles" x={n_centroid[0]} y={n_centroid[1]+18} text-anchor=middle font-size=18 opacity={$label_opacity} style="pointer-events: none;" id={selected?"selectedValue":null} vector-effect="non-scaling-stroke">
	{$value==0?'< 0.1% change':  $value<0? `▼${Math.abs($value)}${$metric[0]}` : `▲${$value}${$metric[0]}`}
</text>
</g>