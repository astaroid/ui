<script lang="ts">
    import moment from "moment"
    import { Temporal } from "@js-temporal/polyfill"
    import { createEventDispatcher } from "svelte"

    type NotificationMessageType = "SOLD_ASSET_MESSAGE"|
        "BOUGHT_CRYSTAL_MESSAGE"|
        "TRANSACTION_FEE_MESSAGE"|
        "PAYOUT_MESSAGE"

    export let theme:"system"|"light"|"dark" = "system"
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
    {:else if type == "SOLD_ASSET_MESSAGE" }
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" viewBox="0 0 20 20">
        <g>
            <path d="M16,3H4L2,8l8,9l8-9L16,3z M8.21,7.25L9.59,4.5h0.82l1.38,2.75H8.21z M9.25,8.75v5.15L4.67,8.75H9.25z M10.75,8.75h4.58 l-4.58,5.15V8.75z M16.08,7.25h-2.62L12.09,4.5h2.9L16.08,7.25z M5.02,4.5h2.9L6.54,7.25H3.92L5.02,4.5z"/>
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
            background-color: rgba(232, 232, 232, 0.3);
        }       
        &[data-theme="dark"] {
            color: rgb(245,245,245);
            &:hover {
                background-color: rgba(101, 99, 99, 0.3);
            }
            main p[data-container="date"] {
                color: rgb(190,185,185);
            } 
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                color: rgb(245,245,245);
                &:hover {
                    background-color: rgba(101, 99, 99, 0.3);
                }
                main p[data-container="date"] {
                    color: rgb(190,185,185);
                } 
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
                    font-size: 16.5px;
                    padding-bottom: 5px;
                }
                &[data-container="date"] {
                    font-size: 13.35px;
                    padding-bottom: 4.5px;
                    font-weight: lighter;
                    color: rgb(121, 125, 125);
                }
            }
        }
    }
</style>