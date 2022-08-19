<script lang="ts">
    import AuthInput from "./auth-input.svelte"
    import { createEventDispatcher } from "svelte"
    import { Checkbox } from '@svelteuidev/core'
    import { Circle2 } from "svelte-loading-spinners"

    type ErrorMessage = "none"|
        "Email already exist"|
        "Username already exist"|
        "Username and email already exist"|
        "Username and email and password not filled"|
        "Username and email not filled"|
        "Username and password not filled"|
        "Email and password not filled"|
        "Username not filled"|
        "Email not filled"|
        "Password not filled"|
        "Incorrect password format"|
        "Incorrect email format"|
        "Incorrect username format"|
        "both"

    export let theme:"light"|"dark" = "light"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let show:boolean = true
    export let errorType:ErrorMessage = "none"
    export let loading:boolean = false

    const dispatcher = createEventDispatcher()

    let email:string = String()
    let username:string = String()
    let password:string = String()
    let isAgreed = true

    const signUp = () => {
        let fieldFilled = false
        let passwordChecked = false
        let usernameChecked = false
        let emailChecked = false

        if (!email && !username && !password) {
            errorType = "Username and email and password not filled"
        } else if (!email && !username) {
            errorType = "Username and email not filled"
        } else if (!email && !password) {
            errorType = "Email and password not filled"
        } else if (!username && !password) {
            errorType = "Username and password not filled"
        } else if (!username) {
            errorType = "Username not filled"
        } else if (!password) {
            errorType = "Password not filled"
        } else if (!email) {
            errorType = "Email not filled"
        } else {
            fieldFilled = true
            if (password) {
                let checker = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
                if (!checker.test(password)) {
                    errorType = "Incorrect password format"
                } else {
                    passwordChecked = true
                }
            }
            if (username) {
                let checker = /^[a-zA-Z0-9_]{6,}$/
                if (!checker.test(username)) {
                    errorType = "Incorrect username format"
                } else {
                    usernameChecked = true
                }
            }
            if (email) {
                let checker = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
                if (!checker.test(email)) {
                    errorType = "Incorrect email format"
                } else {
                    emailChecked = true
                }
            }
        }
        
        if (fieldFilled && passwordChecked && usernameChecked && emailChecked ) {
            dispatcher("onSignUp", { email, username, password })
            errorType = "none"
        }
    } 
</script>
<section style="width: {`${width}${unit}`}; display: { show ? "block" : "none" }" data-theme={theme}>
    <AuthInput 
        bind:theme={theme} 
        placeholder="Email"
        type="text"
        message={ (errorType == "Username and email already exist" || errorType == "Email already exist") ? "Email already exist" : errorType == "Incorrect email format" ? "Invalid email format" : "Email not filled" }
        error={ errorType == "Incorrect email format" || errorType == "Email already exist" || errorType == "Email and password not filled" || errorType == "Email not filled" || errorType == "Username and email already exist" || errorType == "Username and email and password not filled" || errorType == "Username and email not filled" }
        on:onInput={(e) => {
            email = e.detail.inputValue
        }}
    />
    <AuthInput 
        bind:theme={theme} 
        placeholder="Username"
        type="text"
        message={ (errorType == "Username and email already exist" || errorType == "Username already exist") ? "Username already exist" : errorType == "Incorrect username format" ? "Username must be at least six characters with letters, numbers and underscore" : "Username not filled" }
        error={ errorType == "Incorrect username format" || errorType == "Username already exist" || errorType == "Username and password not filled" || errorType == "Username not filled" || errorType == "Username and email already exist" || errorType == "Username and email and password not filled" || errorType == "Username and email not filled" }
        on:onInput={(e) => {
            username = e.detail.inputValue
        }}
    />
    <AuthInput 
        bind:theme={theme} 
        placeholder="Password"
        type="password"
        message={ errorType == "Incorrect password format" ? "Password must be at least six characters with one number and special characte" : "Password not filled" }
        error={ errorType == "Incorrect password format" || errorType == "Username and password not filled" || errorType == "Password not filled" || errorType == "Username and email and password not filled" || errorType == "Email and password not filled" }
        on:onInput={(e) => {
            password = e.detail.inputValue
        }}
    />
    {#if !loading}
        <div data-container="policy">
            <Checkbox size={"xs"} bind:checked={isAgreed} />
            <span>Agree to the <a href="#policy" on:click|preventDefault={() => dispatcher("onPolicyLinkClick")} target="_blank" rel="noopener noreferrer">Privacy policy</a></span>
        </div>
        <button on:click={signUp} disabled={!isAgreed}>
            Continue
        </button>
    {:else}
        <div data-container="loading-spinner">
            <Circle2 colorCenter="#06c694" colorInner="#06aa81" colorOuter="#06e0a7"  unit="px" size={50} />
        </div>
    {/if}
    
</section>
<style lang="less">
    section {
        width: 100%;
        min-height: 345px;
        height: 100%;
        padding: 0;
        padding-top: 15px;
        padding-bottom: 15px;
        font-family: Arial, Helvetica, sans-serif;
        border-style: solid;
        border-width: 1px;
        border-top-width: 0;
        border-color: #bdbdbd;
        box-shadow: 0px 1.25px 2.4px 1.75px #f5f5f5;
        background-color: rgb(253, 253, 253);
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
        &[data-theme="dark"] {
            background-color: #212121;
            border-style: solid;
            border-color: #4e4c4c;
            box-shadow: none;
            div[data-container="policy"] span {
                color: rgb(190, 190, 190);
                a {
                    color: rgb(190, 190, 190);
                }
            }
        }
        div[data-container="policy"] {
            width: calc(100% - 36px);
            margin: 0;
            margin-top: 6px;
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 15px;
            display: flex;
            span {
                color: #616161;
                padding-top: 2px;
                padding-left: 5px;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 15.5px;
                a {
                    color: #424242;
                    &:link {
                        outline: none;
                    }
                    &:hover {
                        text-decoration: none;
                    }
                }
            }
        }
        div[data-container="loading-spinner"] {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
            width: calc(100% - 36px);
            margin: 0;
            margin-top: 8px;
            margin-left: 18px;
            margin-right: 18px;
            height: auto;
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