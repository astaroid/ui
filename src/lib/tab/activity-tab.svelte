<script lang="ts">
    import LoadingSpinner from "../component/loading-spinner.svelte"
    import { clickoutside } from '@svelteuidev/composables'
    import { createEventDispatcher, onMount } from "svelte"
    import ActivityMessage from "../component/activity-message.svelte"
    import Menu from "../component/menu.svelte"

    type ActivtyMessageType = "SOLD_ASSET_MESSAGE"|
        "BOUGHT_CRYSTAL_MESSAGE"|
        "TRANSACTION_FEE_MESSAGE"|
        "PAYOUT_MESSAGE"

    interface ActivtyMessage {
        id: string
        read: boolean
        createdAt: string
        type: ActivtyMessageType
        message: string
    } 

    interface MenuItemType {
        id: string
        type: "item"|"label"|"divider"
        text?: string
        disabled?: boolean
        "icon data"?: string
        color?: string
    }

    export let theme:"light"|"dark" = "light"
    export let show:boolean = true
    export let loading:boolean = false
    export let showPayoutMessages = true
    export let showTransactionFeeMessages = true
    export let showSoldAssetMessages = true
    export let showBoughtCrystalMessages = true
    export let messages:Array<ActivtyMessage> = Array<ActivtyMessage>()
    
    const dispatcher = createEventDispatcher()

    const filterMessages = (messages:Array<ActivtyMessage>):Array<ActivtyMessage> => {
        messages = messages
        .filter(message => {
            if (!showBoughtCrystalMessages)
                return message.type != "BOUGHT_CRYSTAL_MESSAGE"
            else
                return message
        })
        .filter(message => {
            if (!showSoldAssetMessages)
                return message.type != "SOLD_ASSET_MESSAGE"
            else
                return message
        })
        .filter(message => {
            if (!showTransactionFeeMessages)
                return message.type != "TRANSACTION_FEE_MESSAGE"
            else
                return message
        })
        .filter(message => {
            if (!showPayoutMessages)
                return message.type != "PAYOUT_MESSAGE"
            else
                return message
        })
        return messages
    }

    const close = () => {
        dispatcher("onClosed")
        hasOpend = false
        show = false
    }

    const toggleMenu = () => {
        showMenu = !showMenu
        isMenuButtonClicked = true
    }

    const clickedOutsideMenu = () => {
        if (!isMenuButtonClicked)
            showMenu = false
        else 
            showMenu = true
    }

    const menuItemClicked = (e:CustomEvent<{ id:string }>) => {
        let id = e.detail.id
        if (id == "bought-crystal-message-btn")
            dispatcher(
                (showBoughtCrystalMessages ? "onHideMessages": "onShowMessages"), 
                { type: "bought-crystal-message" }
            )
        else if (id == "sold-asset-messages-btn")
            dispatcher(
                (showSoldAssetMessages ? "onHideMessages": "onShowMessages"), 
                { type: "sold-asset-messages" }
            )
        else if (id == "transaction-fee-messages-btn")
            dispatcher(
                (showTransactionFeeMessages ? "onHideMessages": "onShowMessages"), 
                { type: "transaction-fee-messages" }
            )
        else if (id == "payout-messages-btn")
            dispatcher(
                (showPayoutMessages ? "onHideMessages": "onShowMessages"), 
                { type: "payout-messages" }
            )
        else if (id == "close-btn") 
            show = false
    }

    const menuItems:Array<MenuItemType> = [
        {
            type: "item",
            id: "bought-crystal-message-btn",
            text: `${showBoughtCrystalMessages ? "Hide" : "Show"} all bought crystal messages`,
            "icon data": showBoughtCrystalMessages ? `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>` : `<svg style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>` 
        },
        {
            type: "item",
            id: "sold-asset-messages-btn",
            text: `${showSoldAssetMessages ? "Hide" : "Show"} all sold asset messages`,
            "icon data": showSoldAssetMessages ? `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>` : `<svg style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>` 
        },
        {
            type: "item",
            id: "transaction-fee-messages-btn",
            text: `${showTransactionFeeMessages ? "Hide" : "Show"} all transaction fee messages`,
            "icon data": showTransactionFeeMessages ? `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>` : `<svg style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>` 
        },
        {
            type: "item",
            id: "payout-messages-btn",
            text: `${showPayoutMessages ? "Hide" : "Show"} all payout messages`,
            "icon data": showPayoutMessages ? `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>` : `<svg style="width: 18.5px; height: 18.5px; fill: ${theme == "light" ? "#303030" : "#c1c2bd"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>` 
        },
        {
            id: "divider-1",
            type: "divider",
        },
        {
            id: "close-btn",
            type: "item",
            text: "Close activity tab",
            color: "#f03e3e",
            "icon data": `<svg xmlns="http://www.w3.org/2000/svg" style="fill: #f03e3e; width: 13.25px; height: 13.25px" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
            </svg>`
        }
    ]

    messages = [...filterMessages(messages)]

    let hasOpend = false
    let sectionWidth = 315
    let menuXPosition = sectionWidth - 192
    let menuYPosition = 43
    let showMenu = false
    let isMenuButtonClicked = false
    
    $: {
        menuXPosition = sectionWidth - 192
        if (!Array.isArray(messages))
            messages = Array<ActivtyMessage>()
        if (show && !hasOpend) {
            dispatcher("onOpened")
            hasOpend = true
        }
        
        messages = [...filterMessages(messages)]
    }
