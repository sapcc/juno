import React, { Children } from "react"
import PropTypes from "prop-types"
import { BreadcrumbItem } from "../BreadcrumbItem/index"
import { Stack } from "../Stack/"
import { Icon } from "../Icon/"

const breadcrumbstyles = `

`

export const Breadcrumb = ({
  children,
  className,
  ...props
}) => {
  
  const breadcrumbArray = Children.toArray(children)
  const breadcrumbArrayWithSeparators = []
  
  breadcrumbArray.forEach( (child, i) => {
    breadcrumbArrayWithSeparators.push(
      <>
        <BreadcrumbItem {...child.props} key={i} />
        { i < breadcrumbArray.length - 1 ?
            <Icon icon="chevronRight" />
          :
            null
        }
      </>
    )
  })
  
  return (
    <Stack className={`juno-breadcrumb ${breadcrumbstyles} ${className}`} gap="1.5">
      { breadcrumbArrayWithSeparators }
    </Stack>
  )
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

Breadcrumb.defaultProps = {
  className: "",
  children: null,
}