<script lang="ts">
    import { clickoutside } from "@svelteuidev/composables"
    import { onMount, createEventDispatcher } from "svelte"
    import SelectInputMenu from "./select-input-menu.svelte"

    export let theme:"system"|"light"|"dark" = "system"
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "px"
    export let width:number = 150
    export let placeholder:string = String()
    export let options:string[] = []
    export let disabled:boolean = false
    export let value:string = String()

    const dispatcher = createEventDispatcher()

    const onClick = () => {
        if (sectionElement && window) {
            menuWidth = sectionElement.clientWidth
            menuXPosition = sectionElement.clientLeft - 2 /*Margin left*/
            menuYPosition = sectionElement.clientTop + selectHeight + 3 /*Margin top*/
            if (menuYPosition + menuHeight >= window.innerHeight) {
                menuYPosition -= (menuHeight + selectHeight + 13 /*Padding top*/) 
            }
        }
        if (!disabled) {
            showMenu = !showMenu
            isMenuButtonClicked = true
        }
    }

    const clickedOutsideMenu = () => {
        if (!isMenuButtonClicked)
            showMenu = false
        else 
            showMenu = true
    }

    const onSelect = (ev:CustomEvent<{option: string}>) => {
        showMenu = false
        value = ev.detail.option
        dispatcher("onInput", { value })
    }

    let showMenu = false
    let isMenuButtonClicked = false
    let menuXPosition = 0
    let menuYPosition = 0
    let menuWidth = width
    let menuHeight = 50
    let selectHeight = 0
    let sectionElement:HTMLElement = null

    onMount(() => {
        if (sectionElement && window) {
            menuWidth = sectionElement.clientWidth
            menuXPosition = sectionElement.clientLeft - 2 /*Margin left*/
            menuYPosition = sectionElement.clientTop + selectHeight + 3 /*Margin top*/
            if (menuYPosition + menuHeight >= window.innerHeight) {
                menuYPosition -= (menuHeight + selectHeight + 13 /*Padding top*/) 
            }
        }
    })
</script>
<section data-theme={theme} data-disabled={disabled} bind:clientHeight={selectHeight} bind:this={sectionElement} on:click={onClick} use:clickoutside={{ enabled: true, callback: () => isMenuButtonClicked = false }} style="width: calc({`${width}${unit} - 22px`})">
    <p data-has-value={value ? "true" : "false"}>{ value ? value : placeholder }</p>
    <svg data-to-select="{showMenu}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
    <SelectInputMenu 
        show={showMenu} 
        options={options} 
        theme={theme} 
        width={menuWidth}
        unit="px"
        x={menuXPosition} 
        y={menuYPosition}
        bind:menuHeight={menuHeight}
        on:onSelect={onSelect}
        on:onClickOutside={clickedOutsideMenu}/>
</section>
<style lang="less">
    section {
        padding-inline: 11px;
        padding-block: 8px;
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
        border-color: #dee2e6;
        background-color: rgb(243, 243, 243);
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        p {
            padding: 0 0 0 0;
            margin: 0 0 0 0;
            font-family: Poppins, 'Segoe UI', Tahoma, sans-serif;
            font-size: 15.76px;
            color: #1f2323;
            width: calc(100% - 22px);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: fit-content;
            &[data-has-value="false"] {
                color: lighten(#1f2323, 35);
            }
        }
        svg {
            height: 18px;
            width: 18px;
            fill: lighten(#1f2323, 35);
            &[data-to-select="true"] {
                fill: #1f2323;
            }
        }
        &[data-disabled="true"] {
            cursor: not-allowed;
            svg {
                fill: lighten(#1f2323, 38);
            }
            p {
                color: lighten(#1f2323, 38);
            }
        }
        &[data-theme="dark"] {
            border-color: rgb(94, 94, 94);
            background-color: rgb(74, 74, 74);
            p {
                color: #c1c2bd;
                &[data-has-value="false"] {
                    color: darken(#c1c2bd, 25);
                }
            }
            svg {
                fill: darken(#c1c2bd, 25);
                &[data-to-select="true"] {
                    fill: #c1c2bd;
                }
            }
            &[data-disabled="true"] {
                svg {
                    fill: darken(#c1c2bd, 28);
                }
                p {
                    color: darken(#c1c2bd, 28);
                }
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                border-color: rgb(94, 94, 94);
                background-color: rgb(74, 74, 74);
                p {
                    color: #c1c2bd;
                    &[data-has-value="false"] {
                        color: darken(#c1c2bd, 25);
                    }
                }
                svg {
                    fill: darken(#c1c2bd, 25);
                    &[data-to-select="true"] {
                        fill: #c1c2bd;
                    }
                }
                &[data-disabled="true"] {
                    svg {
                        fill: darken(#c1c2bd, 28);
                    }
                    p {
                        color: darken(#c1c2bd, 28);
                    }
                }
            }
        }
        @media screen and (min-width: 280px) {
            height: 19px;
            p {
                font-size: 16.86px;
            }
            svg {
                height: 18.8px;
                width: 18.8px;
            }
        }
        @media screen and (min-width: 320px) {
            height: 18.7px;
            p {
                font-size: 16.25px;
            }
            svg {
                height: 18px;
                width: 18px;
            }
        }
        @media screen and (min-width: 600px) {
            height: 18px;
            p {
                font-size: 15.76px;
            }
            svg {
                height: 18px;
                width: 18px;
            }
        }
    }
</style>