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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            </svg> 
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
            svg {
                fill: white;
                height: 22px;
                width: 22px;
                margin-inline: 5px;
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
                height: 48.5px;
                font-size: 19.5px;
                svg {
                    height: 23.5px;
                    width: 23.5px;
                }
            }
        }
    }
</style>