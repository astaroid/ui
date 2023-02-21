<script lang="ts">
    import Color from "color"
    import { createEventDispatcher } from "svelte"
    import Tooltip from "./tooltip.svelte"

    export let theme:"system"|"light"|"dark" = "system"
    export let id:string = "00000000-0000-0000-0000-000000000000"
    export let color:string = "red"
    export let volume:number = 0
    export let disabled:boolean = false
    export let isSelected:boolean = false
    export let showLabels:boolean = false
    export let mode:"selling"|"forging" = "forging"

    const format = (value:number): string => {
        if (value >= 1000000000) {
            return (value/1000000000).toFixed(3).concat("B")
        } else if (value >= 1000000 && value < 1000000000) {
            return (value/1000000).toFixed(3).concat("M")
        } else if (value >= 10000 && value < 1000000) {
            return (value/1000).toFixed(2).concat("K")
        } else {
            return value.toFixed()
        }
    }

    const formatColor = () => {
        if (colorFormatType == "keyword") {
            colorFormatType = "rgb"
            formattedColor = new Color(color).keyword() 
        } else if (colorFormatType == "rgb") {
            colorFormatType = "hex"
            let c = new Color(color)
            formattedColor = `rgba(${c.red()}, ${c.green()}, ${c.blue()}, ${c.alpha()})`
        } else if (colorFormatType == "hex") {
            colorFormatType = "keyword"
            formattedColor = new Color(color).hex()
        }
    }

    const onSelectBtnClick = () => {
        if (isSelected) {
            dispatcher("onUnselected", { id })
        } else {
            dispatcher("onSelected", { id })
        }
    }

    const dispatcher = createEventDispatcher()

    let colorFormatType:"keyword"|"hex"|"rgb" = "rgb"

    let formattedColor = new Color(color).keyword()
</script>
<section data-theme={theme}>
    <div data-container="asset-container">
        <Tooltip show={showLabels} position="bottom" theme={theme} label="Asset color">
            <div on:click={formatColor} data-container="color-container">
                <button style="background-color: {color};"></button>
                <span style="text-transform: {colorFormatType == "rgb" ? "capitalize": "none"};">{formattedColor}</span>
            </div>
        </Tooltip>
        <div data-container="asset-image"></div>
    </div>
    <div data-container="asset-detail-container" style="display: { mode == "selling" ? "flex" : "none" };">
        <Tooltip show={showLabels} position="bottom" theme={theme} label="Asset volume">
            <span data-text="asset-volume">#{format(volume)}</span>
        </Tooltip>
       <button disabled={disabled} on:click={() => dispatcher("onSold", { id })} >Sell</button>
    </div>
    <button disabled={disabled} data-selected={isSelected} on:click={onSelectBtnClick} style="display: { mode == "forging" ? "flex" : "none" };">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
        {!isSelected ? "Select" : "Selected"}
    </button>
</section>
<style lang="less">
    section {
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        --section-width: 240px;
        div[data-container="asset-container"] {
            width: var(--section-width);
            height: 240px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding-block: 20px;
            background-color: rgb(240, 240, 240);
            font-family: Arial, Helvetica, sans-serif;
            border-width: 0;
            border-style: solid;
            border-radius: 8px;
            div[data-container="asset-image"] {
                width: 100%;
                height: calc(100% - 45px);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            div[data-container="color-container"] {
                background-color: #fafafa;
                font-family: Arial, Helvetica, sans-serif;
                color: rgb(16, 16, 16);
                width: fit-content;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding-block: 3px;
                padding-inline: 12px;
                height: 25px;
                min-width: 55px;
                border-style: solid;
                border-width: 0;
                border-radius: 15px;
                cursor: pointer;
                box-shadow: 0px 2px 6px rgb(185, 185, 185);
                span {
                    font-size: 15.5px;
                    margin-left: 6.5px;
                    margin-top: 0.5px;
                }
                button {    
                    height: 17px;
                    width: 17px;
                    border-style: solid;
                    border-width: 1px;
                    border-color: rgb(215, 215, 215);
                    border-radius: 5px;
                    &:focus {
                        outline: none;
                    }
                }
            }
        }
        div[data-container="asset-detail-container"] {
            width: var(--section-width);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-block: 12px;
            span {
                width: calc(50% - 15px);
                border-width: 0;
                border-style: solid;
                font-size: 23.25px;
                font-family: Poppins, sans-serif;
            }
            button {
                display: flex;
                align-items: center;
                justify-content: center;
                border-width: 0;
                border-style: solid;
                border-radius: 5px;
                width: 95px;
                height: 44.25px;
                font-size: 19px;
                outline: none;
                background-color: #06d6a0;
                color: white;
                cursor: pointer;
                &:hover {
                    background-color: #06c694; 
                }
                &:disabled {
                    cursor: no-drop;
                    background-color: #08b489
                }
                &:focus {
                    outline: none;
                }
            }
        }

        button[data-selected] {
            display: flex;
            align-items: center;
            justify-content: center;
            border-width: 0;
            border-style: solid;
            border-radius: 5px;
            width: var(--section-width);
            height: 44.25px;
            font-size: 19px;
            outline: none;
            background-color: #06d6a0;
            margin-top: 12px;
            color: white;
            cursor: pointer;
            svg {
                display: none;
                fill: white;
                height: 28px;
                width: 28px;
                margin-bottom: 2px;
                margin-right: 1.5px;
            }
            &:hover {
                background-color: #06c694; 
            }
            &:disabled {
                cursor: no-drop;
                background-color: #08b489
            }
            &:focus {
                outline: none;
            }
            &[data-selected="true"] {
                background-color: #2196f3;
                svg {
                    display: block;
                }
                &:hover {
                    background-color: darken(#2195f3, 5);
                }
            }
        }

        &[data-theme="dark"] {
            div[data-container="asset-container"] {
                background-color: rgb(59, 59, 59);
                div[data-container="color-container"] {
                    box-shadow: none;
                    background-color: #303030;
                    color: rgb(236, 236, 236);
                    border-width: 1px;
                    border-color: rgb(84, 82, 82);
                    button {
                        border-color: rgb(84, 82, 82);
                    }
                }
            }
            div[data-container="asset-detail-container"] span {
                color: rgb(236, 236, 236);
            }
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                div[data-container="asset-container"] {
                    background-color: rgb(59, 59, 59);
                    div[data-container="color-container"] {
                        box-shadow: none;
                        background-color: #303030;
                        color: rgb(236, 236, 236);
                        border-width: 1px;
                        border-color: rgb(84, 82, 82);
                        button {
                            border-color: rgb(84, 82, 82);
                        }
                    }
                }
                div[data-container="asset-detail-container"] span {
                    color: rgb(236, 236, 236);
                }
            }
        }

        @media screen and (max-width: 495px) {
            --section-width: 100%;
            div[data-container="asset-container"] {
                div[data-container="color-container"] {
                    height: 28px;
                    span {
                        font-size: 16.5px;
                    }
                    button {
                        height: 18px;
                        width: 18px;
                    }
                }
            }
            
            div[data-container="asset-detail-container"] button {
                height: 44.75px;
                font-size: 19.5px;
                width: calc(45% - 15px);
                max-width: 110px;
            }

            button[data-selected] {
                height: 44.75px;
                font-size: 19.5px;
            }
        }
    }
</style>