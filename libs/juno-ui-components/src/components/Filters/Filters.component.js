import React from "react"
import PropTypes from "prop-types"
import { FilterInput } from "../FilterInput/FilterInput.component"

const filterStyles = `
	jn-mb-px
	jn-bg-theme-filters
	jn-rounded-t
	jn-pt-4
	jn-px-4
	jn-pb-2
`

const inputWrapperStyles = `
	jn-w-full
	jn-flex
	jn-mb-2
`

const searchWrapperStyles = `
	jn-ml-auto
`

const filterPillWrapperStyles = `
	jn-flex
	jn-flex-wrap
`

export const Filters = ({
	search,
	filters,
	selectedFilterKey,
	onSelectedFilterKeyChange,
	filterValue,
	onFilterValueChange,
	onFilter,
	onFilterClear,
	children,
	className,
	loading,
	...props
}) => {
	return (
		<div className={`juno-filters ${filterStyles} ${className}`} {...props} >
			<div className={`juno-filters-input-wrapper ${inputWrapperStyles}`} >
				{ filters && filters.options ? 
					<FilterInput 
						keyLabel={filters.keyLabel}
						valueLabel={filters.valueLabel}
						options={filters.options}
						selectedFilterKey={selectedFilterKey}
						onSelectedFilterKeyChange={onSelectedFilterKeyChange}
						filterValue={filterValue}
						onFilterValueChange={onFilterValueChange}
						onFilter={onFilter}
						onClear={onFilterClear}
						loading={loading}
					/> 
					: 
					null }
				{ search ? 
					<div className={`${searchWrapperStyles}`} >
						{ search }
					</div> 
				: null }
			</div>
			<div className={`${filterPillWrapperStyles}`}>
				{ children }
			</div>
		</div>
	)
}

Filters.propTypes = {
	/** Pass a SearchInput component */
	search: PropTypes.node,
	/** Pass an object describing the filter keyLabel, valueLabel, and the available filter options:
	`{ keyLabel: "Select a Filter",`
		 `valueLabel: "Enter a Value",`
		 `options: [{label: "Filter 1", key: "filter-1"}, {...}] }` 
	*/
	filters: PropTypes.object, 
	/** The key of the currently selected filter */
	selectedFilterKey: PropTypes.string,
	/** Pass a handler to be executed when the filter key changes */
	onSelectedFilterKeyChange: PropTypes.func,
	/** The value of the FilterInput */
	filterValue: PropTypes.string,
	/** Pass a handler to be executed whenever the value of the filter value input changes */
	onFilterValueChange: PropTypes.func,  
	/** Pass a handler to be executed once the user clicks the filter button */
	onFilter: PropTypes.func,
	/** Pas a handler to be executed once the Filter input is cleared */
	onFilterClear: PropTypes.func,
	/** add custom classNames */
	className: PropTypes.string,
	/** Whether the filters are currently loading */
	loading: PropTypes.bool,
}

Filters.defaultProps = {
	search: null,
	filters: null,
	selectedFilterKey: "",
	onSelectedFilterKeyChange: undefined,
	filterValue: "",
	onFilter: undefined,
	onFilterValueChange: undefined,
	onFilterClear: undefined,
	className: "",
	loading: false,
}