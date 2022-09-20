import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ModalFooter } from "../ModalFooter/index"
import { knownIcons } from "../Icon/Icon.component.js"
import { Icon } from "../Icon"

/*

* optional title ✓
* closeable by default ✓
* padding content? -> 'unpad'  ✓
* min-height for content?  ✓
* allow for creating modals without buttons? ✓
* always show header bar regardless whether there is title and/or close button?  ✓
* SM/LG sizes (widths for now).  ✓ 
* confirmButtonIcon prop  ✓
* cancelButtonIcon prop  ✓
* backdrop  ✓
* open programmatically TODO
* handle height/scrolling TODO
* Spare "variant" prop for semantic variants later. TODO
* a11y (voicereader, keyboard accessibilty) TODO
* trap focus TODO
* render in Portal (how to make sure we're always in scope of StyleProvider? TODO -> add element to styleprovider TODO
*/

const modalcontainerstyles = `
	jn-fixed
	jn-inset-0
	jn-flex
	jn-items-center
	jn-bg-theme-modal-backdrop/60
	jn-backdrop-blur-[2px]
`

const modalstyles = `
	jn-bg-theme-background-lvl-2
	jn-relative
	jn-m-auto
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
	jn-py-4
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
	confirmButtonIcon,
	cancelButtonIcon,
	open,
	children,
	modalFooter,
	closeable,
	unpad,
	onConfirm,
	onCancel,
	className,
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
	
	const handleConfirmClick = (event) => {
		onConfirm && onConfirm(event)
	}
	  
	const handleCancelClick = (event) => {
		setIsOpen(false)
		onCancel && onCancel(event)
	}
	
	return (
		<>
			{ isOpen && (
					<div className={`juno-modal-container ${modalcontainerstyles}`} >
						<div className={`juno-modal ${sizeClass(size)} ${modalstyles} ${className}`} role="dialog" {...props} >
							<div className={`juno-modal-header ${headerstyles} ${ title || heading ? `jn-justify-between` : `jn-justify-end` }`}>
								{ title || heading ? <h1 className={`juno-modal-title ${titlestyles}`} >{ title || heading }</h1> : null }
								{ isCloseable ? <Icon icon="close" onClick={ handleCancelClick }/> : null }
							</div>
							<div className={`juno-modal-content ${contentstyles} ${ unpad ? "" : contentpaddingstyles }`} >
								{ children }
							</div>
							{ isCloseable ? 
								modalFooter ?
									modalFooter
									:
									<ModalFooter 
										confirmButtonLabel={confirmButtonLabel} 
										cancelButtonLabel={cancelButtonLabel} 
										confirmButtonIcon={confirmButtonIcon}
										cancelButtonIcon={cancelButtonIcon}
										onConfirm={handleConfirmClick}
										onCancel={handleCancelClick}
									/>
								: 
								null 
							}
						</div>
					</div>
				)
			}
		</>
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
	/** Pass an Icon name to show on the confirming action button */
	confirmButtonIcon: PropTypes.oneOf(knownIcons),
	/** Pass an icon name to show on the cancelling button */
	cancelButtonIcon:  PropTypes.oneOf(knownIcons),
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
	/** Custom className to add to the modal */
	className: PropTypes.string,
	/** A handler to execute once the modal is cancelled using the x-Close button,  Cancel-button or pressing ESC */
	onCancel: PropTypes.func,
}

Modal.defaultProps = {
	size: "small",
	title: "",
	heading: "",
	confirmButtonLabel: "",
	cancelButtonLabel: "",
	confirmButtonIcon: null,
	cancelButtonIcon: null,
	open: false,
	children: null,
	modalFooter: null,
	closeable: true,
	unpad: false,
	className: "",
	onConfirm: undefined,
	onCancel: undefined,
}