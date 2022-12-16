<script lang="ts">
    import Color from "color"
    import { Checkbox } from "@svelteuidev/core"
    import { onMount } from "svelte"
    
    export let theme:"system"|"light"|"dark" = "system"
    export let color:string = "#228be6"
    export let label:string = String()
    export let checked:boolean = false
    export let disabled:boolean = false

    let formattedColor = new Color(color)
    
    const overrideStyle = { 
        "&.checkbox .inner .input": { 
            backgroundColor: theme == "light" ? "white" : "rgb(74, 74, 74)",
            borderColor: theme == "light" ? "#ced4da" : "rgb(94, 94, 94)"
        },
        "&.checkbox .inner .input:checked": { 
            backgroundColor: formattedColor.hex(),
        },
        "&.checkbox .inner .input.disabled": {
            backgroundColor: theme == "light" ? "#e9ecef" : "rgb(94, 94, 94)",
            borderColor: theme == "light" ? "#dee2e6" : "rgb(124, 124, 124)"
        },
        "&.checkbox .inner .input.disabled + .iconWrapper": {
            backgroundColor: theme == "light" ? "#e9ecef" : "rgb(94, 94, 94)",
            borderColor: theme == "light" ? "#dee2e6" : "rgb(124, 124, 124)"
        },
        "&.checkbox label": {
            fontFamily: "Arial, Helvetica, sans-serif",
            color: theme == "light" ? "rgb(31, 35, 35)" : "rgb(245,245,245)"
        }
    }

    $: if (theme == "system") {
        overrideStyle['@media screen and (prefers-color-scheme: dark)'] = {
            "&.checkbox .inner .input": { 
                backgroundColor: "rgb(74, 74, 74)",
                borderColor: "rgb(94, 94, 94)"
            },
            "&.checkbox .inner .input:checked": { 
                backgroundColor: formattedColor.hex(),
            },
            "&.checkbox .inner .input.disabled": {
                backgroundColor: "rgb(94, 94, 94)",
                borderColor: "rgb(124, 124, 124)"
            },
            "&.checkbox .inner .input.disabled + .iconWrapper": {
                backgroundColor: "rgb(94, 94, 94)",
                borderColor: "rgb(124, 124, 124)"
            },
            "&.checkbox label": {
                marginTop: "3px",
                color: "rgb(245,245,245)"
            }
        }
    } else  {
        delete overrideStyle['@media screen and (prefers-color-scheme: dark)']
    }

    onMount(() => {
        window.matchMedia('screen and (min-width: 280px)').addEventListener("change", (e) => {
            if (e.matches) size = "xs"
        })  
        window.matchMedia('screen and (min-width: 320px)').addEventListener("change", (e) => {
            if (e.matches) size = "sm"
        })  
        window.matchMedia('screen and (min-width: 600px)').addEventListener("change", (e) => {
            if (e.matches) size = "sm"
        })
    })

    $: {
        if (color) formattedColor = new Color(color)
    }

    let size:"lg"|"md"|"sm"|"xl"|"xs" = "sm"
</script>
<Checkbox disabled={disabled} override={overrideStyle} size={size} label={label} bind:checked={checked} />