import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const filterpillStyles = `
`

const filterkeyStyles = `
`

const filtervalueStyles = `
`

const iconStyles = `
`

export const FilterPill = ({
	FilterKey,
	FilterValue,
	FilterKeyLabel,
	FilterValueLabel,
	className,
	...props
}) => { 
	return (
		<span className={`juno-filterpill ${filterpillStyles} ${className}`} {...props}>
			<span className={`${filterkeyStyles}`}>{FilterKeyLabel}</span>
			<span className={`${filtervalueStyles}`}>{FilterValueLabel}</span>
			<span className={`${iconStyles}`}><Icon icon="close" /></span>
		</span>
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
}

FilterPill.defaultProps = {
	FilterKeyLabel: "Key",
	FilterValueLabel: "Value",
	className: ""
}
