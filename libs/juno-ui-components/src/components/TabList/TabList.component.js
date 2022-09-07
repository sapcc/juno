import React from "react"
import { TabList as ReactTabList } from "react-tabs"
import { useTabsContext } from "../Tabs/Tabs.component.js"
import PropTypes from "prop-types"

const tabListStyles = `
	jn-flex
	jn-h-[3.4375rem]
`
// focus-within:ring-1
// focus-within:ring-theme-focus
// focus-within:ring-inset

const getVariantStyles = (variant) => {
	switch (variant) {
		case "main": 
			return `jn-bg-theme-tab-navigation-top`
		default: 
			return `
				jn-border-b-[1px] 
				jn-border-theme-tab-navigation-content-bottom
			`
	}
}

/** A tabList component wraps all individual Tabs inside a parent Tabs component */

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

