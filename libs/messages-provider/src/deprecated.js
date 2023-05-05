import React, { useEffect } from "react"

// https://whawker.github.io/2016/07/15/deprecating-react-components-with-higher-order-components.html
const deprecate = (InnerComponent, msg = "") => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`${InnerComponent.name} is deprecated`, msg)
    }
  }, [])

  return <InnerComponent {...this.props} />
}

export default deprecate
