import AccountSectionItem from "../../lib/component/account-section-item.svelte"

export default {
    title: "Component/Account Tab component/Account Section Item",
    component: AccountSectionItem,
    parameters: {
        backgrounds: {
            default: "light",
            values: [
                { name: 'light', value: '#fefefe' },
                { name: 'dark', value: '#242424' },
            ]
        }
    },
    argTypes: {
        onInput: {
            action: "onInput", 
            description: "The event emitter when a value is inputted"
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
        id: {
            type: { required: true, name: "string" },
            control: { type: "text" },
            defaultValue: "account-section-item-001",
            description: "The unique identification of the account section item"
        },
        title: {
            type: { name: "string" },
            description: "The title of the account section item",
            control: {
                type: "text"
            },
            defaultValue: "Section"
        },
        description: {
            type: { name: "string" },
            description: "The description of the account section item",
            control: {
                type: "text"
            },
            defaultValue: "Section item"
        },
        type: {
            type: { name: "string" },
            description: "The type of the account section item",
            control: {
                type: "select",
                options: [ "button", "select", "checkbox", "switch" ]
            },
            defaultValue: "button"
        },
        divider: {
            type: { name: "boolean" },
            description: "If true the account section item divider is shown",
            control: {
                type: "boolean"
            },
            defaultValue: true
        },
        color: {
            type: { name: "string" },
            defaultValue: "#228be6",
            control: { type: "color" },
            description: "The color of the account section item checkbox, switch or button"
        },
        label: {
            type: { name: "string" },
            defaultValue: "label",
            control: { type: "text" },
            description: "The label of account section item checkbox or switch"
        },
        checked: {
            type: { name: "boolean" },
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true the account section item is checkbox or switch checked"
        },
        disabled: {
            type: { name: "boolean" },
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true the account section item checkbox, switch or button is disabled"
        },
        options: {
            description: "The list options available to the account section item select input",
            control: {
                type: "object"
            },
            defaultValue: ["Section 1", "Section 2", "Section 3"]
        },
        value: {
            type: { name: "string" },
            description: "The value of the account section item select input",
            control: {
                type: "text"
            },
            defaultValue: "Select 0"
        },
        placeholder: {
            type: { name: "string" },
            defaultValue: "Placeholder",
            description: "The placeholder of the account section item select input",
            control: {
                type: "text"
            }
        }
    }
}

const Template = (args:any) => ({
    Component: AccountSectionItem,
    props: args,
    on: {
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
        default: "dark"
    }
}