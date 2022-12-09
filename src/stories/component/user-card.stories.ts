import UserCard from "../../lib/component/user-card.svelte"

export default {
    title: "Component/Account Tab component/User Card",
    component: UserCard,
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
        email: {
            type: { name: "string", required: true },
            description: "The user email",
            defaultValue: "usernameemail@gmail.com",
            control: { type: "text" }
        },
        username: {
            type: { name: "string", required: true },
            description: "The user username",
            defaultValue: "user_001",
            control: { type: "text" }
        },
        profileImage: {
            type: { name: "string" },
            description: "The user profile image",
            defaultValue: "/default_profile_blank.jpg",
            control: { type: "text" }
        },
        coinsNumber: {
            type: { name: "number" },
            description: "The user total coins",
            defaultValue: 0,
            control: { type: "number" }
        },
        assetsNumber: {
            type: { name: "number" },
            description: "The user total assets",
            defaultValue: 0,
            control: { type: "number" }
        },
        verified: {
            type: { name: "boolean" },
            defaultValue: false,
            description: "If true user email is verified",
            control: { type: "boolean" }
        }
    }
}

const Template = (args:any) => ({
    Component: UserCard,
    props: args
})

export const Container = Template.bind({})

export const DarkContainer = Template.bind({})
DarkContainer.args = {
    theme: "dark"
}
DarkContainer.parameters = {
    backgrounds: {
        default: "dark"
    }
}