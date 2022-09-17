<script lang="ts">
    import { createEventDispatcher } from "svelte"

    type TabType = "home"|"search"|"assets"|"activity"|"account"

    export let theme:"light"|"dark" = "light"
    export let tab:TabType = "home"
    export let notified:boolean = false

    const dispatcher = createEventDispatcher()

    let enterActivityTab = false

    $:{
        if (tab == "activity") 
            notified = false
    }

    const setTab = (tabToSet:TabType) => {
        tab = tabToSet
        if (tabToSet == "activity") notified = false
        dispatcher("onTabSelected", { tab })
    }
</script>
<nav data-theme={theme}>
    <div data-container="tab-container">
        <button data-current-tab={ tab == "home" ? "true": "false" } on:click={() => setTab("home")}> 
            <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
            <span>
                Home
            </span> 
        </button>
        <button data-current-tab={ tab == "search" ? "true": "false" } on:click={() => setTab("search")}>
            <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
            <span>
                Search
            </span>
        </button>
        <button data-current-tab={ tab == "assets" ? "true": "false" } on:click={() => setTab("assets")}>
            <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
            <span>
                Assets
            </span>
        </button>
        <button on:pointerleave={() => enterActivityTab = false} on:pointerenter={() => enterActivityTab = true} data-notified={notified} data-current-tab={ tab == "activity" ? "true": "false" } on:click={() => setTab("activity")}>
            {#if notified && !enterActivityTab }
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                </svg>
            {/if}
            <span>
                Activity
            </span>
        </button>
        <button data-current-tab={ tab == "account" ? "true": "false" } on:click={() => setTab("account")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            <span>
                Account
            </span>
        </button>
    </div>
</nav>
<style lang="less">
    nav {
        height: 60px;
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
        &[data-theme="dark"] {
            background-color: #212121;
            border: none;
            box-shadow: none;
            div[data-container="tab-container"] button {
                color: rgb(113, 111, 111);
                svg {
                    stroke: rgb(105, 105, 105);
                    fill: rgb(105, 105, 105);
                }
                &:hover, 
                &[data-current-tab="true"],
                &[data-notified]:hover {
                    color: rgb(248, 246, 246);
                    svg {
                        fill: rgb(238, 236, 236);
                        stroke: rgb(238, 236, 236);
                    }
                }
            }
        }
        div[data-container="tab-container"] {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 400px;
            button {
                cursor: pointer;
                padding: 0 0 0 0;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 17.75px;
                color: rgb(145, 145, 145);
                background-color: transparent;
                border: none;
                &:hover, 
                &[data-current-tab="true"],
                &[data-notified]:hover {
                    color: #212121;
                    svg {
                        fill: #212121;
                        stroke: #212121;
                    }
                }
                &[data-notified="true"] {
                    color: #06d6a0;
                    svg {
                        fill: #06d6a0;
                        stroke: #06d6a0;
                    }
                }
                &:focus {
                    outline: none;
                }
                span {
                    margin-top: 5px;
                }
                svg {
                    stroke: rgb(135, 135, 135);
                    fill: rgb(135, 135, 135);
                    width: 24px;
                    height: 24px;
                    margin-right: 4px;
                    
                }
                &[data-notified] {
                    svg {
                        width: 27px;
                        height: 27px;
                        margin-right: 2px;
                    }
                }
            }
            @media screen and (min-width: 280px) {
                width: 100%;
                button {
                    width: calc(100%/5);
                }
            }
            @media screen and (min-width: 320px) {
                width: 100%;
                button {
                    width: calc(100%/5);
                }
            }
            @media screen and (max-width: 600px) {
                button {
                    span {
                        display: none;
                    }
                    svg {
                        width: 28px;
                        height: 28px;
                        margin-right: 0;
                    }
                        &[data-notified] {
                        svg {
                            width: 31px;
                            height: 31px;
                        }
                    }
                }
            }
            @media screen and (min-width: 600px) {
                width: 650px;
                button {
                    width: calc(650px/5);
                }
            }
            @media screen and (min-width: 912px) {
                width: 720px;
                button {
                    width: calc(720px/5);
                }
            }
            @media screen and (min-width: 1024px) {
                width: 800px;
                button {
                    width: calc(800px/5);
                }
            }
            @media screen and (min-width: 1280px) {
                width: 860px;
                button {
                    width: calc(860px/5);
                }
            }
        }
    }
</style>