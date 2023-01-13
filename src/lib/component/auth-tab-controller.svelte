<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let tab:"sign up"|"sign in" = "sign in"
    export let theme:"system"|"light"|"dark" = "system"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let disabled:"sign in"|"sign up"|"none" = "none"

    const dispatcher = createEventDispatcher()

    const setTab = (tabToSet:"sign up"|"sign in") => {
        tab = tabToSet
        dispatcher("onTabSelected", { tab })
    }
</script>

<nav style="width: {`${width}${unit}`}" data-theme={theme}>
    <button disabled={ disabled == "sign in" } on:click={() => setTab("sign in")} data-current-tab={ tab == "sign in" ? "true": "false" } >Sign in</button>
    <button disabled={ disabled == "sign up" } on:click={() => setTab("sign up")} data-current-tab={ tab == "sign up" ? "true": "false" } >Sign up</button>
</nav>

<style lang="less">
    nav {
        width: 100%;
        height: 60px;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        background-color: #f5f5f5;
        border-style: solid;
        border-width: 1px;
        border-color: #bdbdbd;
        border-bottom-color: #9e9e9e;
        display: flex;
        &[data-theme="dark"] {
            background-color: rgb(25, 25, 25);
            border-style: solid;
            border-color: #4e4c4c;
            border-width: 1px;
            box-shadow: none;
            button {
                color: white;
                &[data-current-tab="true"] {
                    border-color: white;
                    &:disabled {
                        border-color: #4e4c4c;
                    }
                }

                &:disabled {
                    color: rgb(110, 110, 110);
                }
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                background-color: rgb(25, 25, 25);
                border-style: solid;
                border-color: #4e4c4c;
                border-width: 1px;
                box-shadow: none;
                button {
                    color: white;
                    &[data-current-tab="true"] {
                        border-color: white;
                        &:disabled {
                            border-color: #4e4c4c;
                        }
                    }

                    &:disabled {
                        color: rgb(110, 110, 110);
                    }
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
            cursor: pointer;
            &[data-current-tab="true"] {
                border-color: #303030;
                &:disabled {
                    border-color: rgb(115, 115, 115);
                }
            }
            &:focus {
                outline: none;
            }
            &:disabled {
                cursor: not-allowed;
                color: rgb(120, 125, 125);
            }
        }
    }
</style>