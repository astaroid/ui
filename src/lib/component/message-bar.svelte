<script lang="ts">
    import { Circle } from "svelte-loading-spinners"
    import { createEventDispatcher } from "svelte"

    export let message:string = "Message"
    export let type:"normal"|"inputable"|"removable" = "normal"
    export let show:boolean = true
    export let loading:boolean = false
    export let inputText:string = "click me"

    const dispatcher = createEventDispatcher()
</script>
<section style="display: { show ? "flex" : "none" }">
    <p>{@html message}</p>
    {#if type == "inputable" }
        {#if !loading}
            <button on:click={() => dispatcher("onInputClicked")} data-type="input">{inputText}</button>
        {:else}
            <Circle color="white" size="24" unit="px"/>
        {/if}
    {/if}
    {#if type == "removable" }
        <button data-type="exit" on:click={() => {
            show = false
            dispatcher("onExit")
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
        </button>
    {/if}
</section>
<style lang="less">
    section {
        width: calc(100% - 26px);
        min-height: 35px;
        height: fit-content;
        color: white;
        background-color: #06d6a0;
        font-size: 18px;
        padding-block: 8px;
        padding-inline: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-family: Arial, Helvetica, sans-serif;
        p {
            margin: 0 0 0 0;
        }
        button[data-type="input"] {
            background-color: transparent;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 4px;
            color: white;
            padding-inline: 10px;
            border-color: white;
            cursor: pointer;
            height: fit-content;
            width: auto;
            font-size: 16px;
            min-height: 32px;
        }
        button[data-type="exit"] {
            background-color: transparent;
            border: none;
            cursor: pointer;
            height: 25px;
            svg {
                width: 17px;
                height: 17px;
                stroke: white;
                fill: white;
            }
        }
        button:focus {
            outline: none;
        }
        @media screen and (max-width: 480px) {
            & {
                font-size: 14.25px;
                height: 35px;
                button[data-type="input"] {
                    font-size: 13px;
                    min-height: 30px;
                }
                button[data-type="exit"] {
                    svg {
                        width: 15px;
                        height: 15px;
                    }
                }
            }
        }
        @media screen and (max-width: 750px) {
            & {
                font-size: 17.35px;
                min-height: 35px;
                button[data-type="input"] {
                    font-size: 15px;
                    height: 29px;
                }
                button[data-type="exit"] {
                    svg {
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        } 
    }
</style>