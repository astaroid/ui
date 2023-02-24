import EmptyScreen from "../../lib/component/empty-screen.svelte"

export default {
    title: "Component/Empty Screen",
    component: EmptyScreen,
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
    Component: EmptyScreen,
    props: args
})

export const Page = Template.bind({}) 

export const DarkPage = Template.bind({}) 
DarkPage.args = {
    theme: "dark"
}
DarkPage.parameters = {
    backgrounds: {
        default: 'dark'
    }
}