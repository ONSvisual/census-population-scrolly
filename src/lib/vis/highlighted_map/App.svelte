<script>
  import Path from "./Path.svelte";
  import { interpolateLab } from "d3-interpolate";
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import ZoomSvg from "./ZoomSvg.svelte";
  import { writable } from "svelte/store";
  export let data;
  export let country, all_data, legend_height, cb, regionsGeo, ukGeo;
  const interpolate = flubber.interpolate;

  let key = true;

  export let progress,
    animation,
    width,
    height,
    padding,
    animationOn = true;
  export let legend_h = null,
    index = null,
    family = null,
    component = null,
    selected = null,
    nb = null,
    rb = null,
    svg_height = null,
    story; // props null to catch errors

  let newData;
  let countryFactor = 0;

  const easing = cubicInOut;
  let timeline;

  //TIMELINE ... INITIAL SETTINGS
  let timelineMaker = (arr) => {
    let x = [];
    arr.forEach((e, i) => {
      x.push({
        d: tweened(arr[i].xys, { duration: 50, interpolate }),
        centroid: arr[i].centroid,
        fill: tweened("#" + data[i].o65_colour.substring(1)),
        fillOpacity: tweened(1, { duration: 0, interpolate }),
        title: writable(arr[i].properties.AREANM),
        area_cd: writable(arr[i].properties.AREACD),
        value: writable(arr[i].growth),
        metric: writable("% change"),
        pop: arr[i].pop,
        label_opacity: tweened(0),
        zoom: arr[i].zoom,
      });
    });
    return x;
  };

  function redrawData(datas) {
    data = data.filter((e) => e.properties.AREACD[0] == country);
    let u15_range = data.map((e) => e.u15).sort((a, b) => a - b);
    let work_range = data.map((e) => e.work).sort((a, b) => a - b);
    let o65_range = data.map((e) => e.o65).sort((a, b) => a - b);
    timeline = timelineMaker(data);
    return data;
  }

  function forward(current) {
    let count = 0;
    timeline.forEach((step, i) => {
      count++;
      if (current == 18)
        step.fill.set("#" + data[i].o65_colour.substring(1), {
          duration: 1000 * animationOn,
          interpolate: interpolateLab,
        });
      if (current == 19)
        step.fill.set("#" + data[i].u15_colour1.substring(1), {
          duration: 1000 * animationOn,
          interpolate: interpolateLab,
        });
      if (current == 20)
        step.fill.set("#" + data[i].u15_colour2.substring(1), {
          duration: 1000 * animationOn,
          interpolate: interpolateLab,
        });
    });
  }

  let conversation = {
    'E':{
    frame18: [
      { code: "E06000042", val: '▲43.6' },
      { code: "E07000131", val: '▲38.5' },
    ],
    frame19: [
      { code: "E07000107", val: '▲31.8' },
      { code: "E06000031", val: '▲23.8' },
    ],
    frame20: [
      { code: "E09000033", val: '▼19.4' },
      { code: "E09000020", val: '▼17.8' },
      { code: "E07000166", val: '▼12.3' }
    ]},
    'W':{
    frame18: [
      { code: "W06000021", val: '▲26.0' },
      { code: "W06000014", val: '▲24.9' },
    ],
    frame19: [
      { code: "W06000022", val: '▲10.2' },
      { code: "W06000015", val: '▲5.3' },
    ],
    frame20: [
      { code: "W06000008", val: '▼10.1' },
      { code: "W06000023", val: '▼9.3' },
      { code: "W06000021", val: '▼8.6' }
    ]},
  };

  Object.keys(conversation[country]).forEach(k=>{
    conversation[country][k].forEach(e=>
    e.data=data.find(el=>el.properties.AREACD==e.code)
    )
}
  )

 // console.log(data, conversation);

  $: redrawData(data, svg_height, width, countryFactor);
  $: forward(animation);
</script>

{#if all_data && timeline && width && data}
  <ZoomSvg id="charts2" {width} {svg_height} {key} {all_data}>
    {#if animation}
      <g id="wrapper2">
        {#each timeline as feature, i}
          <Path
            d={feature.d}
            centroid={feature.centroid}
            fill={feature.fill}
            fillOpacity={feature.fillOpacity}
            title={feature.title}
            value={feature.value}
            pop={feature.pop}
            metric={feature.metric}
            y={feature.y}
            area_cd={feature.area_cd}
            zoom={feature.zoom}
            i="1"
          />
        {/each}
      </g>
{#each conversation[country]['frame'+animation] as frame, i}
      <text
      class='featured_name titles'
      font-size=16
      fill=black
      text-anchor=middle
      x={frame.data.centroid[0] - (frame.code == 'E09000020' ? 10 : frame.code == 'W06000021' ? 35 : 0)}
      y={(frame.data.centroid[1]) - (['E09000033','W06000022'].includes(frame.code)? 80  :40)}
    >{frame.data.properties.AREANM}</text>

    <text
    class='featured_name titles'
    font-size=16
    fill=black
    text-anchor=middle
    x={frame.data.centroid[0] - (frame.code == 'E09000020' ? 10 : frame.code == 'W06000021' ? 35 : 0)}
    y={(frame.data.centroid[1]) - (['E09000033','W06000022'].includes(frame.code)? 65  :25)}
  >{frame.val}%</text>

<line x1={frame.data.centroid[0] - (frame.code == 'W06000021' ? 15 : 0)} x2={frame.data.centroid[0] - (frame.code == 'W06000021' ? 15 : 0)} y1={(frame.data.centroid[1]) - (['E09000033','W06000022'].includes(frame.code)? 60  :20)} y2={frame.data.centroid[1]}  stroke-width={2} stroke = 'black'/>
    {/each}


    {/if}
  </ZoomSvg>
{/if}

<style>
</style>
