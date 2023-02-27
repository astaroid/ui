import SearchBarDropdownMenu from "../../lib/component/search-bar-dropdown-menu.svelte"

export default {
    title: "Component/Search Bar component/Search Bar Dropdown Menu",
    component: SearchBarDropdownMenu,
    parameters: {
        backgrounds: {
            default: "light",
            values: [
                { name: 'light', value: '#f5f5f5' },
                { name: 'dark', value: '#212121' },
            ]
        }
    },
    argTypes: {
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
        show: {
            type: { name: "boolean" },
            description: "If true the component will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        page: {
            type: { name: "string" },
            description: "The page the search bar dropdown menu is mounted on",
            defaultValue: "home",
            control: {
                type: "select",
                options: ["home", "asset"]
            }
        },
        searchValue: {
            type: { name: "string", required: true },
            description: "The value inputted in the search bar",
            defaultValue: "search",
            control: {
                type: "text"
            }
        },
        width: {
            type: { name: "number", required: true },
            defaultValue: 240,
            description: "The width of the component",
            control: {
                type: "number"
            }
        },
        y: {
            defaultValue: 10,
            type: { name: "number" },
            control: { type: "number" },
            description: "The position of the menu on the y-axis",
        },
        x: {
            defaultValue: 10,
            type: { name: "number" },
            control: { type: "number" },
            description: "The position of the menu on the x-axis",
        }
    }
}

const Template = (args:any) => ({
    Component: SearchBarDropdownMenu,
    props: args,
    on: {
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