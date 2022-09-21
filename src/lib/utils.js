import ckmeans from "ckmeans";
import { geoPath, geoMercator } from "d3-geo";
import { feature } from "topojson-client";
import broad_agebands from "$lib/broad_agebands.js";
import region_pyramid_data from "./region_pyramid_data.js";
import region_largest_agegroup from "./region_largest_agegroup.js";
import people_pitches from "./people_pitches.js";


export function setColors(themes, theme) {
  for (let color in themes[theme]) {
    document.documentElement.style.setProperty('--' + color, themes[theme][color]);
  }
}

export function getMotion() {
  let mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)"); // Check if browser prefers reduced motion
  return !mediaQuery || mediaQuery.matches ? false : true; // return true for motion, false for no motion
}

export function ckMeans(growths, g, region = false, numBreaks = null, setBreaks = null) {


  if (region) {
    let pos = ckmeans(growths, 4);
    let b = pos.concat([50]);
    let breaks = [0, 3, 6, 8, 10];
    let colours = ["#EEE4DF", "#FED4A6", "#FDA13C", "#ED7320"];
    let find_break = (n) => breaks.findIndex((e) => n <= e) - 1;
    return colours[find_break(g)];
  }
  else
    if (!numBreaks) {

      let pos = ckmeans(
        growths.filter((e) => e >= 0), 7)

      let neg = ckmeans(
        growths.filter((e) => e <= 0), 7);

      let b = ckmeans(neg, 7)
        .concat(pos)
        .concat(Math.max(...growths));

      let breaks = [b[0] - 1, b[2], b[4], b[6], b[8], b[10], b[12], b[14]];
      let colours = ["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]

      let neg_colours = ["#3E558A", "#958BBA", "#CAC6DE",]
      let neut_colours = ["#e9e9e9"]
      let pos_colours = ["#FED4A6", "#FDA13C", "#ED7320"]

     // console.log('BREAKS', breaks)
      let find_break = (n) => breaks.findIndex((e) => n <= e) - 1;
      return colours[find_break(g)];

    }
  if (numBreaks == 3) {
      let breaks = [-100 , -5, 30 , 100]
      if(setBreaks) breaks = setBreaks; 
      let colours = ["#3E558A", "#e9e9e9", "#ED7320"]
      let find_break = (n) => breaks.findIndex((e) => n <= e) - 1;
      return colours[find_break(g)];
  }
}



export function makeData(all_data, topoData, growth, region_growth) {
all_data.REGION.PYRAMID11=region_pyramid_data.y2011[all_data.REGION_CODE]
all_data.REGION.PYRAMID21=region_pyramid_data.y2021[all_data.REGION_CODE]
all_data.REGION.LARGEST_AGEGROUP11={'AGEBAND':region_largest_agegroup.find(e=>e[0]==all_data.REGION_CODE)[1]}
all_data.REGION.LARGEST_AGEGROUP21={'AGEBAND':region_largest_agegroup.find(e=>e[0]==all_data.REGION_CODE)[2]}
all_data.LA.PEOPLEPICH=people_pitches[all_data.CODE]
all_data.REGION.MAX_PC={f:0,m:0}
  let country = all_data.CODE[0]
  const path = geoPath().projection(geoMercator());

  let data = feature(topoData, "topoData").features;
/*
  data.forEach((e) => {
    e.bounds = path.bounds(e);
    e.centroid = [(e.bounds[0][0] + e.bounds[0][1]) / 2, (e.bounds[1][0] + e.bounds[1][1]) / 2];
  });
*/
  data.forEach(
    (e) =>
    (e.growth = growth.find((el) => el.LAD17CD == e.properties.AREACD) || {
      GROWTH: 0,
      TOTAL11: 0,
    })
  );

  data.forEach((e) => (e.u15 = broad_agebands.find(el => el.LAD == e.properties.AREACD).u15));
  data.forEach((e) => (e.work = broad_agebands.find(el => el.LAD == e.properties.AREACD).work));
  data.forEach((e) => (e.o65 = broad_agebands.find(el => el.LAD == e.properties.AREACD).o65));

  let breaks={E:{o65:[-100 , -10, 30 , 100],u15plus:[-100 , -30, 10 , 100],u15minus:[-100 , -5, 50 , 100]},
    W:{o65:[-100 , -10, 20 , 100],u15plus:[-100 , -50, 0 , 100],u15minus:[-100 , -5, 50 , 100]}}
//  let country='E'
  data.forEach(e => e.u15_colour1 = ckMeans(data.map(el => el.u15), e.u15, 0, 3, breaks[country].u15plus))
  data.forEach(e => e.u15_colour2 = ckMeans(data.map(el => el.u15), e.u15, 0, 3, breaks[country].u15minus))
  data.forEach(e => e.o65_colour = ckMeans(data.map(el => el.o65), e.o65, 0, 3, breaks[country].o65))//<-NEED TO FIX BREAKS FOR COLOUR SCALE

  data.forEach((e) => {
    let obj = e.growth;
    e.growth = +Math.round(obj.GROWTH * 10) / 10;
    e.pop = +obj.TOTAL11;
    e.abs = Math.round((+obj.GROWTH * +obj.TOTAL11) / 100);
    e.properties.REGIONCD = growth.find(
      (el) => el.LAD17CD == e.properties.AREACD
    ).REGION;
  });

  let tableData = data.map((e) => [e.properties.AREANM, e.growth]);
  tableData = tableData.sort((a, b) => a[0].localeCompare(b[0]));

  data.table1 = [["local authority", "percentage growth"], ...tableData];
  data.table2 = [
    [
      "rank amongst neighbours",
      "neighbouring local authority",
      "percentage growth",
    ],
    [
      "highest",
      all_data.NEIGHBOURS.PC_CHANGE.top.NAME,
      all_data.NEIGHBOURS.PC_CHANGE.top.VAL,
    ],
    [
      "second highest",
      all_data.NEIGHBOURS.PC_CHANGE.second.NAME,
      all_data.NEIGHBOURS.PC_CHANGE.second.VAL,
    ],
    [
      "second lowest",
      all_data.NEIGHBOURS.PC_CHANGE.penultimate.NAME,
      all_data.NEIGHBOURS.PC_CHANGE.penultimate.VAL,
    ],
    [
      "lowest",
      all_data.NEIGHBOURS.PC_CHANGE.last.NAME,
      all_data.NEIGHBOURS.PC_CHANGE.last.VAL,
    ],
  ];
  data.table3 = [
    ["males", "females"],
    [all_data.LA.OVER65.ABS.M, all_data.LA.OVER65.ABS.F],
  ];

  let growths = data.map((e) => e.growth).sort((a, b) => a - b);
  data.forEach((e) => (e.colour = ckMeans(growths, e.growth)));
  let region_growths = region_growth
    .map((e) => e.PC_CHANGE)
    .sort((a, b) => a - b);
  data.forEach(
    (e) =>{
    e.region_growth=region_growth.find((el) => el.CODE == e.properties.REGIONCD).PC_CHANGE;
    e.region_colour = ckMeans(
      region_growths,
      region_growth.find((el) => el.CODE == e.properties.REGIONCD).PC_CHANGE,
      1
    )}
  );

  return data;
}

export function makeRegions(topoRegions) {

  const path = geoPath().projection(geoMercator());
  let regions = feature(topoRegions, "topoRegions").features;
//console.log('regions',regions)
  return regions

}


export function makeCountry(topo) {

  const path = geoPath().projection(geoMercator());
  let regions = feature(topo, "topoGB").features;

  return regions

}