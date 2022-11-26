import AssetMergeButton from "../../lib/component/asset-merge-button.svelte"

export default {
    title: "Component/Asset Merge Button",
    component: AssetMergeButton,
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
        onCancelMerge: {
            action: "onCancelMerge",
            description: "The event emitted to cancel merging assets", 
        },
        onStartMerge: {
            action: "onStartMerge",
            description: "The event emitted to start merging assets",
        },
        onEndMerge: {
            action: "onEndMerge",
            description: "The event emitted to merge assets",
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
        mode: {
            type: { required: true, name: "string" },
            description: "The mode of the asset merge button",
            defaultValue: "idle",
            control: {
                type: "select",
                options: [ "idle", "active" ]
            }
        },
        disabled: {
            type: { name: "boolean", required: true },
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true disable the sell or select button"
        }
    }
}

const Template = (args:any) => ({
    Component: AssetMergeButton,
    props: args,
    on: {
        onStartMerge: args.onStartMerge,
        onEndMerge: args.onEndMerge,
        onCancelMerge: args.onCancelMerge
    }
})

export const Button = Template.bind({}) 

export const DarkButton = Template.bind({}) 
DarkButton.args = {
    theme: "dark"
}
DarkButton.parameters = {
    backgrounds: {
        default: 'dark'
    }
}