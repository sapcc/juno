import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon"

/*
TODO:
* backdrop
* optional title
* closeable by default
* open programmatically
* pass onClose handler
* allow for creating modals without buttons?
* always show header bar regardless whether there is title and/or close button?
* SM/LG: variant or size? default? how to use/pass when passing custom content?
* do we expect semantic variants?
* use SM/LG for two kind-of default behaviours, pass additional width/height props? Or pass additonal CSS/classes?
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
	closeable,
	onClose,
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
		</div>
	)
}

Modal.propTypes = {
	title: PropTypes.string,
	heading: PropTypes.string,
	open: PropTypes.bool,
	children: PropTypes.node,
	closeable: PropTypes.bool,
	onClose: PropTypes.func,
}

Modal.defaultProps = {
	title: "",
	heading: "",
	open: false,
	closeable: true,
	onClose: undefined,
}