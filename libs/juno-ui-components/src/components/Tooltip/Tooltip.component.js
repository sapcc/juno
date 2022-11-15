import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  autoUpdate,
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
	useFocus,
  useHover,
	useRole,
  shift,
  offset,
  flip,
} from "@floating-ui/react-dom-interactions"
import { Icon } from "../Icon/index.js"

/* Styles */
const popoverStyles = `
	jn-bg-theme-background-lvl-1
	jn-text-theme-high 
	jn-inline-flex	
	jn-items-start
	jn-p-2
	jn-rounded
	jn-drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]
`

const popoverTextStyles = `
	jn-mx-4
	jn-max-w-full
`

const popoverIconStyles = `
	jn-shrink-0
`

const getIcon = (variant) => {
  switch (variant) {
    case "error":
      return "dangerous"
    default:
      return variant
  }
}

/**
A ToolTip component. Renders a non-semantic version by default, and can render 'Info', 'Warning', 'Error', 'Danger', and 'Success' semantic variants.
*/
export const Tooltip = ({
  variant,
  children,
  triggerElement,
  placement,
  text,
  className,
  disabled,
  open,
  triggerEvent,
  onClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  // initialize floating ui
  const { x, y, reference, floating, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate, // this ensures the tooltip stays on screen when scrolling
    placement: placement,
    middleware: [offset(5), flip(), shift()],
  })

  // event listeners for open state
  const click = useClick(context, { enabled: triggerEvent === "click" })
  const hover = useHover(context, { enabled: triggerEvent === "hover" })
  const dismiss = useDismiss(context)
  const focus = useFocus(context)
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" })

  // merge all interactions into props
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    hover,
    focus,
    role,
  ])

  return (
    <div className={`juno-tooltip jn-inline-block`} {...props}>
      <div className="juno-tooltip-trigger-wrapper jn-inline-block jn-cursor-pointer">
        {React.cloneElement(triggerElement, {
          className: "juno-tooltip-trigger",
          disabled: disabled,
          ref: reference,
          ...getReferenceProps(),
        })}
      </div>
      {isOpen && (
        <div
          className={`juno-tooltip-popover juno-tooltip-popover-${variant} ${popoverStyles} ${className}`}
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
        >
          {variant && (
            <Icon
              icon={getIcon(variant)}
              color={"jn-text-theme-" + variant}
              className={`juno-tooltip-popover-icon ${popoverIconStyles}`}
            />
          )}
          <p className={`${popoverTextStyles}`}>{children || text}</p>
        </div>
      )}
    </div>
  )
}

Tooltip.propTypes = {
  /** The semantic variant of the tooltip, or `plain` */
  variant: PropTypes.oneOf(["info", "warning", "danger", "error", "success"]),
  /** Pass child nodes to display in the tooltip */
  children: PropTypes.node,
  /** The element that should trigger the tooltip (currently works for the Icon or Button component, or any html node) */
  triggerElement: PropTypes.element,
  /** Choose which event should trigger the opening of the tooltip (click or hover) */
  triggerEvent: PropTypes.oneOf(["click", "hover"]),
  /** Tooltip placement in relation to trigger, default is bottom */
  placement: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
  ]),
  /** Text to display in the tooltip */
  text: PropTypes.node,
  /** Pass a className to render to the icon button*/
  className: PropTypes.string,
  /** Disable the tooltip */
  disabled: PropTypes.bool,
  /** Whether the Tooltip is open */
  open: PropTypes.bool,
}

Tooltip.defaultProps = {
  variant: null,
  children: null,
  triggerElement: undefined,
  triggerEvent: "click",
  placement: "bottom",
  text: "",
  className: "",
  disabled: null,
  open: false,
}
