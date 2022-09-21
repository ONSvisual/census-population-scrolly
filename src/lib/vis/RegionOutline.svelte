<script>

export let xys, regions_data, regions

$:console.log(regions)

</script>
<g class='regions'>
{#if xys}

{#each xys as region,i}
<path class='region' d={region} stroke=white stroke-width=2 fill=none style="pointer-events: none;" data-name={regions_data[i].region_name}></path>
{/each}

{#each regions as region, i}
<text class='title' x={region.centroid[0] * (region.code=='E12000008'?0.92:1)} y={region.centroid[1] * (region.code=='E12000002'?0.85:1)} font-size=16 text-anchor=middle fill=black>{region.name.split(' ')[0]}</text>
<text class='title' x={region.centroid[0] * (region.code=='E12000008'?0.92:1)} y={region.centroid[1] * (region.code=='E12000002'?0.85:1)+ 16} font-size=16  text-anchor=middle fill=black>{region.name.split(' ').splice(1).join(' ')}</text>
<text class='title' x={region.centroid[0] * (region.code=='E12000008'?0.92:1)} y={region.centroid[1] * (region.code=='E12000002'?0.85:1) + (region.name.split(' ').length>1?32:16)} font-size=16  text-anchor=middle fill=black>▲{region.growth.toFixed(1)}%</text>
{/each}
{/if}

</g>
<style>
.title{
    font-weight: bold;
    paint-order: stroke;
    stroke: #F4F4F4;
    stroke-opacity: 0.8;
    stroke-width: 5px;
    stroke-linecap: butt;
    stroke-linejoin: miter;
    pointer-events: none;
}
</style>