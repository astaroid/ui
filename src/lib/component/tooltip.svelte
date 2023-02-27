<script lang="ts">
    import { Tooltip } from '@svelteuidev/core'

    export let theme:"light"|"dark"|"system" = "system"
    export let label:string = String()
    export let position:"top"|"bottom"|"left"|"right" = "top"
    export let show:boolean = false

    let tooltipStyle:any = { 
        "& .body": { 
            color: theme == "dark" ? "#030303" : "rgb(248, 246, 246)", 
            fontFamily: "Arial, Helvetica, sans-serif", 
            backgroundColor: theme == "dark" ? "#f5f5f5" : "#212121",
            fontWeight: "normal" 
        },
        "& .arrow": {
            backgroundColor: theme == "dark" ? "#f5f5f5" : "#212121",
        }
    }

    $: if (theme == "system") {
        tooltipStyle = {
            ...tooltipStyle,
            "@media screen and (prefers-color-scheme: dark)": {
                "& .body": { 
                    color: "#030303",
                    backgroundColor: "#f5f5f5",
                    fontWeight: "normal" 
                },
                "& .arrow": {
                    backgroundColor: "#f5f5f5" 
                }
            }
        }
    } else {
        delete tooltipStyle['@media screen and (prefers-color-scheme: dark)']
    }
</script>
{#if show }
    <Tooltip opened  override={tooltipStyle} withArrow position={position} placement="center" transitionDuration={200} label={label}>
        <slot>
            <p data-theme={theme} data-text="slot-dummy">Tooltip</p>
        </slot>
    </Tooltip>
{:else}
    <Tooltip  override={tooltipStyle} withArrow position={position} placement="center" transitionDuration={200} label={label}>
        <slot>
            <p data-theme={theme} data-text="slot-dummy" >Tooltip</p>
        </slot>
    </Tooltip>
{/if}

<style lang="less">
    p[data-text="slot-dummy"] {
        font-family: Arial, Helvetica, sans-serif;
        color: #030303;
        &[data-theme="dark"] {
            color: rgb(248, 246, 246);
        }
    }

    @media screen and (prefers-color-scheme: dark) {
        p[data-text="slot-dummy"] {
            &[data-theme="system"] {
                color: rgb(248, 246, 246);
            }
        }
    }

</style>
 