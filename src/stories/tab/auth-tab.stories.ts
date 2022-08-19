import AuthTab from "../../lib/tab/auth-tab.svelte"

export default {
    title: "Tab/Auth Tab",
    component: AuthTab,
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
        onSignUp: {
            action: "onSignUp", 
            description: "The event emitter when the continue button is clicked"
        },
        onPolicyLinkClick: {
            action: "onPolicyLinkClick",
            description: "The event emitter when the magic link is clicked"
        },
        onSignIn: {
            action: "onSignIn", 
            description: "The event emitter when the continue button is clicked"
        },
        onMagicLinkClick: {
            action: "onMagicLinkClick",
            description: "The event emitter when the magic link is clicked"
        },
        errorType: {
            name: "error type",
            type: { name: "string" },
            defaultValue: "none",
            description: "The type of error the component should display",
            control: {
                type: "select",
                options: [ "none", "Username or email not found", "Incorrect password", "Email not found", "Email already exist", "Username already exist", "Username and email already exist", "both" ]
            }
        },
        width: {
            name: "width",
            type: { required: true, name: "number" },
            description: "The width of the component",
            control: {
                type: "number"
            },
            defaultValue: 100
        },
        loading: {
            name: "loading",
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the loading spinner animation will start",
            control: { type: "boolean" }
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
        tab: {
            name: "tab",
            type: { name: "string" },
            description: "The selected tab",
            defaultValue: "sign in",
            control: {
                type: "select",
                options: [ "sign in", "sign up" ]
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
    Component: AuthTab,
    props: args,
    on: {
        onSignIn: args.onSignIn,
        onMagicLinkClick: args.onMagicLinkClick,
        onSignUp: args.onSignUp,
        onPolicyLinkClick: args.onPolicyLinkClick
    }
})

export const Tab = Template.bind({})
Tab.args = {
    theme: "light"
}

export const DarkTab = Template.bind({})
DarkTab.args = {
    theme: "dark"
}
DarkTab.parameters = {
    backgrounds: {
        default: 'dark'
    }
}
