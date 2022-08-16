<script lang="ts">
    import AuthInput from "./auth-input.svelte"
    import { createEventDispatcher } from "svelte"
    import { Stretch } from "svelte-loading-spinners"

    type ErrorMessage = "none"|
        "Username or email and password not filled"|
        "Username or email not filled"|
        "Password not filled"|
        "Username or email not found"|
        "Incorrect password"|
        "both"|
        "Email not found"|
        "Email required"

    export let theme:"light"|"dark" = "light"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let show:boolean = true
    export let errorType:ErrorMessage = "none"
    export let startAmin:boolean =  false

    const dispatcher = createEventDispatcher()
    
    let password:string = String()
    let usernameOrEmail:string = String()
</script>
<section style="width: {`${width}${unit}`}; display: { show ? "block" : "none" }" data-theme={theme}>
    <AuthInput 
        bind:theme={theme} 
        placeholder="Username or email"
        type="text"
        message={ errorType == "Email required" ? "Email address required" : (errorType == "Username or email and password not filled" || errorType == "Username or email not filled") ? "Username or email not filled" :  errorType == "Email not found" ? "Email not found" : "Username or email not found" }
        error={ errorType == "both" || errorType == "Email not found" || errorType == "Username or email not found" || errorType == "Email required" || errorType == "Username or email not filled" || errorType == "Username or email and password not filled" }
        on:onInput={(e) => {
            usernameOrEmail = e.detail.inputValue
        }}
    />
    <AuthInput 
        bind:theme={theme} 
        placeholder="Password"
        type="password"
        message={ (errorType == "Username or email and password not filled" || errorType == "Password not filled") ? "Password not filled" : "Incorrect password" }
        error={ errorType == "both" || errorType == "Incorrect password" || errorType == "Password not filled" || errorType == "Username or email and password not filled" }
        on:onInput={(e) => {
            password = e.detail.inputValue
        }}
    />
    <button on:click={() => {
        if (password && usernameOrEmail) {
            dispatcher("onSignIn", { usernameOrEmail, password })
        } else {
            if (!usernameOrEmail && !password)
                errorType = "Username or email and password not filled"
            else if (!password)
                errorType = "Password not filled"
            else if (!usernameOrEmail)
                errorType = "Username or email not filled"
        }
    }} disabled={startAmin}>
        {#if startAmin }
            <Stretch color="white" unit="px" size={40} />
        {:else}
            Continue
        {/if}
    </button>
    <p on:click={() => {
        if (usernameOrEmail)
            dispatcher("onMagicLinkClick", { email: usernameOrEmail } )
        else
            errorType = "Email required"
    }} >Send magic link</p>
</section>
<style lang="less">
    section {
        width: 100%;
        height: 345px;
        padding: 0;
        padding-top: 15px;
        padding-bottom: 15px;
        font-family: Arial, Helvetica, sans-serif;
        border-style: solid;
        border-width: 1px;
        border-top-width: 0;
        border-color: #d6d6d6;
        background-color: rgb(253, 253, 253);
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
        &[data-theme="dark"] {
            background-color: rgb(40, 40, 40);
            border-style: solid;
            border-color: #474849;
            p {
               color: rgb(190, 190, 190);
            }
        }
        p {
            width: 120px;
            position: relative;
            left: calc(50% - 75px);
            margin: 0;
            margin-top: 15px;
            margin-left: 18px;
            margin-right: 18px; 
            font-family: Arial, Helvetica, sans-serif;
            font-size: 15.5px;
            text-align: center;
            cursor: pointer;
            color: rgb(65, 65, 65);
            &:hover {
                text-decoration: underline;
            }
        }
        button {
            width: calc(100% - 36px);
            margin: 0;
            margin-top: 8px;
            margin-left: 18px;
            margin-right: 18px;
            font-size: 17px;
            color: white;
            font-weight: bold;
            height: 48px;
            border-width: 0;
            outline: none;
            background-color: #06e0a7;
            border-radius: 5px; 
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
            &:hover {
                background-color: #06c694; 
            }
            &:disabled {
                cursor: no-drop;
                background-color: #06aa81
            }
        }
    }
</style>