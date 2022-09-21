<script context="module">
	export const prerender = false;
</script>
<script>
	const now = new Date();
	const expire = new Date(2022, 9, 21);
	const showBanner = now.getTime() <= expire.getTime();
</script>

{#if showBanner}
<aside class="emergency-banner">
	<div class="v-padded col-wide middle" style="position: relative">
		<div>
			<h2 class="emergency-banner__heading">Her Majesty Queen Elizabeth II</h2>
			<p class="emergency-banner__description">21 April 1926 to 8 September 2022</p>
			<a href="https://www.gov.uk/government/topical-events/her-majesty-queen-elizabeth-ii" class="emergency-banner__link">Read about the arrangements following The Queen’s death</a>
		</div>
	</div>
</aside>
{/if}

<style>
	.emergency-banner {
		background-color: black;
		color: #fff;
		display: flex;
		justify-content: center;
		margin: 0;
		padding: 0;
	}
	.emergency-banner__heading {
		font-size: 36px;
		line-height: 1.4;
		margin: 0;
	}
	@media (max-width: 768px) {
		.emergency-banner__heading {
			font-size: 28px;
		}
	}
	.emergency-banner__description {
		display: block;
		font-size: 18px;
		line-height: 1.4;
		margin: 18px 0 14px;
	}
	.emergency-banner__link {
		color: #fff;
		font-size: 18px;
		line-height: 1.4;
	}
	.v-padded {
		box-sizing: border-box;
		padding: 27px 0;
	}
</style>