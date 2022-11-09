import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "../Stack/index"

const SideNavigationStyles = `
  jn-gap-6
  jn-px-6
  jn-py-1.5
`

/**
A generic vertical side navigation component.
Place TopNavigationItem components as children.
*/
export const SideNavigation = ({
  children,
  className,
  ...props
}) => {
  return (
    <Stack direction="vertical" className={`juno-sidenavigation ${SideNavigationStyles} ${className}`} role="navigation" {...props} >
      { children }
    </Stack>
  )
}

SideNavigation.propTypes = {
  /** The children of the Navigation. Typically these should be SideNavigationItem(s) */
  children: PropTypes.node,
  /** Pass custom classname. */
  className: PropTypes.string,
}

SideNavigation.defaultProps = {
  children: null,
  className: "",
}