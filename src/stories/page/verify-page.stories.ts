import VerifyPage from "../../lib/page/verify-page.svelte"

export default {
    title: "Page/ Verify Page",
    component: VerifyPage,
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        onLoaded: { 
            action: 'onLoaded', 
            description: "The event emitter when the page is loaded"
        },
        onBackClicked: {
            action: 'onBackClicked', 
            description: "The event emitter when the Go Back button is clicked"
        },
        theme: {
            name: "theme",
            type: { name: "string", required: true },
            defaultValue: "light",
            description: "The theme of the page",
            control: {
                type: "radio",
                options: [ "light", "dark" ]
            }
        },
        error: {
            defaultValue: false,
            type: { name: "boolean" },
            description: "If true the verification failed",
            control: { type: "boolean" }
        },
        message: {
            type: { name: "string", required: true },
            defaultValue: "error",
            description: "The error message to display when the verification failed",
            control: {
                type: "text"
            }
        }
    }
}

const Template = (args:any) => ({
    Component: VerifyPage,
    props: args,
    on: {
        onLoaded: args.onLoaded,
        onBackClicked: args.onBackClicked
    }
})

export const Page = Template.bind({})

export const DarkPage = Template.bind({})
DarkPage.args = {
    theme: "dark"
}