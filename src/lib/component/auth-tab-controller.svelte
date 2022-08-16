<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let tab:"sign up"|"sign in" = "sign in"
    export let theme:"light"|"dark" = "light"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"

    const dispatcher = createEventDispatcher()

    const setTab = (tabToSet:"sign up"|"sign in") => {
        tab = tabToSet
        dispatcher("onTabSelected", { tab })
    }
</script>

<nav style="width: {`${width}${unit}`}" data-theme={theme}>
    <button on:click={() => setTab("sign in")} data-current-tab={ tab == "sign in" ? "true": "false" } >Sign in</button>
    <button on:click={() => setTab("sign up")} data-current-tab={ tab == "sign up" ? "true": "false" } >Sign up</button>
</nav>

<style lang="less">
    nav {
        width: 100%;
        height: 60px;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        background-color: #f7f7f8;
        border-style: solid;
        border-width: 1px;
        border-color: #d6d6d6;
        box-shadow: 0px 1.25px 1px 0px #f5f5f5;
        display: flex;
        &[data-theme="dark"] {
            background-color: #1d1f20;
            border-style: solid;
            border-color: #474849;
            border-width: 1px;
            box-shadow: none;
            button {
                color: white;
                &[data-current-tab="true"] {
                    border-color: white;
                }
            }
        }
        button {
            height: 100%;
            width: 50%;
            font-size: 18px;
            background-color: transparent;
            border-color: transparent;
            border-style: solid;
            border-width: 0px;
            border-bottom-width: 4px;
            font-weight: bold;
            color: #303030;
            &[data-current-tab="true"] {
                border-color: #303030;
            }
            &:focus {
                outline: none;
            }
        }
    }
</style>