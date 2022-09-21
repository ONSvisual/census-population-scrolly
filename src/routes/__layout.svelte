<script>
  import { page } from '$app/stores';
  import { assets } from '$app/paths';
	import { setContext } from "svelte";
  import "../app.css";
	//import Warning from "$lib/ui/Warning.svelte";
	import ONSHeader from "$lib/layout/ONSHeader.svelte";
	import ONSFooter from "$lib/layout/ONSFooter.svelte";
  import AnalyticsBanner from "$lib/layout/AnalyticsBanner.svelte";

  // STYLE CONFIG
  // Set theme globally (options are 'light' or 'dark')
  let theme = "light";
  setContext("theme", theme);

  // GOOGLE ANALYTICS
  // Settings for page analytics. Values must be shared with <AnalyticsBanner> component
  const analyticsId = "GTM-MBCBVQS";
  const analyticsProps = {
    "contentTitle": "How the population changed where you live: Census 2021", // Insert the title of the product here
    "releaseDate": "20220628",
    "contentType": "scrollytelling", // Optional: eg. scrollytelling, exploratory, edutainment?
    "outputSeries": "initialfindingsfromthe2021censusinenglandandwales" // Should match the slug for the release on CMS
  };
</script>

<AnalyticsBanner {analyticsId} {analyticsProps} {page}/>
<ONSHeader census={true} />

<slot/>

<ONSFooter/>