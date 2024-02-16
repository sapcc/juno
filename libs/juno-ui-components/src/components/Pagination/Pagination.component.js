import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Button } from "../Button/Button.component"
import { TextInput } from "../TextInput/TextInput.component"
import { Select } from "../Select/Select.component"
import { SelectOption } from "../SelectOption/SelectOption.component"
import { Stack } from "../Stack/Stack.component"
import { Spinner } from "../Spinner"

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
const spinnerStyles = `
  jn-ml-3
`
// style for disabled button. Must be changed in Button component?
const buttonStyles = ` 
  disabled:jn-cursor-not-allowed
`

// const selectOptions = (controlPages) => {
//   let opts = []
//   if (controlPages) {
//     for (let i = 0; i < controlPages; i++) {
//       const p = (i + 1).toString() // SelectOption requires strings for value and label
//       opts.push(<SelectOption value={p} label={p} key={p} />)
//     }
//   }
//   return opts
// }

/** A basic, uncontrolled Pagination component. Renders '<' and '>' buttons as a minimun/default. */
export const Pagination = ({
  variant,
  currentPage,
  pages,
  disabled,
  isFirstPage,
  isLastPage,
  onPressPrevious,
  onPressNext,
  onSelectChange,
  onKeyPress,
  progress,
  className,
  ...props
}) => {
  const [controlPage, setControlPage] = useState(8)
  const [controlPages, setControlPages] = useState(8)

  useEffect(() => {
    currentPage = currentPage <= pages ? currentPage : pages
    setControlPage(currentPage)
    setControlPages(pages)
    // setControlPage(currentPage <= setControlPages ? currentPage : setControlPages)
  }, [currentPage, pages])

  const handlePrevClick = (event) => {
    setControlPage(controlPage > 1 ? controlPage - 1 : 1)
    onPressPrevious && onPressPrevious(event)
  }

  const handleNextClick = (event) => {
    setControlPage(controlPage < controlPages ? controlPage + 1 : controlPages)
    onPressNext && onPressNext(event)
  }

  const handleSelectChange = (selected) => {
    const s = parseInt(selected)
    setControlPage(s)
    onSelectChange && onSelectChange(s)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setControlPage(event.target.value)
      onKeyPress && onKeyPress(event)
    }
  }

  return (
    <div
      className={`juno-pagination juno-pagination-${
        variant || "default"
      } ${paginationStyles} ${className}`}
      {...props}
    >
      <Button
        icon="chevronLeft"
        disabled={isFirstPage || disabled || progress || controlPage === 1}
        className={buttonStyles}
        onClick={handlePrevClick}
        title="Previous Page"
      />
      {progress ? <Spinner size="small" color="default" className={spinnerStyles} /> : ""}

      {variant && !progress
        ? (() => {
            switch (variant) {
              case "number":
                return <span> {controlPage || "0"}</span>
                break
              case "select":
                return (
                  <Select
                    name="pages"
                    width="auto"
                    value={controlPage?.toString()} // here the same, defaultValue is of type string
                    onChange={handleSelectChange}
                    disabled={disabled}
                  >
                    {(() => {
                      let opts = []
                      if (controlPages) {
                        for (let i = 0; i < controlPages; i++) {
                          const p = (i + 1).toString() // SelectOption requires strings for value and label
                          opts.push(<SelectOption value={p} label={p} key={p} />)
                        }
                      }
                      return opts
                    })()}
                    {/* {selectOptions(controlPages)} */}
                  </Select>
                )
                break
              case "input":
                return (
                  <Stack gap="2" alignment="center">
                    <div className={`${inputStyles}`}>
                      <TextInput
                        value={controlPage || ""}
                        //convert to integer
                        onChange={(e) => setControlPage(parseInt(e.target.value))}
                        onKeyPress={handleKeyPress}
                        disabled={disabled}
                      />
                    </div>
                    <span>of {controlPages || "0"}</span>
                  </Stack>
                )
                break
              default:
                return ""
            }
          })()
        : ""}
      <Button
        icon="chevronRight"
        disabled={isLastPage || disabled || progress || controlPage === controlPages}
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
  disabled: PropTypes.bool,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  onPressPrevious: PropTypes.func,
  onPressNext: PropTypes.func,
  onSelectChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  progress: PropTypes.bool,
  className: PropTypes.string,
}

Pagination.defaultProps = {
  variant: "",
  currentPage: 1,
  pages: 1,
  disabled: false,
  isFirstPage: false,
  isLastPage: false,
  onPressPrevious: undefined,
  onPressNext: undefined,
  onSelectChange: undefined,
  onKeyPress: undefined,
  progress: false,
  className: "",
}
