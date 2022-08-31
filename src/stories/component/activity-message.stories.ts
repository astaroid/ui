import ActivityMessage from "../../lib/component/activity-message.svelte"

export default {
    title: "Component/Activity Message",
    component: ActivityMessage,
    parameters: {
        backgrounds: {
            default: "light",
            values: [
                { name: 'light', value: '#fafafa' },
                { name: 'dark', value: '#303030' },
            ]
        }
    },
    argTypes: {
        theme: {
            type: { required: true, name: "string" },
            description: "The theme of the component",
            defaultValue: "light",
            control: {
                type: "radio",
                options: [ "light", "dark" ]
            }
        },
        width: {
            name: "width",
            type: { name: "number" },
            defaultValue: 240,
            description: "The width of the component",
            control: {
                type: "number"
            }
        },
        unit: {
            name: "unit",
            type: { name: "string" },
            description: "The unit of width of the component",
            defaultValue: "px",
            control: {
                type: "select",
                options: [ "pt", "mm", "pc", "cm", "in", "%", "px" ]
            }
        },
        createAt: {
            type: { name: "string" },
            description: "The Javascript Temporal.ZonedDateTime ISO string format of the current date when the activity message was created",
            control: { type: "text" }
        },
        type: {
            type: { required: true, name: "string" },
            description: "The type of activity message",
            defaultValue: "SOLD_ASSET_MESSAGE",
            control: {
                type: "select",
                options: [ 
                    "SOLD_ASSET_MESSAGE", "BOUGHT_CRYSTAL_MESSAGE", 
                    "TRANSACTION_FEE_MESSAGE", "PAYOUT_MESSAGE" 
                ]
            }
        },
        id: {
            type: { name: "string", required: true },
            description: "The unique identification of activity message",
            defaultValue: "00000000-0000-0000-0000-000000000000",
            control: { type: "text" }
        },
        message: {
            type: { name: "string", required: true },
            description: "The message of activity",
            defaultValue: "message",
            control: { type: "text" }
        },
        read: {
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the activity message has been read",
            control: { type: "boolean" }
        }
    }
}

const Template = (args:any) => ({
    Component: ActivityMessage,
    props: args
})

export const Message = Template.bind({})

export const DarkMessage = Template.bind({})
DarkMessage.args = {
    theme: "dark"
}
DarkMessage.parameters = {
    backgrounds: {
        default: "dark"
    }
}