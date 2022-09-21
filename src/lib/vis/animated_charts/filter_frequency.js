import growth from '$lib/growth.js'

growth.forEach(e=>e.GROWTH_FLOOR=Math.floor(e.GROWTH))

let E=growth.filter(e=>e.LAD17CD[0]=='E').sort((a,b)=>a.GROWTH-b.GROWTH)
let W=growth.filter(e=>e.LAD17CD[0]=='W').sort((a,b)=>a.GROWTH-b.GROWTH)

let bE=[...new Set(E.map(e=>e.GROWTH_FLOOR))]
let bW=[...new Set(W.map(e=>e.GROWTH_FLOOR))]


let cE=[], cW=[]

bW.forEach(e=>cW.push({growth:e,lads:[]}))
bE.forEach(e=>cE.push({growth:e,lads:[]}))

W.forEach(e=>cW.find(el=>el.growth==e.GROWTH_FLOOR).lads.push(e.LAD17CD))
E.forEach(e=>cE.find(el=>el.growth==e.GROWTH_FLOOR).lads.push(e.LAD17CD))

cW=cW.sort((a,b)=>a.GROWTH-b.GROWTH)
cE=cE.sort((a,b)=>a.GROWTH-b.GROWTH)
export default ( {'W':cW,'E':cE})