import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "../Stack/index"
import { Icon } from "../Icon/index.js";

const topNavigationStyles = `

`


export const TopNavigation = ({
  children,
  className,
  ...props
}) => {
  return (
    <Stack className={`juno-topnavigation ${topNavigationStyles} ${className}`} role="navigation">
      { children }
    </Stack>
  )
}

TopNavigation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

TopNavigation.defaultProps = {
  children: null,
  className: "",
}