import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const filterpillStyles = `
`

const keyStyles = `
`

const valueStyles = `
`

const iconStyles = `
`

export const FilterPill = ({
	key,
	value,
	keyLabel,
	valueLabel,
	className,
	...props
}) => { 
	return (
		<span className={`juno-filterpill ${filterpillStyles} ${className}`}{...props}>
			<span className={`${keyStyles}`}>{keyLabel}</span>
			<span className={`${valueStyles}`}>{valueLabel}</span>
			<span className={`${iconStyles}`}><Icon icon="close" /></span>
		</span>
	)
}

FilterPill.propTypes = {
	/** The key of the filter the pill represents */
	key: PropTypes.string,
	/** The label to describe the key */
	keyLabel: PropTypes.string,
	/** The value of the filter the pill represents */
	value: PropTypes.string,
	/** The label to describe the value */
	valueLabel: PropTypes.string,
	/** add custom classNames */
	className: PropTypes.string,	
}

FilterPill.defaultProps = {
	keyLabel: "Key",
	valueLabel: "Value",
	className: ""
}
