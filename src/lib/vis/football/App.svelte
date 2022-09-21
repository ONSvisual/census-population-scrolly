<script>
  import pitch from './pitch'
  import folk from './folk'
  import { checkIntersection } from 'line-intersect'
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'

  export let animation, svg_height, legend_height, width, all_data, animationOn = true, height, regionsGeo, ukGeo
  export let story, legend_h=null,index=null,padding=null,country=null,family=null,component=null,selected=null,data=null,nb=null,rb=null,cb=null
//console.log(pitch)

  let w,h

  let peopleStore=tweened()
  let pitchStore=tweened()

  h = svg_height + legend_height

  let people1, pitches1;

if(all_data){
  pitches1 = all_data.LA.PEOPLEPICH.Pitches
  people1 = all_data.LA.PEOPLEPICH.People
  peopleStore.set(people1)
  pitchStore.set(pitches1)
}

  let intersect = checkIntersection

  let people2=country=='W'?18:112
  let pitches2=1
  let people3=1
  let pitches3=5

  pitch.forEach((e) => {
    e.order = 1
  })

  let tempPitch=(i)=>{
	let x=JSON.parse(JSON.stringify(pitch))
	x.forEach(e=>{e.y1=e.y1-750*i; e.y2=e.y2-750*i; e.order=i+1})
	return x}

  let newPitch = JSON.parse(JSON.stringify(pitch))
    .concat(tempPitch(1))
    .concat(tempPitch(2))
    .concat(tempPitch(3))
    .concat(tempPitch(4))
    .concat(tempPitch(5))
    .concat(tempPitch(6))


  let points = []

  for (let i = 0; i < 200; i++) {
    points.push({
      x: Math.random() * 1000 - 500,
      y: Math.random() * -500 - 25,
      scale: 1,
      order: i + 1,
      z: 0,
    })
  }

  //set vanishing point
let vp=300
//set vertical squash factor
let squash=vp
//define initial height
let h_orig=pitch[0].y1*-1
//offset all points by 0.5px to avoid pooints falling on zero
newPitch.forEach(e=>{e.x1=e.x1+0.5; e.x2=e.x2+0.5; e.y1=e.y1-0.5; e.y2=e.y2-0.5})
//function for reprojecting points to perspective
let project=(x,y)=>intersect(0,0,(-h_orig/y*x),-squash,0,-vp,x,0).point
//reproject all points
newPitch.forEach(e=>{
e.x1= project(e.x1,e.y1).x
e.y1= project(e.x1,e.y1).y
e.x2= project(e.x2,e.y2).x
e.y2= project(e.x2,e.y2).y
})

  points.forEach((e) => {
    let eX = e.x,
        eY = e.y
        e.x = project(e.x, e.y).x
        e.y = project(e.x, e.y).y
        e.scale = e.x / eX
        e.skew = Math.atan2(eY + e.y, e.x - eX) * 180 * Math.PI
  })

  let stepPrev

  function change(step) {
   if (step != stepPrev) {
      if (step == 'pitch1'){peopleStore.set(people1,{duration:1000* animationOn}); pitchStore.set(pitches1,{duration:1000* animationOn})}
      if (step == 'pitch2'){peopleStore.set(people2,{duration:1000* animationOn}); pitchStore.set(pitches2,{duration:1000* animationOn})}
      if (step == 'pitch3'){peopleStore.set(people3,{duration:1000* animationOn}); pitchStore.set(pitches3,{duration:1000* animationOn})}
      stepPrev=step
      return
      }
  return step
  }

 $: animation[0]=='p' && change(animation)

</script>

{#if people1 && all_data}
<div class="svg-container" bind:clientWidth={w} >
{#if w}
  <svg viewBox="{-w / 2} {-h / 2} {w} {h_orig}">

    <g transform="scale({w / 1100})">

      {#each newPitch as params}
        <line
          {...params}
          stroke="white"
          stroke-width={(1 / params.order) * 3}
          stroke-opacity="1"
          visibility={params.order > Math.round($pitchStore) ? 'hidden' : 'visible'}
          stroke-linecap='round' />
      {/each}

      {#each points as point, i}
        <g
          class="shadow"
          transform="translate({point.x - 14}, {point.y - 25.5}) scale({6 * point.scale})">
          <path
            d={folk[i % 45].shadow}
            fill="#40826D"
            transform="rotate(-10 50 100) translate(15 -5) skewX(40) scale(1 0.5)"
            visibility={point.order > Math.round($peopleStore) ? 'hidden' : 'visible'} />
        </g>
      {/each}
      {#each points as point, i}
        <g
          class="person"
          transform="translate({point.x - 14}, {point.y - 25.5}) scale({6 * point.scale})">
          <path
            d={folk[i % 45].shadow}
            fill="black"
            visibility={point.order > Math.round($peopleStore) ? 'hidden' : 'visible'} />
        </g>
      {/each}
    </g>
  </svg>
  {/if}
</div>
{/if}

<style>
  .svg-container, svg {
    width: 100%;
    height: 100vh;
  }
  svg {
    background-color: #57ac7a;
  }
</style>