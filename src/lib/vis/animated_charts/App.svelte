<script>
  import { interpolateLab } from "d3-interpolate";
  import Path from "./Path.svelte";
  import Decoration from "./Decoration.svelte";
  import Region_bell_decoration from "./Region_bell_decoration.svelte";
  import Text from "./Text.svelte";
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  const interpolate = flubber.interpolate;
  import { geoPath, geoMercator } from "d3-geo";
  import { extent } from "d3-array";
  import growth from "$lib/growth.js";
  import ZoomSvg from "./ZoomSvg.svelte";
  import { writable, get } from "svelte/store";
  import frequency from "./filter_frequency.js";
  import popRank from "$lib/poprank.js";
  import RegionOutline from "$lib/vis/RegionOutline.svelte";
  import UKOutline from "$lib/vis/UKOutline.svelte";
  import originalCharts from "./charts";
  import region_growth from '$lib/region_growth.js';

  let charts = JSON.parse(JSON.stringify(originalCharts));
  let chartsStore = JSON.parse(JSON.stringify(charts));  
  let region_mark

  export let country,
    all_data,
    animationOn = 0,
    nb,
    rb,
    legend_height,
    height,
    regionsGeo,
    ukGeo,
    regions,
    story;

    let allOffset = null;
  


  let fader = tweened(1);
  let key = true;
  let chart_key = false;

  export let animation,
    width = null,
    padding,
    selected,
    svg_height = null;
  export let index = null,
    family = null,
    component = null,
    cb = null; // to suppress errors
  //DOTS


  let currentProj, path, Greenwich, FirstMeridian;
  currentProj = geoMercator();
  path = geoPath().projection(currentProj);

  const easing = cubicInOut;
  let axes;
  let loaded;
  let values = [];
  export let data;
  let timeline;
  let bounds;

  let bar = {
    left: 0,
    height: 0,
    scale: 0,
  };
  let newData;
  //let current = 0
  let metric;

  let x = 0,
    y = 0,
    k = 1,
    xx = 0,
    yy = 0;

  function neighbourBounds(bounds) {
    //console.log(bounds)
    let min_x = bounds.sort((a, b) => a[0][0] - b[0][0])[0][0][0];
    let max_x = bounds.sort((a, b) => b[1][0] - a[1][0])[0][1][0];
    let min_y = bounds.sort((a, b) => a[0][1] - b[0][1])[0][0][1];
    let max_y = bounds.sort((a, b) => b[1][1] - a[1][1])[0][1][1];
    let neighbour_bounds = [
      [min_x, min_y],
      [max_x, max_y],
    ];
    return neighbour_bounds;
  }

  function replot(data, factor, offset, x, y, varnm) {

data.forEach((e) => {
    let Path = path(e).split("ZM");
    if (Path.length) {
        let arr = [];
        for (let i = 0; i < Path.length; i++){
          let content = ""
            content+="M" + 
                Path[i]
                    .replace("M", "")
                    .replace("Z", "")
                    .split("L")
                    .map((z) => {
                        let el = z.split(",");
                        return [
                            ((el[0] - x) * factor) + offset.left
                            , ((el[1] - y) * factor) + offset.top
                        ];
                    })
                    .map((el) => el.join())
                    .join("L") +
                "Z"
            arr.push(content)
         // if (content [1] == '-')console.log(content, factor, offset, x, y, varnm, Path[i])
          }
        //if (arr.length>1 && arr.filter(e=>e[0]=='-'))console.log(arr)
        e[varnm] = arr.join("");
    }
})

}

  //TIMELINE ... INITIAL SETTINGS
  let timelineMaker = (arr) => {

    let timeline = [];
    arr.forEach((e, i) => {
      timeline.push({
        d: tweened(arr[i].xys_all, { duration: 50 * animationOn, interpolate }),
        centroid: arr[i].centroid,
        n_centroid: arr[i].n_centroid,
        fill: tweened(arr[i].region_colour),
        fillOpacity: tweened(1, { duration: 0, interpolate }),
        title: writable(arr[i].properties.AREANM),
        area_cd: writable(arr[i].properties.AREACD),
        code: arr[i].properties.AREACD,
        value: writable(arr[i].growth.toFixed(1)),
        metric: writable("% change"),
        pop: arr[i].pop,
        selected: arr[i].properties.AREACD == selected,
        label_opacity: tweened(0),
        viewable: 0,
        zoom: arr[i].zoom,
        bar_decoration: writable(arr[i].bar_decoration),
        bar_label: writable(arr[i].bar_label),
        difference: arr[i].difference,
        name: arr[i].properties.AREANM,
        poprank: arr[i].poprank,
        r11: arr[i].POP_RANK_11,
        r21: arr[i].POP_RANK_21,
        r_centroid: arr[i].r_centroid,
      });
    });
    return timeline;
  };

  function redrawData() {

    let ab = neighbourBounds(data.map((e) => path.bounds(e)));

    let allX = ab[0][0],
      allY = ab[0][1];
    let aA = ab[0][0],
      aB = ab[0][1],
      aC = ab[1][0],
      aD = ab[1][1],
      ah = aD - aB,
      aw = aC - aA,
      allFactor = aw / ah <= width / svg_height ? svg_height / ah : width / aw;
      allOffset  = {
      left: aw / ah <= width / svg_height ? (width - aw * allFactor) / 2 : 0,
      top: aw / ah < width / svg_height ? 0 : svg_height / (ah * allFactor) / 2,
    };

    replot( data, allFactor, allOffset, allX, allY, 'xys_all')

      let rg=[...new Set(regionsGeo.map(el=>el.properties.REGIONCD))]
      regions=rg.map(e=>({code:e}))
      //console.log(regions)
      regions.forEach(e=>{
        let centroid=path.centroid(regionsGeo.filter(el=>el.properties.REGIONCD==e.code)[e.code[0]=='W'?1:0])
        e.centroid=[((centroid[0] - allX) * allFactor)+ allOffset.left,
        ((centroid[1] - allY) * allFactor)+ allOffset.top
      ]
        e.name=regionsGeo.find(el=>el.properties.REGIONCD==e.code).properties.REGIONNM
        e.growth=region_growth.find(el=>el.CODE==e.code).PC_CHANGE
      })

     regionsGeo.forEach((e) => {
      e.region_name = e.properties.REGIONNM;
      e.region_code = e.properties.REGIONCD;
      let centroid=path.centroid(e);
      e.centroid=[
      ((centroid[0] - allX) * allFactor) + allOffset.left, 
      ((centroid[1] - allY) * allFactor) + allOffset.top
    ]
     })
     replot(regionsGeo, allFactor, allOffset, allX, allY, 'xys_all')

    let cb = neighbourBounds(
      data
        .filter((e) => e.properties.AREACD[0] == country)
        .map((e) => path.bounds(e))
    );
    let countryX = cb[0][0],
      countryY = cb[0][1];
    let cA = cb[0][0],
      cB = cb[0][1],
      cC = cb[1][0],
      cD = cb[1][1],
      ch = cD - cB,
      cw = cC - cA,
      countryFactor =
        cw / ch <= width / svg_height ? svg_height / ch : width / cw;
      let cOffset = {
      left: cw / ch <= width / svg_height ? (width - cw * countryFactor) / 2 : 0,
      top: cw / ch < width / svg_height ? 0 : svg_height / (ch * countryFactor) / 2,
    };
    let regions_codes = [...new Set(regionsGeo.map((e) => e.region_code))];
    let regions_bounds = {};
    regions_codes.forEach((e) => {
      regions_bounds[e] = [];
      regionsGeo
        .filter((el) => el.region_code == e)
        .forEach((el) => regions_bounds[e].push(el.region_bounds));
    });
    //console.log('regionsGeo',regionsGeo)
    //console.log('regions_bounds',regions_bounds)

    replot(ukGeo, allFactor, allOffset, allX, allY, 'xys_all')

    replot(data, countryFactor, cOffset, countryX, countryY, 'xys')
  

    data.forEach((e) => {
      let bounds = path.bounds(e);
      e.bounds = [
        [
          ((bounds[0][0] - countryX) * countryFactor)+ cOffset.left,
          ((bounds[0][1] - countryY) * countryFactor)+ cOffset.top,
        ],
        [
          ((bounds[1][0] - countryX) * countryFactor)+ cOffset.left,
          ((bounds[1][1] - countryY) * countryFactor)+ cOffset.top,
        ],
      ];
    });
    data.forEach((e) => {
      let centroid = path.centroid(e);
      e.centroid = [
        ((centroid[0] - countryX) * countryFactor)+ cOffset.left,
        ((centroid[1] - countryY) * countryFactor)+ cOffset.top,
      ];
      e.y = (centroid[1] - countryY) * -countryFactor;
    });


    data.forEach((e) => {
      if (e.properties.AREACD[0] !== country)
        e.xys = `M${e.centroid[0]} ${e.centroid[1]}, ${e.centroid[0]} ${e.centroid[1]},${e.centroid[0]} ${e.centroid[1]}Z`;
    });

    let region_codes = JSON.parse(JSON.stringify(growth));
    region_codes = region_codes
      .filter((e) => e.REGION == all_data.REGION_CODE)
      .sort((a, b) => b.GROWTH - a.GROWTH)
      .map((e) => e.LAD17CD);
    rb = neighbourBounds(
      data
        .filter((e) => region_codes.includes(e.properties.AREACD))
        .map((e) => path.bounds(e))
    );

   // console.log('rb',rb)
    let rA = rb[0][0],
      rB = rb[0][1],
      rC = rb[1][0],
      rD = rb[1][1],
      rh = rD - rB,
      rw = rC - rA,
      rFactor = rw / rh <= width / svg_height ? svg_height / rh : width / rw;
    let rOffset = {
      left: rw / rh <= width / svg_height ? (width - rw * rFactor) / 2 : 0,
      top: rw / rh > width / svg_height ? 0 : svg_height / (rh * rFactor) / 2,
    };
// console.log('rFactor',rFactor)
// console.log('rOff',rOffset)

replot(data, rFactor, rOffset, rA, rB, 'xys_region')

    data.forEach((e,i) => {
      let rcentroid = path.centroid(e);

   //   if(i==1)console.log('rcentroid',rcentroid)

      e.r_centroid = [
        (rcentroid[0] - rA) * rFactor + rOffset.left,
        (rcentroid[1] - rB) * rFactor + rOffset.top,
      ];

      if (!region_codes.includes(e.properties.AREACD))
          e.xys_region = `M${rcentroid[0] * rFactor} ${rcentroid[1] * rFactor}, ${rcentroid[0] * rFactor} ${rcentroid[1] * rFactor},${rcentroid[0] * rFactor} ${rcentroid[1] * rFactor}Z`;
     
    });
 

    nb = neighbourBounds(
      data //TopoJSON object
        .filter((e) =>
          Object.values(all_data.NEIGHBOURS.PC_CHANGE)
            .map((el) => el.CODE)
            .concat([all_data.CODE]) //.includes(newData[i].properties.AREACD)||newData[i].properties.AREACD==selected
            .includes(e.properties.AREACD)
        )
        .map((e) => path.bounds(e))
    );
    //console.log(nb)

    let A = nb[0][0],
      B = nb[0][1],
      C = nb[1][0],
      D = nb[1][1],
      h = D - B,
      w = C - A,
      factor = w / h <= width / svg_height ? svg_height / h : width / w;

    let offset = {
      left: w / h <= width / svg_height ? (width - w * factor) / 2 : 0,
      top: w / h > width / svg_height ? 0 : svg_height / (h * factor) / 2,
    }; //


    replot(data, factor, offset, A, B, 'xys_neighbours')

    data.forEach((e) => {
      let Path = path(e).split("ZM");
      let n_centroid = path.centroid(e);
      e.n_centroid = [
        (n_centroid[0] - A) * factor + offset.left,
        (n_centroid[1] - B) * factor + offset.top,
      ];


      if (e.properties.AREACD[0] !== country)
        e.xys_neighbours = `M${e.n_centroid[0]},${e.n_centroid[1]}Z`;
     
    });

    data.forEach(
      (e) =>
        (e.zoom = Math.sqrt(
          1 /
            (Math.max(
              ...[
                e.bounds[1][0] - e.bounds[0][0],
                e.bounds[1][1] - e.bounds[0][1],
              ]
            ) /
              width)
        ))
    );

    let pRank = JSON.parse(JSON.stringify(popRank)); //<-- CHANGE COUNTRY HERE
    let differences = pRank
        .map((e) => e.POP_RANK_11 - e.POP_RANK_21)
        .sort((a, b) => a - b),
      extremes = [differences[0], differences[differences.length - 1]],
      range = extremes[1] - extremes[0];
    pRank.forEach((e) => (e.difference = e.POP_RANK_11 - e.POP_RANK_21));
    let rank11 = JSON.parse(JSON.stringify(pRank))
      .sort((a, b) => a.POP_RANK_11 - b.POP_RANK_11)
      .map((e) => e.NAME);
    let r = 15;
    let f = 2.5;

    data.forEach((e) => {
      let x, r11, r21;
      if (
        (x = JSON.parse(JSON.stringify(pRank)).filter(
          (el) => el.LAD == e.properties.AREACD
        )[0])
      ) {
        r11 = x.POP_RANK_11;
        r21 = x.POP_RANK_21;
        e.POP_RANK_11 = r11;
        e.POP_RANK_21 = r21;
        e.difference = e.POP_RANK_11 - e.POP_RANK_21;
        e.poprank_pos = `M ${250 + (Math.random() * r) / 5}, ${
          r11 * (r * f) + r - (Math.random() * r) / 5
        }`;
        e.poprank_circles = `${e.poprank_pos}a ${r},${r} 0 1,1 -${
          r * 2
        },0a ${r},${r} 0 1,1 ${r * 2},0`;
        e.poprank = `${e.poprank_circles}L250 ${r11 * (r * f) + r} C300 ${
          r11 * (r * f) + r
        } , 325 ${
          (r21 * (r * f) + r - (r11 * (r * f) + r)) / 2 + (r11 * (r * f) + r)
        } , 325 ${
          (r21 * (r * f) + r - (r11 * (r * f) + r)) / 2 + (r11 * (r * f) + r)
        } S350 ${r21 * (r * f) + r},400,${r21 * (r * f) + r}L${
          400 - (Math.random() * r) / 5
        }, ${r21 * (r * f) + r + (Math.random() * r) / 5}a ${r},${r} 0 1,1 ${
          r * 2
        },0a ${r},${r} 0 1,1 -${r * 2},0L400,${r21 * (r * f) + r}C350 ${
          r21 * (r * f) + r
        }, 325 ${
          (r21 * (r * f) + r - (r11 * (r * f) + r)) / 2 + (r11 * (r * f) + r)
        } , 325 ${
          (r21 * (r * f) + r - (r11 * (r * f) + r)) / 2 + (r11 * (r * f) + r)
        } 
          S300 ${r11 * (r * f) + r},250 ${r11 * (r * f) + r}`;
      }
    });

    let extents = {
      pop: extent(data.map((e) => e.pop)),
      growth: extent(data.map((e) => e.growth)),
      abs: extent(data.map((e) => e.abs)),
    };
    data = data.filter((e) => e.growth !== null); //REMOVE ANY DUD DATA
    data = data.sort((a, b) => b.growth - a.growth); //SORT BY GROWTH TO ALLOW VISIBILITY

    //% FREQUENCY BELL
    let frequencyBell = (function () {
      data = data.sort((a, b) => b.growth - a.growth); //SORT BY GROWTH TO ALLOW VISIBILITY
      values = [];
      let minX = +frequency[country][0].growth,
        maxX = +frequency[country][frequency[country].length - 1].growth,
        rangeX = maxX - minX,
        maxY = frequency[country]
          .map((e) => e.lads.length)
          .sort((a, b) => b - a)[0];
      for (let i = minX; i < maxX + 1; i++) values.push(i);
      let guidingDim = width/svg_height < rangeX/maxY? width : svg_height;
      let comparableMetric = width/svg_height < rangeX/maxY? rangeX : maxY;
      let square = {
          x: guidingDim / (comparableMetric + 3),
          y: guidingDim / (comparableMetric + 3),
        },
        spacing = square.x,
        offset_x = width / 2 - (spacing * rangeX) / 2;

      let country_bell_decoration = [];

      for (let i = minX; i < maxX + 1; i++)
        country_bell_decoration.push({
          x: 0,
          y: -18,
          anchor: "middle",
          transform: `translate(${
            (i - minX + 1) * spacing + (offset_x - square.x / 2)
          },${svg_height}) rotate(0)`,
          "font-size": 16,
          content:
            rangeX < 20
              ? `${i == maxX || i == maxX - 1 ? "\u00A0\u00A0" + i + "%" : i}`
              : i % 2 == 0
              ? `${i == maxX || i == maxX - 1 ? "\u00A0\u00A0" + i + "%" : i}`
              : "",
          ticks: [],
        });
      if (country_bell_decoration.length)
        data.country_bell_decoration = country_bell_decoration;

      data.forEach((e, i) => {
        let pos = frequency[country].find((el) =>
          el.lads.includes(e.properties.AREACD)
        );
        e.bell = `M${500} ${0}, ${500} ${0}, ${500} ${0},${500} ${0}Z`;

        if (pos) {
          //(height-(padding*2 ))/frequency[country].map(e=>e.lads.length).sort((a,b)=>b-a)[0]}
          let x =
            (pos.growth - frequency[country][0].growth) * square.x + offset_x;
          let y =
            svg_height - 10  -
            pos.lads.indexOf(e.properties.AREACD) * square.y -
            square.y * 2;
          let gap = Math.abs(square.y / 2 - square.x / 2);
          //e.bell = `M${x} ${y}, ${x} ${y+square.y}, ${x+square.x} ${y+square.y},${x+square.x} ${y}Z`//SQUARES
          let cx = x + square.x / 2,
            r = Math.min(square.y / 2, square.x / 2),
            cy = y + square.y / 2 - r * 2;
          e.bell = `M${cx - r},${cy} a${r},${r} 0 1,0 ${
            r * 2
          },0 a${r},${r} 0 1,0 ${r * -2},0Z`; //CIRCLES
          let chart = charts.f;
          chart.axis.x.origin = -10;
          chart.axis.x.spacing = 2000;
          chart.axis.y.origin = svg_height - padding * 2 + gap * 2;
          chart.axis.y.spacing = 5000; //(square.y*5)-gap
          e.bell_centroid=[cx, cy]
        }
      });
    })();

    //console.log(data)
    //% FREQUENCY BELL REGION
    let frequencyBellRegion = (function () {
      let region_codes = JSON.parse(JSON.stringify(growth));
      region_codes = region_codes
        .filter((e) => e.REGION == all_data.REGION_CODE)
        .sort((a, b) => b.GROWTH - a.GROWTH)
        .map((e) => e.LAD17CD);
      let region_data = JSON.parse(JSON.stringify(frequency));
      region_data[country].forEach(
        (e) => (e.lads = e.lads.filter((el) => region_codes.includes(el)))
      );
      region_data[country] = region_data[country].filter((e) => e.lads.length);
      values = [];
      let minX = +region_data[country][0].growth,
        maxX = +region_data[country][region_data[country].length - 1].growth,
        rangeX = maxX - minX,
        maxY = region_data[country]
          .map((e) => e.lads.length)
          .sort((a, b) => b - a)[0];
      for (let i = minX; i < maxX + 1; i++) values.push(i);
      let guidingDim = width/rangeX < height/maxY? width : height;
      let comparableMetric = width/height < rangeX/maxY? rangeX : maxY;
      let square = {
          x: guidingDim / (comparableMetric + 10),
          y: guidingDim / (comparableMetric + 10),
        },
        spacing = square.y,
        offset_x = width / 2 - (spacing * rangeX) / 2;

      let region_bell_decoration = [];
      for (let i = minX; i < maxX + 1; i++)
        region_bell_decoration.push({
          x: 0,
          y: 0,
          anchor: "middle",
          transform: `translate(${(i - minX + 1) * spacing},${
            svg_height - spacing / 2
          })`,
          "font-size": 18,
          content:
            rangeX < 20
              ? `${i == maxX ? "\u00A0\u00A0" + i + "%" : i}`
              : i % 2 == 0
              ? `${i == maxX || i == maxX - 1 ? "\u00A0\u00A0" + i + "%" : i}`
              : "",
          ticks: [],
        });
      if (region_bell_decoration.length)
        data.region_bell_decoration = region_bell_decoration;
      data.forEach((e, i) => {
        let pos = region_data[country].find((el) =>
          el.lads.includes(e.properties.AREACD)
        );
        e.bell_region = `M${500} ${0}, ${500} ${0}, ${500} ${0},${500} ${0}Z`;

        if (pos) {
          let x = (pos.growth - region_data[country][0].growth) * square.x;
          let y =
            svg_height -
            pos.lads.indexOf(e.properties.AREACD) * square.y -
            spacing;
          let gap = Math.abs(square.y / 2 - square.x / 2);
          let cx = x + square.x / 2,
            r = Math.min(square.y / 2, square.x / 2),
            cy = y + square.y / 2 - r * 2;
          e.bell_region = `M${cx},${cy} a${r},${r} 0 1,0 ${
            r * 2
          },0 a${r},${r} 0 1,0 ${r * -2},0Z`; //CIRCLES
          let chart = charts.e;
          chart.axis.x.origin = -10;
          chart.axis.x.spacing = 2000;
          chart.axis.y.origin = svg_height - padding * 2 + gap * 2;
          chart.axis.y.spacing = 5000; //(square.y*5)-gap
        }
      });
    })();
    //% GROWTH BAR CHART

    let bar_filter = (arr) => [arr.slice(0, 3), arr.slice(-3)];
    let bar_data = JSON.parse(JSON.stringify(growth))
      .filter((e) => e.REGION == all_data.REGION_CODE)
      .sort((a, b) => b.GROWTH - a.GROWTH);
    let neighbours = bar_data.filter((e) =>
      all_data.NEIGHBOURS.CODES.includes(e.LAD17CD)
    );
    let bottom = bar_data
      .slice(0, 3)
      .filter(
        (e) =>
          !all_data.NEIGHBOURS.CODES.includes(e.LAD17CD) &&
          e.LAD17CD != all_data.CODE
      );
    let top = bar_data
      .slice(-3)
      .filter(
        (e) =>
          !all_data.NEIGHBOURS.CODES.includes(e.LAD17CD) &&
          e.LAD17CD != all_data.CODE
      );
    let here = bar_data.filter((e) => all_data.CODE == e.LAD17CD);

    let combined = neighbours
      .concat(bottom)
      .concat(top)
      .concat(here)
      .sort((a, b) => b.GROWTH - a.GROWTH);

    let count = combined.length;
    let fillers = bar_data
      .filter((e) => !combined.map((el) => el.LAD17CD).includes(e.LAD17CD))
      .sort((a, b) => a.TOTAL11 - b.TOTAL11)
      .slice((23 - count) * -1);
    let bars = combined.concat(fillers);
    bars = bars.sort((a, b) => b.GROWTH - a.GROWTH);
    //console.log("BARS",bars)
    let bar_extents = {
      growth: extent(bars.map((e) => e.GROWTH)),
    };
    bar.height = svg_height / (bars.length + 1);

    bar.scale =
      (1 / (bar_extents.growth[1] - bar_extents.growth[0])) * (width * 0.4); // THIS IS WHERE MOBILE VIEW IS JUST ABOUT WORKING

    bar.left = (width / 2 - (Math.abs(bar_extents.growth[0]) * bar.scale)) ; //CHANGED 20222206

    let chart = charts.k;

    data.forEach((e, i) => {
      e.bar = `M${500} ${0}, ${500} ${0}, ${500} ${0},${500} ${0}Z`;
    });


    bars.forEach((e, i) => {
      let bar_id = e.LAD17CD;
      let data_point = data.findIndex((el) => el.properties.AREACD == bar_id);
      if (data[data_point]) {
        data[data_point].bar = `M${bar.left} ${i * bar.height + 5}, 
        ${bar.left + e.GROWTH * bar.scale} 
        ${i * bar.height + 5}, 
        ${bar.left + e.GROWTH * bar.scale} 
        ${bar.height + i * bar.height},
        ${bar.left} 
        ${bar.height + i * bar.height}Z`;

        data[data_point].bar_decoration = {
          x:
            bar.left +
            (Math.abs(e.GROWTH) < 0.1 ? -10 : e.GROWTH <= 0 ? 10 : -10),
          y: i * bar.height + bar.height * 0.5 + 9,
          anchor: e.GROWTH > -0.1 ? "end" : "start",
          "font-size": 16,
          content: data[data_point].properties.AREANM,
          ticks: [],
        };

        data[data_point].bar_label = {
          x:
            bar.left +
            e.GROWTH * bar.scale +
            (Math.abs(e.GROWTH) < 0.1 ? 5 : e.GROWTH <= 0 ? -5 : 5),
          y: i * bar.height + bar.height * 0.5 + 9,
          anchor: e.GROWTH < -0.1 ? "end" : "start",
          "font-size": 16,
          content: data[data_point].growth.toFixed(1) + "%",
          ticks: [],
        };
      }
    });

    data = data.sort((a, b) => b.growth - a.growth);

    // STARTING FRAME
    data.forEach((e, i) => {
      e.start = `M${e.r_centroid[0]} ${e.r_centroid[1]}, ${e.r_centroid[0]} ${e.r_centroid[1]},${e.r_centroid[0]} ${e.r_centroid[1]}Z`;
      // if (selected == (e.properties.AREACD))e.start = box_path
    });

    //END OF STARTING FRAME
    //% NATIONAL GROWTH BAR CHART

    let national_bar_data = JSON.parse(JSON.stringify(growth))
      .filter((e) => e.LAD17CD[0] == selected[0])
      .sort((a, b) => b.GROWTH - a.GROWTH);
    let national_bar_extents = {
      growth: extent(national_bar_data.map((e) => e.GROWTH)),
    };
    bar.height = (svg_height - padding * 2) / national_bar_data.length;
    bar.left =
      padding +
      (Math.abs(national_bar_extents.growth[0]) /
        (national_bar_extents.growth[1] - national_bar_extents.growth[0])) *
        width;
    bar.scale =
      (1 / (national_bar_extents.growth[1] - national_bar_extents.growth[0])) *
      width;

    let national_chart = charts.l;
    national_chart.axis.x.origin = bar.left;
    national_chart.axis.x.spacing = width / 10;
    national_chart.axis.y.origin = svg_height + padding;
    national_chart.axis.y.spacing = svg_height / 10;

    data.forEach((e, i) => {
      e.national_bar = `M${500} ${0}, ${500} ${0}, ${500} ${0},${500} ${0}Z`;
    });

    national_bar_data.forEach((e, i) => {
      let bar_id = e.LAD17CD;
      let data_point = data.findIndex((el) => el.properties.AREACD == bar_id);
      if (data[data_point]) {
        data[data_point].national_bar = `M${bar.left} ${
          i * bar.height + padding
        }, ${bar.left + e.GROWTH * bar.scale} ${i * bar.height + padding}, ${
          bar.left + e.GROWTH * bar.scale
        } ${bar.height + i * bar.height + padding},${bar.left} ${
          bar.height + i * bar.height + padding
        }Z`;
      }
    });
    data = data.sort((a, b) => b.growth - a.growth);

    //ABSOLUTE SPIKES ON MAP

    chart = charts.u;
    chart.axis.x.origin = Greenwich;
    chart.axis.x.spacing = (Greenwich - FirstMeridian) / 10;
    chart.axis.y.origin = svg_height + padding + svg_height / 10;
    chart.axis.y.spacing = (Greenwich - FirstMeridian) / 10;

    data = data.sort((a, b) => b.abs - a.abs);
    data.forEach((e, i) => {
      let peak = e.pop > e.growth / 10 ? e.pop * (e.growth / 60000) : 1;

      e.absolute =
        peak !== 1
          ? `M${e.centroid[0]},${e.centroid[1]} ${e.centroid[0] - 4},${
              e.centroid[1]
            } ${e.centroid[0]},${e.centroid[1] - peak} ${e.centroid[0] + 4},${
              e.centroid[1]
            }z`
          : `M${e.centroid[0] - 4}, ${e.centroid[1]} a${4},${4} 0 1,0 ${
              4 * 2
            },0 a${4},${4} 0 1,0 ${4 * -2},0`;
    });

    //PC GROWTH SPIKES ON MAP

    data = data.sort((a, b) => b.abs - a.abs);
    data.forEach((e, i) => {
      let peak = e.growth * 5;

      e.growth_spike =
        peak !== 1
          ? `M${e.centroid[0]},${e.centroid[1]} ${e.centroid[0] - 4},${
              e.centroid[1]
            } ${e.centroid[0]},${e.centroid[1] - peak} ${e.centroid[0] + 4},${
              e.centroid[1]
            }z`
          : `M${e.centroid[0] - 4}, ${e.centroid[1]} a${4},${4} 0 1,0 ${
              4 * 2
            },0 a${4},${4} 0 1,0 ${4 * -2},0`;
    });

    //ABSOLUTE BAR

    bar.height = svg_height / data.length;
    bar.left =
      padding +
      (Math.abs(extents.abs[0]) / (extents.abs[1] - extents.abs[0])) * width;
    bar.scale = (1 / (extents.abs[1] - extents.abs[0])) * width;

    chart = charts.q;
    chart.axis.x.origin = bar.left;
    chart.axis.x.spacing = width / 10;
    chart.axis.y.origin = svg_height + padding;
    chart.axis.y.spacing = svg_height / 10;

    data.forEach((e, i) => {
      let absolute = e.abs;
      e.absoluteBar = `M${bar.left} ${i * bar.height + padding}, ${
        bar.left + absolute * bar.scale
      } ${i * bar.height + padding}, ${bar.left + absolute * bar.scale} ${
        bar.height + i * bar.height + padding
      },${bar.left} ${bar.height + i * bar.height + padding}Z`;
    });
    data = data.sort((a, b) => b.growth - a.growth); //SORT BY GROWTH TO ALLOW VISIBILITY

    //CURRENT POPULATION BAR

    bar.height = svg_height / data.length;
    bar.left =
      padding +
      (Math.abs(extents.pop[0]) / (extents.pop[1] - extents.pop[0])) * width;
    bar.scale = (1 / (extents.pop[1] - extents.pop[0])) * width;

    chart = charts.t;
    chart.axis.x.origin = bar.left + width / 10;
    chart.axis.x.spacing = width / 10;
    chart.axis.y.origin = svg_height + padding;
    chart.axis.y.spacing = svg_height / 10;

    let Data = JSON.parse(JSON.stringify(data)).sort((a, b) => b.pop - a.pop);
    Data.forEach((e, i) => {
      let absolute = e.pop;
      data.find((el) => el.y - e.y == 0).popBar = `M${bar.left} ${
        i * bar.height + padding
      }, ${bar.left + absolute * bar.scale} ${i * bar.height + padding}, ${
        bar.left + absolute * bar.scale
      } ${bar.height + i * bar.height + padding},${bar.left} ${
        bar.height + i * bar.height + padding
      }Z`;
    });
    data = data.sort((a, b) => b.growth - a.growth); //SORT BY GROWTH TO ALLOW VISIBILITY

    //POPULATION CIRCLES ON MAP

    data.forEach((e, i) => {
      let radius =
        e.properties.AREACD[0] == country ? Math.sqrt(e.pop / 2000) : 0;

      e.circle = `M${e.centroid[0] - radius},${
        e.centroid[1]
      } a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${
        radius * -2
      },0Z`;
    });

    //COMPARATIVE POPULATION CIRCLES

    let radius_prev = 0;
    Data = JSON.parse(JSON.stringify(data)).sort((a, b) => b.pop - a.pop);
    Data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 8000);
      data.find((el) => el.y - e.y == 0).comparative_circle = `M${padding},${
        padding + radius_prev
      } a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${
        radius * -2
      },0Z`;
      radius_prev += radius / 2.3;
    });

    //SMALL POPULATION CIRCLES FOR ZOOMING

    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 80000);
      e.small_circle = `M${e.centroid[0] - radius},${
        e.centroid[1]
      } a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${
        radius * -2
      },0Z`;
    });
    //SCATTER CHART X=POPULATION SIZE, Y=GROWTH

    chart = charts.r;
    chart.axis.x.origin = bar.left;
    chart.axis.x.spacing = width / 10;
    chart.axis.y.origin =
      svg_height -
      (Math.abs(extents.growth[0]) / (extents.growth[1] - extents.growth[0])) *
        svg_height +
      padding * 2;
    chart.axis.y.spacing = svg_height / 10;

    data.forEach((e, i) => {
      let radius = Math.sqrt(e.pop / 8000);
      let p = (width * e.pop) / (extents.pop[1] - extents.pop[0]); //e.pop/1000
      let g =
        svg_height -
        padding * 2 -
        (svg_height * e.growth) / (extents.growth[1] - extents.growth[0]);
      e.scatter = `M${p}, ${g + radius} a${radius},${radius} 0 1,0 ${
        radius * 2
      },0 a${radius},${radius} 0 1,0 ${radius * -2},0Z`;
    });
    timeline = timelineMaker(data);
    setTimeout(function () {
      loaded = true;
    }, 0);

    newData = data;
    return newData;
  }

  let chartNow;

  let opc = tweened(1)
  let opc_bar_dec  = tweened(0)
  let opc_bell_dec  = tweened(0)

  function forward(current) {
    if (chartNow == current) return;
    if ((chartNow == "i" || chartNow == "f") && current == "a_region") return;
    else {
      chartNow = current;
    if (chartNow=='a'){opc.set(1,{delay:800, duration:200})}else{opc.set(0)}
    if (chartNow=='e' || chartNow=='f' ){opc_bar_dec.set(1,{delay:800, duration:200})}else{opc_bar_dec.set(0)}
    if (chartNow=='g' || chartNow=='h' ){opc_bell_dec.set(1,{delay:800, duration:200})}else{opc_bell_dec.set(0)}
      let zoomFactor = 1;
      let labels = charts[current].region_zoom;
      timeline.forEach((step, i) => step.label_opacity.set(0))
      if (zoomFactor) {
        if (labels) {
          timeline.forEach((step, i) => {
            step.label_opacity.set(0)
            step.label_opacity.set(1, {duration:200, delay:1800});
            step.viewable = 1;
          });
        } else {
          timeline.forEach((step, i) => {
            step.label_opacity.set(0);
            step.label_opacity.set(1, {duration:200, delay:1800});
            step.viewable = 0;
          });
        }
      } else {
        timeline.forEach((step, i) =>{
          step.label_opacity.set(0)
          step.label_opacity.set(1, {duration:200, delay:1800});  }
        );
      }
      timeline.forEach((step, i) => {
        step.d.set(newData[i][charts[current].chart], {
          duration: charts[current].duration * animationOn,
          delay: charts[current].delay * i,
          interpolate,
          easing,
        });
        step.metric.set(charts[current].tooltip_metric);
        step.value.set(newData[i][charts[current].value].toFixed(1));
        step.title.set(newData[i].properties.AREANM);
        if (charts[current].key) {
          key = 1;
        } else {
          key = 0;
        }
        if (charts[current].chart_key) {
          chart_key = 1;
        } else {
          chart_key = 0;
        }
        if (charts[current].fill == "region") {
          step.fill.set(newData[i].region_colour, {
            duration: 500 * animationOn,
            interpolate: interpolateLab,
          });
        } else {
          step.fill.set(newData[i].colour, {
            duration: 500 * animationOn,
            interpolate: interpolateLab,
          });
        }
        if (charts[current].highlight) {
          step.label_opacity.set(0, { duration: 1000 * animationOn, easing });
          if (charts[current].fader) {
            step.fill.set("#FFFFFF");
          }
          if (
            (charts[current].highlight == 1 &&
              Object.values(all_data.NEIGHBOURS.PC_CHANGE)
                .map((e) => e.CODE)
                .includes(newData[i].properties.AREACD)) ||
            newData[i].properties.AREACD == selected
          ) {
            step.fillOpacity.set(1);
            step.label_opacity.set(0, {duration:0})
            step.label_opacity.set(1, {duration:200, delay:1800});
            step.viewable = 1;
          }
          else{step.label_opacity.set(0, {duration:0})}
          if (
            (charts[current].highlight == 2 &&
              Object.values(all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_UP)
                .map((e) => e.LAD17CD)
                .includes(newData[i].properties.AREACD)) ||
            newData[i].properties.AREACD == selected
          )
            step.fillOpacity.set(1);
          if (
            (charts[current].highlight == 3 &&
              all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest
                .LAD17CD == newData[i].properties.AREACD) ||
            newData[i].properties.AREACD == selected
          )
            step.fillOpacity.set(1);
          if (
            (charts[current].highlight == 4 &&
              Object.values(all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP)
                .map((e) => e.LAD17CD)
                .includes(newData[i].properties.AREACD)) ||
            newData[i].properties.AREACD == selected
          )
            step.fillOpacity.set(1);
          if (
            (charts[current].highlight == 5 &&
              Object.values(all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN)
                .map((e) => e.LAD17CD)
                .includes(newData[i].properties.AREACD)) ||
            newData[i].properties.AREACD == selected
          )
            step.fillOpacity.set(1);
          if (charts[current].fader) {
            fader.set(1, { duration: 1000 * animationOn });
          } else {
            fader.set(0, { duration: 1000 * animationOn });
          }
        } else step.fillOpacity.set(1);
      });
    }
  }

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  $: newData = redrawData(animationOn, width, svg_height, selected);

  $: forward(animation, newData);

  function fadeInOut() {
    return fader;
  }
  let pRank = JSON.parse(JSON.stringify(popRank)); //<-- CHANGE COUNTRY HERE
  let rank11 = JSON.parse(JSON.stringify(pRank))
    .sort((a, b) => a.POP_RANK_11 - b.POP_RANK_11)
    .map((e) => e.NAME);
  let differences = pRank
      .map((e) => e.POP_RANK_11 - e.POP_RANK_21)
      .sort((a, b) => a - b),
    extremes = [differences[0], differences[differences.length - 1]],
    range = extremes[1] - extremes[0];
  pRank.forEach((e) => (e.difference = e.POP_RANK_11 - e.POP_RANK_21));
  let r = 15;
  let f = 2.5;

  //REPELLANT TEXT
  function repellantText(arr, map) {

    let coords =  map=='region'?'r_centroid':'n_centroid'
    // console.log('arrstart',arr)

    let selected = arr.find((e) => e.selected);
    //console.log('sel',selected)

    const size = 37;

    function displayTextWidth(text) {
      let font = "18pt Open Sans";
      let canvas =
        displayTextWidth.canvas ||
        (displayTextWidth.canvas = document.createElement("canvas"));
      let context = canvas.getContext("2d");
      context.font = font;
      let metrics = context.measureText(text);
      return metrics.width * 0.88;
    }

    arr.forEach((e, i) => {
      e.text_width = displayTextWidth(e.name);
      e.text_height = size;
    });

    function detectClash(rectA, rectB) {
      let xA = rectA.text_width / 2;
      let yA = rectA.text_height / 2;
      let xB = rectB.text_width / 2;
      let yB = rectB.text_height / 2;
      return (
        rectA[coords][0] - xA < rectB[coords][0] + xB &&
        rectA[coords][0] + xA > rectB[coords][0] - xB &&
        rectA[coords][1] - yA < rectB[coords][1] + yB &&
        rectA[coords][1] + yA > rectB[coords][1] - yB
      );
    }

    function getNewY(rectA, rectB) {
      if (
        (rectA[coords][0] == rectB[coords][0] &&
          rectA[121][coords][1] == rectB[coords][1]) ||
        !detectClash(rectA, rectB)
      ) {
        return rectA[coords][1];
      } else {
        let y_new =
          rectA[coords][1] > rectB[coords][1] || rectB[coords][1] > rectB.y_old
            ? rectB[coords][1] + (rectA.text_height + rectB.text_height) / 2
            : rectB[coords][1] - (rectA.text_height + rectB.text_height) / 2;
        return y_new;
      }
    }

    arr.forEach((e, i) => {
      e.x_old = e[coords][0];
      e.y_old = e[coords][1];
      e.dx = e.x_old - selected[coords][0]; //ERROR
      e.dy = e.y_old - selected[coords][1];
    });

    arr.sort((a, b) => Math.abs(a.dy) - Math.abs(b.dy));

    //console.log(arr);

    arr.forEach((e, i) => {
      for (let j = 0; j < i; j++) {
        e[coords][1] = getNewY(e, arr[j]);
      }
    });

    return arr;
  }
  //END OF REPELLANT TEXT
  //console.log("all_data", all_data);
