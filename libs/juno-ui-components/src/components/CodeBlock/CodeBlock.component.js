import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"
import { Tabs } from "../Tabs/Tabs.component.js"
import { TabList } from "../TabList/TabList.component.js"
import { Tab } from "../Tab/Tab.component.js"
import { TabPanel } from "../TabPanel/TabPanel.component.js"

const codeBlockBaseStyles = `
	jn-bg-theme-code-block
	jn-rounded
`

const codeContainerStyles = (wrap) => {	

	return `
		jn-p-6
		${wrap ? "jn-break-words jn-break-all jn-whitespace-pre-wrap" : "jn-overflow-x-auto"}
	`
}

const codeContainerSize = (size) => {	

	switch(size) {
		case "small":
			return `
				jn-max-h-64
				jn-overflow-y-auto
			`		
		case "medium":
			return `
				jn-max-h-[32rem]
				jn-overflow-y-auto
			`		
		case "large":
			return `
				jn-max-h-[56rem]
				jn-overflow-y-auto
			`	
		default:
			return ""	
	}
	
}

const codeStyles = `
	jn-text-sm
`

const tabStyles = `
	jn-text-sm 
	jn-px-6 
	jn-py-2
`

const bottomBarStyles = `
	jn-flex 
	jn-justify-end 
	jn-px-3
	jn-py-2 
	jn-border-t-[1px]
	jn-border-theme-codeblock-bar
`


export const CodeBlock = ({
	wrap,
	heading,
	tabs,
	contents,
	size,
	copyToClipboard,
	className,
	children,
	...props
}) => {
	
	const [isCopied, setIsCopied] = useState(false)
	
	const timeoutRef = React.useRef(null)
		
  	React.useEffect(() => {
	  return () => clearTimeout(timeoutRef.current) // clear when component is unmounted
    }, [])
	
	const handleCopyClick = () => {
		navigator.clipboard.writeText(theCode.current.textContent)
		setIsCopied(true)
		clearTimeout(timeoutRef.current) // clear any possibly existing Refs
		timeoutRef.current = setTimeout(() => setIsCopied(false), 1000)
	}
	
	/* If tabs were passed, use these. If not, but heading was been passed, create an array with heading as only element. Otherwise, return empty array: */
	const theTabs = tabs.length ? tabs : (heading.length ? [heading] : [])

	/* If contents was passed, use these. If not, but heading was passed, create an array with children as the only element. Otherwise, return empty array: */
	const theContents = contents.length ? contents : (children ? [children] : [])
	
	const theCode = useRef(null)
	
	return (
		
		<div className={`juno-codeblock ${codeBlockBaseStyles} ${className}`} {...props} >

			{ theTabs.length ? 
				<Tabs>
					<TabList>
						{theTabs.map((tab, t) => (
							<Tab className={`${tabStyles}`} key={t}>{tab}</Tab>
						))}
					</TabList>
					{theContents.map((element, c) => (
						<TabPanel key={c}>
							<pre className={`${codeContainerStyles(wrap)} ${codeContainerSize(size)}`} data-testid="juno-codeblock-pre">
								<code className={`${codeStyles}`} ref={theCode} >
									{element}
								</code>
							</pre>
						</TabPanel>
					))}
				</Tabs>
			: 
				<pre className={`${codeContainerStyles(wrap)} ${codeContainerSize(size)}`} data-testid="juno-codeblock-pre">
					<code className={`${codeStyles}`} ref={theCode} >
						{children}
					</code>
				</pre>
			}
			
			{ copyToClipboard ? 
				<div className={`juno-codeblock-bottombar ${bottomBarStyles}`}>
					<span className={`jn-font-bold jn-text-sm jn-mr-4 jn-mt-1`} >{ isCopied ? "Copied!" : "" }</span>
					<Icon icon="contentCopy" onClick={handleCopyClick} />
				</div> 
			: 
				null
			}
			
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
	/** Optional tabs. Pass an array of strings to be rendered as tabs */
	tabs: PropTypes.arrayOf(PropTypes.string),
	/* Optional contents. Pass an array of code sample strings to be rendered to work with tabs: */
	contents: PropTypes.arrayOf(PropTypes.string),
	/** Optional size (height). By default height is unrestricted. If specifying a size the CodeBlock will not grow past the given size and get scrollbars if the content is higher */
	size: PropTypes.oneOf(["auto", "small", "medium", "large"]),
	/** Whether to display a 'Copy to Clipboard' button */
	copyToClipboard: PropTypes.bool,
}

CodeBlock.defaultProps  = {
	wrap: true,
	heading: "",
	tabs: [],
	contents: [],
	size: "auto",
	copyToClipboard: true,
	className: "",
}