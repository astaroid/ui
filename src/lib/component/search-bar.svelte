<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let theme:"system"|"light"|"dark" = "system"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"

    const dispatcher = createEventDispatcher()

    const searchBarBlockBorderWidth = 2.5

    const onInput = () => {
        if (formElement) {
            let formRect = formElement.getBoundingClientRect()
            formRect.y += 35.5 + searchBarBlockBorderWidth
            formRect.width -= 2
            dispatcher("onInput", { value, searchBarRect: formRect.toJSON() })
        }
    }

    const onKeydown = (e:KeyboardEvent) => {
        if (e.code == "ArrowUp" || e.code == "ArrowDown" || e.code == "Enter") {
            e.preventDefault()
        }
    }

    const onFocusInOrClick = (eventDispatched:"focusin"|"click") => {
        if (formElement) {
            let formRect = formElement.getBoundingClientRect()
            formRect.y += 35.5 + searchBarBlockBorderWidth
            formRect.width -= 2
            if (eventDispatched == "click")
                dispatcher("onClick", { value, searchBarRect: formRect.toJSON() })
            else
                dispatcher("onFocusIn", { value, searchBarRect: formRect.toJSON() })
        }
    }

    let value:string = String()

    let formElement:HTMLFormElement = null

    $: {
        if (formElement) {
            if (value.length > 0) {
                formElement.style.borderBottomLeftRadius = "0"
                formElement.style.borderBottomRightRadius = "0"
            } else {
                formElement.style.borderBottomLeftRadius = "2px"
                formElement.style.borderBottomRightRadius = "2px"
            }
        }
    }
    
    window.addEventListener("resize", () => {
        if (formElement) {
            let formRect = formElement.getBoundingClientRect()
            formRect.y += 35.5 + searchBarBlockBorderWidth
            formRect.width -= 2
            dispatcher("onResize", { searchBarRect: formRect.toJSON() })
        }
    })

</script>
<section style="width: {`${width}${unit}`}" data-theme={theme}>
    <button on:click={() => dispatcher("onBackBtnClicked")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
    </button>
    <form bind:this={formElement}>
        <svg data-icon="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input type="text" placeholder="Search" bind:value={value} on:input={onInput} on:focusin={() => onFocusInOrClick("focusin")} on:click={() => onFocusInOrClick("click")} on:keydown={onKeydown} on:focusout={() => dispatcher("onFocusOut")}>
        <svg on:click={() => value = String()} data-icon="x" style="visibility: {value.length > 0 ? "visible" : "hidden"};" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    </form>
</section>
<style lang="less">
    section {
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        height: 37.5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        button {
            border: none;
            background-color: transparent;
            padding: 0 0 0 0;
            padding-right: 6px;
            display: none;
            flex-direction: column;
            justify-content: center;
            svg {
                fill: rgb(135, 135, 135);
                width: 25px;
                height: 25px;
            }
            &:hover {
                svg {
                    fill: #212121;
                }
            }
            &:focus {
                outline: none;
            }
        }
        form {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 35.5px;
            background-color: white;
            border-style: solid;
            border-width: 1px;
            border-radius: 2px;
            border-color: rgb(0 0 0 / 15%);
            svg {
                width: 19px;
                height: 19px;
                fill: rgb(120, 120, 120);
                &[data-icon="search"] {
                    margin-left: 8px;
                }
                &[data-icon="x"] {
                    width: 17px;
                    height: 17px;
                    margin-right: 8px;
                    cursor: pointer;
                }
            }
            input {
                margin: 0 0 0 0;
                padding: 0 0 0 0;
                border: none;
                height: 100%;
                font-size: 14.85px;
                padding-inline: 10px;
                width: calc(100% - 75px);
                color: rgb(35, 35, 35);
                background-color: transparent;
                &:focus {
                    outline: none;
                }
            }
        }
        @media screen and (max-width: 599px) {
            button {
                display: flex;
            }
            form {
                width: calc(100% - 28px);
            }
        }
        &[data-theme="dark"] {
            button {
                svg {
                    fill: rgb(105, 105, 105);
                }
                &:hover {
                    svg {
                        fill: rgb(238, 236, 236);
                    }
                }
            }
            form {
                background-color: #303030;
                border-color: #474849;
                input {
                    color: rgb(135, 135, 135);
                }
            }
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                button {
                    svg {
                        fill: rgb(105, 105, 105);
                    }
                    &:hover {
                        svg {
                            fill: rgb(238, 236, 236);
                        }
                    }
                }
                form {
                    background-color: #303030;
                    border-color: #474849;
                    input {
                        color: rgb(135, 135, 135);
                    }
                }
            }
        }
    }
</style>