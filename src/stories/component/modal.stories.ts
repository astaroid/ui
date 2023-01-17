import Modal from "../../lib/component/modal.svelte"

export default {
    title: "Component/Modal",
    component: Modal,
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
        onInput: {
            action: "onInput", 
            description: "The event emitter when a value is inputted into modal input box"
        },
        onClickedOutside: {
            action: "onClickedOutside", 
            description: "The event emitter when the user click outside the modal"
        },
        onLeftButtonClicked: {
            action: "onLeftButtonClicked", 
            description: "The event emitter when the modal left button is clicked"
        },
        onRightButtonClicked: {
            action: "onRightButtonClicked", 
            description: "The event emitter when the modal right button is clicked"
        },
        leftButton: {
            name: "left button",
            description: "The metadata for the modal left button",
            control: {
                type: "object"
            },
            defaultValue: {
                type: "default",
                text: "Cancel",
                loading: false,
                disabled: false
            }
        },
        rightButton: {
            name: "right button",
            description: "The metadata for the modal right button",
            control: {
                type: "object"
            },
            defaultValue: {
                type: "info",
                text: "Next",
                disabled: false,
                loading: false
            }
        },
        message: {
            description: "The message of the modal",
            control: {
                type: "text"
            }
        },
        title: {
            type: { name: "string", required: true },
            description: "The title of the modal",
            control: {
                type: "text"
            }
        },
        type: {
            type: { name: "string", required: true },
            description: "The type of the modal",
            control: {
                type: "select",
                options: ["success", "info", "warning", "error"]
            },
            defaultValue: "info" 
        },
        show: {
            type: { name: "boolean" },
            description: "If true the component will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        input: {
            description: "The metadata for the modal input box",
            control: {
                type: "object"
            },
            defaultValue: {
                show: false,
                type: "text",
                placeholder: String(),
                error: false,
                errorMessage: String(),
                value: null
            },
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

const Template  = (args:any) => ({
    Component: Modal,
    props: args,
    on: {
        onClickedOutside: args.onClickedOutside,
        onRightButtonClicked: args.onRightButtonClicked,
        onLeftButtonClicked: args.onLeftButtonClicked,
        onInput: args.onInput
    }
})

export const Container = Template.bind({})

export const DarkContainer = Template.bind({})
DarkContainer.args = {
    theme: "dark"
}
DarkContainer.parameters = {
    backgrounds: {
        default: 'dark'
    }
}