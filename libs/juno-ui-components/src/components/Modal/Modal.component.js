import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ModalFooter } from "../ModalFooter"
import { Icon } from "../Icon"

/*
TODO:
* backdrop
* optional title ✓
* closeable by default ✓
* open programmatically
* pass onClose handler ✓
* allow for creating modals without buttons?  ✓
* always show header bar regardless whether there is title and/or close button?
* SM/LG sizes. 
* Spare "variant" prop for semantic variants later.
* a11y (voicereader, keyboard accessibilty)
* trap focus
*/

const modalstyles = `
`

const headerstyles = `
`

const titlestyles = `
`


/**
A generic Modal component.
*/
export const Modal = ({
	title,
	heading,
	open,
	children,
	modalFooter,
	closeable,
	onClose,
	onCancel,
	...props
}) => {
	
	const [isOpen, setIsOpen] = useState(open)
	
	useEffect(() => {
		setIsOpen(open)
	  }, [open])
	
	const handleCloseClick = (event) => {
		setIsOpen(false)
		onClose && onClose(event)
	}
	
	return (
		<div className={`juno-modal ${modalstyles}`} role="dialog">
			<div className={`juno-modal-header ${headerstyles}`}>
				{ title || heading ? <h1 className={`juno-modal-title ${titlestyles}`} >{ title || heading }</h1> : null }
				{ closeable ? <Icon icon="close" onClick={ handleCloseClick }/> : null }
			</div>
			{ children }
			{ closeable ? 
				modalFooter ?
					modalFooter
					:
					<ModalFooter></ModalFooter>
				: 
				null 
			}
		</div>
	)
}

Modal.propTypes = {
	/** The title of the modal */
	title: PropTypes.string,
	/** Also the title of the modal, just for API flexibility. If both `title` and `heading` are passed, `title` will win. */
	heading: PropTypes.string,
	/** Whether the modal will be open */
	open: PropTypes.bool,
	/** The children of the modal. These will be rendered as the modal content. To render custom buttons at the bottom, see `modalFooter` below.*/
	children: PropTypes.node,
	/** Optional. Pass a <ModalFooter /> component with custom content as required. Will default to using the <ModalFooter/> component internally. */
	modalFooter: PropTypes.node,
	/** Whether the modal can be closed using an "X"-Button at the top right. Defaults to true. */
	closeable: PropTypes.bool,
	/** A handler to execute once the modal is closed by clicking the Close button (or pressing ESC TODO) */
	onClose: PropTypes.func,
	/** A handler to execute once the modal is cancelled using the Cancel-button or pressing ESC */
	onCancel: PropTypes.func,
}

Modal.defaultProps = {
	title: "",
	heading: "",
	open: false,
	children: null,
	modalFooter: <ModalFooter />,
	closeable: true,
	onClose: undefined,
	onCancel: undefined,
}