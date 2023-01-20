import React from "react"
import { Container } from "juno-ui-components"
import useStore from "../store"

const DocumentationGeneral = ({}) => {
  const origin = useStore((state) => state.origin)

  return <>About</>
}

export default DocumentationGeneral
