<script lang="ts">
    import TextInput from "./text-input.svelte"
    import { createEventDispatcher } from "svelte"
    import { Circle } from "svelte-loading-spinners"

    type ErrorMessage = "none"|
        "Username or email and password not filled"|
        "Username or email not filled"|
        "Password not filled"|
        "Username or email not found"|
        "Incorrect password"|
        "both"|
        "Email required"

    export let theme:"system"|"light"|"dark" = "system"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let show:boolean = true
    export let errorType:ErrorMessage = "none"
    export let loading:boolean = false

    const dispatcher = createEventDispatcher()

    const signIn = () => {
        if (password && usernameOrEmail) {
            errorType = "none"
            dispatcher("onSignIn", { usernameOrEmail, password })
        } else {
            if (!usernameOrEmail && !password)
                errorType = "Username or email and password not filled"
            else if (!password)
                errorType = "Password not filled"
            else if (!usernameOrEmail)
                errorType = "Username or email not filled"
        }
    }

    const forgetPassword = () => {
        errorType = "none"
        dispatcher("onForgetPassword")
    }
    
    let password:string = String()
    let usernameOrEmail:string = String()
</script>
<section style="width: {`${width}${unit}`}; display: { show ? "block" : "none" }" data-theme={theme}>
    <TextInput 
        bind:theme={theme} 
        placeholder="Username or email"
        type="text"
        message={ errorType == "Email required" ? "Email address required" : (errorType == "Username or email and password not filled" || errorType == "Username or email not filled") ? "Username or email not filled" : "Username or email not found" }
        error={ errorType == "both" || errorType == "Username or email not found" || errorType == "Email required" || errorType == "Username or email not filled" || errorType == "Username or email and password not filled" }
        on:onInput={(e) => {
            usernameOrEmail = e.detail.inputValue
        }}
    />
    <TextInput 
        bind:theme={theme} 
        placeholder="Password"
        type="password"
        message={ (errorType == "Username or email and password not filled" || errorType == "Password not filled") ? "Password not filled" : "Incorrect password" }
        error={ errorType == "both" || errorType == "Incorrect password" || errorType == "Password not filled" || errorType == "Username or email and password not filled" }
        on:onInput={(e) => {
            password = e.detail.inputValue
        }}
    />
    <p data-disabled={loading} on:click={forgetPassword}>Forget password</p>
    <button disabled={loading} on:click={signIn}>
        {#if !loading }
            Continue
        {:else}
            <Circle color="white" size={26.5} />
        {/if}
    </button>
</section>
<style lang="less">
    section {
        width: 100%;
        min-height: 365px;
        height: 100%;
        padding: 0;
        padding-top: 15px;
        padding-bottom: 15px;
        font-family: Arial, Helvetica, sans-serif;
        border-style: solid;
        border-width: 1px;
        border-top-width: 0;
        border-color: #bdbdbd;
        background-color: rgb(253, 253, 253);
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
        &[data-theme="dark"] {
            background-color: #212121;
            border-style: solid;
            border-color: #4e4c4c;
            box-shadow: none;
            p {
                color: rgb(190, 190, 190);
                &[data-disabled="true"] {
                    color: rgb(120, 120, 120);
                }
            }
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                background-color: #212121;
                border-style: solid;
                border-color: #4e4c4c;
                box-shadow: none;
                p {
                    color: rgb(190, 190, 190);
                    &[data-disabled="true"] {
                        color: rgb(120, 120, 120);
                    }
                }
            }
        }
        p {
            width: 120px;
            position: relative;
            left: calc(100% - 158px);
            margin: 0;
            margin-top: 5px;
            margin-bottom: 13.75px;
            margin-inline: 18px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 15.5px;
            text-align: center;
            cursor: pointer;
            color: rgb(65, 65, 65);
            &:hover {
                text-decoration: underline;
            }
            &[data-disabled="true"] {
                text-decoration: none;
                cursor: not-allowed;
                color: rgb(120, 120, 120);
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
            background-color: #06d6a0;
            border-radius: 5px; 
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
            cursor: pointer;
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