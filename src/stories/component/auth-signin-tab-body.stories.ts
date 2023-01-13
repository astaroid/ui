import AuthSigninTabBody from "../../lib/component/auth-signin-tab-body.svelte"

export default {
    title: "Component/Auth component/Auth Signin Tab Body",
    component: AuthSigninTabBody,
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
        onSignIn: {
            action: "onSignIn", 
            description: "The event emitter when the continue button is clicked"
        },
        onForgetPassword: {
            action: "onForgetPassword",
            description: "The event emitter when the forget password is clicked"
        },
        loading: {
            name: "loading",
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the loading spinner animation will start",
            control: { type: "boolean" }
        },
        errorType: {
            type: { name: "string" },
            defaultValue: "none",
            description: "The type of error the component should display",
            control: {
                type: "select",
                options: [ "none", "Username or email not found", "Incorrect password", "both" ]
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
                type: "select",
                options: [ "light", "dark", "system" ]
            }
        }
    }
}

const Template = (args:any) => ({
    Component: AuthSigninTabBody,
    props: args,
    on: {
        onSignIn: args.onSignIn,
        onForgetPassword: args.onForgetPassword
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