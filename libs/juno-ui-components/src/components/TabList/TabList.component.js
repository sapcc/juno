import React from "react"
import { TabList as ReactTabList } from "react-tabs"
import PropTypes from "prop-types"

const tabListStyles = `
	jn-flex
	jn-h-[3.4375rem]
`

const getVariantStyles = (variant) => {
	switch (variant) {
		case "content":
			return `
				jn-border-b-[1px] 
				jn-border-theme-tab-navigation-content-bottom
			`
		default: 
			return `jn-bg-theme-tab-navigation-top`
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
	variant: PropTypes.oneOf(["top", "content"]),
	/** The individual child Tabs to render */
	children: PropTypes.node,
}

TabList.defaultProps = {
	variant: "top",
	children: null,
}

export { TabList }

