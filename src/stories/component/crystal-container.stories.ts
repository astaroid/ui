import CrystalContainer from "../../lib/component/crystal-container.svelte"

export default {
    title: "Component/Crystal component/Crystal Container",
    component: CrystalContainer,
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
        onBuy: {
            action: "onBuy",
            description: "The event emitted when crystal is bought"
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
            description: "The unique identification of the crystal"
        },
        color: {
            type: { name: "string", required: true },
            defaultValue: "red",
            control: { type: "color" },
            description: "The color of the crystal"
        },
        price: {
            type: { name: "number", required: true },
            defaultValue: 10,
            control: { type: "number" },
            description: "The price of the crystal"
        },
        rarest: {
            type: { name: "number", required: true },
            defaultValue: 0,
            control: { type: "number" },
            description: "The rarest rate of the crystal"
        },
        volume: {
            type: { name: "number", required: true },
            defaultValue: 0,
            control: { type: "number" },
            description: "The volume of the crystal"
        },
        disabled: {
            type: { name: "boolean", required: true },
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true disable the buy button"
        },
        showLabels: {
            name: "show labels",
            defaultValue: false,
            control: { type: "boolean" },
            description: "If true all the component tooltips will be shown"
        }
    }
}

const Template = (args:any) => ({
    Component: CrystalContainer,
    props: args,
    on: {
        onBuy: args.onBuy
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