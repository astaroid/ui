<script lang="ts">
    type PageType = "home"|"asset"

    export let theme:"system"|"light"|"dark" = "system"
    export let type:"no-result"|"no-asset" = "no-result"
</script>
<section data-theme={theme}>
    {#if type == "no-result" }
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <span>Nothing found</span>
    {:else if type == "no-asset"}
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" viewBox="0 0 20 20">
            <g><path d="M16,3H4L2,8l8,9l8-9L16,3z M8.21,7.25L9.59,4.5h0.82l1.38,2.75H8.21z M9.25,8.75v5.15L4.67,8.75H9.25z M10.75,8.75h4.58 l-4.58,5.15V8.75z M16.08,7.25h-2.62L12.09,4.5h2.9L16.08,7.25z M5.02,4.5h2.9L6.54,7.25H3.92L5.02,4.5z"/></g>
        </svg>
        <span>No asset bought</span>
    {/if}
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
            fill: rgb(170, 170, 170);
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
                fill: rgb(100, 100, 100); 
            }
            span {
                color: rgb(117, 117, 117);
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                svg {
                    fill: rgb(100, 100, 100); 
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