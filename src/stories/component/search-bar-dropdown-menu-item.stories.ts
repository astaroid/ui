import SearchBarDropdownMenuItem from "../../lib/component/search-bar-dropdown-menu-item.svelte"

export default {
    title: "Component/Search Bar component/Search Bar Dropdown Menu Item",
    component: SearchBarDropdownMenuItem,
    parameters: {
        backgrounds: {
            default: "light",
            values: [
                { name: 'light', value: 'white' },
                { name: 'dark', value: '#303030' },
            ]
        }
    },
    argTypes: {
        onClicked: {
            action: "onClicked",
            description: "The event emitter when the search bar dropdown menu item is clicked"
        },
        onHover: {
            action: "onHover",
            description: "The event emitter when a pointer device hover over the search bar dropdown menu item"
        },
        onHoverOut: {
            action: "onHoverOut",
            description: "The event emitter when a pointer device hover out the search bar dropdown menu item"
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
        searchValue: {
            type: { name: "string", required: true },
            description: "The value of the search bar menu item",
            defaultValue: "search",
            control: {
                type: "text"
            }
        },
        searchBy: {
            type: { name: "string" },
            description: "The type of value the search bar menu item is filtered with",
            defaultValue: "color",
            control: {
                type: "select",
                options: ["color", "volume", "price", "unique"]
            }
        },
        selected: {
            type: { name: "boolean" },
            description: "If true the search bar menu item is hovered over or selected",
            defaultValue: false,
            control: {
                type: "boolean"
            }
        }
    }
}

const Template = (args:any) => ({
    Component: SearchBarDropdownMenuItem,
    props: args,
    on: {
        onClicked: args.onClicked,
        onHover: args.onHover,
        onHoverOut: args.onHoverOut
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