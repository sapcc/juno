import React from "react"
import { Container } from "juno-ui-components"
import useStore from "../store"
import Markdown from "./Markdown"
import { Messages } from "messages-provider"

const AssetDetailsReadme = ({ asset }) => {
  const origin = useStore((state) => state.origin)

  const path = React.useMemo(() => {
    if (asset?.readme && origin) {
      return `${origin}${asset?.readme}`
    }
    return null
  }, [asset?.readme, origin])

  return (
    <Container py px={false}>
      {path && (
        <>
          <Messages className="pb-6" />
          <Markdown path={path} />
        </>
      )}
    </Container>
  )
}

export default AssetDetailsReadme
