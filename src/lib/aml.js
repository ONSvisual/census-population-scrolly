export const txt=`
[ScrollY]    
 
{.Part}

type:Static   
 
headline:<br>How the population changed where you live: Census 2021

selectedheadline:<br>How the population changed in {NAME}{:} Census 2021   

lede:The population of England and Wales has increased by more than 3.5 million in the 10 years leading up to Census 2021. Using the first results from this census, we look at which places have seen the biggest increases and decreases, which areas had the largest growth in different age groups, and how your chosen local authority area compares with others.    

selectedlede:The population of England and Wales has increased by more than 3.5 million in the 10 years leading up to Census 2021. Using the first results from this census, we look at which places have seen the biggest increases and decreases, which areas had the largest growth in different age groups, and how local authority areas like {NAME} compare with others.

nutgraf:The census happens every 10 years. The latest one gives us a picture of all the people and households in England and Wales on one day in March 2021. The data in this first release are rounded to the nearest 100 and help us to estimate how much the population has increased or decreased since 2021.<br><br>Select your area below to see how the population has changed where you live and how it compares with others.

{}  

{.Part}

type:Filler   

content:<h2 class="section-title">The population of England and Wales is the largest ever recorded</h2> <br>There were 59,597,300 people living in England and Wales on 21 March 2021, the day of the latest census. This is over 3.5 million more (6.3%) than in 2011 and is the largest census population ever recorded.
{}//end of Filler 

{.Part} ***** POPULATION CHANGE ****   
 
type:Scroller    
 
background:Animated_charts    

family:animated    

[.foreground]    
 
  
{.section}    
{.actions}
data-id:a_region
data-bounds:ew    
data-mapKey:null    
mapHighlighted:[]    
data-explore:false    
data-description:A map shows the English regions and Wales. 
data-subtitle:Percentage growth

{.header}
highlow:[]
legend:1
title:Population change (%) in <strong>English regions</strong> and <strong>Wales</strong> between 2011 and 2021
subtitle:Percentage growth
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[0,3,6,8,10]
colours:["#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{}

{}    
content: {WALES 1 ===?In Wales, the population grew by 1.4% or 44,000 people. The English region with the largest population increase was the East of England, which grew by around 8.3% or 488,000 more residents. The English region with the smallest increase was the North East, growing by 1.9% or around 50,000 people. :The English region with the largest population increase was the East of England, which grew by around 8.3% or 488,000 more residents. The English region with the smallest increase was the North East, growing by 1.9% or around 50,000 people. In Wales, the population grew by 1.4% or 44,000 people.}  
{}
 
{.section}    

{.actions}    

data-id:a   

data-xKey:area    

data-description:A map of local authority areas in {COUNTRY_NAME} is coloured to indicate the percentage change in population of each area. The data used in this article are available to download at the end. 
{.header}
highlow:["Greatest decrease", "Greatest increase"]
legend:1
title:Population change (%) of local authority areas in <strong>{COUNTRY_NAME}</strong> between 2011 and 2021  
subtitle:Percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{}
{}    

content:{LA.ABS.Y11 5000 <?In the Isles of Scilly, the population size has changed very little since 2011 and was 2,100 in 2021. The total population of England grew by 6.6%, increasing by nearly 3.5 million to 56,489,800.<br><br>With 2021 figures rounded to the nearest 100, measures of change over time for areas with small populations, such as the Isles of Scilly and the City of London, may be less robust than larger local authority areas.:{WALES 1 ===?{LA.PC_CHANGE.FROM11TO21 0 ===?In {NAME}, the population size has changed very little since 2011, remaining around {LA.ABS.Y21 .-2 ,} in 2021. The total population of Wales grew by 1.4%, increasing by 44,000 to 3,107,500.:{LA.PC_CHANGE.FROM11TO21 10 * 1 >?{LA.PC_CHANGE.FROM11TO21 COUNTRY.PC_CHANGE.FROM11TO21 >?In {NAME}, the population size has increased by {LA.PC_CHANGE.FROM11TO21 .1}%, from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. This is higher than the overall increase for Wales (1.4%), where the population grew by 44,000 to 3,107,500. :{LA.PC_CHANGE.FROM11TO21 10 * 5 >?In {NAME}, the population size has increased by {LA.PC_CHANGE.FROM11TO21 ~abs 10 * 10 / .1}%, from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. This is {LA.PC_CHANGE.FROM11TO21 COUNTRY.PC_CHANGE.FROM11TO21 - 0 ===?the same as : lower than} the overall increase for Wales (1.4%), where the population grew by 44,000 to 3,107,500.:In {NAME}, the population size has increased slightly ({LA.PC_CHANGE.FROM11TO21 .1}%), from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. This is lower than the overall increase for Wales (1.4%), where the population grew by 44,000 to 3,107,500. }}:{LA.PC_CHANGE.FROM11TO21 0 <?In {NAME}, the population size has decreased by {LA.PC_CHANGE.FROM11TO21 ~abs 10 * 10 / .1}%, from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. The total population of Wales grew by 1.4%, increasing by 44,000 to 3,107,500. :In {NAME}, the population size has increased {LA.PC_CHANGE.FROM11TO21 -10 * 5 <?slightly:} ({LA.PC_CHANGE.FROM11TO21 ~abs 10 * 10 / .1}%), from {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. The total population of Wales grew by 1.4%, increasing by 44,000 to 3,107,500.}}}:{LA.PC_CHANGE.FROM11TO21 0 ===?In {NAME}, the population size has changed very little since 2011, remaining around {LA.ABS.Y21 .-2 ,} in 2021. The total population of England grew by 6.6%, increasing by nearly 3.5 million to 56,489,800. :{LA.PC_CHANGE.FROM11TO21 10 * 1 >?{LA.PC_CHANGE.FROM11TO21 COUNTRY.PC_CHANGE.FROM11TO21 >?In {NAME}, the population size has increased by {LA.PC_CHANGE.FROM11TO21 .1}%, from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. This is higher than the overall increase for England (6.6%), where the population grew by nearly 3.5 million to 56,489,800. :{LA.PC_CHANGE.FROM11TO21 10 * 5 >?In {NAME}, the population size has increased by {LA.PC_CHANGE.FROM11TO21 ~abs 10 * 10 / .1}%, from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. This is {LA.PC_CHANGE.FROM11TO21 COUNTRY.PC_CHANGE.FROM11TO21 - 0 ===?the same as : lower than} the overall increase for England (6.6%), where the population grew by nearly 3.5 million to 56,489,800. :In {NAME}, the population size has increased slightly ({LA.PC_CHANGE.FROM11TO21 .1}%), from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. This is lower than the increase for England (6.6%), where the population grew by nearly 3.5 million to 56,489,800. }}:{LA.PC_CHANGE.FROM11TO21 0 <?In {NAME}, the population size has decreased by {LA.PC_CHANGE.FROM11TO21 ~abs 10 * 10 / .1}%, from around {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. The total population of England grew by 6.6%, increasing by nearly 3.5 million to 56,489,800.:In {NAME}, the population size has increased {LA.PC_CHANGE.FROM11TO21 -10 * 5 <?slightly:} ({LA.PC_CHANGE.FROM11TO21 ~abs 10 * 10 / .1}%), from {LA.ABS.Y11 .-2 ,} in 2011 to {LA.ABS.Y21 .-2 ,} in 2021. The total population of England grew by 6.6%, increasing by nearly 3.5 million to 56,489,800.}}}}{LA.ABS.Y11 15000 <?<br><br>With 2021 figures rounded to the nearest 100, measures of change over time for places with small populations such as <a href='/visualisations/censuspopulationchange/E09000001'>the City of London</a> or  <a href='/visualisations/censuspopulationchange/E06000053'>the Isles of Scilly</a> may be less robust than larger local authority areas.:}}

{}    

{.section}    

{.actions}    

data-id:b   

data-highlighted:    

data-description: The map then zooms to centre on {NAME} and show neighbouring areas.  

{.header}
highlow:[]
legend:1
title:Population change in local authority areas <strong>near {NAME}</strong> between 2011 and 2021 
subtitle:Percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{}

{}    

content:Nearby areas like {NEIGHBOURS.PC_CHANGE.top.NAME @} and {NEIGHBOURS.PC_CHANGE.second.NAME @} have seen their populations increase by around {NEIGHBOURS.PC_CHANGE.top.VAL .1}% and {NEIGHBOURS.PC_CHANGE.second.VAL .1}%, respectively, {NEIGHBOURS.PC_CHANGE.penultimate.VAL NEIGHBOURS.PC_CHANGE.last.VAL ===?{NEIGHBOURS.PC_CHANGE.penultimate.VAL 10 * 1 <? while both {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} and {NEIGHBOURS.PC_CHANGE.last.NAME @} saw falls of  {NEIGHBOURS.PC_CHANGE.last.VAL .1}%:}:}{NEIGHBOURS.PC_CHANGE.penultimate.VAL NEIGHBOURS.PC_CHANGE.last.VAL ===?{NEIGHBOURS.PC_CHANGE.penultimate.VAL 10 * ~abs 1 <? while both {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} and {NEIGHBOURS.PC_CHANGE.last.NAME @} saw very little change.:}:}{NEIGHBOURS.PC_CHANGE.penultimate.VAL NEIGHBOURS.PC_CHANGE.last.VAL ===?{NEIGHBOURS.PC_CHANGE.last.VAL 10 * 1 >?while others such as {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} and {NEIGHBOURS.PC_CHANGE.last.NAME @} both saw falls of  {NEIGHBOURS.PC_CHANGE.last.VAL .1}%:}:}{NEIGHBOURS.PC_CHANGE.penultimate.VAL 10 * 1 >?{NEIGHBOURS.PC_CHANGE.last.VAL 10 * ~abs 1 <?while others such as {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} saw an increase of {NEIGHBOURS.PC_CHANGE.penultimate.VAL .1}% and {NEIGHBOURS.PC_CHANGE.last.NAME @} saw very little change.:}:}{NEIGHBOURS.PC_CHANGE.penultimate.VAL 10 * 1 >?{NEIGHBOURS.PC_CHANGE.last.VAL 10 * -1 <?while others such as {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} saw a smaller increase ({NEIGHBOURS.PC_CHANGE.penultimate.VAL .1}%) and {NEIGHBOURS.PC_CHANGE.last.NAME @} saw a decrease of {NEIGHBOURS.PC_CHANGE.last.VAL ~abs .1}%.:}:}{NEIGHBOURS.PC_CHANGE.penultimate.VAL 10 * 1 <?{NEIGHBOURS.PC_CHANGE.last.VAL 10 * ~abs -1 <?while others such as {NEIGHBOURS.PC_CHANGE.last.NAME @} saw a decrease of {NEIGHBOURS.PC_CHANGE.last.VAL ~abs .1}% and {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} saw very little change.:}:}{NEIGHBOURS.PC_CHANGE.penultimate.VAL 10 * -1 <?{NEIGHBOURS.PC_CHANGE.last.VAL 10 * -1 <?while others such as {NEIGHBOURS.PC_CHANGE.last.NAME @} and {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} have seen decreases of {NEIGHBOURS.PC_CHANGE.last.VAL ~abs .1}% and {NEIGHBOURS.PC_CHANGE.penultimate.VAL ~abs .1}%, respectively.:}:}{NEIGHBOURS.PC_CHANGE.last.VAL 10 * 1 >?while others such as {NEIGHBOURS.PC_CHANGE.penultimate.NAME @} saw an increase of {NEIGHBOURS.PC_CHANGE.penultimate.VAL .1}% and {NEIGHBOURS.PC_CHANGE.last.NAME @} saw smaller growth ({NEIGHBOURS.PC_CHANGE.last.VAL .1}%).:}
 
   
 
{}    

{.section}    
{.actions}    

data-id:d   

data-bounds:ew    

data-mapKey:null    

mapHighlighted:[]    

data-explore:false    

data-description: The map zooms out to show the percentage change in population size in all local authority areas in {REGION_NAME ~C}     

{.header}
highlow:[]
legend:1
title:Population change of local authority areas in <strong>{REGION_NAME ~C}</strong> between 2011 and 2021
subtitle:Percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{}

{}    

content:{WALES 1 ===?:The largest population increases in {REGION_NAME ~C} have been seen in {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME @} and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.NAME @}, where the populations have grown by {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.CHANGE .1}% and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.CHANGE .1}%, respectively.}

{}    
 
{.section}    

{.actions}    

data-id:e    

data-description: The local authority areas displayed on the map change form and position to create a bar chart that orders selected areas of {REGION_NAME ~C} by percentage change in total population.      

{.header}
highlow:[]
legend:1
title:Population change of {LA.REGION_RANK.DENSITY.Y11.all 22 >?selected:} local authority areas in <strong>{REGION_NAME ~C}</strong> between 2011 and 2021  
subtitle:Percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{} 

{}    

content:{WALES 1 ===?The largest population increases in {REGION_NAME ~C} have been seen in {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME @} and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.NAME @}, where the populations have grown by {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.top.CHANGE .1}% and {REGION.HEADLINES.BIGGEST_POP_CHANGE_UP.second.CHANGE .1}%, respectively.<br><br>:}{REGION.ABS.Y21 5701200 ===?At the other end of the scale, the Isles of Scilly have seen a fall of 4.7%. <br><br> With 2021 figures rounded to the nearest 100, measures of change over time for areas with small populations, such as the Isles of Scilly, may be less robust than larger local authority areas.:At the other end of the scale, {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.NAME @} has seen {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE 0 <?a fall of {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE ~abs .1}%.:}{REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE 0 >?an increase of just {REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE .1}%.:}{REGION.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE?:no notable change.} }

{}    

{.section}    

{.actions}    

data-id:f   

data-description: {NAME} is highlighted on the bar chart along with other local authority areas in {REGION_NAME ~C}.    

{.header}
highlow:[]
legend:1
title:Population change of {LA.REGION_RANK.DENSITY.Y11.all 22 >?selected:} local authority areas in <strong>{REGION_NAME ~C}</strong> between 2011 and 2021
subtitle:Percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{} 

{}    
 
content:{LA.PC_CHANGE.FROM11TO21 10 * 1 >?At {LA.PC_CHANGE.FROM11TO21 ~abs .1}%, {LA.ABS_CHANGE.FROM11TO21 0 >?{NAME '} population increase is {LA.PC_CHANGE.FROM11TO21 REGION.PC_CHANGE.FROM11TO21 - 10 * ~abs 1 <?very similar to: {LA.PC_CHANGE.FROM11TO21 REGION.PC_CHANGE.FROM11TO21 - ~abs 10 * 5 >?  : slightly }{LA.PC_CHANGE.FROM11TO21 REGION.PC_CHANGE.FROM11TO21 - 0 >?higher than:lower than}} the increase for {REGION_NAME ~C} ({REGION.PC_CHANGE.FROM11TO21 .1}%). :While the population size in {NAME} has changed very little, the increase across {REGION_NAME ~C} was {REGION.PC_CHANGE.FROM11TO21 .1}%. }:{LA.ABS.Y11 5000 <?Across the South West region, the total population increased by 7.8%.:This is the opposite of the regional trend for {REGION_NAME ~C}, where the population increased by {REGION.PC_CHANGE.FROM11TO21 .1}%.}}

{}    

{.section}    

{.actions}    

data-id:g   

data-description:Every local authority area of England is shown as a dot on a chart, with the legend running from the largest percentage decrease to the highest percentage increase in population. {NAME} is highlighted.  

{.header}
highlow:[]
legend:1
title:Local authority areas grouped by population change in <strong>{COUNTRY_NAME}</strong>, 2011 to 2021
subtitle:Percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{}

{}    

content:{COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.NAME @} saw the largest percentage growth in population in {COUNTRY_NAME}, increasing {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.top.CHANGE .1}% between 2011 and 2021. {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.second.NAME @} was second, increasing {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_UP.second.CHANGE .1}%.    

{}    

{.section}    

{.actions}    

data-id:h   

data-description:The chart continues to show all areas of England as dots, ordered by the percentage change in total population, with the largest decreases towards the left and the largest increases towards the right.   

{.header}
highlow:[]
legend:1
title:Local authority areas grouped by population change in <strong>{COUNTRY_NAME}</strong>, 2011 to 2021
subtitle:Percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{}

{}    
 
content:Some local authority areas have seen their populations decline. {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.NAME @} had an estimated population of {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP21 ,} in 2021, which was around {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP11 COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.POP21 - ~abs .-2 ,} fewer than in 2011 and a decrease of {COUNTRY.HEADLINES.BIGGEST_POP_CHANGE_DOWN.lowest.CHANGE ~abs .1}%.    

{}    

{.section}    

{.actions}    

data-id:i    

data-description:The chart changes into circles located at the centre of each local authority area on a map. The area of each circle indicates the total population.     

{.header}
highlow:[]
legend:1
title:Population size of local authority areas in <strong>{COUNTRY_NAME}</strong>, in 2021, and change since 2011  
subtitle:Circle size represents population, colour shows percentage change
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[-20.2, -6.1, -2.6, -0.6, 2.9, 7.4,  12.5,  22.8]
colours:["#3E558A","#958BBA","#CAC6DE","#e9e9e9","#FED4A6","#FDA13C","#ED7320"]
{}

{}    

content:{WALES 0 ===?The total population of local authority areas varies a lot, from <a href='/visualisations/censuspopulationchange/E08000025'>Birmingham</a> with around 1,144,900 people to <a href='/visualisations/censuspopulationchange/E06000053'>the Isles of Scilly</a> with around 2,100 people. The sizes of these circles are proportionate to the size of the population in each local authority area.:The total population of local authority areas varies a lot, from Cardiff with around 362,400 people to Merthyr Tydfil with around 58,800 people. The sizes of these circles are proportionate to the size of the population in each local authority area.}
{}    
[]    

{}//end of first Scroller    

{.Part}    

type:Filler    

content:<h2 class="section-title">How different local authority areas rank for population size</h2><br><br>In 2021, {NAME} ranked {LA.COUNTRY_RANK.Y21.here ~ord2} for total population out of {LA.COUNTRY_RANK.Y21.all} local authority areas in {COUNTRY_NAME}, {LA.COUNTRY_RANK.Y21.here LA.COUNTRY_RANK.Y11.here >?which is a fall of {LA.COUNTRY_RANK.Y21.here LA.COUNTRY_RANK.Y11.here - ~nat} {LA.COUNTRY_RANK.Y21.here LA.COUNTRY_RANK.Y11.here - 1 ===?place:places} in a decade.:}{LA.COUNTRY_RANK.Y21.here LA.COUNTRY_RANK.Y11.here <? moving up {LA.COUNTRY_RANK.Y11.here LA.COUNTRY_RANK.Y21.here - ~nat} {LA.COUNTRY_RANK.Y11.here LA.COUNTRY_RANK.Y21.here - 1 >?places:place} in a decade.:}{LA.COUNTRY_RANK.Y21.here LA.COUNTRY_RANK.Y11.here -?:maintaining the same position it held a decade ago.}

{}//end of Filler    ****** DENSITY ******   

{.Part}    
type:Media   
background:Rank_chart    
family:football    
[.foreground]    
{.section}    
{.actions}    
data-id:{CODE}
data-description:A chart shows the population rankings of local authority areas for total population size in {COUNTRY_NAME} in 2011 and 2021. 
  
{.header}
highlow:[]
legend:1
title:Population rank of <strong>{NAME}</strong> at the time of the 2011 and 2021 Censuses
subtitle:Rank of local authority areas for population size in {COUNTRY_NAME}
avgVal:5
avgName:England and Wales Average
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{}

{}    
content:
{}
[]
{}//END
{.Part}    

type:Filler    

content:{WALES 0 ===?<h2 class="section-title">There are three people for every football pitch-sized piece of land in England</h2><br><br>There were 434 residents per square kilometre in England in 2021, up from 407 per square kilometre in 2011. Population density varies from area to area. We can see the difference between local authority areas if we measure the land in football pitches and work out how many people there would be on each one. :<h2 class="section-title">There is one person for every football pitch-sized piece of land in Wales</h2><br><br>There were about 150 residents per square kilometre in Wales in 2021, up from 148 residents per square kilometre in 2011. However, this varies from area to area. We can see the difference between local authority areas if we measure the land in football pitches and work out how many people there would be on each one. } 

{}//end of Filler    

{.Part}    

type:Scroller    

background:Football    

family:football    

[.foreground]    

{.section}    

{.actions}    

data-id:pitch1   

data-description:A drawing of a football pitch is displayed. The number of people on the pitch, or the number of pitches for one person, changes as described in the text content.    

{}    

content:{LA.REGION_RANK.DENSITY.Y21.here LA.REGION_RANK.DENSITY.Y21.all 2 / >?As of 2021, {NAME} is the {LA.REGION_RANK.DENSITY.Y21.all LA.REGION_RANK.DENSITY.Y21.here - 1 + ~ord} least densely populated of {REGION_NAME ~C '} {LA.REGION_RANK.DENSITY.Y21.all} local authority areas, {140 LA.DENSITY.DENSITY21 / 1 >?with an area equivalent to around {LA.PEOPLEPICH.Pitches ~nat} football {LA.PEOPLEPICH.Pitches 1 ===?pitch:pitches} per resident: with around {LA.PEOPLEPICH.People ~nat} {LA.PEOPLEPICH.People 1 ===?person:people} living on each football pitch-sized area of land}:As of 2021, {NAME} is the {LA.REGION_RANK.DENSITY.Y21.here ~ord} most densely populated of {REGION_NAME ~C '} {LA.REGION_RANK.DENSITY.Y21.all} local authority areas, with around {LA.PEOPLEPICH.People ~nat} {LA.PEOPLEPICH.People 1 ===?person:people} living on each football pitch-sized area of land}.    

{}    

{.section}    

{.actions}    
 
data-id:pitch2    

{}    

content:{WALES 0 ===?<a href='/visualisations/censuspopulationchange/E09000030'>Tower Hamlets</a> in London has become the most densely populated local authority area in England (overtaking <a href='/visualisations/censuspopulationchange/E09000019'>Islington</a>) with the equivalent of around 112 people per pitch.:<a href='/visualisations/censuspopulationchange/W06000015'>Cardiff</a> is the most densely populated local authority area in Wales with the equivalent of around 18 people per pitch. In England, <a href='/visualisations/censuspopulationchange/E09000030'>Tower Hamlets</a> in London has the equivalent of 112 people per pitch.} 

{}    

{.section}    

{.actions}    

data-id:pitch3   

{}    

content:{WALES 1 ===?At the other end of the population density scale for Wales, the amount of land in <a href='/visualisations/censuspopulationchange/W06000023'>Powys</a> works out at around five pitches per resident.:At the other end of the population density scale for England, the amount of land in <a href='/visualisations/censuspopulationchange/E07000030'>Eden</a> in Cumbria works out at around five pitches per resident.}

{}    

[]    

{}//end of third Scroller****** AGE ******    

{.Part}    

type:Filler    

content: <h2 class="section-title"> There were more people than ever aged 65 years and over in {COUNTRY_NAME} </h2> <br><br>{WALES 0 ===?The population has continued to age. Across England, more than one in six people (18.4%) were aged 65 years and over on Census Day in 2021. This is a higher percentage than ever before.:The population has continued to age. Across Wales, more than one in five people (21.3%) were aged 65 years and over on Census Day in 2021. This is a higher percentage than ever before.} 

{}//end of Filler    

{.Part}    

type:Scroller    

background:Pyramids    

family:pp    

[.foreground]    

{.section}    

{.actions}    

data-id:local11

data-description:A population pyramid is displayed. It shows males and females in each age group as a percentage of the total population for {NAME} in 2011. The age group with the largest number of people is highlighted.    

{.header}
highlow:[]
legend:1
title:The age and sex distribution of the population of <strong>{REGION_NAME ~C} in 2011</strong>
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{} 

{}    

content:This population pyramid shows the population of males and females in each five-year age group at the time of the 2011 Census.<br>The largest age group in {REGION_NAME ~C} back then was those aged {REGION.LARGEST_AGEGROUP11.AGEBAND} to {REGION.LARGEST_AGEGROUP11.AGEBAND 4 +} years.

{}    

{.section}    

{.actions}    

data-id:local21   

data-description:A population pyramid is displayed. It shows the number males and females in each age group as a percentage of the total population for {REGION_NAME ~C} in 2021. The age group with the largest number of people is highlighted.      

{.header}
highlow:[]
legend:1
title:The age and sex distribution of the population of <strong>{REGION_NAME ~C} in 2021</strong>
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{} 

{}    

content:More recently, in 2021, the largest age group in {REGION_NAME ~C} was those aged {REGION.LARGEST_AGEGROUP21.AGEBAND} to {REGION.LARGEST_AGEGROUP21.AGEBAND 4 +} years.    

{}    

{.section}    

{.actions}    

data-id:country21    

data-description:The population pyramid changes to show the number of males and females in each age group as a percentage of the total population in {COUNTRY_NAME}. The age group with the largest number of people is highlighted.    

{.header}
highlow:[]
legend:1
title:The age and sex distribution of the population of <strong>{COUNTRY_NAME}</strong> in 2021  
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{}  
   
{}    
content:{WALES 1 ===?In Wales, the largest age group in 2021 was people aged 55 to 59 years.:In England, the largest age group in 2021 was people aged 30 to 34 years. }

{}    

{.section}    

{.actions}    

data-id:country_change   

data-description: The population pyramid turns into a horizontal bar chart, with bars representing the percentage change in the number of people of any sex in each five-year age group in {COUNTRY_NAME}.    

{.header}
highlow:[]
legend:1
title: Population change (%) by age group in <strong>{COUNTRY_NAME}</strong>, 2011 to 2021
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{}    
 
{}    

content:Overall, in {COUNTRY_NAME}, there has been {COUNTRY.OVER65.ABS.Y21 COUNTRY.OVER65.ABS.Y11 >?an increase: a decrease} of {COUNTRY.OVER65.ABS.Y21 COUNTRY.OVER65.ABS.Y11 - COUNTRY.OVER65.ABS.Y11 / 100 * ~abs .1}%  in people aged 65 years and over, {COUNTRY.WORKING.ABS.Y21 COUNTRY.WORKING.ABS.Y11 >?an increase:a decrease} of {COUNTRY.WORKING.ABS.Y21 COUNTRY.WORKING.ABS.Y11 - COUNTRY.WORKING.ABS.Y11 / 100 * ~abs .1}% in people aged 15 to 64 years, and {COUNTRY.UNDER20.ABS.Y21 COUNTRY.UNDER20.ABS.Y11 >?an increase: a decrease} of {COUNTRY.UNDER20.ABS.Y21 COUNTRY.UNDER20.ABS.Y11 - COUNTRY.UNDER20.ABS.Y11 / 100 * ~abs .1}% in children aged under 15 years.     

{}    

{.section}    

{.actions}    

data-id:local_change   

data-description: The horizontal bar chart now shows the percentage change in the number of people of any sex in each five-year age group in {NAME}.    

{.header}
highlow:[]
legend:1
title: Population change (%) by age group in <strong>{NAME}</strong>, 2011 to 2021  
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{}   
 
{}    

content:This is how {NAME} compares. There has been {LA.OVER65.ABS.Y21 LA.OVER65.ABS.Y11 >?an increase: a decrease} of {LA.OVER65.ABS.Y21 LA.OVER65.ABS.Y11 - LA.OVER65.ABS.Y11 / 100 * ~abs .1}% in people aged 65 years and over, {LA.WORKING.ABS.Y21 LA.WORKING.ABS.Y11 >?an increase:a decrease} of {LA.WORKING.ABS.Y21 LA.WORKING.ABS.Y11 - LA.WORKING.ABS.Y11 / 100 * ~abs .1}% in people aged 15 to 64 years, and {LA.UNDER20.ABS.Y21 LA.UNDER20.ABS.Y11 >?an increase:a decrease} of {LA.UNDER20.ABS.Y21 LA.UNDER20.ABS.Y11 - LA.UNDER20.ABS.Y11 / 100 * ~abs .1}% in children aged under 15 years.  

{}   

[]    

{}    

{.Part}  
type:Filler    
content:{WALES 1 ===?<h2 class="section-title">The population change in different age groups varies across Wales</h2><br><br>In eight of the 22 local authority areas of Wales, the total number of people aged 65 years and over increased by 20.0% or more between 2011 and 2021. This compares with a 17.7% rise across Wales.:<h2 class="section-title"><br>The population change in different age groups varies across England</h2><br><br>In 32 of the 309 local authority areas of England, the total number of people aged 65 years and over increased by 30.0% or more between 2011 and 2021. This compares with a 20.1% rise across England.}
{}//end of Filler      
 
****** CHANGE BY AGE GROUP ******    

{.Part}    

type:Scroller    

background:Highlighted_map    

[.foreground]    

{.section}    

{.actions}    

data-id:18    

data-description: A map of {COUNTRY_NAME} appears, highlighting the areas with the largest increases in people aged 65 years and over.      

{.header}
highlow:[]
legend:1
title:{WALES 0 ===?Local authority areas in <strong>England</strong> that have seen an increase of 30% or more in those aged 65 years and over, 2011 to 2021: Local authority areas in <strong>Wales</strong> that have seen an increase of 20% or more in those aged 65 years and over, 2011 to 2021}
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{}

{}

content:{WALES 1 ===?The places that have seen the largest increases in the population aged 65 years and over are <a href="/visualisations/censuspopulationchange/W06000021/">Monmouthshire</a>, which has seen 26.0% growth, and <a href="/visualisations/censuspopulationchange/W06000014/"> Vale of Glamorgan </a> (24.9%):The places that have seen the largest increases in the population aged 65 years and over are <a href="/visualisations/censuspopulationchange/E06000042/">Milton Keynes</a> in the South East, which has seen 43.6% growth, and <a href="/visualisations/censuspopulationchange/E07000131/">Harborough</a> in the East Midlands (38.5%)}. 
{}

{.section}
 
{.actions}

data-id:19

data-description: The map now highlights the areas with the largest increases in children aged under 15 years.      

{.header}
highlow:[]
legend:1
title:{WALES 0 ===?Local authority areas in <strong>England</strong> that have seen an increase of 10% or more in those aged under 15 years, 2011 to 2021: Local authority areas in <strong>Wales</strong> that have seen an increase in those aged under 15 years, 2011 to 2021}  
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{}
{} 

content:{WALES 1 ===?The population aged under 15 years increased most in <a href="/visualisations/censuspopulationchange/W06000022">Newport</a>, rising by 10.2%, compared with an increase of 5.3% in <a href="/visualisations/censuspopulationchange/W06000015">Cardiff</a>.:The places that have seen the largest increases in the population aged under 15 years are <a href="/visualisations/censuspopulationchange/E07000107">Dartford</a> in Kent, where the size of this age group increased by 31.8% between 2011 and 2021, and <a href="/visualisations/censuspopulationchange/E06000031">Peterborough</a> in the East of England (23.8%).}
{}    

{.section}

{.actions}

data-id:20

data-description: The map now highlights the areas with the largest decreases in children aged under 15 years.    

{.header}
highlow:[]
legend:1
title:{WALES 0 ===?Local authority areas in <strong>England</strong> that have seen a reduction of 5% or more in those aged under 15 years, 2011 to 2021: Local authority areas in <strong>Wales</strong> that have seen a reduction of 5% or more in those aged under 15 years, 2011 to 2021}
subtitle:
avgVal:
avgName:
selectedVal:
selectedName:
suffix:%
breaks:[]
colours:[]
{}    
{}  

content:{WALES 1 ===?The places that have seen the largest percentage decreases in children aged under 15 years are <a href="/visualisations/censuspopulationchange/W06000008">Ceredigion</a> (10.1%), <a href="/visualisations/censuspopulationchange/W06000023">Powys</a> (9.3%) and <a href="/visualisations/censuspopulationchange/W06000021">Monmouthshire</a> (8.6%).:The places that have seen the largest percentage decrease in the number of children aged under 15 years are <a href="/visualisations/censuspopulationchange/E09000033/">Westminster</a> (19.4%) and <a href="/visualisations/censuspopulationchange/E09000020/">Kensington and Chelsea</a> (17.8%) in London and <a href="/visualisations/censuspopulationchange/E07000166/">Richmondshire</a> in Yorkshire (12.3%).} 
{}  
[]    
{}//end of 4th Scroller*** SEX ***   

[]//end of ScrollY 
`