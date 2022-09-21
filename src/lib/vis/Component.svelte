<script>

  export let height = 400, // default value to avoid errors
    width=null,
    count = 0,
    index = 0,
    offset = 0,
    progress = 0,
    family = '',
    component,
    animation = '',
    padding = 50,
    country,
    all_data,
    selected,
    nb = null,
    rb = null,
    cb = null

  import { tracker } from '$lib/tracker.js'
  import Animated_charts from '$lib/vis/animated_charts/App.svelte'
  import Football from '$lib/vis/football/App.svelte'
  import Pyramids from '$lib/vis/animated_pyramids/App.svelte'
  import Highlighted_map from '$lib/vis/highlighted_map/App.svelte'
  import Key from "$lib/Key.svelte";
  import robojournalist from "$lib/bundled/robojournalist"
  export let data, animationOn, z, legend_height, regionsGeo, ukGeo, story

  let components = {
    Animated_charts: Animated_charts,
    Football: Football,
    Pyramids: Pyramids,
    Highlighted_map: Highlighted_map
  }

  let stpPrev = 0

  function getStep() {
    return $tracker
  }
  function getPadding() {
    padding = Math.min(...[height / 10, width / 10])
    return padding
  }
  if (height) getPadding()

  let iw, ih, ow, oh
  $: z = ((ow - 10) / iw) * 100

  const params = obj => obj?({
    title:robojournalist(
      obj.title,
      all_data
    ),
    subtitle:robojournalist(
      obj.subtitle,
      all_data
    ),
    avgVal:+obj.avgVal,
    avgName:obj.avgName,
    selectedVal:+obj.selectedVal,
    selectedName:obj.selectedName,
    suffix:obj.suffix,
    breaks:JSON.parse(obj.breaks),
    colours:JSON.parse(obj.colours),
    currentHeader:obj.title
  }):''
  let legend_h = animation && animation.section.actions.header ? 150 : 0;
</script>

<style>

  .tooltip {
    position: fixed;
    text-align: center;
    width: fit-content;
    height: fit-content;
    padding: 4px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
  }
  .title_over {
    z-index: 10000;
    margin: 0 0 0 0;
  }
</style>

<svelte:window
  bind:innerWidth={iw}
  bind:innerHeight={ih}
  bind:outerWidth={ow}
  bind:outerHeight={oh} />

{#if animation && all_data && country}

{#if animation && animation.section.actions.header}
<Key bind:h={legend_h} 
  {legend_height} paramsObject={params(animation.section.actions.header)}
  />
{/if}

  <div
    {family}
    {component}
    >
    {#if height && ih}
      <svelte:component
        this={components[component]}
        {legend_height}
        {index}
        {height}
        {width}
        padding={getPadding()}
        {country}
        {family}
        {component}
        animation={animation.section.actions['data-id']}
        {all_data}
        {selected}
        {data}
        {animationOn} 
        {nb}
        {rb}
        {cb}
        {regionsGeo}
        {ukGeo}
        svg_height={ih - legend_height}
        {story}
        />
    {/if}
    <div class="tooltip" style="opacity:0" aria-hidden="true" />
  </div>

{/if}