</script>
<section bind:clientWidth={sectionWidth}  use:clickoutside={{ enabled: show, callback: close }} style="display: { show ? "flex" : "none" }; animation-play-state: { show ? "running" : "paused" }" data-theme={theme}>
    <Menu 
        theme={theme}
        x={menuXPosition}
        y={menuYPosition}
        on:onClickedOutside={clickedOutsideMenu}
        placement="start"
        menuItems={menuItems}
        bind:show={showMenu}
        on:onMenuItemClicked={menuItemClicked}
        position="absolute"/>
    <nav>
        <span>Activity</span>
        <button use:clickoutside={{ enabled: true, callback: () => isMenuButtonClicked = false }} on:click={toggleMenu}>
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
        </button>
    </nav>
    <main>
        {#if !loading }
            {#if messages.length > 0 }
                {#each messages as message, index (message.id)}
                <ActivityMessage 
                    on:onClicked={(e) => dispatcher("onMessageClicked", { ...e.detail })}
                    theme={theme} 
                    unit="%"
                    width={100}
                    {...message}
                />
                {/each}
            {:else}
                <div data-container="center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>
                    <span>No activity</span>
                </div>
            {/if}
        {:else}
            <div data-container="center">
                <LoadingSpinner size={90} />
            </div>
        {/if}
    </main>
</section>
<style lang="less">
    @keyframes show-anim {
        from {
           right: -315px;
        }
        to {
            right: 0;
        }
    }
    section {
        position: fixed;
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        height: calc(100% - 2px);
        z-index: 3;
        right: 0;
        width: 315px;
        flex-direction: column;
        font-family: Arial, Helvetica, sans-serif;
        border-style: solid;
        border-width: 1px;
        border-color: #e6e4e4;
        animation-name: show-anim;
        animation-play-state: paused;
        animation-duration: 270ms;
        animation-direction: normal;
        animation-iteration-count: 1;
        box-shadow: 0px 1.25px 2.4px 1.75px #f5f5f5;
        background-color: rgb(253, 253, 253);
        nav {
            font-weight: bold;
            color: #303030;
            border: none;
            border-bottom-style: solid;
            border-width: 1px;
            width: calc(100%- 24px);
            height: 40px;
            padding: 12px;
            padding-top: 5px;
            padding-bottom: 5px;
            font-size: 21.75px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background-color: #f5f5f5;
            border-color: #e6e4e4;
            button {
                border: solid;
                border-radius: 5px;
                border-width: 0;
                cursor: pointer;
                height: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                svg {
                    fill: #303030;
                    stroke: #303030;
                    height: 18px;
                    width: 18px;
                }
                &:focus {
                    outline: none;
                }
                &:hover {
                    background-color: #e4e5e6;
                }
            }
        }
        main {
            width: 100%;
            margin: 0 0 0 0;
            padding: 0 0 0 0;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-gutter: stable both-edge;
            height: calc(100% - 50px);
            &::-webkit-scrollbar {
                width: 8px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(187, 187, 179, 0.5);
            }
            div[data-container="center"] {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                svg {
                    stroke: rgb(205, 205, 205);
                    fill: rgb(205, 205, 205);
                    height: 85px;
                    width: 85px;
                }
                span {
                    color: rgb(127, 127, 127);
                    margin-top: 15px;
                    font-size: 26.75px;
                    font-weight: 700;
                }
            }

        }
        &[data-theme="dark"] {
            background-color: #212121;
            border-style: solid;
            border-color: #4e4c4c;
            box-shadow: none;
            nav {
                background-color: rgb(16, 20, 25);
                border-color: #4e4c4c;
                color: rgb(253, 253, 253);
                button {
                    svg {
                        fill: rgb(253, 253, 253);
                        color: rgb(253, 253, 253);
                        stroke: rgb(253, 253, 253);
                    }
                    &:hover {
                        background-color: rgb(34, 39, 44);
                    }
                }
            }
            main {
                div[data-container="center"] {
                    svg {
                        fill: rgb(83, 83, 83); 
                        stroke: rgb(83, 83, 83);   
                    }
                    span {
                        color: rgb(97, 97, 97);
                    }
                }
                &::-webkit-scrollbar-thumb {
                    background-color: rgb(82, 82, 82);
                }
            }
            
        }
        @media screen and (min-width: 280px) {
            width: 84.25%;
        }
        @media screen and (min-width: 320px) {
            width: 80%;
        }
        @media screen and (min-width: 600px) {
            width: 315px;
        }
    }
</style>