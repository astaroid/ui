<script lang="ts">
    export let theme:"system"|"light"|"dark" = "system"
</script>
<section data-theme={theme}>
    <div data-container="asset-container"></div>
    <div data-container="asset-detail-container">
        <span></span>
        <span></span>
    </div>
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
            div[data-container="asset-container"],
            div[data-container="asset-detail-container"] span {
                animation-name: dark-blinking-effect;
                background-color: rgb(55, 55, 55);
            }
        }
        div[data-container="asset-container"] {
            width: 240px;
            height: 280px;
            background-color: rgb(236, 236, 236);
            border-width: 0;
            border-style: solid;
            border-radius: 8px;
            animation: blinking-effect 1s infinite linear;
            animation-play-state: running;
        }
        div[data-container="asset-detail-container"] {
            width: 240px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-block: 12px;
            span {
                width: 95px;
                height: 40px;
                border-width: 0;
                border-style: solid;
                border-radius: 5px;
                background-color: rgb(236, 236, 236);
                animation: blinking-effect 1s infinite linear;
            }
        }

        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                div[data-container="asset-container"],
                div[data-container="asset-detail-container"] span {
                    animation-name: dark-blinking-effect;
                    background-color: rgb(55, 55, 55);
                }
            }
        }

        @media screen and (max-width: 495px) {
            div[data-container="asset-container"],
            div[data-container="asset-detail-container"] {
                width: 100%;
            }
            
            div[data-container="asset-detail-container"] span {
                width: calc(45% - 15px);
                height: 42.25px;
            }
        }
    }
</style>