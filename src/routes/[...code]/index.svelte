<script context="module">
  export const prerender = true;
  import { base } from "$app/paths";
  import items from "$lib/vis/dropdown/items.json";
  import { story_raw } from "$lib/story";
  import regions from "$lib/vis/dropdown/regions.json";
  import country_data from "$lib/country_data.js";
  import { makeData, makeRegions, makeCountry } from "$lib/utils";
  import topoData from "$lib/topoData.json";
  import topoRegions from "$lib/topoRegions.json";
  import topoGB from "$lib/topoGB.json";
  import growth from "$lib/growth.js";
  import region_growth from "$lib/region_growth.js";
  import neighbours from "$lib/neighbours.js";
  items.forEach(
    (d) => (d.region = regions.filter((r) => r.code == d.regioncd).name)
  );

  let largest_ageband = (py) => {
    let arr = [];
    py[0].forEach((e, i) => arr.push(e + py[1][i]));
    let highest = JSON.parse(JSON.stringify(arr)).sort((a, b) => b - a)[0];
    let ind = arr.indexOf(highest);
    return ind * 5;
  };

  export async function load({ params, fetch }) {
    let all_data = null;
    let country = null;
    let data = null;
    let selected = null;
    let regionsGeo = null;
    let ukGeo = null;
    let code = params.code.replace("/", "");

    if (neighbours[code]) {

      const response = await fetch(`${base}/data/place_data/${code}.json`);
      all_data = await response.json();
      let neighbour = neighbours[all_data.CODE].sort(
        (a, b) => a.growth - b.growth
      );
      all_data.NEIGHBOURS.CODES = neighbour.map((e) => e.id);
      all_data.NEIGHBOURS.PC_CHANGE = {
        top: {
          NAME: neighbour[neighbour.length - 1].name,
          VAL: neighbour[neighbour.length - 1].growth,
          CODE: neighbour[neighbour.length - 1].id,
        },
        second: {
          NAME: neighbour[neighbour.length - 2].name,
          VAL: neighbour[neighbour.length - 2].growth,
          CODE: neighbour[neighbour.length - 2].id,
        },
        penultimate: {
          NAME: neighbour[1].name,
          VAL: neighbour[1].growth,
          CODE: neighbour[1].id,
        },
        last: {
          NAME: neighbour[0].name,
          VAL: neighbour[0].growth,
          CODE: neighbour[0].id,
        },
      };
      country = all_data.CODE[0];
      all_data.WALES = country == "E" ? 0 : 1;
      all_data.COUNTRY = country_data[country];
      all_data.LA.LARGEST_AGEGROUP11.AGEBAND = largest_ageband(
        all_data.LA.PYRAMID11
      );
      all_data.LA.LARGEST_AGEGROUP21.AGEBAND = largest_ageband(
        all_data.LA.PYRAMID21
      );

      data = makeData(
        all_data,
        topoData,
        growth,
        region_growth,
        neighbours,
        country
      );
      regionsGeo = makeRegions(topoRegions);
      ukGeo = makeCountry(topoGB);
      selected = items.find((e) => e.areacd == all_data.CODE);
      //eliminate(all_data, new_story, country)
    }

    return { props: { all_data, country, data, selected, regionsGeo, ukGeo} };
  }
</script>

<script>

  const assets = 'https://www.ons.gov.uk/visualisations/censuspopulationchange'

  export let all_data, data, country, selected, regionsGeo, ukGeo;

  let eliminate = function (d, s, country) {
      let c=d.CODE

      let new_story = JSON.parse(JSON.stringify(s))

      let spliceStory = (background,key) => {
      let part = new_story.find((e) => e.background == background)
      let fore = part.foreground
      let index=fore.findIndex((e) => e.section.actions["data-id"] == key); //1
      fore.splice(index, 1);
    };

    if (country == "W") {//wALES
      spliceStory('Animated_charts','d')
      spliceStory('Pyramids','country21')
      spliceStory('Animated_charts','f')
      spliceStory('Animated_charts','g')
      spliceStory('Animated_charts','h')
      spliceStory('Animated_charts','i')    
    }

    if (c == "E09000030") {//Tower Hamlets (2 eliminations)
      spliceStory('Animated_charts','f')
      spliceStory('Football','pitch2')
    } 
    if (c == "E09000020") {//K&C
      spliceStory('Animated_charts','h')
    } 
    if (c == "E07000030") {//Eden
      spliceStory('Football','pitch1')
    } 
    if (c == "E09000001") {//City of London
      spliceStory('Pyramids','local_change')      
    } 
    if (c == "E06000053") {//Isles of Scilly
      spliceStory('Pyramids','local_change')     
    } 
    if (c == "W06000015") {//Cardiff
      spliceStory('Football','pitch2')
    } 
    if (c == "W06000023") {//Powys
      spliceStory('Football','pitch1')
    } 
    if (c == "W06000022") {//Newport
      spliceStory('Animated_charts','f')
    } 

    return new_story
  };


 
