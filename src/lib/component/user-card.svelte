<script lang="ts">
    export let theme:"system"|"light"|"dark" = "system"
    export let email:string
    export let username:string
    export let profileImage:string = "/default_profile_blank.jpg"
    export let coinsNumber:number = 0
    export let assetsNumber:number = 0
    export let verified:boolean = false

    const format = (value:number): string => {
        if (value >= 1000000000) {
            return (value/1000000000).toFixed(3).concat("B")
        } else if (value >= 1000000 && value < 1000000000) {
            return (value/1000000).toFixed(3).concat("M")
        } else if (value >= 10000 && value < 1000000) {
            return (value/1000).toFixed(2).concat("K")
        } else {
            return value.toFixed()
        }
    }
</script>
<section data-theme={theme}>
    <img data-image="profile-image" src={profileImage} alt="">
    <p data-text="username">{username}</p>
    <p data-text="email">{email}</p>
    <div data-container="record">
        <div data-container="record-item">
            <img src="/coin.png" alt="">
            <p>{format(coinsNumber)}</p>
        </div>
        <div data-container="record-item">
            <img src="/crystal.png" alt="">
            <p>{format(assetsNumber)}</p>
        </div>
    </div>
</section>
<style lang="less">
    section {
        width: calc(100% - 30px);
        padding-inline: 15px;
        padding-block: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
        img[data-image="profile-image"] {
            width: 62px;
            height: 62px;
            border-style: solid;
            border-width: 1px;
            border-radius: 31px;
            border-color: #e6e4e4;
        }
        p {
            padding: 0 0 0 0;
            margin: 0 0 0 0;
        }
        p[data-text="username"] {
            margin-top: 13px;
            font-size: 22px;
            font-weight: 600;
            color:  rgb(51, 55, 55);
        }
        p[data-text="email"] {
            font-size: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            color:  rgb(121, 125, 125);
        }
        div[data-container="record"] {
            width: fit-content;
            display: flex;
            justify-content: center;
            margin-top: 5px;
            div[data-container="record-item"] {
                padding: 0 0 0 0;
                margin: 0 0 0 0;
                display: flex;
                justify-content: center;
                &:nth-child(1) {
                    margin-right: 13px;
                }
                img {
                    width: 23px;
                    height: 23px;
                    margin-right: 5px;
                }
                p {
                    padding: 0 0 0 0;
                    margin: 0 0 0 0;
                    color:  rgb(61, 65, 65);
                    font-size: 17.25px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }  
            }
            

        }
        &[data-theme="dark"] {
            img[data-image="profile-image"] {
                border-color: #4e4c4c;
            }
            p[data-text="username"] {
                color: rgb(245,245,245);
            }
            p[data-text="email"] {
                color: rgb(185,180,180);
            }
            div[data-container="record"] div[data-container="record-item"] p {
                color: rgb(240,240,240);
            }
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                img[data-image="profile-image"] {
                    border-color: #4e4c4c;
                }
                p[data-text="username"] {
                    color: rgb(245,245,245);
                }
                p[data-text="email"] {
                    color: rgb(185,180,180);
                }
                div[data-container="record"] div[data-container="record-item"] p {
                    color: rgb(240,240,240);
                }
            }
        }
        @media screen and (min-width: 280px) {
            img[data-image="profile-image"] {
                width: 48px;
                height: 48px;
                border-radius: 24px;
            }
            p[data-text="username"] {
                font-size: 16.75px;
            }
            p[data-text="email"] {
                font-size: 12.75px;
            }
            div[data-container="record"] div[data-container="record-item"] {
                p {
                    font-size: 15px;
                }
                img {
                    width: 20px;
                    height: 20px;
                }
            }
        }
        @media screen and (min-width: 320px) {
            img[data-image="profile-image"] {
                width: 56px;
                height: 56px;
                border-radius: 28px;
            }
            p[data-text="username"] {
                font-size: 19.25px;
            }
            p[data-text="email"] {
                font-size: 14.75px;
            }
            div[data-container="record"] div[data-container="record-item"] {
                p {
                    font-size: 16.7px;
                }
                img {
                    width: 22px;
                    height: 22px;
                }
            }
        }
        @media screen and (min-width: 600px) {
            img[data-image="profile-image"] {
                width: 62px;
                height: 62px;
                border-radius: 31px;
            }
            p[data-text="username"] {
                font-size: 22px;
            }
            p[data-text="email"] {
                font-size: 16px;
            }
            div[data-container="record"] div[data-container="record-item"] {
                p {
                    font-size: 17.25px;
                }
                img {
                    width: 23px;
                    height: 23px;
                }
            }
        }
    }
</style>