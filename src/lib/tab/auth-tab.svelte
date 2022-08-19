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
        "Incorrect password"|
        "Email not found"

    const SignUpErrorMessages:Array<string> = ["Email already exist", "Username already exist", "Username and email already exist", "both"]
    const SignInErrorMessage:Array<string> = ["Username or email not found", "Incorrect password", "Email not found", "none"]

    export let theme:"light"|"dark" = "light"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let tab:"sign up"|"sign in" = "sign in"
    export let errorType:GlobalErrorMessage = "none"
    export let loading:boolean =  false

    $:signInErrorType = (SignInErrorMessage.concat(errorType) ? errorType : "none") as any
    
    $:signUpErrorType = (SignUpErrorMessages.concat(errorType) ? errorType : "none") as any

    const dispatcher = createEventDispatcher()
</script>
<main style="width: {`${width}${unit}`}" data-theme={theme}>
    <AuthTabController 
        tab={tab}
        unit={"%"}
        width={100}
        theme={theme}
        on:onTabSelected={(e) => tab = e.detail.tab }
    />
    <AuthSigninTabBody 
        unit={"%"}
        width={100}
        theme={theme}
        show={ tab == "sign in" }
        errorType={signInErrorType}
        loading={ tab == "sign in" && loading}
        on:onMagicLinkClick={(e) => dispatcher("onMagicLinkClick", { ...e.detail })}
        on:onSignIn={(e) => dispatcher("onSignIn", { ...e.detail })}
    />
    <AuthSignupTabBody
        unit={"%"}
        width={100}
        theme={theme}
        show={ tab == "sign up" }
        errorType={signUpErrorType}
        loading={ tab == "sign up" && loading}
        on:onPolicyLinkClick={(e) => dispatcher("onPolicyLinkClick")}
        on:onSignUp={(e) => dispatcher("onSignUp", { ...e.detail })}
    />
</main>
<style lang="less">
    main {
        width: 100%;
        height: auto;      
        padding: 0 0 0 0;  
    }
</style>