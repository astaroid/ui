import AssetContainer from "../../lib/component/asset-container.svelte"

export default {
    title: "Component/Asset component/Asset Container",
    component: AssetContainer,
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
        onSold: {
            action: "onSold",
            description: "The event emitted when asset is sold"
        },
        onSelected: {
            action: "onSelected",
            description: "The event emitted when asset is selected for forging a new crystal"
        },
        onUnselected: {
            action: "onUnselected",
            description: "The event emitted when asset is unselected for forging a new crystal"
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
        id: {
            type: { name: "string", required: true },
            defaultValue: "00000000-0000-0000-0000-000000000000",
            control: { type: "text" },
            description: "The unique identification of the asset"
        },
        color: {
            type: { name: "string", required: true },
            defaultValue: "red",
            control: { type: "color" },
            description: "The color of the asset"
        },
        volume: {
            type: { name: "number", required: true },
            defaultValue: 0,
            control: { type: "number" },
            description: "The volume of the asset"
        },
        disabled: {
            type: { name: "boolean", required: true },
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true disable the sell or select button"
        },
        isSelected: {
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true the component is selected for forging a new crystal"
        },
        showLabels: {
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true all the component tooltips will be shown"
        },
        mode: {
            type: { required: true, name: "string" },
            description: "The mode of the asset container",
            defaultValue: "selling",
            control: {
                type: "select",
                options: [ "selling", "forging" ]
            }
        }
    }
}

const Template = (args:any) => ({
    Component: AssetContainer,
    props: args,
    on: {
        onSold: args.onSold,
        onSelected: args.onSelected,
        onUnselected: args.onUnselected
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