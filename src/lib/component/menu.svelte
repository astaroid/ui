<script lang="ts">
    import { clickoutside } from '@svelteuidev/composables'
    import { createEventDispatcher } from "svelte"
    import MenuItem from './menu-item.svelte'

    interface MenuItemType {
        id: string
        type: "item"|"label"|"divider"
        text?: string
        disabled?: boolean
        "icon data"?: string
        color?: string
    }

    export let theme:"system"|"light"|"dark" = "system"
    export let show:boolean = false
    export let position:"fixed"|"absolute"|"relative" = "relative"
    export let placement:"start"|"center"|"end" = "start"
    export let x:number = 0
    export let y: Number = 0
    export let menuItems:Array<MenuItemType> = Array<MenuItemType>()

    const dispatcher = createEventDispatcher()
    
    const onClickedOutside = () => {
        dispatcher("onClickedOutside")
    }

    const menuWidth = 200

    if (placement == "end")
        x -= menuWidth
    else if (placement == "center")
        x -= menuWidth/2
    
    $: {
        if (!Array.isArray(menuItems)) 
            menuItems = Array<MenuItemType>()
    }

    const menuItemClicked = (id:string) => {
        dispatcher("onMenuItemClicked", { id })
        show = false
    }

</script>
<section use:clickoutside={{ enabled: show, callback: onClickedOutside }} style="position: {position}; top: {y}px; left: {x}px; display: { show ? "flex" : "none" }" data-theme={theme}>
    {#each menuItems as item, index (item.id)}
        <MenuItem 
            on:onClicked={() => menuItemClicked(item.id)} 
            theme={theme} 
            {...item} 
            iconData={item['icon data']}/>
    {/each}
</section>
<style lang="less">
    section {
        background-color: #fdfdfd;
        position: relative;
        font-family: Arial, Helvetica, sans-serif;
        height: auto;
        width: 180px;
        padding: 0 0 0 0;
        border-width: 1px;
        border-radius: 1px;
        border-style: solid;
        border-color: rgb(233, 236, 239);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        z-index: 5;
        justify-content: flex-start;
        box-shadow: rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px; 
        &[data-theme="dark"] {
            background-color: rgb(23, 25, 25);
            border-color: #4e4c4c;
        }
        @media screen and (prefers-color-scheme: dark) {
            &[data-theme="system"] {
                background-color: rgb(23, 25, 25);
                border-color: #4e4c4c;
            }
        }
    }
</style>