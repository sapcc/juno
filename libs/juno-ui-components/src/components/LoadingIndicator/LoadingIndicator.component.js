import React from "react"
import PropTypes from "prop-types"

import Loading from "./loading-indicator.svg"

export const LoadingIndicator = ({
	size,
	className,
	...props
}) => {
	return (
		<Loading 
			width={size}
			height={size}
			className={`${className}`}
		/>
	)
}

LoadingIndicator.propTypes = {
	size: PropTypes.string,
	className: PropTypes.string,
}

LoadingIndicator.defaultProps = {
	size: "24",
	className: "",
}


