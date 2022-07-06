import React from "react"
import PropTypes from "prop-types"
import { SelectTextInputRow } from "../SelectTextInputRow/SelectTextInputRow.component"

const filterStyles = `
`

export const Filters = ({
	search,
	filters,
	children,
	className,
	...props
}) => {
	const filtersLabel = filters && filters.label ? filters.label : "Select"
	return (
		<div className={`juno-filters ${filterStyles} ${className}`} {...props}>
			<SelectTextInputRow label={filtersLabel} />
			{ children }
		</div>
	)
}

Filters.propTypes = {
	label: PropTypes.string,
	/** Pass a SearchInput component */
	search: PropTypes.node,
	/** Pass an object describing the filters: { label: "Select", config: [{key: "Key 1", value: "value-1"}, {...}] } */
	filters: PropTypes.object, 
	/** add custom classNames */
	className: PropTypes.string,	
}

Filters.defaultProps = {
	search: null,
	filters: null, //{label: "Select", config: []},
	className: ""
}