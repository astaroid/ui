<script lang="ts">
    import { createEventDispatcher } from "svelte"
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

    export let theme:"system"|"light"|"dark" = "system"
    export let errorType:PageErrorMessage = "none"
    export let loading:boolean =  false
    export let tab:"sign in"|"sign up" = "sign in"
    export let disable:"sign in"|"sign up"|"none" = "none"

    const dispatcher = createEventDispatcher()

    $:authTabErrorType = (errorType != "No internet" ? errorType : "none") as any
</script>
<section style="display: { errorType == "No internet" ? "flex" : "none" }; animation-play-state: { errorType == "No internet" ? "running" : "paused" }" data-container="connection-error">
    <span>No internet connection</span>
    <button on:click={ () => errorType = "none" }>
        <Cross2 color="white" size={20} />
    </button>
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
            on:onForgetPassword={(e) => dispatcher("onForgetPassword")}
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
        position: relative;
        top: 0px;
        animation-name: connection-error-amin;
        animation-play-state: paused;
        animation-duration: 300ms;
        animation-direction: normal;
        animation-iteration-count: 1;
        z-index: 3;
        width: calc(100% - 26px);
        height: 33px;
        color: white;
        background-color: #06d6a0;
        font-size: 18px;
        padding-block: 8px;
        padding-inline: 13px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-family: Arial, Helvetica, sans-serif;
        @media screen and (max-width: 480px) {
            font-size: 14.5px;
            height: 25px;
        }
        @media screen and (max-width: 750px) {
            font-size: 15.25px;
            height: 25px;
        } 
        button {
            background-color: transparent;
            border-width: 0;
            padding-inline: 0;
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
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                background-color: #303030;
            }
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