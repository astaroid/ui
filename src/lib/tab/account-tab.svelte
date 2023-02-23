<script lang="ts">
    import LoadingSpinner from "../component/loading-spinner.svelte"
    import { clickoutside } from '@svelteuidev/composables'
    import Tooltip from "../component/tooltip.svelte"
    import { createEventDispatcher, onMount } from "svelte"
    import Menu from "../component/menu.svelte"
    import UserCard from "../component/user-card.svelte"
    import AccountSection from "../component/account-section.svelte"

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

    interface MenuItemType {
        id: string
        type: "item"|"label"|"divider"
        text?: string
        disabled?: boolean
        "icon data"?: string
        color?: string
    }

    interface User {
        email: string
        username: string
        profileImage: string
        coin: number
        assetCount: number
        password: string
        verified: boolean
    }

    interface AccountSectionInputEvent {
        id: string 
        type: "button"|"select"|"switch"|"checkbox"
        value: boolean|string|null 
    }

    interface AccountPayoutOption { 
        coin:number, 
        cash:number 
    }

    export let theme:"system"|"light"|"dark" = "system"
    export let show:boolean = true
    export let loading:boolean = false
    export let user:User = null
    export let payoutOptions:Array<AccountPayoutOption> = []
    export let position:"absolute"|"fixed" = "absolute"
    
    const dispatcher = createEventDispatcher()

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

    const close = () => show = false

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

    const menuItemsList = ():Array<MenuItemType> => {
        let list:Array<MenuItemType> = [
            {
                id: "profile-btn",
                type: "item",
                text: "Profile",
                "icon data": `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${menuItemIconTheme == "light" ? "#303030" : "#c1c2bd"}"" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>`
            },
            {
                id: "purchase-btn",
                type: "item",
                text: "Purchase",
                "icon data": `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${menuItemIconTheme == "light" ? "#303030" : "#c1c2bd"}"" viewBox="0 0 48 48">
                    <path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V15q0-1.2.9-2.1.9-.9 2.1-.9h5.5v-.5q0-3.15 2.175-5.325Q20.85 4 24 4q3.15 0 5.325 2.175Q31.5 8.35 31.5 11.5v.5H37q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h26V15h-5.5v4.5q0 .65-.425 1.075Q30.65 21 30 21q-.65 0-1.075-.425-.425-.425-.425-1.075V15h-9v4.5q0 .65-.425 1.075Q18.65 21 18 21q-.65 0-1.075-.425-.425-.425-.425-1.075V15H11v26Zm8.5-29h9v-.5q0-1.9-1.3-3.2Q25.9 7 24 7q-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2ZM11 41V15v26Z"/>
                </svg>`
            },
            {
                id: "payout-btn",
                type: "item",
                text: "Payout",
                "icon data": `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${menuItemIconTheme == "light" ? "#303030" : "#c1c2bd"}"" viewBox="0 0 48 48">
                    <path d="M27 27q-2.5 0-4.25-1.75T21 21q0-2.5 1.75-4.25T27 15q2.5 0 4.25 1.75T33 21q0 2.5-1.75 4.25T27 27Zm-16 7q-1.25 0-2.125-.875T8 31V11q0-1.25.875-2.125T11 8h32q1.25 0 2.125.875T46 11v20q0 1.25-.875 2.125T43 34Zm5-3h22q0-2.1 1.45-3.55Q40.9 26 43 26V16q-2.1 0-3.55-1.45Q38 13.1 38 11H16q0 2.1-1.45 3.55Q13.1 16 11 16v10q2.1 0 3.55 1.45Q16 28.9 16 31Zm24 9H5q-1.25 0-2.125-.875T2 37V14h3v23h35Zm-29-9V11v20Z"/>
                </svg>`
            },
            {
                id: "settings-btn",
                type: "item",
                text: "Settings",
                "icon data": `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${menuItemIconTheme == "light" ? "#303030" : "#c1c2bd"}"" viewBox="0 0 48 48">
                    <path d="m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Zm0-3q-1.45 0-2.475-1.025Q20.5 25.45 20.5 24q0-1.45 1.025-2.475Q22.55 20.5 24 20.5q1.45 0 2.475 1.025Q27.5 22.55 27.5 24q0 1.45-1.025 2.475Q25.45 27.5 24 27.5Zm0-3.5Zm-2.2 17h4.4l.7-5.6q1.65-.4 3.125-1.25T32.7 32.1l5.3 2.3 2-3.6-4.7-3.45q.2-.85.325-1.675.125-.825.125-1.675 0-.85-.1-1.675-.1-.825-.35-1.675L40 17.2l-2-3.6-5.3 2.3q-1.15-1.3-2.6-2.175-1.45-.875-3.2-1.125L26.2 7h-4.4l-.7 5.6q-1.7.35-3.175 1.2-1.475.85-2.625 2.1L10 13.6l-2 3.6 4.7 3.45q-.2.85-.325 1.675-.125.825-.125 1.675 0 .85.125 1.675.125.825.325 1.675L8 30.8l2 3.6 5.3-2.3q1.2 1.2 2.675 2.05Q19.45 35 21.1 35.4Z"/>
                </svg>`
            },
            {
                id: "danger-zone-btn",
                type: "item",
                text: "Danger Zone",
                "icon data": `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: #f03e3e" viewBox="0 0 48 48">
                    <path d="M16.5 42 6 31.5v-15L16.5 6h15L42 16.5v15L31.5 42Zm1.25-3h12.5L39 30.25v-12.5L30.25 9h-12.5L9 17.75v12.5Zm.1-6.75L24 26.1l6.15 6.15 2.1-2.1L26.1 24l6.15-6.15-2.1-2.1L24 21.9l-6.15-6.15-2.1 2.1L21.9 24l-6.15 6.15ZM24 24Z"/>
                </svg>`,
                color: "#f03e3e"
            },
            {
                id: "divider-1",
                type: "divider",
            },
            {
                id: "close-btn",
                type: "item",
                text: "Close Account Tab",
                color: "#f03e3e"
            }
        ]
        if (!user.verified) 
            list = [
                list.at(0), 
                {
                    id: "verification-btn",
                    type: "item",
                    text: "Verification",
                    "icon data": `<svg xmlns="http://www.w3.org/2000/svg" style="width: 18.5px; height: 18.5px; fill: ${menuItemIconTheme == "light" ? "#303030" : "#c1c2bd"}"" viewBox="0 0 48 48">
                        <path d="m21.8 30.65 11.4-11.4-2.1-2.05-9.15 9.15-5.05-5.05-2.2 2.2Zm2.2 13.3q-7-1.75-11.5-8.125T8 21.85V9.95l16-6 16 6v11.9q0 7.6-4.5 13.975T24 43.95Zm0-3.1q5.75-1.9 9.375-7.175T37 21.85v-9.8l-13-4.9-13 4.9v9.8q0 6.55 3.625 11.825Q18.25 38.95 24 40.85ZM24 24Z"/>
                    </svg>`
                },
                ...list.slice(1)
            ]
        return list
    }

    const menuItemClicked = (e:CustomEvent<{ id:string }>) => {
        let id = e.detail.id
        reactiveTrigger = !reactiveTrigger
        if (id == "profile-btn" && tabContainer) {
            let profileAccountSection:HTMLElement = tabContainer.querySelector("div[data-container='body'] div[data-container='profile-section']")
            profileAccountSection && profileAccountSection.scrollIntoView()
        } else if (id == "verification-btn" && tabContainer) {
            let verificationAccountSection:HTMLElement = tabContainer.querySelector("div[data-container='body'] div[data-container='verification-section']")
            verificationAccountSection && verificationAccountSection.scrollIntoView()
        } else if (id == "purchase-btn" && tabContainer) {
            let purchaseAccountSection:HTMLElement = tabContainer.querySelector("div[data-container='body'] div[data-container='purchase-section']")
            purchaseAccountSection && purchaseAccountSection.scrollIntoView()
        } else if (id == "payout-btn" && tabContainer) {
            let payoutAccountSection:HTMLElement = tabContainer.querySelector("div[data-container='body'] div[data-container='payout-section']")
            payoutAccountSection && payoutAccountSection.scrollIntoView()
        } else if (id == "settings-btn" && tabContainer) {
            let settingsAccountSection:HTMLElement = tabContainer.querySelector("div[data-container='body'] div[data-container='settings-section']")
            settingsAccountSection && settingsAccountSection.scrollIntoView()
        } else if (id == "danger-zone-btn" && tabContainer) {
            let dangerZoneAccountSection:HTMLElement = tabContainer.querySelector("div[data-container='body'] div[data-container='danger-zone-section']")
            dangerZoneAccountSection && dangerZoneAccountSection.scrollIntoView()
        } else if (id == "close-btn") {
            close()
        }
    }

    const onInput = (ev:CustomEvent<AccountSectionInputEvent>) => {
        let { id, value } = ev.detail
        if (id == "coin-purchase-button") {
            dispatcher("onRequestCoinPurchase")
        } else if (id == "crystal-purchase-button") {
            dispatcher("onRequestCrystalPurchase")
        } else if (id == "email-verification-button") {
            dispatcher("onRequestEmailVerification")
        } else if (id == "profile-image-change-button") {
            dispatcher("onRequestProfileImageChange")
        } else if (id == "username-change-button") {
            dispatcher("onRequestUsernameChange")
        } else if (id == "email-change-button") {
            dispatcher("onRequestEmailChange")
        } else if (id == "password-change-button") {
            dispatcher("onRequestPasswordChange")
        } else if (id == "theme-change-button") {
            dispatcher("onRequestThemeChange", { theme: value.toString().toLowerCase() })
        } else if (id == "logout-button") {
            dispatcher("onRequestLoggingOut")
        } else if (id == "delete-account-button") {
            dispatcher("onRequestDeletingAccount")
        }
    }

    const onPayout = (ev:CustomEvent<AccountSectionInputEvent>) => {
        let id = ev.detail.id
        let [ _, cash, coin ] = /payout-\$(\d+)-c(\d+)/.exec(id)
        dispatcher("onRequestPayout", { cash: parseFloat(cash), coin: parseFloat(coin) })
    }

    let reactiveTrigger = false
    let sectionWidth = 350
    let menuXPosition = sectionWidth - 192
    let menuYPosition = 43
    let showMenu = false
    let isMenuButtonClicked = false
    let tabContainer:HTMLElement = null
    let mainElement:HTMLElement = null
    let blurryBackground:HTMLElement = null
    let menuItemIconTheme:string = theme
    let menuItems:Array<MenuItemType> = menuItemsList()
    let payoutSectionItems:Array<AccountSectionItem> = payoutOptions.map((value) => ({
        id: `payout-$${value.cash}-c${value.coin}`,
        title: `$${formatNumber(value.cash)} payout`,
        description: `Withdraw $${formatNumber(value.cash)} with ${formatNumber(value.coin)} coins`,
        type: "button",
        label: "Withdraw",
        color: "#06d6a0"
    }))
    
    $: if (reactiveTrigger || !reactiveTrigger) {
        menuXPosition = sectionWidth - 192
    }

    $: if (show && mainElement && blurryBackground) {
        mainElement.style.display = "flex"
        mainElement.classList.remove("tab-hide-anim")
        mainElement.classList.add("tab-show-anim")
        blurryBackground.classList.add("start-blur")
        blurryBackground.classList.remove("clear-blur")
    }

    $: if (!show && mainElement && blurryBackground) {
        mainElement.classList.add("tab-hide-anim")
        mainElement.classList.remove("tab-show-anim")
        blurryBackground.classList.remove("start-blur")
        blurryBackground.classList.add("clear-blur")
    }

    onMount(() => {
        if (theme == "system") {
            menuItemIconTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
            menuItems = menuItemsList()
        }
        if (show) {
            mainElement.style.display = "flex"
            mainElement.classList.remove("tab-hide-anim")
            mainElement.classList.add("tab-show-anim")
            blurryBackground.classList.add("start-blur")
            blurryBackground.classList.remove("clear-blur")
        }
        tabContainer.addEventListener("animationend", (e) => {
            if (e.animationName.includes("slide-out")) {
                mainElement.classList.remove("tab-hide-anim")
                blurryBackground.classList.remove("start-blur")
                mainElement.style.display = "none"
                dispatcher("onClosed")
            } else if (e.animationName.includes("slide-in")) {
                mainElement.classList.remove("tab-show-anim")
                blurryBackground.classList.remove("clear-blur")
                dispatcher("onOpened")
            }
        })
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (e) => {
            if (theme == "system") {
                menuItemIconTheme = e.matches ? "dark" : "light"
                menuItems = menuItemsList()
            }
        })
    })
