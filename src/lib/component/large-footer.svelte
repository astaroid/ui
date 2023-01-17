<script lang="ts">
    import { Temporal } from "@js-temporal/polyfill"
    interface FooterLinks {
        product: {
            crystal: string
            coin: string
        }
        company: {
            blog: string
            careers: string
            about: string
        }
        contact: {
            twitter: string
            github: string
            discord: string
        }
        legal: {
            termsOfService: string
            privacyPolicy: string
        }
    }

    export let theme:"system"|"light"|"dark" = "system"
    export let width:number = 100
    export let unit:"px"|"mm"|"pt"|"cm"|"pc"|"in"|"%" = "%"
    export let links:FooterLinks

    let year = Temporal.Now.zonedDateTimeISO().year
</script>
<footer style="width: {`${width}${unit}`}" data-theme={theme}>
    <main data-container="inner-container">
        <section data-container="footer-sections">
            <div data-container="footer-sections-item">
                <p data-text="header">
                    product
                </p>
                <a target="	_blank" href={links.product.crystal} data-text="item">
                    crystal
                </a>
                <a target="	_blank" href={links.product.coin} data-text="item">
                    coin
                </a>
            </div>
            <div data-container="footer-sections-item">
                <p data-text="header">
                    company
                </p>
                <a target="	_blank" href={links.company.about} data-text="item">
                    about
                </a>
                <a target="	_blank" href={links.company.careers} data-text="item">
                    careers
                </a>
                <a target="	_blank" href={links.company.blog} data-text="item">
                    blog
                </a>
            </div>
            <div data-container="footer-sections-item">
                <p data-text="header">
                    contact
                </p>
                <a target="	_blank" href={links.contact.twitter} data-text="item">
                    twitter
                </a>
                <a target="	_blank" href={links.contact.discord} data-text="item">
                    discord
                </a>
                <a target="	_blank" href={links.contact.github} data-text="item">
                    github
                </a>
            </div>
            <div data-container="footer-sections-item">
                <p data-text="header">
                    legal
                </p>
                <a target="	_blank" href={links.legal.privacyPolicy} data-text="item">
                    privacy policy
                </a>
                <a target="	_blank" href={links.legal.termsOfService} data-text="item">
                    terms of service
                </a>
            </div>
        </section>
        <section data-container="footer-detail">
            <p>
                Copyright &copy; {year} Astaroid
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
        height: 285px;
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
                width: calc(100% - 35px);
                padding-block: 25px;
                padding-inline: 15px;
                height: calc(77% - 75px);
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                div[data-container="footer-sections-item"] {
                    display: flex;
                    flex-direction: column;
                    p[data-text="header"] {
                        text-transform: uppercase;
                        color: #212121;
                        font-size: 15.25px;
                        font-weight: 700;
                        margin: 0 0 0 0;
                        margin-bottom: 20px;
                    }
                    a[data-text="item"] {
                        text-transform: capitalize;
                        color: rgb(125, 125, 125);
                        margin-bottom: 13px;
                        text-decoration: none;
                        font-size: 16.5px;
                        width: fit-content;
                        transition-property: transform;
                        transition-duration: 180ms;
                        &:link {
                            outline: none;
                        }
                        &:hover {
                            transform: translateY(-2.5px);
                        }
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
        @media screen and (max-width: 599px) {
            height: 425px;
            main[data-container="inner-container"] {
                section[data-container="footer-sections"] {
                    height: calc(84% - 75px);
                    grid-template-columns: repeat(2, 1fr);
                    row-gap: 10px;
                    div[data-container="footer-sections-item"] {
                        p[data-text="header"] {
                            font-size: 16.35px;
                        }
                        a[data-text="item"] {
                            font-size: 17.75px;
                        }
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
                section[data-container="footer-sections"] div[data-container="footer-sections-item"]  {
                    p[data-text="header"] {
                        color: rgb(248, 246, 246);
                    }
                    a[data-text="item"] {
                        color: rgb(118, 116, 116);
                    }
                }
                section[data-container="footer-detail"] {
                    color: rgb(118, 116, 116);
                }
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                background-color: #212121;
                border: none;
                main[data-container="inner-container"] {
                    section[data-container="footer-sections"] div[data-container="footer-sections-item"]  {
                        p[data-text="header"] {
                            color: rgb(248, 246, 246);
                        }
                        a[data-text="item"] {
                            color: rgb(118, 116, 116);
                        }
                    }
                    section[data-container="footer-detail"] {
                        color: rgb(118, 116, 116);
                    }
                }
            }
        }
    }
</style>