<script>
	import { setContext } from "svelte";
	import "../app.css";

	// STYLE CONFIG
	// Set theme globally (options are 'light' or 'dark')
	let theme = "light";
	setContext("theme", theme);
</script>

<slot/>