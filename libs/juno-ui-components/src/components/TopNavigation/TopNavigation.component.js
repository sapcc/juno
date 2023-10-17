import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "../Stack/index"
import { Icon } from "../Icon/index.js";

const topNavigationStyles = `
  jn-gap-6
  jn-px-6
  jn-py-1.5
`

/**
A generic horizontal top level navigation component. To be placed below the application header but above application content.
Place TopNavigationItem components as children.
*/
export const TopNavigation = ({
  children,
  className,
  ...props
}) => {
  return (
    <Stack className={`juno-topnavigation ${topNavigationStyles} ${className}`} role="navigation" {...props} >
      { children }
    </Stack>
  )
}

TopNavigation.propTypes = {
  /** The children of the Navigation. Typically these should be TopNavigationItem(s) */
  children: PropTypes.node,
  /** Pass a custom classname. */
  className: PropTypes.string,
}

TopNavigation.defaultProps = {
  children: null,
  className: "",
}