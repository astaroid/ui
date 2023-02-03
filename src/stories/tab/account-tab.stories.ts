import AccountTab from "../../lib/tab/account-tab.svelte"

export default {
    title: "Tab/Account Tab",
    component: AccountTab,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: "light",
            values: [
                { name: 'light', value: '#fafafa' },
                { name: 'dark', value: '#303030' },
            ]
        }
    },
    argTypes: {
        onOpened: {
            action: "onOpened", 
            description: "The event emitter when the activity tab is opened"
        },
        onClosed: {
            action: "onClosed", 
            description: "The event emitter when the activity tab is closed"
        },
        onRequestEmailVerification: {
            action: "onRequestEmailVerification",
            description: "The event emitter when the user request for email verification"
        },
        onRequestCoinPurchase: {
            action: "onRequestCoinPurchase",
            description: "The event emitter when the user request to get a coin"
        },
        onRequestCrystalPurchase: {
            action: "onRequestCrystalPurchase",
            description: "The event emitter when the user request to buy a crystal"
        },
        onRequestPayout: {
            action: "onRequestPayout",
            description: "The event emitter when the user request for cash payout"
        },
        onRequestProfileImageChange: {
            action: "onRequestProfileImageChange",
            description: "The event emitter when the user request to change profile image"
        },
        onRequestUsernameChange: {
            action: "onRequestUsernameChange",
            description: "The event emitter when the user request to change username"
        },
        onRequestEmailChange: {
            action: "onRequestEmailChange",
            description: "The event emitter when the user request to change email"
        },
        onRequestPasswordChange: {
            action: "onRequestPasswordChange",
            description: "The event emitter when the user request to change password"
        },
        onRequestThemeChange: {
            action: "onRequestThemeChange",
            description: "The event emitter when the user request to change theme"
        },
        onRequestLoggingOut: {
            action: "onRequestLoggingOut",
            description: "The event emitter when the user request to logout"
        },
        onRequestDeletingAccount: {
            action: "onRequestDeletingAccount",
            description: "The event emitter when the user request to delete account"
        },
        loading: {
            name: "loading",
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the loading spinner animation will start",
            control: { type: "boolean" }
        },
        show: {
            type: { name: "boolean" },
            description: "If true the component will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        theme: {
            name: "theme",
            type: { required: true, name: "string" },
            description: "The theme of the component",
            defaultValue: "light",
            control: {
                type: "select",
                options: [ "light", "dark", "system" ]
            }
        },
        user: {
            description: "The Javascript object representation of the user",
            type: { required: true },
            control: {
                type: "object"
            },
            defaultValue: {
                username: "user_001",
                email: "usernameemail@gmail.com",
                assetCount: 10000,
                coin: 10000,
                verified: false
            }
        },
        payoutOptions: {
            description: "The list of all available payout options",
            type: { required: true },
            control: {
                type: "object"
            },
            defaultValue:  [
                {
                    coin: 50,
                    cash: 1
                },
                {
                    coin: 100,
                    cash: 2
                },
                {
                    coin: 10000,
                    cash: 200
                }
            ]
        }
    }
}

const Template = (args:any) => ({
    Component: AccountTab,
    props: args,
    on: {
        onClosed: args.onClosed,
        onOpened: args.onOpened,
        onRequestEmailVerification: args.onRequestEmailVerification,
        onRequestCrystalPurchase: args.onRequestCrystalPurchase,
        onRequestCoinPurchase: args.onRequestCoinPurchase,
        onRequestPayout: args.onRequestPayout,
        onRequestProfileImageChange: args.onRequestProfileImageChange,
        onRequestUsernameChange: args.onRequestUsernameChange,
        onRequestEmailChange: args.onRequestEmailChange,
        onRequestPasswordChange: args.onRequestPasswordChange,
        onRequestThemeChange: args.onRequestThemeChange,
        onRequestLoggingOut: args.onRequestLoggingOut,
        onRequestDeletingAccount: args.onRequestDeletingAccount
    }
})

export const Tab = Template.bind({})
Tab.args = {
    theme: "light"
}

export const DarkTab = Template.bind({})
DarkTab.args = {
    theme: "dark"
}
DarkTab.parameters = {
    backgrounds: {
        default: 'dark'
    }
}