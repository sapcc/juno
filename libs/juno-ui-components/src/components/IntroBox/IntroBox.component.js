import React from "react"
import PropTypes from "prop-types"

const introbox = `
	py-1
	px-2
	sm:py-3
	sm:px-4
	border-l-4
`

const introboxDefault = `
	bg-theme-introbox-default
	border-theme-introbox-default
`

const introboxDanger = `
	bg-theme-introbox-danger
	border-theme-introbox-danger
`

const introboxWarning = `
	bg-theme-introbox-warning
	border-theme-introbox-warning
`

const introboxHeading = `
	font-bold
`


const variantClass = (variant) => {
	  switch (variant) {
		case "danger":
		  return introboxDanger
		case "warning":
		  return introboxWarning
		case "default":
		return introboxDefault
		default:
		  return introboxDefault
	  }
	}

export const IntroBox = ({
	title,
	text,
	variant,
	children,
	...props
}) => {
	return (
		<div 
			className={`${introbox} ${variantClass(variant)}`}
			{...props}
		>
			{title ?  <h1 className={`${introboxHeading}`}>{title}</h1> : ""}
			<p>{ children ? children : text }</p>
		</div>
	)
}

IntroBox.propTypes = { 
	title: PropTypes.string,
	text: PropTypes.string,
	variant: PropTypes.oneOf(['default', 'warning', 'danger']),
	children: PropTypes.node,
}

IntroBox.defaultProps = {
	title: null,
	text: null,
	variant: 'default',
}