</script>

{#if ["a_region", "a", "b", "d", "e", "f", "g", "h", "i", "j", "f1"].includes(animation)}
  {#if all_data && timeline && width && svg_height && selected && timeline[timeline.length-1].r_centroid.length && regions && allOffset}
  
    <ZoomSvg
      id="charts1"
      zm={1}
      {key}
      {all_data}
      header={charts[animation].header}
      {svg_height}
      {width}
    >
      {#if animation}
        {#if regionsGeo[0].xys_all && animation == "i"}
          <UKOutline xys={ukGeo.map((e) => e.xys_all)} />
        {/if}

        {#each timeline as feature, i}
        {#if feature.r_centroid}
          <Path
            r_centroid={feature.r_centroid}
            d={feature.d}
            centroid={feature.centroid}
            fill={feature.fill}
            title={feature.title}
            value={feature.value}
            pop={feature.pop}
            metric={feature.metric}
            y={feature.y}
            selected={feature.selected}
            area_cd={feature.area_cd}
            zoom={feature.zoom}
            n_centroid={feature.n_centroid}
            stroke_opacity={animation == "a_region"
            ?0.5:1}
            stroke={animation == "a_region"
              ? feature.fill :
              feature.selected
              ? "black"
              : "white"}
            {animation}  
          />
          {/if}{/each}
        <use xlink:href="#selected" />
        {#each repellantText(timeline.filter((e) => e.viewable),'neighbour') as feature, i}
          {#if !["e", "f"].includes(animation)}
            <Text
              title={feature.title}
              value={feature.value}
              metric={feature.metric}
              selected={feature.selected}
              label_opacity={feature.label_opacity}
              n_centroid={feature.n_centroid}
              {svg_height}
            />
          {/if}
       
        {/each}
        {#if animation == "d"}
       
        {#each repellantText(timeline.filter(e=>[all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.LAD,all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.LAD, selected].includes(e.code)),'region') as feature, i}

            <Text
              title={feature.title}
              value={feature.value}
              metric={feature.metric}
              selected={feature.selected}
              label_opacity={feature.label_opacity}
              n_centroid={feature.r_centroid}
              {svg_height}
            />

          {/each}
          {/if}
          {#each timeline as feature, i}
          {#if ["e", "f"].includes(animation)}
            <Decoration
              {opc_bar_dec}
              code={feature.code}
              wrtbl={feature.bar_decoration}
              label={feature.bar_label}
              mentioned={[all_data.REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.LAD, selected]}
            />
          {/if}
        {/each}
        <use xlink:href="#selectedText" />
        <use xlink:href="#selectedValue" />
      {/if}
      {#if animation == "g" || animation == "h"}
        <Region_bell_decoration
          {opc_bell_dec}
          region_bell_decoration={data.country_bell_decoration}
          labelled={[data.filter(e=>[all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.LAD,all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.second.LAD].includes(e.properties.AREACD)),data.filter(e=>[all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.LAD,all_data.COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.second_lowest.LAD].includes(e.properties.AREACD))]}
          {animation}
        />
      {/if}
      {#if regionsGeo[0].xys_all && ukGeo[0].xys_all && ["a_region", "a", "i"].includes(animation)}
      {#if animation == "a_region"}
        <RegionOutline
          xys={regionsGeo.map((e) => e.xys_all)}
          regions_data={regionsGeo}
          {regions}
        />
      {/if}
      {#if animation == "a" && country == "E"}
        <UKOutline xys={ukGeo.map((e) => e.xys_all) } opacity = {$opc}/>
      {/if}
      {#if (animation == 'a' || animation == 'i')}
      {#each timeline.filter(e=>e.selected) as feature}
      <text
      class='featured_name titles'
      font-size=16
      fill=black
      text-anchor=middle
      x={feature.centroid[0] }
      y={feature.centroid[1] - 20}
      opacity = {$opc}
    >{feature.name}
  </text>
<line x1={feature.centroid[0]} x2={feature.centroid[0]} y1={feature.centroid[1]} y2={feature.centroid[1] - 18}  stroke-width={2} stroke = 'black' opacity = {$opc}/>
    {/each}
    {/if}
      {/if}
      {#if animation == "i"}
        {#each timeline as feature, i}
          {#if feature.code == "E08000025" || feature.code == "E06000053"}

            <Path
              d={feature.d}
              centroid={feature.centroid}
              fill={writable('none')}
              title={feature.title}
              value={feature.value}
              pop={feature.pop}
              metric={feature.metric}
              y={feature.y}
              selected={feature.selected}
              area_cd={feature.area_cd}
              zoom={feature.zoom}
              n_centroid={feature.n_centroid}
              stroke_opacity={1}
              stroke="black"
              stroke_width=2
              {animation}
            />
            <text
              class="featured_name titles"
              font-size="16"
              fill="black"
              text-anchor="{feature.code == 'E08000025' ? 'middle' : 'left'}"
              x={feature.centroid[0]}
              y={feature.code == 'E08000025' ? feature.centroid[1] - 30 : feature.centroid[1] - 10}
              opacity={1}
              >{feature.name}
            </text>
          {/if}
        {/each}
      {/if}
    </ZoomSvg>
  {/if}
{/if}
