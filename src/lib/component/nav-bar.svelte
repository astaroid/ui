<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"
    import MessageBar from "./message-bar.svelte"
    import SearchBarDropdownMenu from "./search-bar-dropdown-menu.svelte"
    import SearchBar from "./search-bar.svelte"
    import Tooltip from "./tooltip.svelte"

    type PageType = "home"|"asset"

    type TabType = "activity"|"account"

    interface MessageBarControl {
        message: string
        show: boolean
        type: "normal"|"inputable"|"removable"
        loading: boolean
        inputText: string
    }

    export let theme:"system"|"light"|"dark" = "system"
    export let page:PageType = "home"
    export let notified:boolean = false
    export let message:MessageBarControl = null
    export let homePageLink:string = "/"
    export let assetPageLink:string = "/"
    export let coinCount:number = 0
    export let assetCount:number = 0

    const dispatcher = createEventDispatcher()

    interface SearchBarDropDownMenuControl {
        searchValue: string
        theme: "system"|"light"|"dark"
        page: PageType
        x: number
        y: number
        width: number
        show: boolean
    }

    const searchBarDropDownMenuControl:SearchBarDropDownMenuControl = {
        searchValue: String(),
        theme,
        page,
        x: 0,
        y: 0,
        width: 100,
        show: false
    }

    $:{
        if (tab == "activity") 
            notified = false
    }

    const formatNumber = (num:number) => {
        if (num >= 1000000000) {
            return (num/1000000000).toFixed(3).concat("B")
        } else if (num >= 1000000 && num < 1000000000) {
            return (num/1000000).toFixed(3).concat("M")
        } else if (num >= 10000 && num < 1000000) {
            return (num/1000).toFixed(2).concat("K")
        } else {
            return num.toFixed()
        }
    }

    const setTab = (tabToSet:TabType) => {
        tab = tabToSet
        if (tabToSet == "activity") notified = false
        dispatcher("onTabSelected", { tab })
    }

    const toggleSearchBar = (show:boolean) => {
        if (tabButtonContainer && searchBarContainer) {
            if (show) {
                tabButtonContainer.style.display = "none"
                searchBarContainer.style.display = "block"
            } else {
                tabButtonContainer.style.display = "flex"
                searchBarContainer.style.display = "none"
            }
        }
    }

    const searchBarOnFocusInOrClick = (e:CustomEvent<{ value: string, searchBarRect: DOMRect }>) => {
        isSearchBarFocused = true
        let eventDetail = e.detail
        if (eventDetail.value) {
            searchBarDropDownMenuControl.width = eventDetail.searchBarRect.width
            searchBarDropDownMenuControl.x = eventDetail.searchBarRect.x
            searchBarDropDownMenuControl.y = eventDetail.searchBarRect.y
            searchBarDropDownMenuControl.show = true
            searchBarDropDownMenuControl.searchValue = eventDetail.value
        } else {
            searchBarDropDownMenuControl.show = false
            searchBarDropDownMenuControl.searchValue = String()
        }
    }

    const searchBarDropdownMenuOnClickOutside = () => {
        if (!isSearchBarFocused)
            searchBarDropDownMenuControl.show = false
    }

    const searchBarResize = (e:CustomEvent<{ searchBarRect: DOMRect }>) => {
        let eventDetail = e.detail
        searchBarDropDownMenuControl.width = eventDetail.searchBarRect.width
        searchBarDropDownMenuControl.x = eventDetail.searchBarRect.x
        searchBarDropDownMenuControl.y = eventDetail.searchBarRect.y
    }

    const searchBarOnInput = (e:CustomEvent<{ value: string, searchBarRect: DOMRect }>) => {
        let eventDetail = e.detail
        if (eventDetail.value) {
            searchBarDropDownMenuControl.width = eventDetail.searchBarRect.width
            searchBarDropDownMenuControl.x = eventDetail.searchBarRect.x
            searchBarDropDownMenuControl.y = eventDetail.searchBarRect.y
            searchBarDropDownMenuControl.show = true
            searchBarDropDownMenuControl.searchValue = eventDetail.value
        } else {
            searchBarDropDownMenuControl.show = false
            searchBarDropDownMenuControl.searchValue = String()
        }
    }

    let enterActivityTabButton = false

    let isSearchBarFocused = false

    let tab:TabType = null

    let nav:HTMLElement = null

    let tabButtonContainer:HTMLElement = null

    let searchBarContainer:HTMLElement = null

    let countType:"coin"|"asset" = page == "home" ? "coin" : "asset"

    let oldScrollPosition = 0

    let scrollTimer = null

    onMount(() => {
        window.addEventListener("scroll", () => {
            if (!nav) return
            searchBarDropDownMenuControl.show = false
            if (scrollTimer != null)
                clearTimeout(scrollTimer)
            if (window.scrollY < oldScrollPosition) {
                nav.classList.remove("nav-slide-up")
                nav.classList.add("nav-slide-down")
            } else {
                nav.classList.add("nav-slide-up")
                nav.classList.remove("nav-slide-down")
            }
            scrollTimer = setTimeout(() => {
                nav.classList.remove("nav-slide-up")
                nav.classList.add("nav-slide-down")
            }, 250)
            oldScrollPosition = window.pageYOffset
        })
        window.matchMedia("screen and (max-width: 599px)").addEventListener("change", (e) => {
            if (tabButtonContainer && searchBarContainer) {
                searchBarDropDownMenuControl.show = false

                if (!e.matches) {
                    tabButtonContainer.style.display = "flex"
                    searchBarContainer.style.width = "283px"
                    searchBarContainer.style.display = "block"
                } else {
                    searchBarContainer.style.width = "100%"
                    searchBarContainer.style.display = "none"
                }
            }
        })
    })
