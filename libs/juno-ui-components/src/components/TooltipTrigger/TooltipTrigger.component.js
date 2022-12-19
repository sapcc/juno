import React from "react"
import PropTypes from "prop-types"
import { mergeRefs } from "react-merge-refs"

import { useTooltipState } from "../Tooltip/Tooltip.component"


/**
 * This is the trigger element for a tooltip. See Tooltip for more in-depth explanation and examples.
 */
export const TooltipTrigger = React.forwardRef(function TooltipTrigger(
  { children, asChild, className, ...props },
  propRef
) {
  // get state
  const state = useTooltipState()

  // merge all the refs
  const childrenRef = children.ref
  const ref = React.useMemo(
    () => mergeRefs([state.reference, propRef, childrenRef]),
    [state.reference, propRef, childrenRef]
  )

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": state.open ? "open" : "closed",
        className: children.props.className + `${state.disabled && " jn-cursor-default"}`,
      })
    )
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={state.open ? "open" : "closed"}
      {...state.getReferenceProps(props)}
      className={`${className} ${state.disabled && " jn-cursor-default"}`}
    >
      {children}
    </button>
  )
})

TooltipTrigger.propTypes = {
  /** If true, the child you passed to the TooltipTrigger is rendered as the trigger element, instead of the default trigger component. This is useful if you e.g. want to use a Button or Icon as the trigger. */
  asChild: PropTypes.bool,
  /** Pass child nodes to display in the tooltip */
  children: PropTypes.node,
  /** Pass a className to render to the trigger element */
  className: PropTypes.string,
}

TooltipTrigger.defaultProps = {
  asChild: false,
  children: null,
  className: "",
}

