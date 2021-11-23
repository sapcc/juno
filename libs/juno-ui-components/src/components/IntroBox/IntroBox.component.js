import React from "react"
import PropTypes from "prop-types"

const introbox = `
	py-1
	px-2
	sm:py-3
	sm:px-4
	bg-theme-introbox
	text-theme-default
`

const introboxHeading = `
	font-bold
`

/**
* An Introbox holds generally important information to help understand the contents, purpose, or state of a whole page or view, or individual sections on longer pages.
Use sparingly, there should never be any two or more subsequent instances of Introbox as direct siblings/neighbors on an individual view.
*/
export const IntroBox = ({
	title,
	text,
	className,
	children,
	...props
}) => {
	return (
		<div 
			className={`juno-introbox ${introbox} ${className}`}
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
	/** Pass a custom class */
	className: PropTypes.string,
	/** Pass child nodes to be rendered as contents */
	children: PropTypes.node,
}

IntroBox.defaultProps = {
	title: null,
	text: null,
	className: "",
}