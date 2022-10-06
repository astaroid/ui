<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"

    export let theme:"light"|"dark" = "light"
    export let searchBy:"volume"|"price"|"color"|"rarest" = "color"
    export let searchValue:string|number = String()
    export let selected:boolean = false

    const dispatcher = createEventDispatcher()

    const onClicked = () => {
        if (selected)
            dispatcher("onClicked", { searchBy, searchValue })
    }
    let section:HTMLElement = null

    onMount(() => {
        section.addEventListener("pointerenter", () => {
            if (section.matches(":hover")) {
                dispatcher("onHover")
            }
        })

        section.addEventListener("pointerleave", () => {
            dispatcher("onHoverOut")
        })
    })
</script>
<section bind:this={section} data-selected={selected} on:click={onClicked} data-search-by={searchBy} data-theme={theme}>
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        by {searchBy}
    </span>
    <p>
        {searchValue}
    </p>
</section>
<style lang="less">
    section {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: calc(100% - 16px);
        font-family: Arial, Helvetica, sans-serif;
        border: none;
        padding-inline: 8px;
        padding-block: 14px;
        cursor: pointer;
        p, 
        span {
            margin: 0 0 0 0;
            padding: 0 0 0 0;
            
        }
        span {
            background-color: #06d6a0;
            color: white;
            padding-inline: 10px;
            font-size: 13.35px;
            padding-block: 4px;
            border-style: solid;
            border-width: 0;
            border-radius: 18px;
            margin-right: 7px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            text-transform: capitalize;
            svg {
                fill: white;
                stroke: white;
                width: 17.7px;
                height: 17.7px;
                margin-right: 2.5px;
            }
        }
        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &[data-selected="true"] {
            background-color: #f5f5f5;
        }
        &[data-search-by="color"] {
            p {
                width: calc(100% - 100px);
            }
        }
        &[data-search-by="volume"] {
            p {
                width: calc(100% - 112px);
            }
        }
        &[data-search-by="price"] {
            p {
                width: calc(100% - 98px);
            }
        }
        &[data-search-by="rarest"] {
            p {
                width: calc(100% - 107px);
            }
        }
        &[data-theme="dark"] {
            color: rgb(135, 135, 135);
            border-top-color: #474849;
            &[data-selected="true"] {
                background-color: #212121;
            }
        }
    }
</style>