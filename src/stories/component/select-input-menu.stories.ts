import SelectInputMenu from "../../lib/component/select-input-menu.svelte"

export default {
    title: "Component/Input component/Select Input Menu",
    component: SelectInputMenu,
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
        onSelect: {
            action: "onSelect",
            description: "The event emitted when the select input menu option is selected"
        },
        theme: {
            type: { required: true, name: "string" },
            description: "The theme of the component",
            defaultValue: "light",
            control: {
                type: "select",
                options: [ "light", "dark", "system" ]
            }
        },
        show: {
            type: { name: "boolean" },
            description: "If true the component will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        options: {
            description: "The list of available options to the select input",
            control: {
                type: "object"
            },
            defaultValue: ["Option 1", "Option 2", "Option 3"]
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
        y: {
            defaultValue: 0,
            type: { name: "number" },
            control: { type: "number" },
            description: "The position of the select input menu on the y-axis",
        },
        x: {
            defaultValue: 0,
            type: { name: "number" },
            control: { type: "number" },
            description: "The position of the select input menu on the x-axis",
        },
        height: {
            defaultValue: 50,
            type: { name: "number" },
            control: { type: "number" },
            description: "The height of the select input menu",
        }
    }
}

const Template  = (args:any) => ({
    Component: SelectInputMenu,
    props: args,
    on: {
        onSelect: args.onSelect
    }
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