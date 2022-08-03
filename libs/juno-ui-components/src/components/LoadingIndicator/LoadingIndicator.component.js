import React from "react"
import PropTypes from "prop-types"

import Loading from "./loading-indicator.svg"

export const LoadingIndicator = ({
	size,
	color,
	className,
	...props
}) => {
	return (
		<Loading 
			width={size}
			height={size}
			className={`${className} ${color}`}
			role="progressbar"
		/>
	)
}

LoadingIndicator.propTypes = {
	/** The size of the LoadingIndicator as a number of pixels (without "px": "100" will render an LoadingIndicator of 100px x 100px). default is 96. */
	size: PropTypes.string,
	/** By default, the LoadingIndicator will use the `color` of the current context. In order to use a different color just for the LoadingIndicator, a text color class can be passed. These begin with "jn-text-". You can pass any other class that contains a "color:" declaration as well.*/
	color: PropTypes.string,
	/** Pass a custom className */
	className: PropTypes.string,
}

LoadingIndicator.defaultProps = {
	size: "96",
	color: "",
	className: "",
}


