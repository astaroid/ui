<script lang="ts">
    import AccountSectionItem from "./account-section-item.svelte"
    import { createEventDispatcher } from "svelte"

    interface AccountSectionItem {
        id: string
        title: string
        description?: string
        type: "button"|"select"|"checkbox"|"switch"
        divider?: boolean
        options?: string[]
        checked?: boolean
        color?: string
        disabled?: boolean
        label?: string
        placeholder?: string
        value?: string
        textColor?: string
    }

    export let theme:"system"|"light"|"dark" = "system"
    export let width:number = 350
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "px"
    export let title:string = String()
    export let sectionItems:Array<AccountSectionItem> = []
    export let color:string = "#1e1e1e"

    const dispatcher = createEventDispatcher()

    if (color == "#1e1e1e" || color == "#ebebeb" || !color) 
        color = null
</script>
<section data-theme={theme} style="width: {width}{unit}">
    <p data-text="title" style="{color ? `color: ${color}` : void 0}">{title}</p>
    <main>
        {#each sectionItems as item, index}
            <AccountSectionItem 
                {...item} 
                divider={index != sectionItems.length - 1 ? true : false} 
                theme={theme}
                on:onInput={(e) => dispatcher("onInput", { ...e.detail })}/>
        {/each}
    </main>
</section>
<style lang="less">
    section {
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        p[data-text="title"] {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            width: calc(100% - 30px);
            font-size: 18.75px;
            margin-bottom: 6px;
            padding-inline: 15px;
            color: #1e1e1e;
            &:empty {
                display: none;
            }
        }
        main {
            min-height: 50px;
            background-color: rgb(252, 252, 252);
            border-style: solid;
            border-width: 1px;
            border-color: #e6e6e6;
            border-radius: 4px;
            box-shadow: rgb(60 64 67 / 3%) 0px 1px 3px;
        }
        &[data-theme="dark"] {
            p[data-text="title"] {
                color: #ebebeb;
            }
            main {
                background-color: #252525;
                border-color: #4e4c4c;
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                p[data-text="title"] {
                    color: #ebebeb;
                }
                main {
                    background-color: #252525;
                    border-color: #4e4c4c;
                }
            }
        }
        @media screen and (min-width: 280px) {
            P {
                font-size: 16px;
            }
        }
        @media screen and (min-width: 320px) {
            P {
                font-size: 16.7px;
            }
        }
        @media screen and (min-width: 600px) {
            P {
                font-size: 17px;
            }
        }
    }
</style>