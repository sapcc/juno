import React, { useState, useEffect } from "react"
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
	jn-top-1.5
	jn-z-50
`

/** 
A special Input to select key and value of a filter.
*/
export const FilterInput = ({
	keyLabel,
	options,
	valueLabel,
	className,
	selectedFilterKey,
	onSelectedFilterKeyChange,
	filterValue,
	onFilterValueChange,
	onClear,
	onKeyPress,
	onFilter,
	loading,
	...props
}) => {
	
	const [selectedFilter, setSelectedFilter] = useState(selectedFilterKey)
	const [value, setValue] = useState(filterValue)
	const [isLoading, setIsLoading] = useState( options.length < 1 || loading)
	
	useEffect(() => {
		setValue(filterValue)
	}, [filterValue])
	
	useEffect(() => {
		setSelectedFilter(selectedFilterKey)
	}, [selectedFilterKey])
	
	// Reset the (text input) value whenever the component is loading:
	useEffect(() => {
		if ( options.length < 1 || loading ) {
			setIsLoading(true)
			setValue("")
		} else {
			setIsLoading(false)
		}
	}, [options, loading])
	
	// Reset the (text input) value whenever the selected Filter key changes:
	const handleSelectedFilterChange = (event) => {
		setSelectedFilter(event.target.value)
		setValue("")
		onSelectedFilterKeyChange && onSelectedFilterKeyChange(event)
	}
	
	const handleFilterValueChange = (event) => {
		setValue(event.target.value)
		onFilterValueChange && onFilterValueChange(event)
	}
	
	const handleClearClick = (event) => {
		setValue("")
		onClear && onClear(event)
	}
	
	const handleFilterClick = (event) => {
		onFilter && onFilter(event)
	}
	
	const handleKeyPress = (event) => {
		if (event.key === "Enter" && onFilter) { 
			onFilter && onFilter(event) 
		}
		onKeyPress && onKeyPress(event)
	 }
	
	return (
		<div className={`juno-filter-input ${wrapperStyles} ${className}`} {...props} >
			<div>
				<Select 
					className={`juno-filter-input-select ${selectStyles}`} 
					aria-label={keyLabel}
					value={selectedFilter}
					onChange={handleSelectedFilterChange}
					loading={isLoading}
				>
					// First "Placeholder" option:
					<SelectOption label={keyLabel || "Select Filter"} value="" />
					// Options representing actual filter key values:
					{options.map((option, i) => (
						<SelectOption 
							label={option.label} 
							value={option.key}
							key={`${i}`}
							{...option}
						/>))}
				</Select>
			</div>
			<TextInput 
				value={value} 
				className={`${textInputStyles}`} 
				aria-label={valueLabel} 
				onChange={handleFilterValueChange}
				onKeyPress={handleKeyPress}
				disabled={isLoading}
				placeholder={ isLoading ? "Loading Filter Options…" : null }
			/>
			<div className={`${iconWrapperStyles}`}>
				{ value && value.length ?
					<Icon icon="close" title="Clear" size="18" className={`jn-mr-2`} onClick={handleClearClick} />
					:
					null
				}
				<Icon icon="filterAlt" title="Filter" onClick={handleFilterClick} />
			</div>
		</div>
	)
}

FilterInput.propTypes = {
	/** The label to display on the Filter Key Select */
	keyLabel: PropTypes.string,
	/** The options for the Filter Select: `[{Label: "Filter 1", key: "filter-1"}, {...}]`
	The array MUST have a length in order for the component to render.
	*/
	options: PropTypes.arrayOf(PropTypes.object), 
	/** The key of the current filter */
	selectedFilterKey: PropTypes.string,
	/** Pass a handler to be executed when the filter key changes */
	onSelectedFilterKeyChange: PropTypes.func,
	/** The aria-label of the Filter Value Text Input */
	valueLabel: PropTypes.string, // TODO -> valueLabel
	/** The current value of the Filter Input */
	filterValue: PropTypes.string,
	/** Pass a handler to be executed when the filter value changes */
	onFilterValueChange: PropTypes.func,
	/** Pass a handler to execute when the Filter Value Clear button is clicked */
	onClear: PropTypes.func,
	/** Whether the filter is currently loading */
	loading: PropTypes.bool,
	/** Pass a className to the wrapping element */
	className: PropTypes.string,
	/** Pass a handler to execute when the Filter Value Filter button is clicked */
	onFilter: PropTypes.func,
}

FilterInput.defaultProps = {
	keyLabel: "Select Filter",
	options: [],
	selectedFilterKey: "",
	onSelectedFilterKeyChange: undefined,
	valueLabel: "Filter by Value",
	filterValue: "",
	onFilterValueChange: undefined,
	onClear: undefined,
	onFilter: undefined,
	loading: false,
	className: "",
}