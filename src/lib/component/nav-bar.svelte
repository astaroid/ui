<script lang="ts">
    import { createEventDispatcher } from "svelte"

    type TabType = "home"|"search"|"assets"|"activity"|"profile"

    export let theme:"light"|"dark" = "light"
    export let tab:TabType = "home"
    export let notified:boolean = false

    const dispatcher = createEventDispatcher()

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
        <button data-notified={notified} data-current-tab={ tab == "activity" ? "true": "false" } on:click={() => setTab("activity")}>
            <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.60124 1.25086C8.60124 1.75459 8.26278 2.17927 7.80087 2.30989C10.1459 2.4647 12 4.41582 12 6.79999V10.25C12 11.0563 12.0329 11.7074 12.7236 12.0528C12.931 12.1565 13.0399 12.3892 12.9866 12.6149C12.9333 12.8406 12.7319 13 12.5 13H8.16144C8.36904 13.1832 8.49997 13.4513 8.49997 13.75C8.49997 14.3023 8.05226 14.75 7.49997 14.75C6.94769 14.75 6.49997 14.3023 6.49997 13.75C6.49997 13.4513 6.63091 13.1832 6.83851 13H2.49999C2.2681 13 2.06664 12.8406 2.01336 12.6149C1.96009 12.3892 2.06897 12.1565 2.27638 12.0528C2.96708 11.7074 2.99999 11.0563 2.99999 10.25V6.79999C2.99999 4.41537 4.85481 2.46396 7.20042 2.3098C6.73867 2.17908 6.40036 1.75448 6.40036 1.25086C6.40036 0.643104 6.89304 0.150421 7.5008 0.150421C8.10855 0.150421 8.60124 0.643104 8.60124 1.25086ZM7.49999 3.29999C5.56699 3.29999 3.99999 4.86699 3.99999 6.79999V10.25L4.00002 10.3009C4.0005 10.7463 4.00121 11.4084 3.69929 12H11.3007C10.9988 11.4084 10.9995 10.7463 11 10.3009L11 10.25V6.79999C11 4.86699 9.43299 3.29999 7.49999 3.29999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
            <span>
                Activity
            </span>
        </button>
        <button data-current-tab={ tab == "profile" ? "true": "false" } on:click={() => setTab("profile")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            <span>
                Profile
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