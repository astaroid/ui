<script lang="ts">
    import { clickoutside } from '@svelteuidev/composables'
    import { createEventDispatcher, onMount } from "svelte"
    import SearchBarDropdownMenuItem from './search-bar-dropdown-menu-item.svelte'

    interface SearchBarDropdownMenuItemType {
        theme: "light"|"dark"
        searchBy: "volume"|"price"|"color"|"rarest"
        searchValue: string|number
        selected: boolean
    }

    export let theme:"light"|"dark" = "light"
    export let width:number = 100
    export let page:"home"|"assets" = "home"
    export let searchValue:string = String()
    export let show:boolean
    export let x:number = 0
    export let y:number = 0

    const dispatcher = createEventDispatcher()

    const searchBarDropdownMenuItem = (e:CustomEvent) => {
        dispatcher("onSearchResultClicked", e.detail)
        show = false
    }

    const getSearchBarDropDownMenuItemList = () => {
        const numRegExp = /[-0-9.]/g
        if (numRegExp.test(searchValue)) {
            searchBarDropDownMenuItemList = [
                {
                    theme,
                    searchBy: "volume",
                    selected: false,
                    searchValue: parseFloat(searchValue.match(numRegExp).join(String()))
                }
            ]
            if (page == "home") {
                searchBarDropDownMenuItemList = [
                    ...searchBarDropDownMenuItemList,
                    {
                        theme,
                        selected: false,
                        searchBy: "price",
                        searchValue: parseFloat(searchValue.match(numRegExp).join(String()))
                    },
                    {
                        theme,
                        searchBy: "rarest",
                        selected: false,
                        searchValue: parseFloat(searchValue.match(numRegExp).join(String()))
                    }
                ]
            }
        } else {
            searchBarDropDownMenuItemList = [
                {
                    theme,
                    searchBy: "color",
                    searchValue,
                    selected: false,
                }
            ]
        }
    }

    const searchBarDropDownMenuItemHover = (index:number) => {
        searchBarDropDownMenuItemSelectedIndex = index
        getSearchBarDropDownMenuItemList()
        searchBarDropDownMenuItemList[searchBarDropDownMenuItemSelectedIndex].selected = true
        searchBarDropDownMenuItemList = [...searchBarDropDownMenuItemList]
    }

    const keydownListener = (e:KeyboardEvent) => {
        if (searchBarDropDownMenuItemList.length > 0) {
            if (e.code == "Escape") {
                show = false
            }
            if (e.code == "Enter") {
                if (searchBarDropDownMenuItemSelectedIndex >= 0 && searchBarDropDownMenuItemSelectedIndex <= searchBarDropDownMenuItemList.length - 1) {
                    let selectedSearchBarDropDownMenuItem = searchBarDropDownMenuItemList[searchBarDropDownMenuItemSelectedIndex]
                    const { searchBy: selectedSearchBy, searchValue: selectedSearchValue } = selectedSearchBarDropDownMenuItem
                    dispatcher("onSearchResultClicked", { searchBy: selectedSearchBy, searchValue: selectedSearchValue })
                    show = false
                }
            }
            if (e.code == "ArrowUp") {
                if (searchBarDropDownMenuItemSelectedIndex > 0)
                    searchBarDropDownMenuItemSelectedIndex -= 1
                else
                    searchBarDropDownMenuItemSelectedIndex = 0
            } else if (e.code == "ArrowDown") {
                if (searchBarDropDownMenuItemSelectedIndex < searchBarDropDownMenuItemList.length - 1)
                    searchBarDropDownMenuItemSelectedIndex += 1
                else
                    searchBarDropDownMenuItemSelectedIndex = searchBarDropDownMenuItemList.length - 1
            }
            if (e.code == "ArrowUp" || e.code == "ArrowDown") {
                getSearchBarDropDownMenuItemList()
                searchBarDropDownMenuItemList[searchBarDropDownMenuItemSelectedIndex].selected = true
                searchBarDropDownMenuItemList = [...searchBarDropDownMenuItemList]
            }
        }
    }

    $: if (oldSearchValue != searchValue) {
        getSearchBarDropDownMenuItemList()
        searchBarDropDownMenuItemSelectedIndex = 0
        searchBarDropDownMenuItemList[searchBarDropDownMenuItemSelectedIndex].selected = true
        searchBarDropDownMenuItemList = [...searchBarDropDownMenuItemList]
        oldSearchValue = searchValue
    }

    $: if (show) {
        if (window)
            window.addEventListener("keydown", keydownListener)
    } 

    $: if (!show) {
        searchBarDropDownMenuItemSelectedIndex = 0
        getSearchBarDropDownMenuItemList()
        searchBarDropDownMenuItemList[searchBarDropDownMenuItemSelectedIndex].selected = true
        searchBarDropDownMenuItemList = [...searchBarDropDownMenuItemList]
        if (window)
            window.removeEventListener("keydown", keydownListener)
    }

    let section:HTMLElement = null

    let oldSearchValue:string = searchValue

    let searchBarDropDownMenuItemList:Array<SearchBarDropdownMenuItemType> = []

    let searchBarDropDownMenuItemSelectedIndex:number = -1

    onMount(() => {
        getSearchBarDropDownMenuItemList()
        window.addEventListener("keydown", keydownListener)
    })
</script>
<section bind:this={section} use:clickoutside={{ enabled: show, callback: () => dispatcher("onClickOutside") }} data-theme={theme} style="display: { show ? "block" : "none" }; width: {width}px; top: {y}px; left: {x}px;">
    {#each searchBarDropDownMenuItemList as searchBarDropDownMenuItem, index (searchBarDropDownMenuItem.searchBy)}
        <SearchBarDropdownMenuItem on:onHover={() => searchBarDropDownMenuItemHover(index)} on:onClicked={searchBarDropdownMenuItem} {...searchBarDropDownMenuItem} />
    {/each}
</section>
<style lang="less">
    section {
        position: absolute;
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        padding-bottom: 8px;
        height: fit-content;
        min-height: 40px;
        background-color: white;
        border-style: solid;
        border-width: 1px;
        border-radius: 2px;
        border-color: rgb(0 0 0 / 15%);
        border-top-width: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        &[data-theme="dark"] {
            background-color: #303030;
            border-color: #474849;
        }
    }
</style>