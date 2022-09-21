<script>

    export let xys, opacity
    
    </script>

    <g class='country'>
    {#if xys}
    {#each xys as country}
    <path class='country' d={country} stroke=lightgrey stroke-width=2 fill=none style="pointer-events: none;" {opacity}> </path>
    {/each}
    {/if}
</g>