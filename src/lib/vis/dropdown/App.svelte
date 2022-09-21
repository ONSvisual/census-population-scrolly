<script>
	import Select from "./Select.svelte";
	import lookup from "$lib/lookup.js"
	let items=[]
	Object.keys(lookup).forEach((e,i)=>items[i]=( {
    "areacd": e,
    "areanm": lookup[e]
  }))
	export let selected, label, id
</script>


<form>
	<label for={id}>{label}</label>
	<Select id={id} idKey="areacd" labelKey="areanm" {items} value={selected} on:select on:clear darkMode/>
</form>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
	:global(body) {
		font-family: 'Open Sans', sans-serif;
	}
	label {
		margin: 20px 0 4px 0;
		font-weight: bold;
	}
	p {
		margin: 4px 0 20px 0;
	}
</style>