let story;

if(all_data && story_raw && country){ story = eliminate(all_data, story_raw, country)} 
else{story = story_raw}

  let longest_legend = {
    legend: 1,
    title:
      "Population change (%) of local authority areas in <strong>Yorkshire and the Humber</strong> between 2011 and 2021 between 2011 and 2021 between 2011 and 2021 between 2011 and 2021",
    subtitle: "Percentage growth",
    avgVal: 5,
    avgName: "England and Wales Average",
    selectedVal: "",
    selectedName: "",
    suffix: "%",
    breaks: [-20.2, -6.1, -2.6, -0.6, 2.9, 7.4, 12.5, 22.8],
    colours: [
      "#3E558A",
      "#958BBA",
      "#CAC6DE",
      "#e9e9e9",
      "#FED4A6",
      "#FDA13C",
      "#ED7320"
    ],
  };
  // console.log('longest_legend',longest_legend)

  import Component from "$lib/vis/Component.svelte";

  import Key from "$lib/Key.svelte";

  let animationOn = (function(){let mediaQuery = true; return !mediaQuery || mediaQuery.matches ? false : true;})();
  let showList = !selected;
  let width;

  //import { goto } from "$app/navigation";
  import MakeTable from "$lib/makeTable.svelte";
  import { getContext } from "svelte";
  import Section from "$lib/layout/Section.svelte";
  import Media from "$lib/layout/Media.svelte";
  import Header from "$lib/layout/Header.svelte";
  import Filler from "$lib/layout/Filler.svelte";
  import Divider from "$lib/layout/Divider.svelte";
  import Toggle from "$lib/ui/Toggle.svelte";
  import Arrow from "$lib/ui/Arrow.svelte";
  import Scroller from "$lib/layout/Scroller.svelte";
  import Dropdown from "$lib/vis/dropdown/App.svelte";
  import Icon from "$lib/Icon.svelte";
  import robojournalist from "$lib/bundled/robojournalist"; //for parsing robojournalism from ArchieML
  import RankChart from "$lib/vis/rank_chart/App.svelte";
  //import { beforeUpdate } from 'svelte';


  let theme = getContext("theme");
  let index = {};
  let top = 0;
  let threshold = 0.9;
  let bottom = 1;
  let components = {};

  function doSelect(e) {
    let selected = e.detail;
    if (window.dataLayer) dataLayer.push({
      event: "dropdownSelect",
      areaName: selected.areacd,
      areaCode: selected.areanm
    });
    window.location.href = `${base}/${selected.areacd}/`;
  }


  function doClear() {
    window.location.href = `${base}/`;
  }

  const params = (obj) =>
    obj
      ? {
          title: robojournalist(obj.title, all_data),
          subtitle: robojournalist(obj.subtitle, all_data),
          avgVal: +obj.avgVal,
          avgName: obj.avgName,
          selectedVal: +obj.selectedVal,
          selectedName: obj.selectedName,
          suffix: obj.suffix,
          breaks: [],//JSON.parse(obj.breaks),
          colours:  [],//JSON.parse(obj.colours),
          currentHeader: obj.title,
          highlow: []//JSON.parse(obj.highlow)
        }
      : "";

  $: legend_height = width && width <= 500 ? 180 : 130;