</script>
<nav bind:this={nav} data-theme={theme}>
    <MessageBar {...message} />
    <main>
        <div data-container="main-container">
            <div bind:this={tabButtonContainer} data-container="button-container">
                <Tooltip theme={theme} label="Home" position="bottom">
                    <a href={homePageLink} data-current-page={ page == "home" ? "true": "false" }> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                        </svg>
                    </a>
                </Tooltip>
                <Tooltip theme={theme} label="Asset" position="bottom">
                    <a href={assetPageLink} data-current-page={ page == "asset" ? "true": "false" }>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" viewBox="0 0 20 20">
                            <g><path d="M16,3H4L2,8l8,9l8-9L16,3z M8.21,7.25L9.59,4.5h0.82l1.38,2.75H8.21z M9.25,8.75v5.15L4.67,8.75H9.25z M10.75,8.75h4.58 l-4.58,5.15V8.75z M16.08,7.25h-2.62L12.09,4.5h2.9L16.08,7.25z M5.02,4.5h2.9L6.54,7.25H3.92L5.02,4.5z"/></g>
                        </svg>
                    </a>
                </Tooltip>
                <div data-container="search-button-container">
                    <Tooltip theme={theme} label="Search" position="bottom"> 
                        <button on:click={() => toggleSearchBar(true)} data-search-button>
                            <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </Tooltip>
                </div>
                <Tooltip theme={theme} label="Activity" position="bottom">
                    <button on:pointerleave={() => enterActivityTabButton = false} on:pointerenter={() => enterActivityTabButton = true} data-notified={notified} on:click={() => setTab("activity")}>
                        {#if notified && !enterActivityTabButton }
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                            </svg>
                        {/if}
                    </button>
                </Tooltip>
                <Tooltip theme={theme} label="Account" position="bottom">
                    <button on:click={() => setTab("account")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </button>
                </Tooltip>
            </div>
            <div bind:this={searchBarContainer} data-container="search-bar-container">
                <SearchBar 
                    width={100} 
                    unit="%" 
                    theme={theme} 
                    on:onResize={searchBarResize} 
                    on:onClick={searchBarOnFocusInOrClick}
                    on:onFocusIn={searchBarOnFocusInOrClick} 
                    on:onFocusOut={() => isSearchBarFocused = false} 
                    on:onInput={searchBarOnInput} 
                    on:onBackBtnClicked={() => toggleSearchBar(false)}/>
            </div>
        </div>
    </main>
    <section data-container="count-container">
        <Tooltip theme={theme} label={ countType == "coin" ? (coinCount > 1 ? "Coins" : "Coin") : (assetCount > 1 ? "Assets" : "Asset") } position="bottom">
            <p>
                <img src={ countType == "coin" ? "/coin.png" : "/crystal.png" } alt="">
                <span>{formatNumber( countType == "coin" ? coinCount : assetCount)}</span>
            </p>
        </Tooltip>
    </section>
    <SearchBarDropdownMenu 
        {...searchBarDropDownMenuControl}
        on:onClickOutside={searchBarDropdownMenuOnClickOutside} 
        on:onSearchResultClicked={(e) => dispatcher("onSearchResultClicked", e.detail)}/>
    
</nav>
<style lang="less">
    @keyframes nav-slide-down-anim {
        from {
            transform: translateY(-154px);
        }
        to {
            transform: translateY(0);
        }
    }
    @keyframes nav-slide-up-anim {
        to {
            transform: translateY(-154px);
        }
        from {
            transform: translateY(0);
        }
    }
    :global(.nav-slide-down) {
        visibility: visible;
        transform: translateY(0);
        animation-name: nav-slide-down-anim;
        animation-play-state: running
    }
    :global(.nav-slide-up) {
        visibility: visible;
        transform: translateY(-154px);
        animation-name: nav-slide-up-anim;
        animation-play-state: running
    }
    nav {
        width: 100%;
        padding: 0 0 0 0;
        height: fit-content;
        position: fixed;
        animation-duration: 350ms;
        animation-timing-function: ease-out;
        top: 0;
        section[data-container="count-container"] {
            width: 100%;
            display: flex;
            justify-content: center;
            p {
                width: 130px;
                margin: 0 0 0 0;
                padding-block: 7.8px;
                padding-inline: 10px;
                padding-bottom: 11px;
                color: #030303;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                background-color: #f5f5f5;
                font-family: Arial, Helvetica, sans-serif;
                border-style: solid;
                border-width: 0;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                border-inline-width: 1px;
                border-inline-color: rgb(0 0 0 / 15%);
                box-shadow: 0 1px 0 rgb(0 0 0 / 15%);
                span {
                    margin: 0 0 0 0;
                    padding: 0 0 0 0;
                }
                img {
                    height: 30px;
                    width: 30px;
                    margin-right: 4px;
                    margin-top: -4.5px;
                }
            }
        }
        main {
            height: 57.75px;
            width: 100%;
            background-color: #f5f5f5;
            border-style: solid;
            border-width: 0;
            box-shadow: 0 1px 0 rgb(0 0 0 / 15%);
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-family: Arial, Helvetica, sans-serif;
            padding: 0 0 0 0;
            div[data-container="main-container"] {
                --inner-nav-bar-width: 400px;
                --button-size: 70px;
                height: 100%;
                display: flex;
                padding-inline: 15px;
                justify-content: space-between;
                align-items: center;
                width: calc(var(--inner-nav-bar-width) - 30px);
                div[data-container="search-bar-container"] {
                    height: fit-content;
                    width: 290px;
                    padding: 0 0 0 0;
                }
                div[data-container="button-container"] {
                    display: flex;
                    justify-content: space-between;
                    height: 38px;
                    width: calc(var(--button-size) * 4);
                    align-items: center;
                    div[data-container="search-button-container"] {
                        display: none;
                    }
                    a,
                    button {
                        cursor: pointer;
                        padding: 0 0 0 0;
                        height: 100%;
                        display: flex;
                        width: --button-size;
                        justify-content: center;
                        align-items: center;
                        font-size: 17.75px;
                        color: rgb(145, 145, 145);
                        background-color: transparent;
                        border: none;
                        &:hover {
                            color: #030303;
                            svg {
                                fill: #030303;
                            }
                        }
                        &:focus,
                        &:link {
                            outline: none;
                        }
                        svg {
                            fill: rgb(135, 135, 135);
                            width: 26.85px;
                            height: 26.85px;
                        }
                    }
                    a {
                        &[data-current-page="true"] {
                            color: #030303;
                            svg {
                                fill: #030303;
                            }
                        }
                        
                    }

                    button {
                        &[data-notified="true"] {
                            color: #06d6a0;
                            svg {
                                fill: #06d6a0;
                            }
                        }
                        &[data-notified="true"]:hover {
                            color: #030303;
                            svg {
                                fill: #030303;
                            }
                        }
                    }
                }
                
                @media screen and (min-width: 280px) {
                    --inner-nav-bar-width: 100%;
                }
                @media screen and (min-width: 320px) {
                    --inner-nav-bar-width: 100%;
                }
                @media screen and (max-width: 599px) {
                    div[data-container="search-bar-container"] {
                        display: none;
                        width: 100%;
                    }
                    
                    div[data-container="button-container"] {
                        width: 100%;
                        --button-size: calc(100%/5);
                        div[data-container="search-button-container"] {
                            display: block;
                        }
                        a,
                        button{
                            svg {
                                width: 26px;
                                height: 26px;
                            }
                        }
                    }
                }
                @media screen and (min-width: 600px) {
                    --inner-nav-bar-width: 650px;
                    --button-size: 65px;
                }
                @media screen and (min-width: 912px) {
                    --inner-nav-bar-width: 820px;
                    --button-size: 75px;
                }
                @media screen and (min-width: 1024px) {
                    --inner-nav-bar-width: 860px;
                    --button-size: 78px;
                }
                @media screen and (min-width: 1280px) {
                    --inner-nav-bar-width: 1020px;
                    --button-size: 84px;
                }
            }
        }
        &[data-theme="dark"] {
            section[data-container="count-container"] {
                margin-top: -0.5px;
                p {
                    background-color: #212121;
                    border-style: solid;
                    border-width: 1px;
                    border-color: rgb(64, 64, 64);
                    border-top: none;
                    color: rgb(248, 246, 246);
                }
            }
            main {
                background-color: #212121;
                border: none;
                box-shadow: none;
                border-bottom-style: solid;
                border-bottom-width: 1px;
                border-bottom-color: rgb(64, 64, 64);
                div[data-container="main-container"] {
                    div[data-container="button-container"] {
                        a,
                        button {
                            color: rgb(113, 111, 111);
                            svg {
                                fill: rgb(105, 105, 105);
                            }
                            &:hover {
                                color: rgb(248, 246, 246);
                                svg {
                                    fill: rgb(238, 236, 236);
                                }
                            }
                        }
                        a {
                            &[data-current-page="true"] {
                                color: rgb(248, 246, 246);
                                svg {
                                    fill: rgb(238, 236, 236);
                                }
                            }
                        }
                        button {
                            &[data-notified="true"]  {
                                color: #06d6a0;
                                svg {
                                    fill: #06d6a0;
                                }
                            }

                            &[data-notified]:hover {
                                color: rgb(248, 246, 246);
                                svg {
                                    fill: rgb(238, 236, 236);
                                }
                            }
                        }
                    }
                }
            }
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                section[data-container="count-container"] {
                    margin-top: -0.5px;
                    p {
                        background-color: #212121;
                        border-style: solid;
                        border-width: 1px;
                        border-color: rgb(64, 64, 64);
                        border-top: none;
                        color: rgb(248, 246, 246);
                    }
                }
                main {
                    background-color: #212121;
                    border: none;
                    box-shadow: none;
                    border-bottom-style: solid;
                    border-bottom-width: 1px;
                    border-bottom-color: rgb(64, 64, 64);
                    div[data-container="main-container"] {
                        div[data-container="button-container"] {
                            a,
                            button {
                                color: rgb(113, 111, 111);
                                svg {
                                    fill: rgb(105, 105, 105);
                                }
                                &:hover {
                                    color: rgb(248, 246, 246);
                                    svg {
                                        fill: rgb(238, 236, 236);
                                    }
                                }
                            }
                            a {
                                &[data-current-page="true"] {
                                    color: rgb(248, 246, 246);
                                    svg {
                                        fill: rgb(238, 236, 236);
                                    }
                                }
                            }
                            button {
                                &[data-notified="true"]  {
                                    color: #06d6a0;
                                    svg {
                                        fill: #06d6a0;
                                    }
                                }

                                &[data-notified]:hover {
                                    color: rgb(248, 246, 246);
                                    svg {
                                        fill: rgb(238, 236, 236);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
</style>