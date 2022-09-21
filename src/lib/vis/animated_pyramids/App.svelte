<script>
  import { tweened } from "svelte/motion";
  import { sineInOut } from "svelte/easing";
  import { writable } from "svelte/store";
  import Pyramid from "./Pyramid.svelte";
  import pyramidStore from "./pyramid";

  export let animation,
    height,
    padding,
    width,
    all_data,
    animationOn = 1,
    svg_height,
    regionsGeo,
    ukGeo,
    legend_height,
    story;
  export let legend_h = null,
    index = null,
    country = null,
    family = null,
    component = null,
    selected = null,
    data = null,
    nb = null,
    rb = null,
    cb = null; // props null to catch errors
  let highlight = writable(18 - all_data.REGION.LARGEST_AGEGROUP11.AGEBAND / 5);
  import changes_by_ageband from "$lib/changes_by_ageband.js";
  let r;
  //$: console.log('all_data',all_data)

  let bar_width = tweened();

  let makeDataPyramid = (d) => {
    let bars = [[], []];
    let f = d[1],
      m = d[0];

    for (let i in f) {
      bars[0].push(+f[i]);
    }

    for (let i in m) {
      bars[1].push(+m[i]);
    }
    bars[0].reverse();
    bars[1].reverse();
    return bars;
  };

  let la_change_blended = changes_by_ageband[all_data.CODE];

  let ctry = country == "E" ? "E92000001" : "W92000004";
  let country_change_blended = changes_by_ageband[ctry];

  let arr = [
    all_data.COUNTRY.PYRAMID21.flat(),
    all_data.REGION.PYRAMID21.flat(),
    all_data.REGION.PYRAMID11.flat(),
  ];
  $: pyramid_width = width / 3 / Math.max(...arr.flat());

  let country_change_max = Math.max(...country_change_blended);

  let la_change_divided = [[], []];
  la_change_blended.forEach((e, i) => {
    if (e >= 0) {
      la_change_divided[0][i] = e;
      la_change_divided[1][i] = 0;
    } else {
      la_change_divided[0][i] = 0;
      la_change_divided[1][i] = Math.abs(e);
    }
  });

  let country_change_divided = [[], []];
  country_change_blended.forEach((e, i) => {
    if (e >= 0) {
      country_change_divided[0][i] = e;
      country_change_divided[1][i] = 0;
    } else {
      country_change_divided[0][i] = 0;
      country_change_divided[1][i] = Math.abs(e);
    }
  });

  let change_width =
    width /
    3 /
    Math.max(...la_change_divided.flat().concat(country_change_divided.flat()));

  let stepPrev;
  let indexPrev = null;

  function change(stp) {
// console.log(stp, index)

    if (stp == "local11") {
      r = "bars";
      pyramidStore.set(makeDataPyramid(all_data.REGION.PYRAMID11), {
        duration: 1000 * animationOn,
        easing: sineInOut,
      });
      bar_width.set(pyramid_width, { duration: 1000 * animationOn });
      highlight.set(18 - all_data.REGION.LARGEST_AGEGROUP11.AGEBAND / 5);
      stepPrev = stp;
      index = indexPrev;
    }
    if (stp == "local21") {
      r = "bars";
      pyramidStore.set(makeDataPyramid(all_data.REGION.PYRAMID21), {
        duration: 1000 * animationOn,
        easing: sineInOut,
      });
      bar_width.set(pyramid_width, { duration: 1000 * animationOn });
      highlight.set(18 - all_data.REGION.LARGEST_AGEGROUP21.AGEBAND / 5);
      stepPrev = stp;
      index = indexPrev;
    }
    if (stp == "country21") {
      r = "bars";
      pyramidStore.set(makeDataPyramid(all_data.COUNTRY.PYRAMID21), {
        duration: 1000 * animationOn,
        easing: sineInOut,
      });
      bar_width.set(pyramid_width, { duration: 1000 * animationOn });
      highlight.set(12);
      stepPrev = stp;
      index = indexPrev;
    }
    if (stp == "country_change") {
      r = "change";
      pyramidStore.set(makeDataPyramid(country_change_divided), {
        duration: 1000 * animationOn,
        easing: sineInOut,
      });
      bar_width.set(change_width, { duration: 1000 * animationOn });
      stepPrev = stp;
      index = indexPrev;
    }
    if (stp == "local_change") {
      r = "change";
      pyramidStore.set(makeDataPyramid(la_change_divided), {
        duration: 1000 * animationOn,
        easing: sineInOut,
      });
      bar_width.set(change_width, { duration: 1000 * animationOn });
      stepPrev = stp;
      index = indexPrev;
    }
  }

  $: change(animation, bar_width, svg_height, selected, all_data);
  
</script>

{#if animation}
  <svg id="canvas3" {width} height={svg_height}>
    <Pyramid
      bind:pyramid={$pyramidStore}
      {svg_height}
      {padding}
      {width}
      pyramid_width={$bar_width}
      {country_change_divided}
      {la_change_divided}
      {country_change_blended}
      {la_change_blended}
      request={r}
      {highlight}
      {animationOn}
    />
    <!--<text x=500 y=500 fill='black'>ANIMATION: {animation}</text>-->
  </svg>
{/if}

<style>
  #canvas3 {
    left: 0;
    right: 0;
    bottom: 18px;
    position: fixed;
    overflow: visible;
  }
</style>
