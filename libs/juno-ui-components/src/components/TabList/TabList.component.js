import React from "react"
import { TabList as ReactTabList } from "react-tabs"
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
	
	return (
		<ReactTabList 
			className={`juno-tablist ${tabListStyles} ${getVariantStyles(variant)}`}
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

