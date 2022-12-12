import SelectInput from "../../lib/component/select-input.svelte"

export default {
    title: "Component/Input component/Select Input",
    component: SelectInput,
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
        theme: {
            type: { required: true, name: "string" },
            description: "The theme of the component",
            defaultValue: "light",
            control: {
                type: "select",
                options: [ "light", "dark", "system" ]
            }
        },
        placeholder: {
            type: { name: "string" },
            defaultValue: "Placeholder",
            description: "The placeholder of the select input",
            control: {
                type: "text"
            }
        },
        width: {
            type: { name: "number" },
            description: "The width of the component",
            control: {
                type: "number"
            },
            defaultValue: 150
        },
        unit: {
            type: { name: "string" },
            description: "The unit of width of the component",
            defaultValue: "px",
            control: {
                type: "select",
                options: [ "pt", "mm", "pc", "cm", "in", "%", "px" ]
            }
        },
        disabled: {
            type: { name: "boolean" },
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true the select input is disabled"
        },
        options: {
            description: "The list options available to the select input",
            control: {
                type: "object"
            },
            defaultValue: ["Option 1", "Option 2", "Option 3"]
        },
        value: {
            type: { name: "string" },
            description: "The value of the select input",
            control: {
                type: "text"
            }
        }
    }
}

const Template  = (args:any) => ({
    Component: SelectInput,
    props: args
})

export const Input = Template.bind({})

export const DarkInput = Template.bind({})
DarkInput.args = {
    theme: "dark"
}

DarkInput.parameters = {
    backgrounds: {
        default: 'dark'
    }
}