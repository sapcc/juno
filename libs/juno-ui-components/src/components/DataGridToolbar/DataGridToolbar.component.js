import React from "react"
import PropTypes from "prop-types"
import { SearchInput } from "../SearchInput/SearchInput.component.js"
import { Button } from "../Button/Button.component.js"

const datagridtoolbarstyles = `
	flex
`

export const DataGridToolbar= ({
	search,
	addItems,
	addItemsLabel,
	className,
	children,
	...props
}) => {	
	return (
		<div className={`juno-datagrid-toolbar ${datagridtoolbarstyles} ${className}`} {...props} >
			{ search ?
				<SearchInput />
				:
				null
			}
			{ addItems ?
				<Button label={addItemsLabel} size={"small"}></Button>
				:
				null
			}
		</div>
	)
}

DataGridToolbar.propTypes = {
	/** Whether to display a Search Input to filter items */
	search: PropTypes.bool,
	/** Whether to display a button to add items */
	addItems: PropTypes.bool,
	/** Label of the button to add items */
	addItemsLabel: PropTypes.string,
	/** Children to render in the DataGridRow */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridToolbar.defaultProps = {
	search: true,
	addItems: true,
	addItemsLabel: "Add Item",
	className: "",
	children: null,
}