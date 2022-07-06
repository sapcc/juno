import React from "react"
import PropTypes from "prop-types"
import { SelectTextInputRow } from "../SelectTextInputRow/SelectTextInputRow.component"

const filterStyles = `
`

const inputWrapperStyles = `
	w-full
	flex
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
			<div className={`juno-filters-input-wrapper ${inputWrapperStyles}`} >
				{ filters && filters.options ? <SelectTextInputRow label={filtersLabel} options={filters.options} /> : null }
				{ search }
			</div>
			{ children }
		</div>
	)
}

Filters.propTypes = {
	label: PropTypes.string,
	/** Pass a SearchInput component */
	search: PropTypes.node,
	/** Pass an object describing the filters: { label: "Select", options: [{label: "Label 1", value: "value-1"}, {...}] } */
	filters: PropTypes.object, 
	/** add custom classNames */
	className: PropTypes.string,	
}

Filters.defaultProps = {
	search: null,
	filters: null, //{label: "Select", config: []},
	className: ""
}