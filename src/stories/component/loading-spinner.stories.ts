import LoadingSpinner from "../../lib/component/loading-spinner.svelte"

export default {
    title: "Component/Loading Spinner",
    component: LoadingSpinner,
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
        size: {
            defaultValue: 70,
            type: { name: "number" },
            description: "The size of the loading spinner",
            control: {
                type: "number"
            }
        }
    }
}

const Template = (args:any) => ({
    Component: LoadingSpinner,
    props: args
})

export const Spinner = Template.bind({})

export const DarkSpinner = Template.bind({})
DarkSpinner.parameters = {
    backgrounds: {
        default: 'dark'
    }
}