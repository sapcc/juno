import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ModalFooter } from "../ModalFooter/index"
import { Icon } from "../Icon"

/*
* backdrop TODO
* optional title ✓
* closeable by default ✓
* open programmatically TODO
* pass onClose handler ✓
* styling TODO: padding content? -> 'unpad'
* min-height for content?  ✓
* allow for creating modals without buttons? ✓
* always show header bar regardless whether there is title and/or close button?  ✓
* SM/LG sizes (widths for now).  ✓ 
* confirmButtonIcon prop? TODO
* Spare "variant" prop for semantic variants later. TODO
* a11y (voicereader, keyboard accessibilty) TODO
* trap focus TODO
* render in Portal (how to make sure we're always in scope of StyleProvider? TODO -> add element to styleprovider
* Error messasges PascalCase? TODO
*/

const modalstyles = `
	jn-bg-theme-background-lvl-2
`

const headerstyles = `
	jn-flex
	jn-py-2
	jn-px-8
	jn-border-b
	jn-border-theme-background-lvl-4
`

const titlestyles = `
	jn-text-xl
	jn-font-bold
`

const contentstyles = `
	jn-min-h-[5rem]
`

const contentpaddingstyles = `
	jn-py-3
	jn-px-8
`

const sizeClass = (size) => {
	switch (size) {
		case "large":
			return `jn-w-[40rem]`
		default:
			return `jn-w-[33.625rem]`
	} 		 
}

/**
A generic Modal component.
*/
export const Modal = ({
	size,
	title,
	heading,
	confirmButtonLabel,
	cancelButtonLabel,
	open,
	children,
	modalFooter,
	closeable,
	unpad,
	onClose,
	onCancel,
	...props
}) => {
	
	const [isOpen, setIsOpen] = useState(open)
	const [isCloseable, setIsCloseable] = useState(closeable)
	
	useEffect(() => {
		setIsOpen(open)
	}, [open])
	
	useEffect(() => {
		setIsCloseable(closeable)
	}, [closeable])
	  
	const handleCloseClick = (event) => {
		setIsOpen(false)
		onClose && onClose(event)
	}
	
	return (
		<div className={`juno-modal ${sizeClass(size)} ${modalstyles}`} role="dialog">
			<div className={`juno-modal-header ${headerstyles} ${ title || heading ? `jn-justify-between` : `jn-justify-end` }`}>
				{ title || heading ? <h1 className={`juno-modal-title ${titlestyles}`} >{ title || heading }</h1> : null }
				{ isCloseable ? <Icon icon="close" onClick={ handleCloseClick }/> : null }
			</div>
			<div className={`juno-modal-content ${contentstyles} ${ unpad ? "" : contentpaddingstyles }`} >
				{ children }
			</div>
			{ isCloseable ? 
				modalFooter ?
					modalFooter
					:
					<ModalFooter confirmButtonLabel={confirmButtonLabel} cancelButtonLabel={cancelButtonLabel} />
				: 
				null 
			}
		</div>
	)
}

Modal.propTypes = {
	/** The Modal size */
	size: PropTypes.oneOf(["small", "large"]),
	/** The title of the modal */
	title: PropTypes.string,
	/** Also the title of the modal, just for API flexibility. If both `title` and `heading` are passed, `title` will win. */
	heading: PropTypes.string,
	/** Pass a label to render a confirm button and a Cancel button */
	confirmButtonLabel: PropTypes.string,
	/** Pass a label for the cancel button. Defaults to "Cancel" */
	cancelButtonLabel: PropTypes.string,
	/** Whether the modal will be open */
	open: PropTypes.bool,
	/** The children of the modal. These will be rendered as the modal content. To render custom buttons at the bottom, see `modalFooter` below.*/
	children: PropTypes.node,
	/** Optional. Pass a `<ModalFooter />` component with custom content as required. Will default to using the `<ModalFooter/>` component internally. */
	modalFooter: PropTypes.element,
	/** Whether the modal can be closed using an "X"-Button at the top right. Defaults to true. */
	closeable: PropTypes.bool,
	/** Pass to remove default padding from the content area of the modal */
	unpad: PropTypes.bool,
	/** A handler to execute once the modal is closed by clicking the Close button (or pressing ESC TODO) */
	onClose: PropTypes.func,
	/** A handler to execute once the modal is cancelled using the Cancel-button or pressing ESC */
	onCancel: PropTypes.func,
}

Modal.defaultProps = {
	size: "small",
	title: "",
	heading: "",
	confirmButtonLabel: "",
	cancelButtonLabel: "",
	open: false,
	children: null,
	modalFooter: null,
	closeable: true,
	unpad: false,
	onClose: undefined,
	onCancel: undefined,
}