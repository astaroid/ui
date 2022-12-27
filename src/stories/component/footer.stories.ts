import Footer from "../../lib/component/footer.svelte"

export default {
    title: "Component/Footer",
    component: Footer,
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
        links: {
            type: { required: true },
            description: "The Javascript object of all links in the footer component",
            control: {
                type: "object"
            },
            defaultValue: {
                product: {
                    crystal: "[string]",
                    coin: "[string]"
                },
                company: {
                    about: "[string]",
                    blog: "[string]",
                    careers: "[string]"
                },
                contact: {
                    github: "[string]",
                    twitter: "[string]"
                },
                legal: {
                    termsOfService: "[string]",
                    privacyPolicy: "[string]"
                }
            }
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
    Component: Footer,
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