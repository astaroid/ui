import TextInput from "../../lib/component/text-input.svelte"

export default {
    title: "Component/Input component/Text Input",
    component: TextInput,
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#fafafa' },
                { name: 'dark', value: '#303030' },
            ],
        },
    },
    argTypes: {
        onInput: {
            action: "onInput", 
            description: "The event emitter when a value is inputted"
        },
        message: {
            name: "message",
            type: { name: "string", required: true },
            description: "The error message display",
            defaultValue: "Error",
            control: {
                type: "text"
            }
        },
        placeholder: {
            name: "placeholder",
            type: { name: "string" },
            description: "The placeholder of the component",
            control: {
                type: "text"
            }
        },
        error: {
            name: "error",
            defaultValue: false,
            type: { name: "boolean", required: true },
            description: "If true the component input value is wrong",
            control: {
                type: "boolean"
            }
        },
        width: {
            name: "width",
            type: { name: "number", required: true },
            description: "The width of the component",
            control: {
                type: "number"
            },
            defaultValue: 100
        },
        unit: {
            name:"unit",
            type: { name: "string" },
            description: "The unit of width of the component",
            defaultValue: "%",
            control: {
                type: "select",
                options: [ "pt", "mm", "pc", "cm", "in", "%", "px" ]
            }
        },
        type: {
            name:"type",
            type: { name: "string", required: true },
            description: "The type of the input component",
            defaultValue: "text",
            control: {
                type: "select",
                options: [ "text", "password", "email", "search" ]
            }
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
    Component: TextInput,
    props: args,
    on: {
        onInput: args.onInput
    }
})

export const Input = Template.bind({})
Input.args = {
    theme: "light"
}

export const DarkInput = Template.bind({})
DarkInput.args = {
    theme: "dark"
}
DarkInput.parameters = {
    backgrounds: {
        default: 'dark'
    }
}