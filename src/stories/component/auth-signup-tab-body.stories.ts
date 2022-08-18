import AuthSignupTabBody from "../../lib/component/auth-signup-tab-body.svelte"

export default {
    title: "Component/Auth Signup Tab Body",
    component: AuthSignupTabBody,
    parameters: {
        backgrounds: {
            default: "light",
            values: [
                { name: 'light', value: '#fafafa' },
                { name: 'dark', value: '#181818' },
            ]
        }
    },
    argTypes: {
        onSignUp: {
            action: "onSignUp", 
            description: "The event emitter when the continue button is clicked"
        },
        onPolicyLinkClick: {
            action: "onPolicyLinkClick",
            description: "The event emitter when the magic link is clicked"
        },
        startAmin: {
            name: "start amin",
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the continue button animation will start",
            control: { type: "boolean" }
        },
        errorType: {
            name: "error type",
            type: { name: "string" },
            defaultValue: "none",
            description: "The type of error the component should display",
            control: {
                type: "select",
                options: [ "none", "Email already exist", "Username already exist", "Username and email already exist", "both" ]
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
        width: {
            name: "width",
            type: { name: "number", required: true },
            defaultValue: 100,
            description: "The width of the component",
            control: {
                type: "number"
            }
        },
        unit: {
            name: "unit",
            type: { name: "string" },
            description: "The unit of width of the component",
            defaultValue: "%",
            control: {
                type: "select",
                options: [ "pt", "mm", "pc", "cm", "in", "%", "px" ]
            }
        },
        theme: {
            name: "theme",
            type: { required: true, name: "string" },
            description: "The theme of the component",
            defaultValue: "light",
            control: {
                type: "radio",
                options: [ "light", "dark" ]
            }
        }
    }
}

const Template = (args:any) => ({
    Component: AuthSignupTabBody,
    props: args,
    on: {
        onSignUp: args.onSignUp,
        onPolicyLinkClick: args.onPolicyLinkClick
    }
})

export const Body = Template.bind({})
Body.args = {
    theme: "light"
}

export const DarkBody = Template.bind({})
DarkBody.args = {
    theme: "dark"
}
DarkBody.parameters = {
    backgrounds: {
        default: 'dark'
    }
}