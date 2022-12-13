import React from "react"
import { mergeRefs } from "react-merge-refs"
import PropTypes from "prop-types"

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
export const Tooltip = React.forwardRef(({
  state,
  children,
  text,
  className,
  ...props
}, propRef) => {

  const ref = React.useMemo(
    () => mergeRefs([state.floating, propRef]),
    [state.floating, propRef]
  )

  const variant = state.variant

  // const [isOpen, setIsOpen] = useState(open)

  // React.useEffect(() => {
  //   setIsOpen(open)
  // }, [open])

  // initialize floating ui
  // const { x, y, reference, floating, strategy, context } = useFloating({
  //   open: isOpen,
  //   onOpenChange: setIsOpen,
  //   whileElementsMounted: autoUpdate, // this ensures the tooltip stays on screen when scrolling
  //   placement: placement,
  //   middleware: [offset(5), flip(), shift()],
  // })

  // event listeners for open state
  // const click = useClick(context, { enabled: triggerEvent === "click" })
  // const hover = useHover(context, { enabled: triggerEvent === "hover" })
  // const dismiss = useDismiss(context)
  // const focus = useFocus(context)
  // // Role props for screen readers
  // const role = useRole(context, { role: "tooltip" })

  // // merge all interactions into props
  // const { getReferenceProps, getFloatingProps } = useInteractions([
  //   click,
  //   dismiss,
  //   hover,
  //   focus,
  //   role,
  // ])

  return (
    <div className={`juno-tooltip jn-inline-block`} {...props}>
      {state.isOpen && (
        <div
          className={`juno-tooltip-popover juno-tooltip-popover-${variant} ${popoverStyles} ${className}`}
          ref={ref}
          style={{
            position: state.strategy,
            top: state.y ?? 0,
            left: state.x ?? 0,
          }}
          {...state.getFloatingProps(props)}
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
})

Tooltip.propTypes = {
  /** tooltip state from useTooltipState hook, needs to be passed to both anchor and tooltip itself */
  state: PropTypes.object,
  /** Pass child nodes to display in the tooltip */
  children: PropTypes.node,
  /** Text to display in the tooltip, if children are passed, then they are rendered instead of the text */
  text: PropTypes.node,
  /** Pass a className to render to the icon button*/
  className: PropTypes.string,
}

Tooltip.defaultProps = {
  state: undefined,
  children: null,
  text: "",
  className: ""
}

