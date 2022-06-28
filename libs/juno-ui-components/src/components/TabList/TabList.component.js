import React from "react"
import { TabList as ReactTabList } from "react-tabs"
import { useTabsContext } from "../Tabs/Tabs.component.js"
import PropTypes from "prop-types"

const tabListStyles = `
	flex
	h-[3.4375rem]
`

const getVariantStyles = (variant) => {
	switch (variant) {
		case "main": `bg-theme-tab-navigation-top` 
			return 
		default: 
			return `border-b-[1px] border-theme-tab-navigation-content-bottom`
	}
}


const TabList = ({
	variant,
	children,
	...props
}) => {
	
	const tabsContext = useTabsContext() || {}
	const tabsVariant = tabsContext.variant || variant
	
	return (
		<ReactTabList 
			className={`juno-tablist juno-tablist-${tabsVariant} ${tabListStyles} ${getVariantStyles(tabsVariant)}`}
			{...props} >
				{children}
		</ReactTabList>
	)
}

TabList.tabsRole = 'TabList'

TabList.propTypes = {
	/** Pick the TabList style */
	variant: PropTypes.oneOf(["main", "content"]),
	/** The individual child Tabs to render */
	children: PropTypes.node,
}

TabList.defaultProps = {
	variant: "content",
	children: null,
}

export { TabList }

