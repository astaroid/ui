import AccountSection from "../../lib/component/account-section.svelte"

export default {
    title: "Component/Account Tab component/Account Section",
    component: AccountSection,
    parameters: {
        backgrounds: {
            default: "light",
            values: [
                { name: 'light', value: '#fefeff' },
                { name: 'dark', value: '#1e1e1e' },
            ]
        }
    },
    argTypes: {
        onInput: {
            action: "onInput", 
            description: "The event emitter when a account section item value is inputted"
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
        title: {
            type: { name: "string" },
            description: "The title of the account section",
            control: {
                type: "text"
            },
            defaultValue: "Section"
        },
        width: {
            type: { name: "number" },
            description: "The width of the component",
            control: {
                type: "number"
            },
            defaultValue: 350
        },
        unit: {
            name:"unit",
            type: { name: "string" },
            description: "The unit of width of the component",
            defaultValue: "px",
            control: {
                type: "select",
                options: [ "pt", "mm", "pc", "cm", "in", "%", "px" ]
            }
        },
        color: {
            type: { name: "string" },
            defaultValue: "#1e1e1e",
            control: { type: "color" },
            description: "The color of the account section title"
        },
        sectionItems: {
            description: "The list of the section items",
            control: {
                type: "object"
            },
            defaultValue: [
                {
                    id: "account-section-checkbox",
                    title: "Theme",
                    value: "Light",
                    type: "select",
                    options: ["System" ,"Light", "Dark"]
                },
                {
                    id: "account-section-button",
                    title: "Verification",
                    description: "Your email address not is verified",
                    type: "button",
                    label: "Verify",
                    color: "#FF4785"
                },
                {
                    id: "account-section-switch",
                    title: "Notification",
                    description: "Show notifications update",
                    type: "switch",
                    checked: true,
                    color: "#FF4785"
                },
                {
                    id: "account-section-checkbox",
                    title: "AD blocker",
                    description: "Disable AD blocker",
                    type: "checkbox",
                    disabled: true,
                    checked: true
                }
            ]
        }
    }
}

const Template = (args:any) => ({
    Component: AccountSection,
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