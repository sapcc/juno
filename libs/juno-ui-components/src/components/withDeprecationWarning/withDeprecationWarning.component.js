import React, { useEffect } from 'react'

const withDeprecationWarning = (WrappedComponent, message) => {
  
  const ComponentWithDeprecationWarning = (props) => {
    useEffect(() => {
      console.warn(message)
    }, [])

    return <WrappedComponent {...props} />
  }
  
  // assign the defaultProps of the wrapped component to the higher-order component, otherwise these would be lost:
  ComponentWithDeprecationWarning.defaultProps = WrappedComponent.defaultProps

  return ComponentWithDeprecationWarning
}

export default withDeprecationWarning
