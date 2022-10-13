import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/index.js";

const topNavigationStyles = `

`


export const TopNavigation = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`juno-topnavigation ${topNavigationStyles} ${className}`}>
      { children }
    </div>
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