import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Button } from "../Button/index.js"
import { ButtonRow } from "../ButtonRow/index.js"
import { knownIcons } from "../Icon/Icon.component.js"

const modalfooterstyles = `
	jn-flex
	jn-flex-row
	jn-bg-theme-background-lvl-2
	jn-border-t
	jn-border-theme-background-lvl-4
	jn-py-2
	jn-px-8
`

const defaultmodalfooterstyles = `
	jn-justify-end
	jn-gap-3.5
`

/**
A Footer component for Modal.
Renders a simple "Close" Button (and accepts a corresponding onClose-handler) by default.
Can be passed a confirmButtonLabel and cancelButton label with corresponding onConfirm- and onCancel-handlers.
Can alternatively render all custom children as passed.
*/
export const ModalFooter = ({
	children,
	confirmButtonLabel,
	cancelButtonLabel,
	closeButtonLabel,
	confirmButtonIcon,
	cancelButtonIcon,
	onConfirm,
	onCancel,
	onClose,
	className,
	...props
}) => {
	
	const handleCloseClick = (event) => {
		onClose && onClose(event)
	}
	
	const handleConfirmClick = (event) => {
		onConfirm && onConfirm(event)
	}
	
	return (
		<div className={`juno-modal-footer ${modalfooterstyles} ${ children ? null : defaultmodalfooterstyles } ${className} `} >
			{ children ? 
				children
			:
				confirmButtonLabel ? 
					<ButtonRow>
						<Button variant="primary" label={ confirmButtonLabel } icon={confirmButtonIcon} onClick={handleConfirmClick} />
						<Button variant="subdued" label={ cancelButtonLabel || "Cancel"} icon={cancelButtonIcon} />
					</ButtonRow>
				:
					<ButtonRow>
						<Button variant="subdued" onClick={handleCloseClick} label={ closeButtonLabel || "Close" } />
					</ButtonRow>
			}
		</div>
	)
}

ModalFooter.propTypes = {
	/** Custom children to render. Anything goes. */
	children: PropTypes.node,
	/** The label for the Confirm-button. When passed, the component will render a Confirm button and a cancel button, otherwise the component will ONLY render a Close-Button. */
	confirmButtonLabel: PropTypes.string,
	/** Custom label for the cancel button. ONLY has an effect if a `confirmButtonLabel` is passed. */
	cancelButtonLabel: PropTypes.string,
	/** Custom Close-button label. ONLY has an effect if NO `confirmButtonLabel`is passed, otherwise the confirming button and a calncel button will be rendered. */
	closeButtonLabel: PropTypes.string,
	/** Pass an Icon name to show on the confirming action button */
	confirmButtonIcon: PropTypes.oneOf(knownIcons),
	/** Pass an icon name to show on the cancelling button */
	cancelButtonIcon:  PropTypes.oneOf(knownIcons),
	/** A custom className. Useful to configure flex items alignment when passing custom content as children. */
	className: PropTypes.string,
	/** Handler to execute once the confirming button is clicked */
	onConfirm: PropTypes.func,
	/** Handler to execute once the cancelling button is clicked */
	onCancel: PropTypes.func,
	/** Handler to execute once the Close button is clicked */
	onClose: PropTypes.func,
}

ModalFooter.defaultProps = {
	children: null,
	confirmButtonLabel: "",
	cancelButtonLabel: "",
	closeButtonLabel: "",
	confirmButtonIcon: null,
	cancelButtonIcon: null,
	className: "",
	onConfirm: undefined,
	onCancel: undefined,
	onClose: undefined,
}