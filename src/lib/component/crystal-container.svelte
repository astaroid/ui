<script lang="ts">
    import Color from "color"
    import { createEventDispatcher } from "svelte"
    import Tooltip from "./tooltip.svelte"

    export let theme:"system"|"light"|"dark" = "system"
    export let id:string = "00000000-0000-0000-0000-000000000000"
    export let color:string = "red"
    export let volume:number = 0
    export let rarest:number = 0
    export let price:number = 10
    export let disabled:boolean = false
    export let showLabels:boolean = false

    const format = (value:number): string => {
        if (value >= 1000000000) {
            return (value/1000000000).toFixed(3).concat("B")
        } else if (value >= 1000000 && value < 1000000000) {
            return (value/1000000).toFixed(3).concat("M")
        } else if (value >= 1000 && value < 1000000) {
            return (value/1000).toFixed(2).concat("K")
        } else {
            return value.toFixed()
        }
    }

    const formatColor = () => {
        if (colorFormatType == "keyword") {
            colorFormatType = "rgb"
            formatedColor = new Color(color).keyword() 
        } else if (colorFormatType == "rgb") {
            colorFormatType = "hex"
            let c = new Color(color)
            formatedColor = `rgba(${c.red()}, ${c.green()}, ${c.blue()}, ${c.alpha()})`
        } else if (colorFormatType == "hex") {
            colorFormatType = "keyword"
            formatedColor = new Color(color).hex()
        }
    }

    const dispatcher = createEventDispatcher()

    let colorFormatType:"keyword"|"hex"|"rgb" = "rgb"

    let formatedColor = new Color(color).keyword()
</script>
<section data-theme={theme}>
    <div data-container="crystal-container">
        <Tooltip show={showLabels} position="bottom" theme={theme} label="Crystal color">
            <div on:click={formatColor} data-container="color-container">
                <button style="background-color: {color};"></button>
                <span style="text-transform: {colorFormatType == "rgb" ? "capitalize": "none"};">{formatedColor}</span>
            </div>
        </Tooltip>
        <div data-container="crystal-image"></div>
    </div>
    <div data-container="crystal-detail-container">
        <Tooltip show={showLabels} position="bottom" theme={theme} label="Crystal volume">
            <span data-text="crystal-volume">#{format(volume)}</span>
        </Tooltip>
        <Tooltip show={showLabels} position="bottom" theme={theme} label="Crystal rarest rate">
            <span style="color: { parseFloat(format(rarest)) < 50 ? "rgb(240, 40, 0)" : "#06c694" }" data-text="crystal-rarest">{format(rarest)}%</span>
        </Tooltip>
    </div>
        <button on:click={() => dispatcher("onBuy", { id, price }) } disabled={disabled}>
            Buy 
            <img src="/coin.png" alt="">
            {format(price)}
        </button>
</section>
<style lang="less">
    section {
        --section-width: 240px;
        div[data-container="crystal-container"] {
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
            div[data-container="crystal-image"] {
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
        
        div[data-container="crystal-detail-container"] {
            width: var(--section-width);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-block: 12px;
            color: rgb(16, 16, 16);
            span {
                width: calc(50% - 15px);
                border-width: 0;
                border-style: solid;
                font-size: 22px;
                font-family: Poppins, sans-serif;
                &[data-text="crystal-rarest"] {
                    color: #06c694;
                }
            }
        }

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            border-width: 0;
            border-style: solid;
            border-radius: 5px;
            width: var(--section-width);
            height: 47px;
            font-size: 18px;
            outline: none;
            background-color: #06d6a0;
            color: white;
            cursor: pointer;
            img {
                height: 28px;
                width: 28px;
                margin-inline: 2.75px;
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
        }

        &[data-theme="dark"] {
            div[data-container="crystal-container"] {
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
            div[data-container="crystal-detail-container"] span {
                color: rgb(236, 236, 236);
            }
        }
 
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                div[data-container="crystal-container"] {
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
                div[data-container="crystal-detail-container"] span {
                    color: rgb(236, 236, 236);
                }
            }
        }

        @media screen and (max-width: 495px) {
            --section-width: 100%;
            div[data-container="crystal-container"] {
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
            
            div[data-container="crystal-detail-container"] span {
                font-size: 24.5px;
            }

            button {
                height: 49.5px;
                font-size: 19.5px;
                img {
                    height: 30.5px;
                    width: 30.5px;
                }
            }
        }
    }
</style>