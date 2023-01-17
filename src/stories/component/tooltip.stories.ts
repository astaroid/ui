import Tooltip from "../../lib/component/tooltip.svelte"

export default {
    title: "Component/Tooltip",
    component: Tooltip,
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
            description: "If true the tooltip will be shown",
            control: {
                type: "boolean"
            },
            defaultValue: true,
        },
        label: {
            description: "The label of the tooltip",
            defaultValue: "Label",
            control: {
                type: "text"
            } 
        },
        position: {
            description: "The position of the tooltip",
            defaultValue: "bottom",
            control: {
                type: "select",
                options: [ "top", "bottom", "left", "right" ]
            }
        }
    }
}

const Template = (args:any) => ({
    Component: Tooltip,
    props: args
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