import React from "react"
import PropTypes from "prop-types"

const message = `
	py-1
	px-2
	sm:py-3
	sm:px-4
	border-l-4
	bg-theme-message
	text-theme-default
`

const messageDefault = `
	border-theme-message-default
`

const messageDanger = `
	border-theme-message-danger
`

const messageWarning = `
	border-theme-message-warning
`

const messageHeading = `
	font-bold
`

const variantClass = (variant) => {
	  switch (variant) {
		case "danger":
		  return messageDanger
		case "warning":
		  return messageWarning
		case "default":
		return messageDefault
		default:
		  return messageDefault
	  }
	}

/**
* A Message holds generally important information to help understand the contents, purpose, or state of a whole page or view.
Use sparingly, there should never be any two or more subsequent instances of Message as direct siblings/neighbors on an individual view.
*/
export const Message = ({
	title,
	text,
	variant,
	children,
	...props
}) => {
	return (
		<div 
			className={`${message} ${variantClass(variant)} message-${variant}`}
			{...props}
		>
			{title ?  <h1 className={`${messageHeading}`}>{title}</h1> : ""}
			<p>{ children ? children : text }</p>
		</div>
	)
}

Message.propTypes = { 
	/** Pass an optional title */
	title: PropTypes.string,
	/** Pass a string of text to be rendered as contents. Alternatively, contents can be passed as children (see below) */
	text: PropTypes.string,
	/** Specify a semantic variant */
	variant: PropTypes.oneOf(['default', 'warning', 'danger']),
	/** Pass child nodes to be rendered as contents */
	children: PropTypes.node,
}

Message.defaultProps = {
	title: null,
	text: null,
	variant: 'default',
}