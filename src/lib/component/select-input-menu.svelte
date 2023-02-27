<script lang="ts">
    import { clickoutside } from "@svelteuidev/composables"
    import { createEventDispatcher, onMount } from "svelte"

    export let theme:"system"|"light"|"dark" = "system"
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "px"
    export let width:number = 150
    export let options:string[] = []
    export let show:boolean = false
    export let x:number = 0
    export let y:number = 0
    export let height = 50

    const dispatcher = createEventDispatcher()

    $: {
        if (sectionElement) height = sectionElement.clientHeight
    }

    onMount(() => height = sectionElement.clientHeight)

    let sectionElement:HTMLElement = null
</script>
<section data-theme={theme} bind:this={sectionElement} use:clickoutside={{ enabled: show, callback: () => dispatcher("onClickOutside") }} style="width: calc({width}{unit} - 2px); top: {y}px; left: {x}px; visibility: { show ? "visible" : "hidden" }">
    {#each options as option, index }
        <p on:pointerdown={() => dispatcher("onSelect", { option })}>{option}</p>
    {/each}
</section>
<style lang="less">
    section {
        padding-block: 10px;
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
        border-color: rgb(233, 236, 239);
        background-color: rgb(253, 253, 253);
        min-height: 50px;
        height: fit-content;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        z-index: 500;
        justify-content: flex-start;
        box-shadow: rgb(0 0 0 / 5%) 0px 1px 3px;
        p {
            margin: 0 0 0 0;
            padding: 0 0 0 0;
            cursor: pointer;
            display: flex;
            padding-inline: 11px;
            width: calc(100% - 22px);
            flex-direction: row;
            padding-block: 8px;
            justify-content: flex-start;
            align-items: flex-start;
            font-size: 14.5px;
            font-family: Poppins, 'Segoe UI', Tahoma, sans-serif;
            &:hover {
                background-color: rgb(244, 244, 244);
            }
        }
        &[data-theme="dark"] {
            box-shadow: none;
            background-color: rgb(23, 25, 25);
            border-color: #4e4c4c;
            p {
                color: #c1c2bd;
                &:hover {
                    background-color: rgb(38, 40, 40);
                }
            }
        }
        @media screen and (prefers-color-scheme) {
            &[data-theme="system"] {
                box-shadow: none;
                background-color: rgb(23, 25, 25);
                border-color: #4e4c4c;
                p {
                    color: #c1c2bd;
                    &:hover {
                        background-color: rgb(38, 40, 40);
                    }
                }
            }
        }
        @media screen and (min-width: 280px) {
            p {
                font-size: 16.5px;
            }
        }
        @media screen and (min-width: 320px) {
            p {
                font-size: 17.25px;
            }
        }
        @media screen and (min-width: 600px) {
            p {
                font-size: 14.5px;
            }
        }
    }
</style>