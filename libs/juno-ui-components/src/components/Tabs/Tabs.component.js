import React, { useEffect, useState} from "react"
import { Tabs as ReactTabs } from "react-tabs" //
import PropTypes from "prop-types"

const TabsContext = React.createContext()
export const useTabsVariantContext = () => React.useContext(TabsContext)

const Tabs = ({
	children,
	defaultIndex,
	selectedIndex,
	onSelect,
	variant,
	className,
	...props
}) => {
	// ensure component updates if selected index changes
	const [passedIndex, setPassedIndex] = useState(selectedIndex)
	
	useEffect(() => {
		setPassedIndex(selectedIndex)
	}, [selectedIndex])

	const handleSelect = (index) => {
		onSelect && onSelect(index)
  	}
	  
	const tabsConf = {
		variant: variant
	}

	return (
		<TabsContext.Provider value={tabsConf}>
			<ReactTabs 
				className={`juno-tabs ${className}`}
				defaultIndex={defaultIndex}
				selectedIndex={passedIndex}
				onSelect={handleSelect}
				{...props} >
					{children}
			</ReactTabs>
		</TabsContext.Provider>
	)
}	

Tabs.tabsRole = 'Tabs'

Tabs.propTypes = {
	/** All the child elements of the Tabs: Tab(s) inside a TabList and TabPanel(s) */
	children: PropTypes.node,
	/** The index of the Tab to be selected by default in "Uncontrolled Mode" (default) where Tabs handle their state internally. Do not use in "Controlled Mode".*/
	defaultIndex: PropTypes.number,
	/** The index of the Tab to be selected by default. This enables "Controlled Mode" where the developer takes over control of the Tabs state and behaviour. Requires onSelect to be set.*/
	selectedIndex: PropTypes.number,
	/** Handler required in "Controlled Mode" */
	onSelect: PropTypes.func,
	/** Switch on Main Tab styles and context if needed */
	variant: PropTypes.oneOf(["main", "content"]),
	/** Add a custom className to the whole Tabs construct */
	className: PropTypes.string,
}

Tabs.defaultProps = {
	children: null,
	defaultIndex: undefined,
	selectedIndex: undefined,
	onSelect: undefined,
	variant: "content",
	className: "",
}

export { Tabs }