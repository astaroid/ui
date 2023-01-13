import  AuthTabController from "../../lib/component/auth-tab-controller.svelte"

export default {
    title: "Component/Auth component/Auth Tab Controller",
    component: AuthTabController,
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
        onTabSelected: { 
            action: 'onTabSelected', 
            description: "The event emitter when a tab is selected"
        },
        width: {
            name: "width",
            type: { name: "number", required: true },
            description: "The width of the component",
            control: {
                type: "number"
            },
            defaultValue: 100
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
        disabled: {
            name:"disabled",
            type: { name: "string" },
            description: "The unit of width of the component",
            defaultValue: "none",
            control: {
                type: "select",
                options: [ "none", "sign in", "sign up" ]
            }
        },
        tab: {
            name: "tab",
            type: { required: true, name: "string" },
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
                type: "select",
                options: [ "light", "dark", "system" ]
            }
        }
    }
    
}

const Template  = (args:any) => ({
    Component: AuthTabController,
    props: args,
    on: {
       onTabSelected: args.onTabSelected
    }
})

export const SignInTab = Template.bind({})
SignInTab.args = {
    tab: "sign in"   
}

export const SignUpTab = Template.bind({})
SignUpTab.args = {
    tab: "sign up"   
}

export const DarkSignInTab = Template.bind({})
DarkSignInTab.args = {
    ...SignInTab.args,
    theme: "dark" 
}
DarkSignInTab.parameters = {
    backgrounds: {
        default: 'dark'
    }
}

export const DarkSignUpTab = Template.bind({})
DarkSignUpTab.args = {
    ...SignUpTab.args,
    theme: "dark" 
}
DarkSignUpTab.parameters = {
    ...DarkSignInTab.parameters
}