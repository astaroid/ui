<script lang="ts">
    import { createEventDispatcher } from "svelte"

    interface MenuItemType {
        id: string
        type: "item"|"label"|"divider"
        text?: string
        disabled?: boolean
        "icon data"?: string
        color?: string
    }

    export let theme:"system"|"light"|"dark" = "system"
    export let orderBy:"ascending"|"descending" = "ascending"
    export let filterBy:"price"|"volume"|"unique" = "volume"

    const dispatcher = createEventDispatcher()
    
    const onOrderByChange = () => {
        if (orderBy == "ascending")
            orderBy = "descending"
        else
            orderBy = "ascending"
        dispatcher("onOrderByChange", { orderBy })
    }
</script>
<section data-container="wrapper">
    <main data-theme={theme}>
        <button on:click={onOrderByChange} data-button="orderby-button">
            <svg style="display: { orderBy == "ascending" ? "block" : "none" }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
            </svg>
            <svg style="display: { orderBy == "descending" ? "block" : "none" }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
        </button>
        <button data-button="filterby-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
        </button>
    </main>
</section>
<style lang="less">
    section[data-container="wrapper"] {
        position: sticky;
        bottom: 0;
        padding: 0 0 0 0;
        margin: 0 0 0 0;
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        main {
            padding-block: 20px;
            padding-inline: 20px;
            width: fit-content;
            height: fit-content;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            button {
                display: flex;
                align-items: center;
                justify-content: center;
                border-width: 0;
                border-style: solid;
                outline: none;
                cursor: pointer;
                box-shadow: 0px 3px 7px rgb(150, 150, 150);
                &:disabled {
                    cursor: no-drop;
                }
                &:focus {
                    outline: none;
                }
                &[data-button="orderby-button"] {
                    height: 51px;
                    width: 51px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 25.5px;
                    margin-bottom: 15px;
                    background-color: white;
                    svg {
                        height: 28px;
                        width: 28px;
                        fill: rgb(40, 40, 40);
                    }
                } 
                &[data-button="filterby-button"] {
                    border-radius: 31.5px;
                    width: 63px;
                    height: 63px;
                    background-color: #06d6a0;
                    svg {
                        width: 33px;
                        height: 33px;
                        fill: white;
                    }
                    &:hover {
                        background-color: #06c694; 
                    }
                    &:disabled {
                        background-color: #08b489
                    }
                }
            }
            &[data-theme="dark"] {
                button {
                    box-shadow: none;
                    &[data-button="orderby-button"] {
                        background-color: rgb(33, 33, 35);
                        border-width: 1.5px;
                        border-style: solid;
                        border-color: rgb(100, 100, 100);
                        svg {
                            fill: rgb(250, 250, 250);
                        }
                    }
                }
            }
            @media screen and (prefers-color-scheme: dark) {
                &[data-theme="system"] {
                    button {
                        box-shadow: none;
                        &[data-button="orderby-button"] {
                            background-color: rgb(33, 33, 35);
                            border-width: 1.5px;
                            border-style: solid;
                            border-color: rgb(100, 100, 100);
                            svg {
                                fill: rgb(250, 250, 250);
                            }
                        }
                    }
                }
            }

            @media screen and (max-width: 599px) {
                padding-inline: 10px;
                button[data-button="orderby-button"] {
                    height: 48px;
                    width: 48px;
                    border-radius: 24px;
                    svg {
                        height: 26px;
                        width: 26px;
                    }
                }
                button[data-button="filterby-button"] {
                    transform: scale(0.96);
                }
            }
        }
    }
</style>