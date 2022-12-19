import SwitchInput from "../../lib/component/switch-input.svelte"

export default {
    title: "Component/Input component/Switch Input",
    component: SwitchInput,
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
            name: "theme",
            type: { required: true, name: "string" },
            description: "The theme of the component",
            defaultValue: "light",
            control: {
                type: "select",
                options: [ "light", "dark", "system" ]
            }
        },
        color: {
            type: { name: "string" },
            defaultValue: "#228be6",
            control: { type: "color" },
            description: "The color of the switch input"
        },
        label: {
            type: { name: "string" },
            defaultValue: "label",
            control: { type: "text" },
            description: "The switch input label"
        },
        checked: {
            type: { name: "boolean" },
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true the switch input is checked"
        }
    }
}

const Template  = (args:any) => ({
    Component: SwitchInput,
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