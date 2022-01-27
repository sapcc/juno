import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const message = `
	pr-2
	sm:pr-4
	text-theme-high
	flex
	rounded-l
	leading-5
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

const messageDefaultBg = `
	bg-theme-message-default
`

const messageError = `
	border-theme-message-error
`

const messageErrorBg = `
	bg-theme-message-error
`

const messageWarning = `
	border-theme-message-warning
`

const messageWarningBg = `
	bg-theme-message-warning
`

const messageDanger = `
	border-theme-message-danger
`

const messageDangerBg = `
	bg-theme-message-danger
`

const messageSuccess = `
	border-theme-message-success
`

const messageSuccessBg = `
	bg-theme-message-success
`

const messageContentStyles = `
	py-1
	sm:py-3
	ml-7
`

const messageHeading = `
	font-bold
`
const backgroundClass = (variant) => {
	switch(variant) {
		case "error":
			return messageErrorBg
		case "warning":
			return messageWarningBg
		case "success":
			return messageSuccessBg
		case "info":
			return messageDefaultBg
		case "danger":
			return messageDangerBg
		default:
			return messageDefaultBg
	}
}

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

// get the appropriate icon for messasge tyope by MUI name:
const getMuiIcon = (messageType) => {
	switch (messageType) {
		case "error":
			return "dangerous"
		default:
			return messageType
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
			className={`juno-message juno-message-${variant} ${message} ${backgroundClass(variant)} ${className}`}
			{...props}
		>
			<div className={`juno-message-icon-container ${iconContainerStyles} ${variantClass(variant)}`}>
				<Icon icon={ getMuiIcon(variant) } color={ 'text-theme-' + variant } />
			</div>
			<div className={`juno-message-content ${messageContentStyles}`}>
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