</script>
<main style="position: {position}" bind:this={mainElement} data-theme={theme}>
    <section bind:this={blurryBackground} data-container="blurry-background" on:click={close}></section>
    <section bind:this={tabContainer} data-container="tab-container" bind:clientWidth={sectionWidth}> 
        <Menu 
            theme={theme}
            x={menuXPosition}
            y={menuYPosition}
            on:onClickedOutside={clickedOutsideMenu}
            menuItems={menuItems}
            on:onMenuItemClicked={menuItemClicked}
            placement="start"
            bind:show={showMenu}
            position="absolute"/>
        <nav>
            <Tooltip theme={theme} label="Close">
                <button on:click={close}>
                    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </Tooltip>
            <span>Account</span>
            <Tooltip theme={theme} label="More">
                <button use:clickoutside={{ enabled: true, callback: () => isMenuButtonClicked = false }} on:click={toggleMenu}>
                    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </Tooltip>
        </nav>
        <div data-container="body">
            {#if !loading }
                <div data-container="profile-section">
                    <UserCard 
                        theme={theme}
                        email={user.email}
                        username={user.username}
                        coin={user.coin}
                        assetCount={user.assetCount}
                        verified={user.verified}/>
                </div>
                <div class="account-section" data-container="verification-section" style="display: { !user.verified ? "block" : "none" };">
                    <AccountSection 
                        theme={theme}
                        title="Verification"
                        width={100}
                        unit="%"
                        on:onInput={onInput}
                        sectionItems={[
                            {
                                id: "email-verification-button",
                                title: "Email verification",
                                description: "Your email not is verified",
                                type: "button",
                                label: "Verify",
                                color: "#06d6a0"
                            }
                        ]}/>
                </div>
                <div class="account-section" data-container="purchase-section">
                    <AccountSection 
                        theme={theme}
                        title="Purchase"
                        width={100}
                        unit="%"
                        on:onInput={onInput}
                        sectionItems={[
                            {
                                id: "coin-purchase-button",
                                title: "Get coins",
                                description: "Watch ADs to get coins",
                                type: "button",
                                label: "Watch",
                                color: "#06d6a0"
                            },
                            {
                                id: "crystal-purchase-button",
                                title: "Buy crystals",
                                description: "Buy crystals with coins",
                                type: "button",
                                label: "Buy",
                                color: "#06d6a0"
                            }
                        ]}/>
                </div>
                <div class="account-section" data-container="payout-section">
                    <AccountSection 
                        theme={theme}
                        title="Payout"
                        width={100}
                        unit="%"
                        on:onInput={onPayout}
                        sectionItems={payoutSectionItems}/>
                </div>
                <div class="account-section" data-container="settings-section">
                    <AccountSection 
                        theme={theme}
                        title="Settings"
                        width={100}
                        unit="%"
                        on:onInput={onInput}
                        sectionItems={[
                            {
                                id: "profile-image-change-button",
                                type: "button",
                                title: "Profile image",
                                description: "Change profile image",
                                label: "Change",
                                color: "#06d6a0"
                            },
                            {
                                id: "username-change-button",
                                type: "button",
                                title: "Username",
                                description: "Change username",
                                label: "Change",
                                color: "#06d6a0"
                            },
                            {
                                id: "email-change-button",
                                type: "button",
                                title: "Email",
                                description: "Change email",
                                label: "Change",
                                color: "#06d6a0"
                            },
                            {
                                id: "password-change-button",
                                type: "button",
                                title: "Password",
                                description: "Change password",
                                label: "Change",
                                color: "#06d6a0"
                            },
                            {
                                id: "theme-change-button",
                                type: "select",
                                title: "Theme",
                                description: "Change theme",
                                value: theme,
                                options: [ "Light", "Dark", "System" ]
                            }
                        ]}/>
                </div>
                <div class="account-section" data-container="danger-zone-section">
                    <AccountSection 
                        theme={theme}
                        title="Danger Zone"
                        width={100}
                        unit="%"
                        color="#f03e3e"
                        on:onInput={onInput}
                        sectionItems={[
                            {
                                id: "logout-button",
                                title: "Logout",
                                description: "All your session data will be removed",
                                type: "button",
                                label: "Logout",
                                color: "#06d6a0"
                            },
                            {
                                id: "delete-account-button",
                                title: "Delete account",
                                description: "All coins and assets will be transfer to the superuser",
                                type: "button",
                                label: "Delete",
                                color: "#f03e3e"
                            }
                        ]}/>
                </div>
            {:else}
                <div data-container="center">
                    <LoadingSpinner size={90} />
                </div>
            {/if}
        </div>
    </section>
</main>
<style lang="less">
    @keyframes slide-in {
        from {
           right: -380px;
        }
        to {
            right: 0;
        }
    }
    @keyframes slide-out {
        to {
           right: -380px;
        }
        from {
            right: 0;
        }
    }
    @keyframes blur-anim {
        from {
            background: transparent;
            backdrop-filter: none;
        }
        to {
            background: rgba(40,40,40,0.5);
            backdrop-filter: blur(1.35px);
        }
    } 
    @keyframes clear-blur-anim {
        from {
            background: rgba(40,40,40,0.5);
            backdrop-filter: blur(1.35px);
        }
        to {
            background: transparent;
            backdrop-filter: none;
        }
    } 
    @keyframes dark-mode-blur-anim {
        from {
            background: transparent;
            backdrop-filter: none;
        }
        to {
            background: rgba(215,215,215,0.5);
            backdrop-filter: blur(1.5px);
        }
    }
    @keyframes dark-mode-clear-blur-anim {
        from {
            background: rgba(215,215,215,0.5);
            backdrop-filter: blur(1.5px);
        }
        to {
            background: transparent;
            backdrop-filter: none;
        }
    }
    main {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 8;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: none;
        :global(&.tab-hide-anim) {
            z-index: 7;
            animation-duration: 245ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-play-state: running;
            section[data-container="tab-container"] {
                animation-name: slide-out;
                right: -380px;
            }
        }
        :global(&.tab-show-anim) {
            z-index: 8;
            animation-duration: 245ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-play-state: running;
            section[data-container="tab-container"] {
                animation-name: slide-in;
                right: 0;
            }
        }
        section[data-container="blurry-background"] {
            width: 100%;
            height: 100%;
            animation-duration: inherit;
            animation-direction: inherit;
            animation-iteration-count: inherit;
            animation-play-state: inherit;
            :global(&.start-blur) {
                background-color: rgba(40,40,40,0.5);
                animation-name: blur-anim;
                backdrop-filter: blur(1.35px);
            }
            :global(&.clear-blur) {
                background: transparent;
                animation-name: clear-blur-anim;
                backdrop-filter: none;
            }
        }
        section[data-container="tab-container"] {
            position: absolute;
            margin: 0 0 0 0;
            padding: 0 0 0 0;
            height: calc(100% - 2px);
            z-index: 3;
            right: 0;
            width: 380px;
            flex-direction: column;
            font-family: Arial, Helvetica, sans-serif;
            border-style: solid;
            border-width: 1px;
            border-color: #e6e4e4;
            animation-duration: inherit;
            animation-direction: inherit;
            animation-iteration-count: inherit;
            animation-play-state: inherit;
            background-color: #fefeff;
            nav {
                font-weight: bold;
                color: #303030;
                border: none;
                border-bottom-style: solid;
                border-width: 1px;
                width: calc(100% - 24px);
                height: 40px;
                padding: 12px;
                padding-top: 5px;
                padding-bottom: 5px;
                font-size: 20px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                background-color: #fafafa;
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
            div[data-container="body"] {
                width: 100%;
                margin: 0 0 0 0;
                padding: 0 0 0 0;
                padding-block: 10px;
                padding-bottom: 20px;
                overflow-y: auto;
                overflow-x: hidden;
                scrollbar-gutter: stable both-edge;
                height: calc(100% - 50px);
                scroll-behavior: smooth;
                &::-webkit-scrollbar {
                    width: 11.25px;
                    background-color: #f7f7f7;
                    border-style: solid;
                    border-width: 1px;
                    border-color: #dadada;
                    border-block-width: 0px;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: #d7d7d7b3;
                }
                div.account-section {
                    width: calc(100% - 26px);
                    padding-inline: 13px;
                    margin-top: 15px;
                    &:nth-last-child(1) {
                        margin-bottom: 35px;
                    }
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
            @media screen and (min-width: 280px) {
                width: 99.4%;
            }
            @media screen and (min-width: 320px) {
                width: 99.4%;
            }
            @media screen and (min-width: 600px) {
                width: 380px;
            }
        }
        &[data-theme="dark"] {
            section[data-container="blurry-background"] {
                :global(&.start-blur) {
                    animation-name: dark-mode-blur-anim;
                    background: rgba(215,215,215,0.5);
                    backdrop-filter: blur(1.5px);
                }
                :global(&.clear-blur) {
                    background: transparent;
                    animation-name: dark-mode-clear-blur-anim;
                    backdrop-filter: none;
                }
            }
            section[data-container="tab-container"] {
                background-color: #1e1e1e;
                border-style: solid;
                border-color: #4e4c4c;
                box-shadow: none;
                nav {
                    background-color: #161616;
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
                div[data-container="body"] {
                    div[data-container="center"] {
                        svg {
                            fill: rgb(83, 83, 83); 
                            stroke: rgb(83, 83, 83);   
                        }
                        span {
                            color: rgb(97, 97, 97);
                        }
                    }
                    &::-webkit-scrollbar {
                        background-color: rgb(50, 50, 50);
                        border-color: rgb(78, 78, 78);
                    }
                    &::-webkit-scrollbar-thumb {
                        background-color: rgb(86, 86, 86);
                    }
                }
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                section[data-container="blurry-background"] {
                    :global(&.start-blur) {
                        animation-name: dark-mode-blur-anim;
                        background: rgba(215,215,215,0.5);
                        backdrop-filter: blur(1.5px);
                    }
                    :global(&.clear-blur) {
                        background: transparent;
                        animation-name: dark-mode-clear-blur-anim;
                        backdrop-filter: none;
                    }
                }
                section[data-container="tab-container"] {
                    background-color: #1e1e1e;
                    border-style: solid;
                    border-color: #4e4c4c;
                    box-shadow: none;
                    nav {
                        background-color: #161616;
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
                    div[data-container="body"] {
                        div[data-container="center"] {
                            svg {
                                fill: rgb(83, 83, 83); 
                                stroke: rgb(83, 83, 83);   
                            }
                            span {
                                color: rgb(97, 97, 97);
                            }
                        }
                        &::-webkit-scrollbar {
                            background-color: rgb(50, 50, 50);
                            border-color: rgb(78, 78, 78);
                        }
                        &::-webkit-scrollbar-thumb {
                            background-color: rgb(86, 86, 86);
                        }
                    }
                }
            }
        }
    }
</style>