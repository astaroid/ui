<script lang="ts">
    import moment from "moment"
    import { Temporal } from "@js-temporal/polyfill"
    import { createEventDispatcher } from "svelte"

    type NotificationMessageType = "SOLD_ASSET_MESSAGE"|
        "BOUGHT_CRYSTAL_MESSAGE"|
        "TRANSACTION_FEE_MESSAGE"|
        "PAYOUT_MESSAGE"

    export let theme:"light"|"dark" = "light"
    export let width:number = 240
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "px"
    export let message:string = String()
    export let read:boolean = false
    export let type:NotificationMessageType
    export let id:string = "00000000-0000-0000-0000-000000000000"
    export let createAt:string = Temporal.Now.zonedDateTimeISO().toString()

    const dispatcher = createEventDispatcher()

    let convertedDate:string = String()

    $:{
        try {
            convertedDate = Temporal.Instant.fromEpochMilliseconds(Temporal.ZonedDateTime.from(createAt).epochMilliseconds).toString()
        } catch (e) {
            convertedDate = Temporal.Instant.fromEpochMilliseconds(Temporal.Now.zonedDateTimeISO().epochMilliseconds).toString()
        }
    }

    $:date = moment(convertedDate).fromNow(true)
</script>
<section on:click={() => dispatcher("onClicked", { id, read, message, type, createAt } ) } style="width: {`${width}${unit}`}" data-theme={theme} data-has-read={read}>
    {#if type == "BOUGHT_CRYSTAL_MESSAGE"}
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
            <g>
                <rect fill="none" height="24" width="24"/>
                <path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M10,10c0,0.55-0.45,1-1,1s-1-0.45-1-1V8h2V10z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M16,10c0,0.55-0.45,1-1,1 s-1-0.45-1-1V8h2V10z"/>
            </g>
        </svg>
    {:else if type == "SOLD_ASSET_MESSAGE" }
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
            <g>
                <path d="M0,0h24v24H0V0z" fill="none"/>
            </g>
            <g>
                <path d="M21.41,11.41l-8.83-8.83C12.21,2.21,11.7,2,11.17,2H4C2.9,2,2,2.9,2,4v7.17c0,0.53,0.21,1.04,0.59,1.41l8.83,8.83 c0.78,0.78,2.05,0.78,2.83,0l7.17-7.17C22.2,13.46,22.2,12.2,21.41,11.41z M6.5,8C5.67,8,5,7.33,5,6.5S5.67,5,6.5,5S8,5.67,8,6.5 S7.33,8,6.5,8z"/>
            </g>
        </svg>
    {:else if type == "TRANSACTION_FEE_MESSAGE" }
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
            <g>
                <rect fill="none" height="24" width="24"/>
            </g>
            <g>
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.89,11.1c-1.78-0.59-2.64-0.96-2.64-1.9c0-1.02,1.11-1.39,1.81-1.39 c1.31,0,1.79,0.99,1.9,1.34l1.58-0.67c-0.15-0.44-0.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6,0.56-2.62,2.85-2.62,2.96 c0,2.27,2.25,2.91,3.35,3.31c1.58,0.56,2.28,1.07,2.28,2.03c0,1.13-1.05,1.61-1.98,1.61c-1.82,0-2.34-1.87-2.4-2.09L8.1,14.75 c0.63,2.19,2.28,2.78,3.02,2.96V19h1.75v-1.24c0.52-0.09,3.02-0.59,3.02-3.22C15.9,13.15,15.29,11.93,12.89,11.1z"/>
            </g>
        </svg>
    {:else if type == "PAYOUT_MESSAGE" }
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/>
        </svg>
    {/if}
    <main>
        <p data-container="message">{@html message}</p>
        <p data-container="date">{date}</p>
    </main>
</section>
<style lang="less">
    section {
        padding: 10px;
        width: 240px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-family: Arial, Helvetica, sans-serif;
        height: auto;
        border-style: none;
        border-left-style: solid;
        border-left-width: 4px;
        border-radius: 0;
        border-color: transparent;
        color: #303030; 
        cursor: pointer;
        &:hover {
            background-color: rgba(232, 232, 229, 0.3);
        }       
        &[data-theme="dark"] {
            color: rgb(245,245,245);
            &:hover {
                background-color: rgba(81, 79, 79, 0.3);
            }
            main p[data-container="date"] {
                color: rgb(190,185,185);
            } 
        }
        &[data-has-read="false"] {
            border-left-color: #06d6a0;
        }
        svg {
            fill: #06d6a0;
            height: 35px;
            width: 35px;
        }
        main {
            width: calc(100% - 65px);
            margin-left: 5px;
            p {
                margin: 0 0 0 0;
                padding: 0 0 0 0;
                width: 100%;
                height: auto;
                &[data-container="message"] {
                    margin-top: 10px;
                    font-size: 16.5px;
                    padding-bottom: 5px;
                }
                &[data-container="date"] {
                    text-align: right;
                    font-size: 13.35px;
                    padding-bottom: 4.5px;
                    font-weight: lighter;
                    color: rgb(121, 125, 125);
                }
            }
        }
    }
</style>