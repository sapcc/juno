import React, { useState, useEffect } from "react"
import { TabList as ReactTabList } from "react-tabs"
import PropTypes from "prop-types"

const tabListStyles = `
	flex
	h-[3.4375rem]
`

const getVariantStyles = (variant) => {
	switch (variant) {
		case "content":
			return `border-b-[1px] border-theme-tab-navigation-content-bottom`
		default: 
			return `bg-theme-tab-navigation-top`
	}
}

const JunoTabList =({ children, ...otherProps }) => (
	<ReactTabList {...otherProps} >
		{ children } 
	</ReactTabList>
)

JunoTabList.tabsRole = 'TabList'

export const TabList = ({
	variant,
	children,
	...props
}) => {
	
	return (
		<JunoTabList 
			className={`juno-tablist ${tabListStyles} ${getVariantStyles(variant)}`}
			{...props} >
				{children}
		</JunoTabList>
	)
}

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

