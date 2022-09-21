export let width
export default {
	a_region: {
    chart: 'xys_all',
	title: 'Population growth in ',
    duration: 1000,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	country_zoom: true,
	fill: 'region',
    zoom: 0,
	key:1,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  a: {
    chart: 'xys',
	title: 'Population growth in ',
    duration: 1000,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	country_zoom: false,
    zoom: 0,
	key:1,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  b: {
    chart: 'xys_neighbours',
    duration:2000,
    delay: 0,
	highlight:1,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
    zoom: 0,
	neighbours_zoom: 0,
	labels:true,
	key:1,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
 d:  {
    chart: 'xys_region',
    duration: 2000,
    delay: 0,
	highlight:0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
    zoom: 0,
	region_zoom: 0,
	neighbours_zoom: true,
	key:1,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
z:  {
    chart: 'bar',
    duration: 10,
	highlight:0,	
	chart_key:1,
    delay: 10,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	filtered:"REGION",
	labels:true,
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  e:  {
    chart: 'bar',
    duration: 1000,
	highlight:0,	
	chart_key:1,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	filtered:"REGION",
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  e1:  {
    chart: 'bar',
    duration: 1000,
	highlight:0,	
	chart_key:1,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	filtered:"REGION",
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  f:{
    chart: 'bar',
    duration: 1000,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	chart_key:1,
    zoom: 0,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  f1:{
    chart: 'growth_spike',
    duration: 1000,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	chart_key:1,
    zoom: 0,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  }, 
  g:{
    chart: 'bell',
    duration: 1000,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	chart_key:1,
    zoom: 0,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  h:{
    chart: 'bell',
    duration: 1000,
    delay: 0,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	chart_key:1,
    zoom: 0,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  i:{
    chart: 'circle',
    duration: 2000,
	highlight:0,	
    delay: 0,
    tooltip_metric: ' people',
    value: 'pop',
    sort_by: 'growth',
	country_zoom:0,
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}			
  },
  r:{
    chart: 'comparative_circle',
    duration: 500,
	highlight:0,	
    delay: 10,
    tooltip_metric: ' people',
    value: 'pop',
    sort_by: 'growth',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}			
  },  
 k: {
    chart: 'poprank',
    duration: 3000,
	highlight:0,
    delay: 10,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
    zoom: 0,
	axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },

  l: {
    chart: 'national_bar',
    duration: 3000,
	highlight:3,	
    delay: 10,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	filtered:"REGION",
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
m: {
    chart: 'national_bar',
    duration: 3000,
	highlight:4,	
    delay: 10,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	filtered:"REGION",
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  n:{
    chart: 'national_bar',
    duration: 3000,
	highlight:5,	
    delay: 10,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	filtered:"REGION",
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  o:{
    chart: 'circle',
    duration: 1000,
	highlight:0,	
    delay: 5,
    tooltip_metric: ' people',
    value: 'pop',
    sort_by: 'growth',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}			
  },

 p: {
    chart: 'circle',
    duration: 1000,
	highlight:0,	
    delay: 5,
    tooltip_metric: ' people',
    value: 'pop',
    sort_by: 'growth',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}			
  },
 q: {
    chart: 'absoluteBar',
    duration: 500,
	highlight:0,	
    delay: 10,
    tooltip_metric: ' more people',
    value: 'abs',
    sort_by: 'growth',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
 j: {
    chart: 'poprank_pos',
	fader:1,
    duration: 500,
	highlight:0,	
    delay: 10,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
	opacity:0,
	fill:'white',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
 

 s: {
    chart: 'circle',
    duration: 1000,
	highlight:0,	
    delay: 5,
    tooltip_metric: ' people',
    value: 'pop',
    sort_by: 'growth',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}			
  },

t: {
    chart: 'popBar',
    duration: 1000,
	highlight:0,	
    delay: 20,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  },
  u:{
    chart: 'absolute',
    duration: 2000,
	highlight:0,	
    delay: 0,
    tooltip_metric: ' more people',
    value: 'abs',
    sort_by: 'y',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:width/10
			},
			y:
			{
			origin:0,
			spacing:width/10
			}
		}
  },
 



 v: {
    chart: 'scatter',
    duration: 1000,
	highlight:0,	
    delay: 20,
    tooltip_metric: '% growth',
    value: 'growth',
    sort_by: 'growth',
    zoom: 0,
		axis:
		{
			x:
			{
			origin:0,
			spacing:0
			},
			y:
			{
			origin:0,
			spacing:0
			}
		}		
  }
}