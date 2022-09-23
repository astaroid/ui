<script lang="ts">
    import { ExclamationTriangle } from "radix-icons-svelte"
    import { createEventDispatcher, onMount } from "svelte"
    import LoadingSpinner from "../component/loading-spinner.svelte"

    export let theme:"light"|"dark" = "light"
    export let message:string = String()
    export let error:boolean = false

    const dispatcher = createEventDispatcher()

    onMount(() => {
        setTimeout(() => dispatcher("onLoaded", { url: window.location.href }))
    })
</script>
<main data-theme={theme}>
    {#if error }
        <ExclamationTriangle size={115} color={ theme == "light" ? "#303030" : "white" } />
        <span data-container="message">{message}</span>
        <button on:click={() => dispatcher("onBackClicked")}>Go Back</button>
    {:else}
        <LoadingSpinner size={125} />
    {/if }
</main>
<style lang="less">
    main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 0 0 0 0;
        margin: 0 0 0 0;
        background-color: #fafafa;
        color: #000000;
        font-family: Arial, Helvetica, sans-serif;
        &[data-theme="dark"] {
            background-color: #303030;
            color: white;
        }
        span[data-container="message"] {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 33px;
            text-align: center;
            text-transform: none;
            padding-top: 2px;
            margin-bottom: 10px;
        }
        button {
            width: 120px;
            font-size: 17px;
            color: white;
            font-weight: bold;
            height: 40px;
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