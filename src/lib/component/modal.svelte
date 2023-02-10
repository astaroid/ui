<script lang="ts">
    import { onMount } from "svelte"
    import { createEventDispatcher } from "svelte"
    import { Circle } from "svelte-loading-spinners"

    interface ModalButton {
        text: string
        disabled: boolean
        loading: boolean
        type: "error"|"success"|"warning"|"info"|"default"
    }

    interface ModalInput {
        show: boolean
        type: "text"|"password"
        placeholder: string
        error: boolean
        errorMessage: string
        value: string
    }

    export let theme:"system"|"light"|"dark" = "system"
    export let show:boolean = false
    export let title:string = "Info"
    export let type:"info"|"warning"|"success"|"error" = "info"
    export let message:string = `Message type is ${type}`
    export let leftButton:ModalButton = {
        type: "default",
        text: "Cancel",
        disabled: false,
        loading: false
    }
    export let rightButton:ModalButton = {
        type: "info",
        text: "Next",
        disabled: false,
        loading: false
    }
    export let input:ModalInput = {
        show: false,
        type: "text",
        placeholder: String(),
        error: false,
        errorMessage: String(),
        value: null
    }

    const dispatcher = createEventDispatcher()
    
    const onInput = () => {
        dispatcher("onInput", { value: inputValue })
    }

    let inputBox:HTMLInputElement = null
    let innerModal:HTMLElement = null
    let sectionElement:HTMLElement = null
    let blurryBackground:HTMLElement = null
    let inputValue:string = input.value || String()

    $: if (show && sectionElement && blurryBackground) {
        sectionElement.style.display = "flex"
        sectionElement.classList.remove("modal-hide-anim")
        sectionElement.classList.add("modal-show-anim")
        blurryBackground.classList.add("start-blur")
        blurryBackground.classList.remove("clear-blur")
        if (input.show && inputBox)
            inputBox.focus()
    } 

    $: if (!show && sectionElement && blurryBackground) {
        sectionElement.classList.remove("modal-show-anim")
        sectionElement.classList.add("modal-hide-anim")
        blurryBackground.classList.remove("start-blur")
        blurryBackground.classList.add("clear-blur")
    }

    onMount(() => {
        if (show) {
            sectionElement.style.display = "flex"
            sectionElement.classList.remove("modal-hide-anim")
            sectionElement.classList.add("modal-show-anim")
            blurryBackground.classList.add("start-blur")
            blurryBackground.classList.remove("clear-blur")
            if (input.show && inputBox)
                inputBox.focus()
        } else {
            sectionElement.classList.remove("modal-show-anim")
            sectionElement.classList.add("modal-hide-anim")
            blurryBackground.classList.remove("start-blur")
            blurryBackground.classList.add("clear-blur")
        }
        innerModal.addEventListener("animationend", (e) => {
            if (e.animationName.includes("scaling-in-anim")) {
                sectionElement.classList.remove("modal-show-anim")
                blurryBackground.classList.remove("clear-blur")
                dispatcher("onOpened")
            } else if (e.animationName.includes("scaling-out-anim")) {
                sectionElement.classList.remove("modal-hide-anim")
                blurryBackground.classList.remove("start-blur")
                sectionElement.style.display = "none"
                dispatcher("onClosed")
            }
        })
    })
