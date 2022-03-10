import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const codeBlockBaseStyles = `
	bg-theme-code-block
	rounded
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
	heading,
	copyToClipboard,
	className,
	children,
	...props
}) => {
	
	const [isCopied, setIsCopied] = useState(false)
	
	const copyTextToClipboard = () => {
		navigator.clipboard.writeText(children)
		setIsCopied(true)
		// Start and clear timer for visible feedback:
		const timer = setTimeout( () => setIsCopied(false), 2000 )
		return () => clearTimeout(timer)
	}
	
	const codeBlockHeading = (
		<div>
			<span className={`font-bold text-sm inline-block px-6 py-2`}>
				{heading}
			</span>
		</div>
	)
	
	const copy = (
		<div className={`flex justify-end px-4 pb-4`}>
			<span className={`font-bold text-sm mr-4 mt-1`} >{ isCopied ? "Copied!" : "" }</span>
			<Icon icon="contentCopy" onClick={copyTextToClipboard} />
		</div>
	)
	
	return (
		<div className={`juno-codeblock ${codeBlockBaseStyles} ${className}`} {...props} >
			{ heading ? codeBlockHeading : null }
			<pre className={`${codeContainerStyles} ${ !wrap ? nonWrapStyles : '' } `} >
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
	/** Optional title */
	heading: PropTypes.string,
	/** Whether to display a 'Copy to Clipboard' button */
	copyToClipboard: PropTypes.bool,
}

CodeBlock.defaultProps  = {
	wrap: true,
	heading: "",
	copyToClipboard: true,
	className: "",
}