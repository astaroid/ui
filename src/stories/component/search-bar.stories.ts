import SearchBar from "../../lib/component/search-bar.svelte"

export default {
    title: "Component/Search Bar component/Search Bar",
    component: SearchBar,
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
        onResize: {
            action: "onResize",
            description: "The event emitter when the window is resized"
        },
        onInput: {
            action: "onInput",
            description: "The event emitter when the data is inputted into the search bar"
        },
        onBackBtnClicked: {
            action: "onBackBtnClicked",
            description: "The event emitter when the back button is clicked"
        },
        onClick: {
            action: "onClick",
            description: "The event emitter when the search bar is clicked"
        },
        onFocusIn: {
            action: "onFocusIn",
            description: "The event emitter when the search bar receives focus"
        },
        onFocusOut: {
            action: "onFocusOut",
            description: "The event emitter when the search bar looses focus"
        },
        width: {
            type: { name: "number", required: true },
            defaultValue: 100,
            description: "The width of the component",
            control: {
                type: "number"
            }
        },
        unit: {
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
    Component: SearchBar,
    props: args,
    on: {
        onBackBtnClicked: args.onBackBtnClicked,
        onInput: args.onInput,
        onResize: args.onResize,
        onClick: args.onClick,
        onFocusIn: args.onFocusIn,
        onFocusOut: args.onFocusOut
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