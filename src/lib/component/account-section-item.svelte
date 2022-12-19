<script lang="ts">
    import CheckboxInput from "./checkbox-input.svelte"
    import SwitchInput from "./switch-input.svelte"
    import SelectInput from "./select-input.svelte"
    import Color from "color"
    import { createEventDispatcher } from "svelte"

    export let theme:"system"|"light"|"dark" = "system"
    export let id:string
    export let title:string = String()
    export let description:string = String()
    export let type:"button"|"select"|"checkbox"|"switch" = "button"
    export let divider:boolean = true
    export let options:string[] = []
    export let checked:boolean = false
    export let color:string = "#228be6"
    export let disabled:boolean = false
    export let label:string = String()
    export let placeholder:string = String()
    export let value:string = String()

    const dispatcher = createEventDispatcher()

    const onClick = (ev:PointerEvent|MouseEvent) => {
        let target = ev.target as HTMLElement
        let insideInput = target.tagName.toLowerCase() == "input" || target.tagName.toLowerCase() == "label"
        
        if (disabled)
            return
        
        if (type == "checkbox" || type == "switch") {
            if (insideInput) {
                dispatcher("onInput", { id, type, value: !checked } )
                return
            }
            checked = !checked
            dispatcher("onInput", { id, type, value: checked } )
        } 
    }

    const onInputButtonClick = () => dispatcher("onInput", { id, type, value: null } )

    const onSelect = () => {
        dispatcher("onInput", { id, type: "select", value })
    }
</script>
<section data-theme={theme} data-type={type} data-disabled={disabled} data-has-divider={divider} on:pointerdown={onClick}>
    <div data-container="body">
        <p data-text="title">{title}</p>
        {#if description }
            <p data-text="description">{description}</p>
        {/if}
    </div>
    <div data-container="input">
        {#if type == "checkbox" }
            <CheckboxInput
                theme={theme}
                label={label}
                color={color}
                bind:checked={checked} 
                disabled={disabled}/>
        {:else if type == "switch"}
            <SwitchInput 
                theme={theme}
                color={color}
                label={label}
                bind:checked={checked}/>
        {:else if type == "select"}
            <SelectInput 
                width={100} 
                unit="%"
                theme={theme} 
                placeholder={placeholder} 
                options={options} 
                bind:value={value}
                on:onInput={onSelect}/>
        {:else if type == "button"}
            <button 
                disabled={disabled} 
                style="background-color: {color}; color: white; --btn-dark-color: {new Color(color).darken(0.15).hex()}; --btn-light-color: {new Color(color).lighten(0.1).hex()}" 
                on:click={onInputButtonClick}>
            {label}
            </button>
        {/if}
    </div>
</section>
<style lang="less">
    section {
        width: calc(100% - 30px);
        border: none;
        min-height: 40px;
        height: fit-content;
        padding-inline: 15px;
        padding-block: 12px;
        display: flex;
        justify-content: space-between;
        &[data-type="checkbox"],
        &[data-type="switch"] {
            cursor: pointer;
            &:hover {
                background-color: rgb(244, 244, 244);
            }
        }
        &[data-type="checkbox"][data-disabled="true"] {
            cursor: not-allowed;
            background-color: transparent;
        }
        &[data-has-divider="true"] {
            border-bottom-color: #e6e6e6;
            border-bottom-style: solid;
            border-bottom-width: 1px;
        }
        div[data-container="body"] {
            width: calc(100% - 140px);
            font-family: Arial, Helvetica, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                margin: 0 0 0 0;
                padding: 0 0 0 0;
                width: 100%;
            }
            p[data-text="title"] {
                font-size: 18px;
                color: rgb(33, 33, 33);
            }
            p[data-text="description"] {
                margin-bottom: 5px;
                font-size: 14.5px;
                color: rgb(78, 78, 78);
            }
            &:has(p[data-text="description"]) {
                p[data-text="title"] {
                    margin-bottom: 5px;
                }
            }
        }
        div[data-container="input"] {
            width: 140px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button {
                outline: none;
                padding-block: 8px;
                padding-inline: 12px;
                min-width: 100px;
                max-width: 120px;
                font-size: 16.25px;
                height: fit-content;
                border-style: solid;
                border-width: 0;
                border-radius: 20px;
                font-family: Arial, Helvetica, sans-serif;
                cursor: pointer;
                &:hover {
                    background-color: var(--btn-light-color) !important;
                }
                &:disabled {
                    background-color: var(--btn-dark-color) !important;
                    cursor: not-allowed;
                }
                &:empty {
                    display: none;
                }
            }
        }
        &[data-theme="dark"] {
            &[data-has-divider="true"] {
                border-bottom-color: #4e4c4c;
            }
            &[data-type="checkbox"],
            &[data-type="switch"] {
                &:hover {
                    background-color: rgb(50, 50, 50);
                }
            }
            &[data-type="checkbox"][data-disabled="true"] {
                cursor: not-allowed;
                background-color: transparent;
            }
            div[data-container="body"] p {
                &[data-text="title"] {
                    color: rgb(240, 240, 240);
                }
                &[data-text="description"] {
                    color: rgb(150, 150, 150);
                }
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                &[data-has-divider="true"] {
                    border-bottom-color: #4e4c4c;
                }
                &[data-type="checkbox"],
                &[data-type="switch"] {
                    &:hover {
                        background-color: rgb(50, 50, 50);
                    }
                }
                &[data-type="checkbox"][data-disabled="true"] {
                    cursor: not-allowed;
                    background-color: transparent;
                }
                div[data-container="body"] p {
                    &[data-text="title"] {
                        color: rgb(240, 240, 240);
                    }
                    &[data-text="description"] {
                        color: rgb(150, 150, 150);
                    }
                }
            }
        }
        @media screen and (min-width: 280px) {
            div[data-container="body"] {
                width: calc(100% - 90px);
                p[data-text="title"] {
                    font-size: 17.25px;
                }
                p[data-text="description"] {
                    font-size: 13.5px;
                }
            }
            div[data-container="input"] {
                width: 90px;
                button {
                    min-width: 70px;
                    max-width: 80px;
                    font-size: 14px;
                }
            }
        }
        @media screen and (min-width: 320px) {
            div[data-container="body"] {
                width: calc(100% - 120px);
                p[data-text="title"] {
                    font-size: 17.7px;
                }
                p[data-text="description"] {
                    font-size: 13.85px;
                }
            }
            div[data-container="input"] {
                width: 120px;
                button {
                    min-width: 90px;
                    max-width: 100px;
                    font-size: 16px;
                }
            }
        }
        @media screen and (min-width: 600px) {
            div[data-container="body"] {
                width: calc(100% - 140px);
                p[data-text="title"] {
                    font-size: 18px;
                }
                p[data-text="description"] {
                    font-size: 14.5px;
                }
            }
            div[data-container="input"] {
                width: 140px;
                button {
                    min-width: 100px;
                    max-width: 120px;
                    font-size: 16.25px;
                }
            }
        }
    }
</style>