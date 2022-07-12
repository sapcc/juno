import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/Select.component"
import { SelectOption } from "../SelectOption/SelectOption.component"
import { TextInput } from "../TextInput/TextInput.component"
import { Icon } from "../Icon/Icon.component"

const wrapperStyles = `
	jn-flex
	jn-relative
	jn-p-px
	jn-border
	jn-rounded
	jn-bg-theme-filter-input
	jn-border-theme-filter-input
`

const selectStyles = `
	jn-rounded-r-none
`

const textInputStyles = `
	jn-grow
	jn-rounded-l-none
	jn-pr-16
	!jn-bg-theme-filter-input-textinput
	focus:jn-z-40
`

const iconWrapperStyles = `
	jn-absolute
	jn-flex
	jn-right-2
	jn-top-2
	jn-z-50
`

export const FilterInput = ({
	label,
	options,
	inputLabel,
	className,
	onFilterChange,
	onClear,
	onFilter,
	...props
}) => {
	
	const handleInputChange = (event) => {
		onFilterChange && onFilterChange(event)
	}
	
	const handleClearClick = (event) => {
		onClear && onClear(event)
	}
	
	const handleFilterClick = (event) => {
		onFilter && onFilter(event)
	}
	
	return (
		<div className={`juno-filter-input ${wrapperStyles} ${className}`} {...props} >
			<div>
				<Select className={`${selectStyles}`} aria-label={label}>
					{ label ? <SelectOption label={label} value="" /> : null }
					{options.map((option, i) => (<SelectOption label={option.label} value={option.value} key={`${i}`}/>))}
				</Select>
			</div>
			<TextInput className={`${textInputStyles}`} aria-label={inputLabel} onChange={handleInputChange}/>
			<div className={`${iconWrapperStyles}`}>
				<Icon icon="close" size="18" className={`jn-mr-2`} onClick={handleClearClick} />
				<Icon icon="filterAlt" onClick={handleFilterClick} />
			</div>
		</div>
	)
}

FilterInput.propTypes = {
	/** The label to display on the Filter Select */
	label: PropTypes.string,
	/** The options for the Filter Select: `[{label: "Label 1", value: "value-1"}, {...}]` 
	*/
	options: PropTypes.arrayOf(PropTypes.object), // TODO test for correctly formed object?
	/** The aria-label of the Filter Value Text Input */
	inputLabel: PropTypes.string,
	/** Pass a className to the wrapping element */
	className: PropTypes.string,
	/** Pass a handler to be executed when the filter changes */
	onFilterChange: PropTypes.func,
	/** Pass a handler to execute when the Filter Value Clear button is clicked */
	onClear: PropTypes.func,
	/** Pass a handler to execute when the Filter Value Filter button is clicked */
	onFilter: PropTypes.func,
}

FilterInput.defaultProps = {
	label: "Select Filter",
	options: [],
	inputLabel: "Filter by Value",
	className: "",
	onFilterChange: undefined,
	onClear: undefined,
	onFilter: undefined,
}