</script>
<svelte:head>
  <title>{selected ? `${selected.areanm} population change, Census 2021 – ONS` : 'How the population changed where you live, Census 2021 - ONS'}</title>
  <link rel="canonical" href="{selected ? `${assets}/${selected.areacd}/`: `${assets}/`}" />
  <meta property="og:title" content="How the population changed {selected ? `in ${selected.areanm}` : 'where you live'}, Census 2021 - ONS" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="{selected ? `${assets}/${selected.areacd}/`: `${assets}/`}" />
	<meta property="og:image" content="{assets}/img/og-image.png" />
	<meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="800" />
  <meta property="og:image:height" content="492" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:image" content="{assets}/img/og-image.png" />
	<meta property="og:description" content="Discover how the population has changed in {selected ? `${selected.areanm}` : 'your area'} from Census 2021 data, including the changes to age groups, rounded population density and totals." />
	<meta name="description" content="Population change in  {selected ? `${selected.areanm}` : 'your area'} from Census 2021 data, including the changes to age groups, rounded population density and totals." />
  <script src="{base}/js/flubber.min.js"></script>
  {#if !selected}
  <meta name="google-site-verification" content="Pa8IqEBwNpNpNy2z6Y6hWCjMWnVCntQXlGsz_hrFkyI" />
  {/if}
</svelte:head>

{#if longest_legend && all_data && story.length}

  <!--FAKE PAGE-->
  <div style="visibility:hidden">
    <Scroller {top} {threshold} {bottom} splitscreen="1">
      <div slot="background" >
        <Key
          paramsObject={longest_legend}
          bind:width
          {legend_height}
        />
      </div>
    </Scroller>
  </div>
{/if}
<!--END OF FAKE PAGE-->

<Header
  bgimage="{base}/img/bg-map.png"
  bgcolor="#206095"
  bgfixed={true}
  theme="dark"
  center={false}
  short={true}
>
  {#if !selected}
    <h1>
      {@html story[0].headline}
    </h1>
  {/if}

  {#if selected && all_data}
    <h1>
      {@html robojournalist(story[0].selectedheadline, all_data)}
    </h1>
  {/if}

 
  <p style="margin-top: 20px">28 June 2022</p>
  <br /> <br />

  <p class="text-big" style="margin-top: 5px">
    {@html selected
      ? robojournalist(story[0].selectedlede, all_data)
      : story[0].lede}
  </p>

  <br />

  <div class="ons-field">
    <Dropdown
      {selected}
      id="mainSelect"
      label="Select a local authority"
      on:select={doSelect}
      on:clear={doClear}
    />
  </div>
  {#if selected}
    <br />
    <Toggle mono={true} bind:checked={animationOn}>
      {`Animation ${animationOn ? "on" : "off"}`}
    </Toggle>
    {#if selected && selected.areacd == 'E06000046'}
    <p style:margin-top="40px">
      Notice, 30 June 2022: A sentence about population change in areas near to the Isle of Wight has been corrected to match the percentages in the accompanying map.
    </p>
    <div style:margin-top="40px">
      <Arrow color="white" animation={animationOn}>Scroll to begin</Arrow>
    </div>
    {:else}
    <div style:margin-top="90px">
      <Arrow color="white" animation={animationOn}>Scroll to begin</Arrow>
    </div>
    {/if}
  {/if}
</Header>

{#if all_data && country && story && data}
  {#if legend_height && width}
    {#if selected}
      {#each story as chunk, i}
        {#if chunk.type === "Media"}
          <Media col="custom" height="auto">
            <div>
              <Key
                paramsObject={params(
                  chunk.foreground[0].section.actions.header
                )}
                {legend_height}
                {width}
                nomargin
              />
              <RankChart {country} selected={all_data.CODE}/>
            </div>
            {#if chunk.foreground[0].section.actions["data-description"]}
            <div class="screen-reader-only">
              <p style="color:blue">
                {@html robojournalist(
                  chunk.foreground[0].section.actions["data-description"],
                  all_data
                )}
              </p>
              </div>
            {/if}
          </Media>
        {/if}
        {#if chunk.type === "Scroller"}
          {#if chunk.family != "football"}
            <Divider hr={false} />
          {/if}

          <Scroller
            {top}
            {threshold}
            {bottom}
            bind:index={index[chunk.family]}
            splitscreen={chunk.family != "football"}
          >
            <div slot="background" style="height:100vh">
              <Component
                {index}
                family={chunk.family}
                component={chunk.background}
                animation={chunk.foreground[index[chunk.family]]}
                {country}
                {all_data}
                {data}
                selected={selected.areacd}
                {animationOn}
                {legend_height}
                {width}
                {regionsGeo}
                {ukGeo}
                {story}
              />
            </div>

            <div slot="foreground">
              {#each chunk.foreground as section}
                {#if !(all_data.WALES && section["data-id"] == "d")}
                  <section>
                    {#if section.content && typeof section.content == "object"}
                      <div class="col-medium">
                        {#each Object.keys(section.section.content) as type}
                          <svelte:component
                            this={components[type]}
                            content={section.section.content[type]}
                          />
                        {/each}
                      </div>
                    {:else}
                      <div class="col-medium">
                        <p>
                          {@html robojournalist(
                            section.section.content,
                            all_data
                          )}
                        </p>
                        <!--{#if z >= 150}
                      <p class="chart_title_zoom">
                        chart: {robojournalist(
                          section.section.actions["data-title"],
                          all_data
                        )}
                      </p>
                    {/if}-->
                        {#if section.section.actions["data-description"]}
                          <div class="screen-reader-only">
                            <p style="color:blue">
                              {@html robojournalist(
                                section.section.actions["data-description"],
                                all_data
                              )}
                            </p>
                            {#if section.section.actions["data-table"]}
                              <br />
                              <MakeTable
                                tableData={data[
                                  section.section.actions["data-table"]
                                ]}
                                title={robojournalist(
                                  section.section.actions["data-title"],
                                  all_data
                                )}
                              />
                            {/if}
                          </div>
                        {/if}
                      </div>
                    {/if}
                  </section>
                {/if}
              {/each}
            </div>
          </Scroller>
        {/if}
        {#if chunk.type === "Filler"}
          <Filler theme="lightgrey" short={true} wide={true} center={false}>
            <p class="text-big">
              {@html robojournalist(chunk.content, all_data)}
            </p>
          </Filler>
        {/if}
      {/each}
    {/if}
  {/if}
{/if}

<Section>
  <h2>
    {selected
      ? "Other versions of this article"
      : "All versions of this article"}
  </h2>
  <p>
    <Icon type="chevron" rotation={showList ? 90 : 0} />
    <button class="btn-text" on:click={() => (showList = !showList)}
      >{showList ? "Hide" : "Show"} list of local authorities</button
    >
  </p>
</Section>

<div class:visually-hidden={!showList}>
  <Media col="wide" grid="narrow">
    {#each [...regions].sort((a, b) => a.code.localeCompare(b.code)) as region}
      <div class="text-small">
        <strong>{region.name}</strong><br />
        {#each items.filter((d) => d.regioncd == region.code) as place}
          <a href="{base}/{place.areacd}/" sveltekit:reload >{place.areanm}</a><br />
        {/each}
      </div>
    {/each}
  </Media>
</div>

<Divider />

<Section>
  <h2 class="section-title">Notes</h2>
  <p>
    Population change in certain areas may reflect how the coronavirus
    (COVID-19) pandemic affected people's choice of usual residence on Census
    Day, for example, students and in some urban areas.<br /><br />These changes
    might have been temporary for some and more long-lasting for others.<br
    /><br />First results from Census 2021 are rounded to the nearest 100 so may
    not add exactly.<br /><br />Changes over time have been calculated with
    rounded estimates for Census 2021 and unrounded estimates from the 2011
    Census.
  </p>
  <h2 class="section-title">Related links</h2>
  <ul style:padding-top='10px'>
      <li>You can find more information about the <a href="https://www.ons.gov.uk/releases/initialfindingsfromthe2021censusinenglandandwales" data-gtm-type="related-release">Census 2021 first results</a> on the ONS website and <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/populationandhouseholdestimatesenglandandwales/census2021" data-gtm-type="related-release">in our detailed bulletin</a>.</li>
      <li>You can <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/datasets/populationandhouseholdestimatesenglandandwalescensus2021" data-gtm-type="related-data">view the full Census 2021 first results dataset</a>.</li>
      <li>You can <a href="{base}/data/datadownload.xlsx" data-gtm-type="data-download">download the data used in this article (XLSX, 138KB)</a>.</li>
      <li>You can <a href="{base}/data/datadownload2011.xlsx" data-gtm-type="data-download">download data from the 2011 Census (XLSX, 265KB)</a>, matched to April 2022 local authority boundaries .</li>
      <li>Play the Census 2021 <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/playthecensus2021populationmapgame/2022-06-28" data-gtm-type="related-release">population map game</a>.</li>
      <li>Read about the <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/historyofthecensus1801to2021/2022-06-20" data-gtm-type="related-release">history of the census</a> from 1801 to 2021.</li>
  </ul>
  <h2>Contact</h2>
  <p>
    <a href="mailto:census.customerservices@ons.gov.uk">census.customerservices@ons.gov.uk</a><br/>
    Telephone: +44 1329 44 4972
  </p>
</Section>