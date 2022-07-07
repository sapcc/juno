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
	jn-bg-theme-filter-input-textinput
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
	...props
}) => {
	return (
		<div className={`juno-filter-input ${wrapperStyles} ${className}`} {...props} >
			<div>
				<Select className={`${selectStyles}`} aria-label={label}>
					{ label ? <SelectOption label={label} value="" /> : null }
					{options.map((option, i) => (<SelectOption label={option.label} value={option.value} key={`${i}`}/>))}
				</Select>
			</div>
			<TextInput className={`${textInputStyles}`} aria-label={inputLabel} />
			<div className={`${iconWrapperStyles}`}>
				<Icon icon="close" />
				<Icon icon="filterAlt" />
			</div>
		</div>
	)
}

FilterInput.propTypes = {
	label: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object),
	inputLabel: PropTypes.string,
	className: PropTypes.string,
}

FilterInput.defaultProps = {
	label: "Select Filter",
	options: [],
	inputLabel: "Filter by Value",
	className: "",
}