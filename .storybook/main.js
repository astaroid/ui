import { default as preprocessor } from "svelte-preprocess"

export default {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"],

  // "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-mdx-gfm"],  
  "framework": {
    name: "@storybook/svelte-vite",
    options: {
      "preprocess": preprocessor()
    }
  },

  "features": {
    "storyStoreV7": true
  },

  docs: {
    autodocs: true
  },

  addons: ["@storybook/addon-mdx-gfm"]
};