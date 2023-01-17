<script lang="ts">
    export let theme:"system"|"light"|"dark" = "system"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let websiteName:string = "Astaroid"
    export let githubLink:string = "#github"
    export let twitterLink:string = "#twitter"
    export let privacyPolicyLink:string = "#privacy-policy"
    export let websiteTutorialLink:string = "#welcome"
    export let discordLink:string = "#discord"
    export let authorName:string = "author"
</script>
<footer style="width: {`${width}${unit}`}" data-theme={theme}>
    <main data-container="inner-container">
        <section data-container="footer-sections" style="width: 320px">
            <a target="	_blank" href={websiteTutorialLink} data-text="item">
                What's {websiteName}?
            </a>
            <a target="	_blank" href={privacyPolicyLink} data-text="item">
                Privacy Policy
            </a>
        </section>
        <section data-container="footer-sections" style="width: 240px; padding-top: 20px; padding-bottom: 30px">
            <a target="	_blank" href={twitterLink} data-text="item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
            </a>
            <a target="	_blank" href={githubLink} data-text="item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
            </a>
            <a target="	_blank" href={discordLink} data-text="item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
            </a>
        </section>
        <section data-container="footer-detail">
            <p>
                Copyright &copy; {authorName}.
            </p>
            <p>
                All right reserved.
            </p>
        </section>
    </main>
</footer>
<style lang="less">
    footer {
        padding: 0 0 0 0;
        height: 210px;
        width: 100%;
        background-color: #f5f5f5;
        border-style: solid;
        border-width: 0;
        font-family: Arial, Helvetica, sans-serif;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top: 15px;
        bottom: 0px;
        main[data-container="inner-container"] {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 400px;
            section[data-container="footer-sections"] {
                max-width: calc(70% - 30px);
                padding-top: 25px;
                padding-inline: 15px;
                padding-bottom: 10px;
                height: auto;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                a[data-text="item"] {
                    text-transform: capitalize;
                    color: rgb(125, 125, 125);
                    text-decoration: none;
                    font-size: 16.75px;
                    width: fit-content;
                    transition-property: transform;
                    transition-duration: 180ms;
                    cursor: pointer;
                    svg {
                        fill: rgb(73, 73, 73);
                        height: 24px;
                        width: 24px;
                    }
                    &:link {
                        outline: none;
                    }
                    &:hover {
                        transform: translateY(-2.5px);
                    }
                }
                
            }
            section[data-container="footer-detail"] {
                width: 100%;
                height: 45px;
                color: rgb(125, 125, 125);
                p {
                    margin: 0 0 0 0;
                    padding: 0 0 0 0;
                    margin-bottom: 5px;
                    font-size: 14px;
                    text-align: center;
                }
            }
            @media screen and (min-width: 280px) {
                width: 100%;
            }
            @media screen and (min-width: 320px) {
                width: 100%;
            }
            @media screen and (min-width: 600px) {
                width: 650px;
            }  
            @media screen and (min-width: 912px) {
                width: 820px;
            }
            @media scree and (min-width: 1024px) {
                width: 860px;
            }
            @media screen and (min-width: 1280px) {
                width: 1020px;
            }
        }
        @media screen and (min-width: 240px) {
            height: 235px;
        }
        @media screen and (min-width: 241px) {
            height: 210px;
        }
        @media screen and (max-width: 599px) {
            main[data-container="inner-container"] {
                section[data-container="footer-sections"] {
                    max-width: calc(95% - 30px);
                    a[data-text="item"] {
                        font-size: 17.35px;
                    }
                }
                section[data-container="footer-detail"] {
                    p {
                        font-size: 15.25px;
                    }
                }
            }
        }
        &[data-theme="dark"] {
            background-color: #212121;
            border: none;
            main[data-container="inner-container"] {
                section[data-container="footer-sections"] a {
                    color: rgb(118, 116, 116);
                    svg {
                        fill: rgb(230, 230, 230);
                    }
                }
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                background-color: #212121;
                border: none;
                main[data-container="inner-container"] {
                    section[data-container="footer-sections"] a {
                        color: rgb(118, 116, 116);
                        svg {
                            fill: rgb(230, 230, 230);
                        }
                    }   
                }
            }
        }
    }
</style>