import CrystalFilterButton from "../../lib/component/crystal-filter-button.svelte"

export default {
    title: "Component/Crystal component/Crystal Filter Button",
    component: CrystalFilterButton,
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
        onOrderByChange: {
            action: "onOrderByChange",
            description: "The event emitted when the order to arrange the filtered crystals is changed", 
        },
        onFilterByChange: {
            action: "onFilterByChange",
            description: "The event emitted when the property to filter the crystals by is changed"
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
        orderBy: {
            type: { name: "string" },
            description: "The order to arrange the filtered crystals",
            defaultValue: "ascending",
            control: {
                type: "select",
                options: [ "ascending", "descending" ]
            }
        },
        filterBy: {
            type: { name: "string" },
            description: "The property to filter the crystals by",
            defaultValue: "volume",
            control: {
                type: "select",
                options: [ "price", "volume", "unique" ]
            }
        }
    }
}

const Template = (args:any) => ({
    Component: CrystalFilterButton,
    props: args,
    on: {
        onOrderByChange: args.onOrderByChange,
        onFilterByChange: args.onFilterByChange
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