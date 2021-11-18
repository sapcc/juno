import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const message = `
	pr-2
	sm:pr-4
	bg-theme-message
	text-theme-default
	flex
	rounded-l
	overflow-hidden
`
const iconContainerStyles = `
	border-l-4
	pt-1
	pl-6
	sm:pt-3
`

const messageDefault = `
	border-theme-message-default
`

const messageError = `
	border-theme-message-error
`

const messageWarning = `
	border-theme-message-warning
`

const messageDanger = `
	border-theme-message-danger
`

const messageSuccess = `
	border-theme-message-success
`
const messageContentStyles = `
	py-1
	sm:py-3
	ml-7
`

const messageHeading = `
	font-bold
`

const variantClass = (variant) => {
	  switch (variant) {
		case "error":
		  	return messageError
		case "warning":
		  	return messageWarning
		case "success":
		  	return messageSuccess
		case "info":
			return messageDefault
		case "danger":
			return messageDanger
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
	className,
	children,
	...props
}) => {
	return (
		<div 
			className={`message message-${variant} ${message} ${className}`}
			{...props}
		>
			<div className={`message-icon-container ${iconContainerStyles} ${variantClass(variant)}`}>
				<Icon icon={ variant == "danger" ? "warning" : variant } color={ 'text-' + variant } />
			</div>
			<div className={`message-content ${messageContentStyles}`}>
				{title ?  <h1 className={`${messageHeading}`}>{title}</h1> : ""}
				<div>{ children ? children : text }</div>
			</div>
		</div>
	)
}

Message.propTypes = { 
	/** Pass an optional title */
	title: PropTypes.string,
	/** Pass a string of text to be rendered as contents. Alternatively, contents can be passed as children (see below) */
	text: PropTypes.string,
	/** Pass an optional className */
	className: PropTypes.string,
	/** Specify a semantic variant */
	variant: PropTypes.oneOf(['info', 'warning', 'danger','error', 'success']),
	/** Pass child nodes to be rendered as contents */
	children: PropTypes.node,
}

Message.defaultProps = {
	title: null,
	text: null,
	variant: 'info',
	className: "",
}