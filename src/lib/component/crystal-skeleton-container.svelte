<script lang="ts">
    export let theme:"light"|"dark" = "light"
</script>
<section data-theme={theme}>
    <div data-container="crystal-container"></div>
    <div data-container="crystal-detail-container">
        <span></span>
        <span></span>
    </div>
    <button></button>
</section>
<style lang="less">
    @keyframes blinking-effect {
        0% {
            opacity: 0.45;
        }
        50% {
            opacity: 0.85;
        }  
        100% {
            opacity: 0.45;
        }
    }
    @keyframes dark-blinking-effect {
        0% {
            background-color: rgb(55, 55, 55);
        }
        50% {
            background-color: rgb(61, 61, 61);
        }  
        100% {
            background-color: rgb(55, 55, 55);
        }
    }
    section {
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        &[data-theme="dark"] {
            button,
            div[data-container="crystal-container"],
            div[data-container="crystal-detail-container"] span {
                animation-name: dark-blinking-effect;
                background-color: rgb(55, 55, 55);
            }
        }
        div[data-container="crystal-container"] {
            width: 220px;
            height: 240px;
            background-color: rgb(236, 236, 236);
            border-width: 0;
            border-style: solid;
            border-radius: 8px;
            animation: blinking-effect 1s infinite linear;
            animation-play-state: running;
        }
        div[data-container="crystal-detail-container"] {
            width: 220px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-block: 9.5px;
            span {
                width: 95px;
                height: 38px;
                border-width: 0;
                border-style: solid;
                border-radius: 5px;
                background-color: rgb(236, 236, 236);
                animation: blinking-effect 1s infinite linear;
            }
        }
        button {
            border-width: 0;
            border-style: solid;
            border-radius: 5px;
            background-color: rgb(236, 236, 236);
            animation: blinking-effect 1s infinite linear;
            width: 220px;
            height: 47px;
            outline: none;
            &:focus {
                outline: none;
            }
        }
    }
</style>