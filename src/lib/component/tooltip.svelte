<script lang="ts">
    import { Tooltip } from '@svelteuidev/core'

    export let theme:"light"|"dark" = "light"
    export let label:string = String()
    export let position:"top"|"bottom"|"left"|"right" = "top"
    export let show:boolean = true

    const tooltipStyle = { 
        "&": {
            display: show ? "block" : "none"
        },
        "& .body": { 
            color: theme == "dark" ? "#030303" : "rgb(248, 246, 246)", 
            fontFamily: "Arial, Helvetica, sans-serif", 
            backgroundColor: theme == "light" ? "#212121": "#f5f5f5",
            fontWeight: "normal" 
        },
        "& .arrow": {
            backgroundColor: theme == "light" ? "#212121": "#f5f5f5" 
        }
    }
</script>
<Tooltip override={tooltipStyle} withArrow position={position} placement="center" transitionDuration={200} label={label}>
    <slot>
        <p style="color: {theme == "light" ? "#030303" : "rgb(248, 246, 246)"}; font-family: Arial, Helvetica, sans-serif;">Tooltip</p>
    </slot>
</Tooltip> 