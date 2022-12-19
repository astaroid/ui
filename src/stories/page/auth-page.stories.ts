import AuthPage from "../../lib/page/auth-page.svelte"

export default {
    title: "Page/Auth Page",
    component: AuthPage,
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        onTabSelected: { 
            action: 'onTabSelected', 
            description: "The event emitter when a tab is selected"
        },
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
        onForgetPassword: {
            action: "onForgetPassword",
            description: "The event emitter when the forget password is clicked"
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
        errorType: {
            name: "error type",
            type: { name: "string" },
            defaultValue: "none",
            description: "The type of error the page should display",
            control: {
                type: "select",
                options: [ "none", "No internet", "Username or email not found", "Incorrect password", "Email not found", "Email already exist", "Username already exist", "Username and email already exist", "both" ]
            }
        },
        loading: {
            name: "loading",
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the loading spinner animation will start",
            control: { type: "boolean" }
        },
        disable: {
            name:"disable",
            type: { name: "string" },
            description: "The unit of width of the page",
            defaultValue: "none",
            control: {
                type: "select",
                options: [ "none", "sign in", "sign up" ]
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
        }
    }
}

const Template = (args:any) => ({
    Component: AuthPage,
    props: args,
    on: {
        onSignIn: args.onSignIn,
        onForgetPassword: args.onForgetPassword,
        onSignUp: args.onSignUp,
        onPolicyLinkClick: args.onPolicyLinkClick,
        onTabSelected: args.onTabSelected
    }
})

export const Page = Template.bind({})

export const DarkPage = Template.bind({})
DarkPage.args = {
    theme: "dark"
}