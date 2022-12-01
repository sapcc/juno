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

const selectOptions = (pages) => {
  let opts = []
  if ( pages ) {
    for (let i = 0; i < pages; i++) {
      const p = i + 1
      opts.push(<SelectOption value={p} label={p} key={p} />)
    }
  }
  return opts
}

const renderPaginationInnards = (
  variant, 
  currentPage, 
  pages,
  handleSelectChange, 
  handleKeyPress
) => {
  switch (variant) {
    case "number":
        return (
          <span>{ currentPage || "0" }</span>
        )
      break
    case "select":
      return (
        <Select name="pages" defaultValue={currentPage} onChange={handleSelectChange}>
          { selectOptions(pages) }
        </Select>
      )
      break
    case "input":
      return (
        <span>
          <TextInput 
            value={ currentPage || null }
            onKeyPress={handleKeyPress}
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

/** A basic, uncontrolled Pagination component. Renders '<' and '>' buttons as a minimun/default. */
export const Pagination = ({
  variant,
  currentPage,
  pages,
  isFirstPage,
  isLastPage,
  onPressPrevious,
  onPressNext,
  onSelectChange,
  onKeyPress,
  className,
  ...props
}) => {
  
  const handlePrevClick = (event) => {
    onPressPrevious && onPressPrevious(event)
  }
  
  const handleNextClick = (event) => {
    onPressNext && onPressNext(event)
  }
  
  const handleSelectChange = (event) => {
    onSelectChange && onSelectChange(event)
  }
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onKeyPress && onKeyPress(event)
    }
  }
  
  return (
    <div className={`juno-pagination juno-pagination-${ variant || "default"} ${paginationStyles} ${className}`} {...props}>
      <Button 
        icon="chevronLeft" 
        disabled={isFirstPage} 
        onClick={ handlePrevClick} 
        title="Previous Page"
      />
        { variant ? renderPaginationInnards(variant, currentPage, pages, handleSelectChange, handleKeyPress) : null }
      <Button 
        icon="chevronRight" 
        disabled={isLastPage} 
        onClick={handleNextClick} 
        title="Next Page"
      />
    </div>
  )
}

Pagination.propTypes = {
  variant: PropTypes.oneOf(["", "number", "select", "input"]),
  currentPage: PropTypes.number,
  pages: PropTypes.number,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  onPressPrevious: PropTypes.func,
  onPressNext: PropTypes.func,
  onSelectChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  className: PropTypes.string,
}

Pagination.defaultProps = {
  variant: "",
  currentPage: null,
  pages: null,
  isFirstPage: false,
  isLastPage: false,
  onPressPrevious: undefined,
  onPressNext: undefined,
  onSelectChange: undefined,
  onKeyPress: undefined,
  className: "",
}