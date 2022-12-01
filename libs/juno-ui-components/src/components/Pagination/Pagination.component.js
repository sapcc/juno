import React from "react"
import PropTypes from "prop-types"
import { Button } from "../Button/"
import { Icon } from "../Icon/"
import { Select } from "../Select/"
import { SelectOption } from "../SelectOption/"
import { TextInput } from "../TextInput"

const paginationStyles = `
  jn-flex
  jn-gap-[0.375rem]
  jn-items-center
`

const numberStyles = `

`

const inputStyles = `
  jn-w-[3.125rem]
`

const selectOptions = (pages, currentPage) => {
  let opts = []
  if ( pages ) {
    for (let i = 0; i < pages; i++) {
      const p = i + 1
      opts.push(<SelectOption value={p} label={p} key={p} />)
    }
  }
  return opts
}

const renderPaginationInnards = (variant, currentPage, pages) => {
  switch (variant) {
    case "number":
        return (
          <span>{ currentPage || "0" }</span>
        )
      break
    case "select":
      return (
        <Select name="pages" defaultValue={currentPage}>
          { selectOptions(pages, currentPage) }
        </Select>
      )
      break
    case "input":
      return (
        <span>
          <TextInput 
            value={ currentPage || null }
            className={`${inputStyles}`}
          />
          <span className="jn-ml-1" >of {pages || "0"}</span>
        </span>
      )
      break
    default:
      return null
  }
}

export const Pagination = ({
  currentPage,
  pages,
  variant,
  className,
  ...props
}) => {
  return (
    <div className={`juno-pagination ${paginationStyles} ${className}`}>
      <Button icon="chevronLeft" />
      { variant ? renderPaginationInnards(variant, currentPage, pages) : null}
      <Button icon="chevronRight" />
    </div>
  )
}

Pagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number,
  pages: PropTypes.number,
  variant: PropTypes.oneOf(["", "number", "select", "input"]),
}

Pagination.defaultProps = {
  className: "",
  currentPage: null,
  pages: null,
  variant: "",
}