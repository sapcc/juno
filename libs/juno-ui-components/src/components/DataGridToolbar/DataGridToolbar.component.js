import React from "react"
import PropTypes from "prop-types"
import { SearchInput } from "../SearchInput/SearchInput.component.js"
import { Button } from "../Button/Button.component.js"

const datagridtoolbarstyles = `
	jn-flex
	jn-items-center
	jn-justify-end
	jn-bg-theme-background-lvl-1
	jn-py-3
	jn-px-6
	jn-mb-px
`

/** This is the toolbar for use with a DataGrid. This is the place where you would put buttons and other controls that affect the items in the DataGrid (e.g. triggering batch actions) */
export const DataGridToolbar= ({
	className,
	children,
	...props
}) => {	
	return (
		<div className={`juno-datagrid-toolbar ${datagridtoolbarstyles} ${className}`} {...props} >
			{ children
			}
		</div>
	)
}

DataGridToolbar.propTypes = {
	/** Children to render in the DataGridToolbar */
	children: PropTypes.node,
	/** Add a classname */
	className: PropTypes.string,
}

DataGridToolbar.defaultProps = {
	className: "",
	children: null,
}