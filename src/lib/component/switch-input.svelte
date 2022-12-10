<script lang="ts">
    import Color from "color"
    import { Switch } from "@svelteuidev/core"
    import { onMount } from "svelte"
    
    export let theme:"system"|"light"|"dark" = "system"
    export let color:string = "#228be6"
    export let label:string = String()
    export let checked:boolean = false  

    let formattedColor = new Color(color)  

    const overrideStyle = { 
        "&": { 
            backgroundColor: theme == "light" ? "#e9ecef" : "rgb(74, 74, 74)",
            borderColor: theme == "light" ? "#e9ecef" : "rgb(74, 74, 74)"
        },
        "&::after": {
            backgroundColor: theme == "light" ? "white" : "rgb(36, 38, 38)",
            borderColor: theme == "light" ? "white" : "rgb(36, 38, 38)"
        },
        "&::before": {
            backgroundColor: theme == "light" ? "white" : "rgb(36, 38, 38)",
            borderColor: theme == "light" ? "white" : "rgb(36, 38, 38)"
        },
        "&:checked": {
            backgroundColor: formattedColor.hex(),
            borderColor: formattedColor.hex()
        },
        "&:checked::after": {
            backgroundColor: theme == "light" ? "white" : "rgb(36, 38, 38)",
            borderColor: theme == "light" ? "white" : "rgb(36, 38, 38)"
        },
        "&:checked::before": {
            backgroundColor: theme == "light" ? "white" : "rgb(36, 38, 38)",
            borderColor: theme == "light" ? "white" : "rgb(36, 38, 38)"
        },
    }

    $: if (theme == "system") {
        overrideStyle['@media screen and (prefers-color-scheme: dark)'] = {
            "&": { 
                backgroundColor: "rgb(74, 74, 74)",
                borderColor: "rgb(74, 74, 74)"
            },
            "&::after": {
                backgroundColor: "rgb(36, 38, 38)",
                borderColor: "rgb(36, 38, 38)"
            },
            "&::before": {
                backgroundColor: "rgb(36, 38, 38)",
                borderColor: "rgb(36, 38, 38)"
            },
            "&:checked::after": {
                backgroundColor: "rgb(36, 38, 38)",
                borderColor: "rgb(36, 38, 38)"
            },
            "&:checked::before": {
                backgroundColor: "rgb(36, 38, 38)",
                borderColor: "rgb(36, 38, 38)"
            }
        }
    } else {
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
<div data-theme={theme}>
    <Switch override={overrideStyle} bind:size={size} bind:checked={checked} label={label}/>
</div>
<style lang="less">
    div {
        width: fit-content;
        font-family: Arial, Helvetica, sans-serif;
        color: rgb(31, 35, 35);
        &[data-theme="dark"] {
            color: rgb(245,245,245);
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                color: rgb(245,245,245);
            }
        }
    }
</style>