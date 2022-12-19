import MessageBar from "../../lib/component/message-bar.svelte"

export default {
    title: "Component/Message Bar",
    component: MessageBar,
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
        onInputClicked: {
            action: "onInputClicked",
            description: "The event emitter when the input is clicked"
        },
        onExit: {
            action: "onExit",
            description: "The event emitter when the exit button is clicked"
        },
        message: {
            type: { name: "string", required: true },
            description: "The message to display in the message bar",
            defaultValue: "message",
            control: { type: "text" }
        },
        inputText: {
            name: "input text",
            type: { name: "string", required: true },
            description: "The message to display in the message bar",
            defaultValue: "click me",
            control: { type: "text" }
        },
        type: {
            type: { name: "string", required: true  },
            defaultValue: "normal",
            description: "The type of message",
            control: {
                type: "select",
                options: [ "normal", "removable", "input-able" ]
            }
        },
        show: {
            name: "show",
            type: { name: "boolean" },
            description: "If true the component will be shown",
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
        }
    }
}

const Template = (args:any) => ({
    Component: MessageBar,
    props: args,
    on: {
        onInputClicked: args.onInputClicked,
        onExit: args.onExit
    }
})

export const Container = Template.bind({})

export const DarkContainer = Template.bind({})
DarkContainer.parameters = {
    backgrounds: {
        default: "dark"
    }
}