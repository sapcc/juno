import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const pillStyles = `
	jn-inline-flex
	jn-basis-auto
	jn-shrink
	jn-items-center
	jn-flex-nowrap
	jn-text-xs
	jn-p-px
	jn-border
	jn-rounded
	jn-mr-2
	jn-border-theme-filter-pill
	last:jn-mr-0
`

const pillKeyStyles = `
	jn-bg-theme-filter-pill-key
	jn-px-1
	jn-py-0.5
	jn-rounded-sm
	jn-inline-block
`

const pillValueStyles = `
	jn-px-1
	jn-py-0.5
	jn-text-theme-high
	jn-inline-block
`

/**
A Pill to represent a value, or key and value. Can e.g. be used to represent selected filter values in a filter component. Can optionally be closed. On close the uid, if provided, or the pillKey is returned in the callback.
 */
export const Pill = ({
  uid,
  pillKey,
  pillKeyLabel,
  pillValue,
  pillValueLabel,
  closeable,
  onClose,
  className,
  ...props
}) => {
  const handleCloseClick = () => {
    onClose && onClose(uid || pillKey || pillValue)
  }

  return (
    <div className={`juno-pill ${pillStyles} ${className}`} {...props}>
      { (!pillValue && !pillValueLabel) ?
        <span className={`${pillValueStyles}`}>
          set pillValue or pillValueLabel
        </span>
        :
        <>
          { (pillKeyLabel || pillKey) &&
            <span className={`${pillKeyStyles}`}>
              {pillKeyLabel || pillKey}
            </span>
          }
          <span className={`${pillValueStyles}`}>
            {pillValueLabel || pillValue}
          </span>
        </>
      }
      {closeable && <Icon icon="close" size="18" onClick={handleCloseClick} />}
    </div>
  )
}

Pill.propTypes = {
  /** The unique identifier of the pill. Returned by the onClose callback */
  uid: PropTypes.string,
  /** The key of the filter the pill represents. Returned by the onClose callback if uid undefined. Optional. */
  pillKey: PropTypes.string,
  /** The visible label to describe the pill key. If not set pillKey is used. Optional. */
  pillKeyLabel: PropTypes.string,
  /** The value of filter the pill represents. Returned by the onClose callback if uid and pillKey undefined */
  pillValue: PropTypes.string.isRequired,
  /** The visible label to describe the pill value. If not set pillValue is used. Optional. */
  pillValueLabel: PropTypes.string,
  /** add custom classNames */
  className: PropTypes.string,
  /** Whether the pill should be closeable */
  closeable: PropTypes.bool,
  /** Pass a handler to be executed when closing the Pill. Also returns either the uid (fallback: pillKey -> fallback: pillValue) */
  onClose: PropTypes.func,
}

Pill.defaultProps = {
  uid: "",
  pillKey: "",
  pillKeyLabel: "",
  pillValue: "",
  pillValueLabel: "",
  closeable: false,
  onClose: undefined,
  className: "",
}
