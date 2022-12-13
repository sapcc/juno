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

export const tooltipPlacementOptions = [
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
]

export const tooltipVariants = ["info", "warning", "danger", "error", "success"]

// // /** The semantic variant of the tooltip, or `plain` */
// variant: PropTypes.oneOf(tooltipVariants),
// /** tooltip state from useTooltipState hook, needs to be passed to both anchor and tooltip itself */
// state: PropTypes.object,
// /** Choose which event should trigger the opening of the tooltip (click or hover) */
// triggerEvent: PropTypes.oneOf(["click", "hover"]),
// /** Tooltip placement in relation to trigger, default is bottom */
// placement: PropTypes.oneOf(tooltipPlacementOptions),
// /** Disable the tooltip */
// disabled: PropTypes.bool,
// /** Whether the Tooltip is open */
// open: PropTypes.bool,

/**
 * Hook that controls the state of the tooltip.
 *
 * @param {*} param0
 * @returns
 */
export const useTooltipState = ({
  open = false,
  variant,
  placement = "bottom",
  triggerEvent = "click",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(open)

  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  })

  const context = data.context

  const click = useClick(context, { enabled: disabled === false && triggerEvent === "click" })
  const hover = useHover(context, {
    move: false,
    enabled: disabled === false && triggerEvent === "hover",
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "tooltip" })

  // merge all interactions into props
  const interactions = useInteractions([click, hover, focus, dismiss, role])

  return React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      variant,
      ...interactions,
      ...data,
    }),
    [isOpen, setIsOpen, variant, interactions, data]
  )
}
