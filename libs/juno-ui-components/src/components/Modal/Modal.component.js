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
	title: PropTypes.string,
	heading: PropTypes.string,
	open: PropTypes.bool,
	children: PropTypes.node,
	/** Optional. Pass a <ModalFooter /> component with custom content as required. Will default to using the <ModalFooter/> component internally. */
	modalFooter: PropTypes.node,
	closeable: PropTypes.bool,
	onClose: PropTypes.func,
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