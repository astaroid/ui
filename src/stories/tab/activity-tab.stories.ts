import ActivityTab from "../../lib/tab/activity-tab.svelte"

export default {
    title: "Tab/Activity Tab",
    component: ActivityTab,
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
        onMessageClicked: {
            action: "onMessageClicked",
            description: "The event emitter when a activity message is clicked"
        },
        onHideMessages: {
            action: "onHideMessages",
            description: "The event emitter when a type of activity message is toggled to hidden"
        },
        onShowMessages: {
            action: "onShowMessages",
            description: "The event emitter when a type of activity message is toggled to shown"
        },
        show: {
            type: { name: "boolean" },
            description: "If true the component will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        showBoughtCrystalMessages: {
            description: "If true all bought crystal messages will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        showSoldAssetMessages: {
            description: "If true all solid asset messages will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        showTransactionFeeMessages: {
            description: "If true all transaction fee messages will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        position: {
            type: { name: "string" },
            description: "The CSS position of the component",
            defaultValue: "absolute",
            control: {
                type: "select",
                options: [ "fixed", "absolute" ]
            }
        },
        showPayoutMessages: {
            description: "If true all payout messages will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        loading: {
            name: "loading",
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the loading spinner animation will start",
            control: { type: "boolean" }
        },
        messages: {
            description: "The list of all the activity messages",
            control: {
                type: "object"
            },
            defaultValue: [
                { 
                    "read": false, 
                    "createdAt": "now", 
                    "type": "BOUGHT_CRYSTAL_MESSAGE", 
                    "id": "123", 
                    "message": `Crystal bought for <img src="/coin.png" style="width: 26px; margin-bottom: -6px; margin-right: -3px"> 34`
                },
                { 
                    "read": true, 
                    "createdAt": "now", 
                    "type": "SOLD_ASSET_MESSAGE", 
                    "id": "133", 
                    "message": "Asset sold" 
                }
            ]
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
        }
    }
}

const Template = (args:any) => ({
    Component: ActivityTab,
    props: args,
    on: {
        onClosed: args.onClosed,
        onOpened: args.onOpened,
        onMessageClicked: args.onMessageClicked,
        onShowMessages: args.onShowMessages,
        onHideMessages: args.onHideMessages
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
