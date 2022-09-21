<script>

	
export let wrtbl, label, mentioned, code, opc_bar_dec

let arr, lab

$: arr=  $wrtbl
$: lab = $label

    function truncate(text) {
		return text.length > 21 ? `${text.slice(0,18)}...` : text;
	}
	
</script>
{#if arr}
<text opacity={$opc_bar_dec} x={arr.x} y={arr.y} text-anchor={arr.anchor} content={arr.content} font-weight={mentioned.includes(code)?'bold':null} font-size={arr['font-size']}>{truncate(arr.content)}</text>

{/if}

{#if lab}
<text opacity={$opc_bar_dec}  x={lab.x} y={lab.y} text-anchor={lab.anchor} content={lab.content}  font-weight={mentioned.includes(code)?'bold':null} font-size={lab['font-size']}>{lab.content}</text>

{/if}

<style>
    text {
        letter-spacing: -0.5px;
    }
</style>