</script>
<section bind:this={sectionElement} data-theme={theme}>
    <div bind:this={blurryBackground} data-container="blurry-background" on:click={() => show = false}>
    </div>
    <div bind:this={innerModal} data-container="inner-modal">
        <header data-modal-type={type}>
            {#if type == "info"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
            {:else if type == "warning"} 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
            {:else if type == "error"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
            {:else if type == "success"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            {/if}
            <p>{title}</p>
        </header>
        <main>
            {@html message}
            {#if input.show }
                {#if input.type == "text" }
                    <input 
                        data-has-error={input.error} 
                        type="text" placeholder={input.placeholder} 
                        bind:value={inputValue} 
                        bind:this={inputBox}
                        on:input={onInput}>
                {:else if input.type == "password"}
                    <input 
                        data-has-error={input.error} 
                        type="password" 
                        placeholder={input.placeholder}
                        bind:value={inputValue} 
                        bind:this={inputBox}
                        on:input={onInput}>
                {/if}
                {#if input.error }
                    <p data-text="input-error-message">{input.errorMessage}</p>
                {/if}
            {/if}
        </main>
        <footer>
            <button on:click={() => dispatcher("onLeftButtonClicked")} disabled={ leftButton ? leftButton.disabled : false } data-button-type={ leftButton ? leftButton.type : "default" } style="visibility: { leftButton ? "visible" : "hidden" }">
                {#if leftButton }
                    {#if leftButton.loading }
                        {#if leftButton.type != "default" }
                            <Circle color="white" size={19.35} />
                        {:else}
                            <Circle color={ theme == "dark" ? "rgb(239, 239, 239)" : "rgb(43, 42, 42)" } size={19.35} />
                        {/if}
                    {:else}
                        { leftButton ? leftButton.text : "left" }
                    {/if}
                {:else}
                    { leftButton ? leftButton.text : "left" }
                {/if}
            </button>
            <button on:click={() => dispatcher("onRightButtonClicked")} disabled={ rightButton ? rightButton.disabled : false } data-button-type={ rightButton ? rightButton.type : "default" } style="visibility: { rightButton ? "visible" : "hidden" }">
                {#if rightButton }
                    {#if rightButton.loading }
                        {#if rightButton.type != "default" }
                            <Circle color="white" size={19.35} />
                        {:else}
                            <Circle color={ theme == "dark" ? "rgb(239, 239, 239)" : "rgb(43, 42, 42)" } size={19.35} />
                        {/if}
                    {:else}
                        { rightButton ? rightButton.text : "right" }
                    {/if}
                {:else}
                    { rightButton ? rightButton.text : "right" }
                {/if}
            </button>
        </footer>
    </div>
</section>
<style lang="less">
    @keyframes scaling-in-anim {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    } 
    @keyframes scaling-out-anim {
        to {
            transform: scale(0);
        }
        from {
            transform: scale(1);
        }
    } 
    @keyframes blur-anim {
        from {
            background: transparent;
            backdrop-filter: none;
        }
        to {
            background: rgba(40,40,40,0.5);
            backdrop-filter: blur(1.35px);
        }
    } 
    @keyframes clear-blur-anim {
        from {
            background: rgba(40,40,40,0.5);
            backdrop-filter: blur(1.35px);
        }
        to {
            background: transparent;
            backdrop-filter: none;
        }
    } 
    @keyframes dark-mode-blur-anim {
        from {
            background: transparent;
            backdrop-filter: none;
        }
        to {
            background: rgba(215,215,215,0.5);
            backdrop-filter: blur(1.5px);
        }
    }
    @keyframes dark-mode-clear-blur-anim {
        from {
            background: rgba(215,215,215,0.5);
            backdrop-filter: blur(1.5px);
        }
        to {
            background: transparent;
            backdrop-filter: none;
        }
    }
    section {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
        :global(&.modal-show-anim) {
            animation-duration: 245ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-play-state: running;
            div[data-container="inner-modal"] {
                animation-name: scaling-in-anim;
                transform: scale(1);
            }
        }
        :global(&.modal-hide-anim) {
            animation-duration: 245ms;
            animation-direction: normal;
            animation-iteration-count: 1;
            animation-play-state: running;
            div[data-container="inner-modal"] {
                animation-name: scaling-out-anim;
                transform: scale(0);
            }
        }
        div[data-container="blurry-background"] {
            width: 100%;
            height: 100%;
            animation-duration: inherit;
            animation-direction: inherit;
            animation-iteration-count: inherit;
            animation-play-state: inherit;
            :global(&.start-blur) {
                background-color: rgba(40,40,40,0.5);
                animation-name: blur-anim;
                backdrop-filter: blur(1.35px);
            }
            :global(&.clear-blur) {
                background: transparent;
                animation-name: clear-blur-anim;
                backdrop-filter: none;
            }
        } 
        div[data-container="inner-modal"] {
            z-index: 3;
            position: absolute;
            padding: 0 0 0 0;
            margin: 0 0 0 0;
            width: 350px;
            min-height: 200px;
            background-color: #fefeff;
            border-style: solid;
            border-radius: 5px;
            border-width: 1px;
            border-color: #e6e4e4;
            color: #303030; 
            animation-duration: inherit;
            animation-direction: inherit;
            animation-iteration-count: inherit;
            animation-play-state: inherit;
            header {
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                width: 100%;
                height: 46px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-block: 15px;
                font-size: 16px;
                border: none;
                background-color: #f5f5f5;
                border-bottom-style: solid;
                border-bottom-width: 1px;
                border-bottom-color: #e6e4e4;
                svg {
                    height: 23px;
                    width: 23px;
                }
                p {
                    margin: 0 0 0 0;
                    padding: 0 0 0 0;
                    margin-top: 5px;
                    font-weight: 700;
                }
                &[data-modal-type="info"] {
                    color: #2196f3;
                    fill: #2196f3;
                }
                &[data-modal-type="warning"] {
                    color: #f9a825;
                    fill: #f9a825;
                }
                &[data-modal-type="error"] {
                    color: #e53935;
                    fill: #e53935;
                }
                &[data-modal-type="success"] {
                    color: #01ad49;
                    fill: #01ad49;
                }
            }
            main {
                width: calc(100% - 40px);
                padding-block: 16px;
                padding-inline: 20px;
                min-height: 40px;
                height: fit-content;
                text-align: center;
                display: flex;
                font-size: 17.425px;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: rgb(30, 30, 30);
                input {
                    margin-top: 15px;
                    width: calc(100% - 25px);
                    background-color: transparent;
                    outline: none;
                    height: 25px;
                    padding-block: 7px;
                    padding-inline: 10px;
                    border-width: 1px;
                    border-style: solid;
                    border-radius: 5px;
                    color: rgb(45, 45, 45);
                    font-size: 15.75px;
                    border-color: rgb(225, 225, 225); 
                    &:focus {
                        border-color: #2196f3;
                        box-shadow: 0 0 1.5px 0.45px #2195f3;
                    }
                    &[data-has-error="true"] {
                        box-shadow: 0 0 1.5px 0.45px red;
                        border-color: rgb(230, 0, 0);
                    }
                }
                p[data-text="input-error-message"] {
                    width: 100%;
                    margin: 0 0 0 0;
                    padding: 0 0 0 0;
                    margin-top: 10px;
                    font-size: 14.75px;
                    color: #e53935;
                    text-align: left;
                }
                &:has(p) {
                    padding-bottom: 11px;
                }
            }
            footer {
                width: calc(100% - 40px);
                padding-inline: 20px;
                padding-top: 14px;
                height: 58px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                button {
                    height: 37px;
                    width: fit-content;
                    padding-block: 6px;
                    padding-inline: 10px;
                    border-style: solid;
                    border-width: 0;
                    font-weight: bold;
                    border-radius: 3.5px;
                    font-size: 15.5px;
                    min-width: 85px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    color: white;
                    &:focus {
                        outline: none;
                    }
                    &:disabled {
                        cursor: not-allowed;
                    }
                    &[data-button-type="default"] {
                        background-color: #f5f5f5;
                        color:rgb(40, 35, 35);
                    }
                    &[data-button-type="info"] {
                        background-color: #2195f3;
                        &:hover {
                            background-color: lighten(#2195f3, 3.75);
                        }
                        &:disabled {
                            background-color: darken(#2195f3, 8);
                        } 
                    }
                    &[data-button-type="error"] {
                        background-color: #e53935;
                        &:hover {
                            background-color: lighten(#e53935, 3.75);
                        }
                        &:disabled {
                            background-color: darken(#e53935, 8);
                        }
                    }
                    &[data-button-type="warning"] {
                        background-color: #f9a825;
                        &:hover {
                            background-color: lighten(#f9a825, 3.75);
                        }
                        &:disabled {
                            background-color: darken(#f9a825, 8);
                        }
                    }
                    &[data-button-type="success"] {
                        background-color: #01ad49;
                        &:hover {
                            background-color: lighten(#01ad49, 3.75);
                        }
                        &:disabled {
                            background-color: darken(#01ad49, 8);
                        }
                    }
                }
            }

            @media screen and (max-width: 600px) {
                & {
                    width: 92.25%;
                }
            }
        }
        &[data-theme="dark"] {
            div[data-container="inner-modal"] {
                background-color: #1e1e1e;
                border-color: #4e4c4c;
                border-width: 1px;
                header {
                    background-color: #161616;
                    border-bottom-color: #4e4c4c;
                }
                main {
                    color: rgb(235, 235, 235);
                    input {
                        color: rgb(215, 215, 215);
                        border-color: rgb(75, 75, 75);
                        &:focus {
                            border-color: #2196f3;
                            box-shadow: 0 0 1.5px 0.45px #2195f3;
                        }
                        &[data-has-error="true"] {
                            box-shadow: 0 0 1.5px 0.45px red;
                            border-color: rgb(230, 0, 0);
                        }
                    }
                }
                footer button {
                    &[data-button-type="default"] {
                        background-color: #161616;
                        color: rgb(250, 250, 250);
                    }
                    &[data-button-type="info"] {
                        &:hover {
                            background-color: darken(#2195f3, 5);
                        }
                        &:disabled {
                            background-color: lighten(#2195f3, 5);
                        }
                    }
                    &[data-button-type="error"] {
                        &:hover {
                            background-color: darken(#e53935, 5);
                        }
                        &:disabled {
                            background-color: lighten(#e53935, 5);
                        }
                    }
                    &[data-button-type="warning"] {
                        &:hover {
                            background-color: darken(#f9a825, 5);
                        }
                        &:disabled {
                            background-color: lighten(#f9a825, 5);
                        }
                    }
                    &[data-button-type="success"] {
                        &:hover {
                            background-color: darken(#01ad49, 5);
                        }
                        &:disabled {
                            background-color: lighten(#01ad49, 5);
                        }
                    }
                }
            }
            div[data-container="blurry-background"] {
                :global(&.start-blur) {
                    animation-name: dark-mode-blur-anim;
                    background: rgba(215,215,215,0.5);
                    backdrop-filter: blur(1.5px);
                }
                :global(&.clear-blur) {
                    background: transparent;
                    animation-name: dark-mode-clear-blur-anim;
                    backdrop-filter: none;
                }
            }
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                div[data-container="inner-modal"] {
                    background-color: #1e1e1e;
                    border-color: #4e4c4c;
                    border-width: 1px;
                    header {
                        background-color: #161616;
                        border-bottom-color: #4e4c4c;
                    }
                    main {
                        color: rgb(235, 235, 235);
                        input {
                            color: rgb(215, 215, 215);
                            border-color: rgb(75, 75, 75);
                            &:focus {
                                border-color: #2196f3;
                                box-shadow: 0 0 1.5px 0.45px #2195f3;
                            }
                            &[data-has-error="true"] {
                                box-shadow: 0 0 1.5px 0.45px red;
                                border-color: rgb(230, 0, 0);
                            }
                        }
                    }
                    footer button {
                        &[data-button-type="default"] {
                            background-color: #161616;
                            color: rgb(250, 250, 250);
                        }
                        &[data-button-type="info"] {
                            &:hover {
                                background-color: darken(#2195f3, 5);
                            }
                            &:disabled {
                                background-color: lighten(#2195f3, 5);
                            }
                        }
                        &[data-button-type="error"] {
                            &:hover {
                                background-color: darken(#e53935, 5);
                            }
                            &:disabled {
                                background-color: lighten(#e53935, 5);
                            }
                        }
                        &[data-button-type="warning"] {
                            &:hover {
                                background-color: darken(#f9a825, 5);
                            }
                            &:disabled {
                                background-color: lighten(#f9a825, 5);
                            }
                        }
                        &[data-button-type="success"] {
                            &:hover {
                                background-color: darken(#01ad49, 5);
                            }
                            &:disabled {
                                background-color: lighten(#01ad49, 5);
                            }
                        }
                    }
                }
                div[data-container="blurry-background"] {
                    :global(&.start-blur) {
                        animation-name: dark-mode-blur-anim;
                        background: rgba(215,215,215,0.5);
                        backdrop-filter: blur(1.5px);
                    }
                    :global(&.clear-blur) {
                        background: transparent;
                        animation-name: dark-mode-clear-blur-anim;
                        backdrop-filter: none;
                    }
                }
            }
        }
    }
</style>