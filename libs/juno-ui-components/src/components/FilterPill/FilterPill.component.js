import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const styles = `

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
		<span className={`juno-filterpill ${styles} ${className}`}{...props}>
			<span>{keyLabel}</span>
			<span>{valueLabel}</span>
			<Icon icon="close" />
		</span>
	)
}

FilterPill.propTypes = {
	className: PropTypes.string,	
}

FilterPill.defaultProps = {
	keyLabel: "Key",
	valueLabel: "Value",
	className: ""
}
