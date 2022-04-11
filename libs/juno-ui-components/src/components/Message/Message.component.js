import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const message = `
	text-theme-high
	flex
	mb-8
	rounded
	leading-5
	overflow-hidden
	items-center
`

const messageBorderStyles = `
	w-[4px]
	self-stretch
	border-l-4
	mr-6
	shrink-0
`

const messageDefault = `
	border-theme-message-default
`

const messageDefaultBg = `
	bg-theme-message-default
`

const messageError = `
	border-theme-message-error
`

const messageErrorBg = `
	bg-theme-message-error
`

const messageWarning = `
	border-theme-message-warning
`

const messageWarningBg = `
	bg-theme-message-warning
`

const messageDanger = `
	border-theme-message-danger
`

const messageDangerBg = `
	bg-theme-message-danger
`

const messageSuccess = `
	border-theme-message-success
`

const messageSuccessBg = `
	bg-theme-message-success
`

const messageContentStyles = `
	py-3
	pr-4
	ml-7
`

const messageHeading = `
	font-bold
`

const dismissButtonStyles = `
	ml-auto
	self-stretch
	flex
	flex-col
	py-2.5
	pr-2.5
`

const backgroundClass = (variant) => {
  switch (variant) {
    case "error":
      return messageErrorBg
    case "warning":
      return messageWarningBg
    case "success":
      return messageSuccessBg
    case "info":
      return messageDefaultBg
    case "danger":
      return messageDangerBg
    default:
      return messageDefaultBg
  }
}

const variantClass = (variant) => {
  switch (variant) {
    case "error":
      return messageError
    case "warning":
      return messageWarning
    case "success":
      return messageSuccess
    case "info":
      return messageDefault
    case "danger":
      return messageDanger
    default:
      return messageDefault
  }
}

// get the appropriate icon for messasge tyope by MUI name:
const getMuiIcon = (messageType) => {
  switch (messageType) {
    case "error":
      return "dangerous"
    default:
      return messageType
  }
}

/**
* A Message holds generally important information to help understand the contents, purpose, or state of a whole page or view.
Use sparingly, there should never be any two or more subsequent instances of Message as direct siblings/neighbors on an individual view.
*/
export const Message = ({
  title,
  text,
  variant,
  dismissible,
  autoDismiss,
  autoDismissTimeout,
  className,
  children,
  ...props
}) => {
  const [visible, setVisible] = useState(true)

  // ----- Timeout stuff -------
  const timeoutRef = React.useRef(null)

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current) // clear when component is unmounted
  }, [])

  // if autoDissmiss is true, hide message after passed or preconfigured timeout
  useEffect(() => {
    if (autoDismiss) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(
        () => setVisible(false),
        autoDismissTimeout
      )
    }
  }, [autoDismiss, autoDismissTimeout])

  const hideMessage = () => {
    setVisible(false)
  }

  return (
    <>
      {visible && (
        <div
          className={`juno-message juno-message-${variant} ${message} ${backgroundClass(
            variant
          )} ${className}`}
          {...props}
        >
          <div
            className={`juno-message-border ${messageBorderStyles} ${variantClass(
              variant
            )}`}
          ></div>
          <Icon
            icon={getMuiIcon(variant)}
            color={"text-theme-" + variant}
            className="shrink-0"
          />
          <div className={`juno-message-content ${messageContentStyles}`}>
            {title ? <h1 className={`${messageHeading}`}>{title}</h1> : ""}
            <div>{children ? children : text}</div>
          </div>
          {dismissible && (
            <div className={dismissButtonStyles}>
              <Icon
                icon="close"
                onClick={hideMessage}
                className="juno-message-close-button opacity-50 hover:opacity-100"
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

Message.propTypes = {
  /** Pass an optional title */
  title: PropTypes.string,
  /** Pass a string of text to be rendered as contents. Alternatively, contents can be passed as children (see below) */
  text: PropTypes.string,
  /** Specify a semantic variant */
  variant: PropTypes.oneOf(["info", "warning", "danger", "error", "success"]),
  /** Optional. If set to 'true', the message will get a close button to dismiss the message. */
  dismissible: PropTypes.bool,
  /** Optional. If set to 'true', the message will be automatically dismissed after 10 seconds by default or after the specified autoDismissTimeout */
  autoDismiss: PropTypes.bool,
  /** Optional. Timeout in miliseconds after which the message is automatically dismissed. By default 10000 (10s).*/
  autoDismissTimeout: PropTypes.number,
  /** Pass an optional className */
  className: PropTypes.string,
  /** Pass child nodes to be rendered as contents */
  children: PropTypes.node,
}

Message.defaultProps = {
  title: null,
  text: null,
  variant: "info",
  dismissible: false,
  autoDismiss: false,
  autoDismissTimeout: 10000,
  className: "",
}
