<script lang="ts">
    type PageType = "home"|"asset"

    export let theme:"system"|"light"|"dark" = "system"
</script>
<section data-theme={theme}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
    <span>Nothing found</span>
</section>
<style lang="less">
    section {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-family: Arial, Helvetica, sans-serif;
        justify-content: center;
        align-items: center;
        position: absolute;
        svg {
            fill: rgb(185, 185, 185);
            height: 85px;
            width: 85px;
        }
        span {
            color: rgb(127, 127, 127);
            margin-top: 15px;
            font-size: 26.75px;
            font-weight: 700;
        }
        &[data-theme="dark"] {
            svg {
                fill: rgb(87, 87, 87); 
            }
            span {
                color: rgb(117, 117, 117);
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                svg {
                    fill: rgb(87, 87, 87); 
                }
                span {
                    color: rgb(117, 117, 117);
                }
            }
        }
        @media screen and (min-width: 280px) {
            svg {
                height: 80px;
                width: 80px;
            }
            span {
                font-size: 24.75px;
            }
        }
        @media screen and (min-width: 320px) {
            svg {
                height: 85px;
                width: 85px;
            }
            span {
                font-size: 26.75px;
            }
        }
        @media screen and (min-width: 1024px) {
            svg {
                height: 89px;
                width: 89px;
            }
            span {
                font-size: 29.75px;
            }
        }
    }
</style>