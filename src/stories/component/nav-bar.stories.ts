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
        onSearchResultClicked: {
            action: "onSearchResultClicked",
            description: "The event emitter when a search result is clicked"
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
        coin: {
            control: { type: "number" },
            defaultValue: 100,
            description: "The user coins count"
        },
        homePageLink: {
            control: { type: "text" },
            description: "The link to the website home page",
            defaultValue: "/"
        },
        assetsPageLink: {
            control: { type: "text" },
            description: "The link to the website assets page",
            defaultValue: "/"
        },
        notified: {
            type: { name: "boolean" },
            control: { type: "boolean" },
            defaultValue: false,
            description: "If true then there is an activity message"
        },
        message: {
            control: { type: "object" },
            description: "The metadata for the message bar component",
            defaultValue: {
                message: String(),
                show: false,
                type: "normal",
                loading: false,
                inputText: "click me"
            }
        },
        page: {
            name: "page",
            type: { required: true, name: "string" },
            description: "The page navbar component is mounted",
            defaultValue: "home",
            control: {
                type: "select",
                options: [ "home", "assets" ]
            }
        }
    }
}

const Template = (args:any) => ({
    Component: NavBar,
    props: args,
    on: {
       onTabSelected: args.onTabSelected,
       onSearchResultClicked: args.onSearchResultClicked
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