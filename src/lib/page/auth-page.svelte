<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { fly } from 'svelte/transition';
    import { Cross2 } from "radix-icons-svelte"
    import AuthTab from "../tab/auth-tab.svelte"

    type PageErrorMessage = "none"|
        "both"|
        "Email already exist"|
        "Username already exist"|
        "Username and email already exist"|
        "Username or email not found"|
        "Incorrect password"|
        "Email not found"|
        "No internet"

    export let theme:"light"|"dark" = "light"
    export let errorType:PageErrorMessage = "none"
    export let loading:boolean =  false
    export let tab:"sign in"|"sign up" = "sign in"
    export let disable:"sign in"|"sign up"|"none" = "none"

    const dispatcher = createEventDispatcher()

    $:authTabErrorType = (errorType != "No internet" ? errorType : "none") as any
</script>
<section style="display: { errorType == "No internet" ? "flex" : "none" }; animation-play-state: { errorType == "No internet" ? "running" : "paused" }" data-container="connection-error">
    <span>No internet connection</span>
    <button on:click={ _ => errorType = "none" }><Cross2 color="white" size={23} /></button>
</section>
<main data-theme={theme}>
    <section data-container="auth-tab">
        <AuthTab 
            disable={disable}
            tab={tab}
            theme={theme}
            errorType={authTabErrorType}
            loading={loading}
            on:onTabSelected={(e) => dispatcher("onTabSelected", { ...e.detail })}
            on:onSignIn={(e) => dispatcher("onSignIn", { ...e.detail })}
            on:onSignUp={(e) => dispatcher("onSignUp", { ...e.detail })}
            on:onMagicLinkClick={(e) => dispatcher("onMagicLinkClick", { ...e.detail })}
            on:onPolicyLinkClick={(e) => dispatcher("onPolicyLinkClick")}
        />
    </section>
</main>
<style lang="less">
    @keyframes connection-error-amin {
        from {
            top: -50px;
        }
        to {
            top: 0px;
        }
    }
    section[data-container="connection-error"] {
        color: white;
        font-size: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        padding: 8px;
        position: relative;
        font-weight: bold;
        padding-right: 15px;
        top: 0px;
        padding-left: 15px;
        animation-name: connection-error-amin;
        animation-play-state: paused;
        animation-duration: 300ms;
        animation-direction: normal;
        animation-iteration-count: 1;
        height: 25px;
        background-color: #06d6a0;
        display: flex;
        z-index: 3;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        @media screen and (min-width: 280px) {
            font-size: 16.25px;
        }
        @media screen and (min-width: 320px) {
            font-size: 19.25px;
        }
        @media screen and (min-width: 600px) {
            font-size: 20px;
        }
        button {
            background-color: transparent;
            border-width: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:focus {
                outline: none;
            }
        }
    }
    main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        padding: 0 0 0 0;
        margin: 0 0 0 0;
        background-color: #fafafa;
        &[data-theme="dark"] {
            background-color: #303030;
        }
        section[data-container="auth-tab"] {
            width: 420px;
            height: 435px;
            @media screen and (min-width: 280px) {
                width: 95%;
            }
            @media screen and (min-width: 320px) {
                width: 93%;
            }
            @media screen and (min-width: 600px) {
                width: 420px;
            }
            @media screen and (min-width: 1024px) {
                width: 447px;
            }
        }
    }
</style>