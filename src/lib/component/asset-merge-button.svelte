<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let theme:"light"|"dark" = "light"
    export let disabled:boolean = false
    export let mode:"idle"|"active" = "idle"

    const dispatcher = createEventDispatcher()

    const onClick = () => {
        if (mode == "idle") {
            dispatcher("onStartMerge")
        } else {
            dispatcher("onEndMerge")
        }
    }
</script>
<section data-container="wapper">
    <main data-theme={theme}>
        <button style="animation-play-state: { mode == "active" ? "running" : "paused" }" on:click={() => dispatcher("onCancelMerge")} data-button="exit-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
        </button>
        <button on:click={onClick} data-mode={mode} disabled={disabled} data-button="merge-button">
            <div data-container="icon-container">
                <svg data-icon="crystal" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" viewBox="0 0 20 20">
                    <g><path d="M16,3H4L2,8l8,9l8-9L16,3z M8.21,7.25L9.59,4.5h0.82l1.38,2.75H8.21z M9.25,8.75v5.15L4.67,8.75H9.25z M10.75,8.75h4.58 l-4.58,5.15V8.75z M16.08,7.25h-2.62L12.09,4.5h2.9L16.08,7.25z M5.02,4.5h2.9L6.54,7.25H3.92L5.02,4.5z"/></g>
                </svg>
                <svg data-icon="add" style="display: { mode == "idle" ? "block" : "none" }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <svg data-icon="check" style="display: { mode == "active" ? "block" : "none" }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
            </div>
        </button>
    </main>
</section>
<style lang="less">
    @keyframes amin-exit-btn {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
    section[data-container="wapper"] {
        position: sticky;
        bottom: 0;
        padding: 0 0 0 0;
        margin: 0 0 0 0;
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
    }
    main {
        padding-block: 20px;
        padding-inline: 20px;
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            border-width: 0;
            border-style: solid;
            outline: none;
            cursor: pointer;
            box-shadow: 0px 3px 7px rgb(150, 150, 150);
            &:disabled {
                cursor: no-drop;
            }
            &:focus {
                outline: none;
            }
            &[data-button="exit-button"] {
                height: 51px;
                width: 51px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 25.5px;
                margin-bottom: 15px;
                background-color: white;
                animation-name: amin-exit-btn;
                animation-duration: 280ms;
                animation-play-state: paused;
                animation-timing-function: ease-out;
                svg {
                    height: 30px;
                    width: 30px;
                    fill: rgb(40, 40, 40);
                }
            }
            &[data-button="merge-button"] {
                border-radius: 31.5px;
                width: 63px;
                height: 63px;
                background-color: #06d6a0;
                &[data-mode="active"] {
                    background-color: #2196f3;
                    &:hover {
                        background-color: darken(#2195f3, 5);
                    }
                    &:disabled {
                        background-color: darken(#2195f3, 7);
                    }
                }
                div[data-container="icon-container"] {
                    width: 43px;
                    height: 43px;
                    display: block;
                    svg {
                        fill: white;
                        position: relative;
                        &[data-icon="crystal"] {
                            width: 40px;
                            height: 40px;
                            left: -2px;
                            top: 1.75px;
                        }
                        &[data-icon="add"],
                        &[data-icon="check"] {
                            width: 20px;
                            height: 20px;
                            stroke-width: 1.9px;
                            stroke: white;
                            top: -20px;  
                            left: 25px; 
                        }
                    }
                }
                &:hover {
                    background-color: #06c694; 
                }
                &:disabled {
                    background-color: #08b489
                }
            }
        }
        &[data-theme="dark"] {
            button {
                box-shadow: none;
                &[data-button="exit-button"] {
                    background-color: rgb(33, 33, 35);
                    border-width: 1.5px;
                    border-style: solid;
                    border-color: rgb(100, 100, 100);
                    svg {
                        fill: rgb(250, 250, 250);
                    }
                }
            }
        }
        @media screen and (max-width: 599px) {
            padding-inline: 10px;
            button[data-button="exit-button"] {
                height: 48px;
                width: 48px;
                border-radius: 24px;
                svg {
                    height: 28px;
                    width: 28px;
                }
            }
            button[data-button="merge-button"] {
                transform: scale(0.96);
            }
        }
    }
</style>