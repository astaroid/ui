<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import AuthSigninTabBody from "../component/auth-signin-tab-body.svelte"
    import AuthSignupTabBody from "../component/auth-signup-tab-body.svelte"
    import AuthTabController from "../component/auth-tab-controller.svelte"

    type GlobalErrorMessage = "none"|
        "both"|
        "Email already exist"|
        "Username already exist"|
        "Username and email already exist"|
        "Username or email not found"|
        "Incorrect password"

    const SignUpErrorMessages:Array<string> = ["Email already exist", "Username already exist", "Username and email already exist", "both"]
    const SignInErrorMessage:Array<string> = ["Username or email not found", "Incorrect password", "Email not found", "none"]

    export let theme:"system"|"light"|"dark" = "system"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let tab:"sign up"|"sign in" = "sign in"
    export let errorType:GlobalErrorMessage = "none"
    export let loading:boolean =  false
    export let disabled:"sign in"|"sign up"|"none" = "none"
    export let privacyPolicyLink = "/privacy-policy"

    $:signInErrorType = (SignInErrorMessage.concat(errorType) ? errorType : "none") as any
    
    $:signUpErrorType = (SignUpErrorMessages.concat(errorType) ? errorType : "none") as any

    const dispatcher = createEventDispatcher()
</script>
<main style="width: {`${width}${unit}`}" data-theme={theme}>
    <AuthTabController 
        disabled={disabled}
        tab={tab}
        unit={"%"}
        width={100}
        theme={theme}
        on:onTabSelected={(e) => {
            tab = e.detail.tab
            dispatcher("onTabSelected", { tab })
        }}
    />
    <AuthSigninTabBody 
        unit={"%"}
        width={100}
        theme={theme}
        show={ tab == "sign in" }
        errorType={signInErrorType}
        loading={ tab == "sign in" && loading}
        on:onForgetPassword={(e) => dispatcher("onForgetPassword")}
        on:onSignIn={(e) => dispatcher("onSignIn", { ...e.detail })}
    />
    <AuthSignupTabBody
        unit={"%"}
        width={100}
        theme={theme}
        show={ tab == "sign up" }
        privacyPolicyLink={privacyPolicyLink}
        errorType={signUpErrorType}
        loading={ tab == "sign up" && loading}
        on:onSignUp={(e) => dispatcher("onSignUp", { ...e.detail })}
    />
</main>
<style lang="less">
    main {
        width: 100%;
        height: auto;      
        padding: 0 0 0 0; 
        box-shadow: rgb(230, 220, 220) 0px 8px 27px 0;
        border-style: solid;
        border-width: 0;
        border-radius: 7px;
        &[data-theme="dark"] {
            box-shadow: none;
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                box-shadow: none;
            }
        }
    }
</style>