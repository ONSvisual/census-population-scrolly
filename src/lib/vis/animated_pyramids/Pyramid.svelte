<script>
  import {tweened} from 'svelte/motion'
  import { interpolateLab } from 'd3-interpolate';
  import { extent } from 'd3-array'
  import Bar from './Bar.svelte'
  let bars,newBars,newKey

  import pyramidStore from './pyramid'
 
import { writable } from 'svelte/store';
let trigger=writable()
trigger.set("bars")
export let request, width, padding, pyramid_width, w_change=50, la_change_blended, country_change_blended, country_change_divided, la_change_divided, pyramid, svg_height, highlight, animationOn;

let f = svg_height>width?(width)/19:(svg_height)/19
let keys = writable(), maxF, maxM


  $: {
    bars = []
    newBars = []
    keys.set([{//left
      x1:(width/2)-(1 * pyramid_width) - 33,
      y1:0,
      x2:(width/2)-(1 * pyramid_width) - 33,
      y2:f*19,
      text:'1%',
      stroke:'#bbb'
    },
    {//left
      x1:(width/2)-(2 * pyramid_width) - 33,
      y1:0,
      x2:(width/2)-(2 * pyramid_width) - 33,
      y2:f*19,
      text:'2%',
      stroke:'#bbb'
    },
    {//left
      x1:(width/2)-(3 * pyramid_width) - 33,
      y1:0,
      x2:(width/2)-(3 * pyramid_width) - 33,
      y2:f*19,
      text:'3%',
      stroke:'#bbb'
    },
    {//RIGHT
      x1: (width/2)  + 33 + ( 1 * pyramid_width),
      y1:0,
      x2: (width/2)  + 33 + ( 1 * pyramid_width),
      y2:f*19,
      text:'1%',
      stroke:'#bbb'
    }, 
    {//RIGHT
      x1: (width/2)  + 33 + ( 2 * pyramid_width),
      y1:0,
      x2: (width/2)  + 33 + ( 2 * pyramid_width),
      y2:f*19,
      text:'2%',
      stroke:'#bbb'
    },
    {//RIGHT
      x1: (width/2)  + 33 + ( 3 * pyramid_width),
      y1:0,
      x2: (width/2)  + 33 + ( 3 * pyramid_width),
      y2:f*19,
      text:'3% of all',
      text2:'residents',
      stroke:'#bbb'
    },  
  ])
//console.log('$pyramidStore',$pyramidStore)

    for (let i in $pyramidStore[0]) {
      let e = $pyramidStore[0][i]
      bars.push({
        x: (width/2)-(e * pyramid_width) - 33,
        y: i * f,
        width: e * pyramid_width,
        height: f - 4,
        sex: 'f',
        value: e?-1*e:'',//((e/w_change) * pyramid_width), ["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]

        agegroup: `${(18 - i) * 5}`,
        fill: tweened($pyramidStore[0][0]==0||$pyramidStore[0][1]==0?'#3E558A':i == $highlight?'#355C7D':'#b0c3d3', {duration: 200 * animationOn, interpolate: interpolateLab}),
        pos:'l'
      })
    }
    for (let i in $pyramidStore[1]) {
      let e = ($pyramidStore[0][i] + $pyramidStore[0][i]) / 2
      bars.push({
        x: width/2,
        y: i * f,
        width: 80,
        height: f - 4,
        sex: '',
        value: '',
        agegroup: `${(18 - i) * 5} ${
          i == 0 ? '+' : 'to ' + ((18 - i) * 5 + 4)
        }`,
        fill: tweened('white'),
        pos:'m'
      })
    }
    for (let i in $pyramidStore[1]) {
      let e = $pyramidStore[1][i]
      bars.push({
        x: width/2 + 33,
        y: i * f,
        width: e * pyramid_width,
        height: f - 4,
        sex: 'm',
        value: e?e:'',
        agegroup: `${(18 - i) * 5}`,
        fill: tweened($pyramidStore[0][0]==0||$pyramidStore[0][1]==0?"#ED7320":i == $highlight?'#355C7D':'#b0c3d3', {duration: 200 * animationOn, interpolate: interpolateLab}),
        pos:'r'
      })
    }
  }

</script>

{#if request && $highlight}
<g>
   {#if request=='bars'}
  {#each $keys as key,i}
  <line {...key}></line>
  <text x={key.x1 - 10} y=-5  font-size='16px'>{key.text}</text>
  {#if key.text2}
  <text x={key.x1 - 10} y=10  font-size='16px'>{key.text2}</text>
  {/if}

  {/each}
  {/if}
    {#each bars as props}
     <Bar x={props.x} y={props.y} width={props.width} height={props.height} sex={props.sex} value={props.value} agegroup={props.agegroup} colour={props.colour} fill={props.fill}></Bar>
    <!--   <rect {...props} rx="0" fill={request!='bars' && props.value!=''?props.value<0?'rgb(62, 85, 138)':'rgb(237, 115, 32)':props.fill} />-->
      {#if props.pos!='m' && request!='bars'}
      <text 
      x={props.value<0?props.x - 10:props.x+props.width + 10} 
      y={props.y + props.height/1.3}
      text-anchor={props.value<0?'end':'start'} 
      font-size={16}
      >
      {Math.round(props.value)!=0?Math.round(props.value)+'%':''}</text>
      {/if}
      {#if props.agegroup.length>3}
      <text
        x={props.x}
        y={props.y + f / 2 + 2}
        text-anchor="middle"
        fill="#444"
        font-size="16px">
        {props.agegroup}
      </text>

      {/if}
    {/each}
    <text
      x={width/2 - 33}
      y={-25}
      font-weight='bold'      
      fill="black"
      text-anchor="end"
      font-size='18px'
      >
      {request=="bars"?'male':'fall'}
    </text>
    <text
      x={width/2 + 33}
      y={-25}
      font-weight='bold'
      fill="black"
      text-anchor="start"
      font-size='18px'
      >
      {request=="bars"?'female':'rise'}
    </text>
</g>
{/if}
