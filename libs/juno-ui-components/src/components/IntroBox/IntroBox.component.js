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

/**
* An Introbox holds generally important information to help understand the contents, purpose, or state of a whole page or view, or individual sections on longer pages.
Use sparingly, there should never be any two or more subsequent instances of Introbox as direct siblings/neighbors on an individual view.
*/
export const IntroBox = ({
	title,
	text,
	variant,
	children,
	...props
}) => {
	return (
		<div 
			className={`${introbox} ${variantClass(variant)} introbox-${variant}`}
			{...props}
		>
			{title ?  <h1 className={`${introboxHeading}`}>{title}</h1> : ""}
			<p>{ children ? children : text }</p>
		</div>
	)
}

IntroBox.propTypes = { 
	/** Pass an optional title */
	title: PropTypes.string,
	/** Pass a string of text to be rendered as contents. Alternatively, contents can be passed as children (see below) */
	text: PropTypes.string,
	/** Specify a semantic variant */
	variant: PropTypes.oneOf(['default', 'warning', 'danger']),
	/** Pass child nodes to be rendered as contents */
	children: PropTypes.node,
}

IntroBox.defaultProps = {
	title: null,
	text: null,
	variant: 'default',
}