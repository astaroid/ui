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
        onTabSelected: { 
            action: 'onTabSelected', 
            description: "The event emitter when a tab is selected"
        },
        onSignUp: {
            action: "onSignUp", 
            description: "The event emitter when user enable to sign up"
        },
        onSignIn: {
            action: "onSignIn", 
            description: "The event emitter when user enable to sign in"
        },
        onForgetPassword: {
            action: "onForgetPassword",
            description: "The event emitter when forget password link is clicked"
        },
        privacyPolicyLink: {
            type: { name: "string" },
            defaultValue: "/privacy-policy",
            description: "The link to  the website privacy policy",
            control: {
                type: "text"
            }
        },
        errorType: {
            type: { name: "string" },
            defaultValue: "none",
            description: "The type of error the tab should display",
            control: {
                type: "select",
                options: [ "none", "Username or email not found", "Incorrect password", "Email not found", "Email already exist", "Username already exist", "Username and email already exist", "both" ]
            }
        },
        width: {
            type: { required: true, name: "number" },
            description: "The width of the tab",
            control: {
                type: "number"
            },
            defaultValue: 100
        },
        loading: {
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the loading spinner animation will start",
            control: { type: "boolean" }
        },
        unit: {
            type: { name: "string" },
            description: "The unit of width of the tab",
            defaultValue: "%",
            control: {
                type: "select",
                options: [ "pt", "mm", "pc", "cm", "in", "%", "px" ]
            }
        },
        tab: {
            type: { name: "string" },
            description: "The selected tab",
            defaultValue: "sign in",
            control: {
                type: "select",
                options: [ "sign in", "sign up" ]
            }
        },
        disabled: {
            type: { name: "string" },
            description: "The tab button to disable",
            defaultValue: "none",
            control: {
                type: "select",
                options: [ "none", "sign in", "sign up" ]
            }
        },
        theme: {
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

const Template = (args:any) => ({
    Component: AuthTab,
    props: args,
    on: {
        onSignIn: args.onSignIn,
        onForgetPassword: args.onForgetPassword,
        onSignUp: args.onSignUp,
        onTabSelected: args.onTabSelected
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
