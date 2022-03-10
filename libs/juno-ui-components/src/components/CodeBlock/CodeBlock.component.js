import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const codeBlockBaseStyles = `
	bg-theme-code-block
`

const codeContainerStyles = `
	p-6
`

const codeStyles = `
	text-sm
`

const nonWrapStyles = `
	overflow-x-auto
`

export const CodeBlock = ({
	wrap,
	copyToClipboard,
	className,
	children,
	...props
}) => {
	
	const copyTextToClipboard = () => {
		navigator.clipboard.writeText(children)
	}
	
	const copy = (
		<div className={`flex justify-end px-4 pb-4`}>
			<Icon icon="contentCopy" onClick={copyTextToClipboard} />
		</div>
	)
	
	return (
		<div className={`juno-codeblock ${codeBlockBaseStyles} ${ !wrap ? nonWrapStyles : ''} ${className}`} {...props} >
			<pre className={`${codeContainerStyles}`} >
				<code className={`${codeStyles}`} >
					{children}
				</code>
			</pre>
			{ copyToClipboard ? copy : null }
		</div>
	)
}

CodeBlock.propTypes = {
	/** Add a custom class name */
	className: PropTypes.string,
	/** The children/content to render in a codeblock */
	children: PropTypes.node,
	/** Whether the content should wrap */
	wrap: PropTypes.bool,
	/** Whether to display a 'Copy to Clipboard' button */
	copyToClipboard: PropTypes.bool,
}

CodeBlock.defaultProps  = {
	wrap: true,
	copyToClipboard: true,
	className: "",
}