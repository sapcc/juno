import React from "react"
import PropTypes from "prop-types"
import { mergeRefs } from "react-merge-refs"

export const TooltipAnchor = React.forwardRef(
  ({ children, state, asChild, className, ...props }, propRef) => {
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
          className: children.props.className + `${state.disabled && " jn-cursor-default"}`,
        })
      )
    }

    // by default return an unstyled button wrapper
    return (
      <button
        className={`${className} ${state.disabled && " jn-cursor-default"}`}
        ref={ref}
        {...state.getReferenceProps(props)}
      >
        {children}
      </button>
    )
  }
)

TooltipAnchor.propTypes = {
  /** If true, the child you passed to the TooltipAnchor is rendered as the anchor, instead of the default anchor component. This is useful if you e.g. want to use a Button or Icon as the anchor. */
  asChild: PropTypes.bool,
  /** tooltip state from useTooltipState hook, needs to be passed to both anchor and tooltip itself */
  state: PropTypes.object,
  /** Pass child nodes to display in the tooltip */
  children: PropTypes.node,
  /** Pass a className to render to the icon button*/
  className: PropTypes.string,
}

TooltipAnchor.defaultProps = {
  asChild: false,
  children: null,
  state: undefined,
  className: "",
}
