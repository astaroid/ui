import SmallFooter from "../../lib/component/small-footer.svelte"

export default {
    title: "Component/Footer component/Small Footer",
    component: SmallFooter,
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
        },
        githubLink: {
            name: "githubLink",
            type: { required: true, name: "string" },
            description: "The link to the author github account",
            control: { type: "text" }
        },
        twitterLink: {
            name: "twitterLink",
            type: { required: true, name: "string" },
            description: "The link to the author twitter account",
            control: { type: "text" }
        },
        privacyPolicyLink: {
            name: "privacyPolicyLink",
            type: { required: true, name: "string" },
            description: "The link to the website privacy policy page",
            control: { type: "text" }
        },
        websiteTutorialLink: {
            name: "websiteTutorialLink",
            type: { required: true, name: "string" },
            description: "The link to the website tutorial page",
            control: { type: "text" }
        },
        emailLink: {
            name: "emailLink",
            type: { required: true, name: "string" },
            description: "The link to the website email",
            control: { type: "text" }
        },
        websiteName: {
            name: "websiteName",
            type: {  name: "string" },
            description: "The name of the website",
            control: { type: "text" },
            defaultValue: "Astaroid"
        },
        authorName: {
            name: "authorName",
            type: {  name: "string" },
            description: "The name of the author",
            control: { type: "text" },
            defaultValue: "Daniel Onyenwee"
        }
    }
}

const Template = (args:any) => ({
    Component: SmallFooter,
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