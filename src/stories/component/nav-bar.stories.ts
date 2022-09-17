import NavBar from "../../lib/component/nav-bar.svelte"

export default {
    title: "Component/Navbar",
    component: NavBar,
    parameters: {
        layout: 'fullscreen',
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
        theme: {
            name: "theme",
            type: { required: true, name: "string" },
            description: "The theme of the component",
            defaultValue: "light",
            control: {
                type: "radio",
                options: [ "light", "dark" ]
            }
        },
        notified: {
            type: { name: "boolean" },
            control: { type: "boolean" },
            defaultValue: false,
            description: "If true then there is a notification message"
        },
        tab: {
            name: "tab",
            type: { required: true, name: "string" },
            description: "The selected tab",
            defaultValue: "home",
            control: {
                type: "select",
                options: [ "home", "search", "assets", "activity","account" ]
            }
        }
    }
}

const Template = (args:any) => ({
    Component: NavBar,
    props: args,
    on: {
       onTabSelected: args.onTabSelected
    }
})

export const Container = Template.bind({}) 

export const DarkContainer = Template.bind({}) 
DarkContainer.args = {
    theme: "dark"
}
DarkContainer.parameters = {
    backgrounds: {
        default: 'dark'
    }
}