<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let theme:"system"|"light"|"dark" = "system"
    export let id:string
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let type:"item"|"label"|"divider" = "item"
    export let text:string = "item"
    export let disabled:boolean = false
    export let iconData:string = null
    export let color:string = null

    const dispatcher = createEventDispatcher()

    const onClicked = () => {
        if (type == "item")
            dispatcher("onClicked", { id })
    }
</script>
<section on:click={onClicked} data-disabled={ type == "item" && disabled } style="{color ? `color: ${color}` : String()}; width: calc({width}{unit} { type != "divider" ? "- 26px": String() })" data-item-type={type} data-theme={theme}>
    {#if type == "label"}
        {text}
    {:else if type == "item"}
        {#if iconData}
            {@html iconData}
        {:else}
            <button data-container="empty"></button>
        {/if}
        <span>{text}</span>
    {/if}
</section>
<style lang="less">
    section {
        font-family: Arial, Helvetica, sans-serif;
        width: calc(100% - 26px);
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 13px;
        padding-right: 13px;
        color: #303030;
        button[data-container="empty"] {
            background-color: transparent;
            height: 17px;
            width: 17px;
            border: none;
            &:focus {
                outline: none;
            }
        }
        &[data-item-type="item"] {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            font-size: 13.75px;
            &[data-disabled="true"] {
                cursor: default;
                &:hover {
                    background-color: transparent !important;
                }
            }
            
            span {
                margin-left: 8.75px;
                width: 90%;
                margin-top: 3px;
            }
            &:has(button) {
                span {
                    margin-top: 0;
                }
            }
            &:hover {
                background-color: #f4f4f4;
            }
            &[data-theme="dark"] {
                color: #c1c2bd;
                &:hover {
                    background-color: #242626;
                }
            }
        }
        &[data-item-type="label"] {
            color: rgb(134, 142, 150) !important;
            font-weight: 500;
            font-size: 13.25px;
            &[data-theme="dark"] {
                color: rgb(144, 146, 150) !important
            }
        }
        &[data-item-type="divider"] {
            padding: 0 0 0 0;
            margin-top: 3px;
            margin-bottom: 3px;
            width: 100%;
            border: none;
            border-top-style: solid;
            border-top-width: 1px;
            border-top-color: rgb(228, 231, 234);
            &[data-theme="dark"] {
                border-top-color: #4e4c4c;
            }
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-item-type="item"] {
                &[data-theme="system"] {
                    color: #c1c2bd;
                    &:hover {
                        background-color: #242626;
                    }
                }
            }
            &[data-item-type="label"]  {
                &[data-theme="system"] {
                    color: rgb(144, 146, 150) !important
                }
            }
            &[data-item-type="divider"] {
                &[data-theme="system"] {
                    border-top-color: #4e4c4c;
                }
            }
        }
    }
</style>