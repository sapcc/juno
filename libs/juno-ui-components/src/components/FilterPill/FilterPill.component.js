import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/Icon.component.js"

const filterpillStyles = `
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

const filterkeyStyles = `
	jn-bg-theme-filter-pill-key
	jn-px-1
	jn-py-0.5
	jn-rounded-sm
	jn-inline-block
`

const filtervalueStyles = `
	jn-px-1
	jn-py-0.5
	jn-text-theme-high
	jn-inline-block
`

/**
A Pill to represent Key and Value of a filter. Can be closed to un-apply the filter represented.
Mostly to be used inside a Filters component in conjunction with FilterInput. */
export const FilterPill = ({
  filterKey,
  filterKeyLabel,
  filterValueLabel,
  onClose,
  className,
  ...props
}) => {
  const handleCloseClick = () => {
    onClose && onClose(filterKey)
  }

  return (
    <div
      className={`juno-filterpill ${filterpillStyles} ${className}`}
      {...props}
    >
      <span className={`${filterkeyStyles}`}>{filterKeyLabel}</span>
      <span className={`${filtervalueStyles}`}>{filterValueLabel}</span>
      <Icon icon="close" size="18" onClick={handleCloseClick} />
    </div>
  )
}

FilterPill.propTypes = {
  /** The key of the filter the pill represents */
  filterKey: PropTypes.string,
  /** The visible label to describe the filter key */
  filterKeyLabel: PropTypes.string,
  /** The visible label to describe the filter value */
  filterValueLabel: PropTypes.string,
  /** add custom classNames */
  className: PropTypes.string,
  /** Pass a handler to be executed when closing the FilterPill */
  onClose: PropTypes.func,
}

FilterPill.defaultProps = {
  filterKey: "filterKey not set",
  filterKeyLabel: "filterKeyLabel not set",
  filterValueLabel: "filterValueLabel not set",
  onClose: undefined,
  className: "",
}
