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

    type FilterByOption = "price"|"volume"|"unique"

    export let theme:"system"|"light"|"dark" = "system"
    export let orderBy:"ascending"|"descending" = "ascending"
    export let filterBy:FilterByOption = "volume"

    const dispatcher = createEventDispatcher()
    
    const onOrderByChange = () => {
        if (orderBy == "ascending")
            orderBy = "descending"
        else
            orderBy = "ascending"
        dispatcher("onOrderByChange", { orderBy })
    }

    const onFilterByChange = (option:FilterByOption) => {
        filterBy = option
        dispatcher("onFilterByChange", { filterBy } )
    }

    let showFilterOptions = null
</script>
<section data-container="wrapper">
    <main data-theme={theme}>
        <div class={ showFilterOptions == true ? "show" : showFilterOptions == false ? "hide" : void 0 } data-container="filter-option" data-is-option={filterBy == "price"}>
            <button on:click={() => onFilterByChange("price")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </button>
            <p>Price</p>
        </div>
        <div class={ showFilterOptions == true ? "show" : showFilterOptions == false ? "hide" : void 0 } data-container="filter-option" data-is-option={filterBy == "volume"}>
            <button on:click={() => onFilterByChange("volume")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>
                </svg>
            </button>
            <p>Volume</p>
        </div>
        <div class={ showFilterOptions == true ? "show" : showFilterOptions == false ? "hide" : void 0 } data-container="filter-option" data-is-option={filterBy == "unique"} >
            <button on:click={() => onFilterByChange("unique")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                </svg>
            </button>
            <p>Unique</p>
        </div>
        <button data-button="filterby-button" on:click={() => showFilterOptions = showFilterOptions == null ? true : !showFilterOptions}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
        </button>
        <button class={ showFilterOptions == true ? "hide" : showFilterOptions == false ? "show" : void 0 } on:click={onOrderByChange} data-button="orderby-button">
            <svg style="display: { orderBy == "ascending" ? "block" : "none" }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
            </svg>
            <svg style="display: { orderBy == "descending" ? "block" : "none" }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
        </button>
    </main>
</section>
<style lang="less">
    @keyframes scale-in-anim {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
    @keyframes scale-out-anim {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(0);
        }
    }
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
            :global(div[data-container="filter-option"].show) {
                animation-name: scale-in-anim;
                animation-play-state: running;
                transform: scale(1);
            }
            :global(div[data-container="filter-option"].hide) {
                animation-name: scale-out-anim;
                animation-play-state: running;
                transform: scale(0);
            }
            div[data-container="filter-option"] {
                width: fit-content;
                height: fit-content;
                margin-bottom: 15px;
                animation-duration: 280ms;
                animation-play-state: paused;
                animation-timing-function: ease-out;
                transform: scale(0);
                p {
                    display: none;
                    width: 100%;
                    margin: 0 0 0 0;
                    padding: 0 0 0 0;
                    margin-top: 8px;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    font-size: 17px;
                    color: rgb(16, 16, 16);
                    text-align: center;
                }
                button {
                    height: 51px;
                    width: 51px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 25.5px;
                    background-color: white;
                    svg {
                        height: 28px;
                        width: 28px;
                        fill: rgb(40, 40, 40);
                    }
                }
                &[data-is-option="true"] {
                    p {
                        display: block;
                    }
                    button {
                        background-color: #2196f3;
                        &:hover {
                            background-color: darken(#2195f3, 5);
                        }
                        &:disabled {
                            background-color: darken(#2195f3, 7);
                        }
                        svg {
                            width: 33px;
                            height: 33px;
                            fill: white;
                        }
                    }
                }
            }
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
                :global(&.show) {
                    &[data-button="orderby-button"] {
                        animation-name: scale-in-anim;
                        animation-play-state: running;
                        transform: scale(1);
                    }
                    
                }
                :global(&.hide) {
                    &[data-button="orderby-button"] {
                        animation-name: scale-out-anim;
                        animation-play-state: running;
                        transform: scale(0);
                    }
                }
                &[data-button="orderby-button"] {
                    height: 51px;
                    width: 51px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 25.5px;
                    margin-top: 15px;
                    background-color: white;
                    animation-duration: 280ms;
                    animation-play-state: paused;
                    animation-timing-function: ease-out;
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
                div[data-container="filter-option"] {
                    button {
                        background-color: rgb(33, 33, 35);
                        border-width: 1.5px;
                        border-style: solid;
                        border-color: rgb(100, 100, 100);
                        box-shadow: none;
                        svg {
                            fill: rgb(250, 250, 250);
                        }
                    }
                    p {
                        color: rgb(236, 236, 236);
                    }
                    &[data-is-option="true"] {
                        button {
                            border: none;
                            background-color: #2196f3;
                            &:hover {
                                background-color: darken(#2195f3, 5);
                            }
                            &:disabled {
                                background-color: darken(#2195f3, 7);
                            }
                        }
                    }

                }
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
                    div[data-container="filter-option"] {
                        button {
                            background-color: rgb(33, 33, 35);
                            border-width: 1.5px;
                            border-style: solid;
                            border-color: rgb(100, 100, 100);
                            box-shadow: none;
                            svg {
                                fill: rgb(250, 250, 250);
                            }
                        }
                        p {
                            color: rgb(236, 236, 236);
                        }
                        &[data-is-option="true"] {
                            button {
                                border: none;
                                background-color: #2196f3;
                                &:hover {
                                    background-color: darken(#2195f3, 5);
                                }
                                &:disabled {
                                    background-color: darken(#2195f3, 7);
                                }
                            }
                        }

                    }
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
                div[data-container="filter-option"] {
                    button {
                        height: 48px;
                        width: 48px;
                        border-radius: 24px;
                        svg {
                            height: 26px;
                            width: 26px;
                        } 
                    }
                    p {
                        font-size: 16.25px;
                    }
                }
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