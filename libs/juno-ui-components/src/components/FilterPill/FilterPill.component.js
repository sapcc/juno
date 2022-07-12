import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const filterpillStyles = `
	jn-inline-flex
	jn-basis-auto
	jn-shrink
	jn-items-center
	jn-flex-nowrap
	jn-text-xs
	jn-p-px
	jn-border
	jn-rounded
	jn-mr-2
	jn-border-theme-filter-pill
	last:jn-mr-0
`

const filterkeyStyles = `
	jn-bg-theme-filter-pill-key
	jn-px-1
	jn-py-0.5
	jn-rounded-sm
	jn-inline-block
`

const filtervalueStyles = `
	jn-px-1
	jn-py-0.5
	jn-text-theme-high
	jn-inline-block
`

const iconWrapperStyles = `
	
`

export const FilterPill = ({
	FilterKey,
	FilterValue,
	FilterKeyLabel,
	FilterValueLabel,
	onClose,
	className,
	...props
}) => { 
	
	const handleCloseClick = (event) => {
		onClose && onClose(event)
	}
	
	return (
		<div className={`juno-filterpill ${filterpillStyles} ${className}`} {...props} >
			<span className={`${filterkeyStyles}`}>{FilterKeyLabel}</span>
			<span className={`${filtervalueStyles}`}>{FilterValueLabel}</span>
			<Icon icon="close" size="18" onClick={handleCloseClick} />
		</div>
	)
}

FilterPill.propTypes = {
	/** The key of the filter the pill represents */
	FilterKey: PropTypes.string,
	/** The visible label to describe the filter key */
	FilterKeyLabel: PropTypes.string,
	/** The value of the filter the pill represents */
	FilterValue: PropTypes.string,
	/** The visible label to describe the filter value */
	FilterValueLabel: PropTypes.string,
	/** add custom classNames */
	className: PropTypes.string,
	/** Pass a handler to be executed when closing the FilterPill */
	onClose: PropTypes.func,
}

FilterPill.defaultProps = {
	FilterKeyLabel: "Key",
	FilterValueLabel: "Value",
	onClose: undefined,
	className: ""
}
