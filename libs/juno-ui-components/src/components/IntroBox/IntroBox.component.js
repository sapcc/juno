import React from "react"
import PropTypes from "prop-types"

const variantClass = (variant) => {
	  switch (variant) {
		case "danger":
		  return "introbox-danger"
		case "warning":
		  return "introbox-warning"
		case "default":
		return "introbox-default"
		default:
		  return "introbox-default"
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
			className={`introbox ${variantClass(variant)}`}
			{...props}
		>
			{title ?  <h1>{title}</h1> : ""}
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