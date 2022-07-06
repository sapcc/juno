import React from "react"
import PropTypes from "prop-types"
import { Select } from "../Select/Select.component"
import { SelectOption } from "../SelectOption/SelectOption.component"
import { TextInput } from "../TextInput/TextInput.component"
import { Icon } from "../Icon/Icon.component"

const wrapperStyles = `
	flex
	relative
`

const selectStyles = `
	rounded-r-none
`

const textInputStyles = `
	rounded-l-none
	focus:z-40
	grow
`

const iconWrapperStyles = `
	absolute
	flex
	right-2
	top-2
	z-50
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
					{options.map((option, i) => (<SelectOption label={option.label} value={option.value}/>))}
				</Select>
			</div>
			<TextInput className={`${textInputStyles}`} aria-label={inputLabel} />
			<div className={`${iconWrapperStyles}`}>
				<Icon icon="close" />
				<Icon />
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