import React from "react"
import { Container } from "juno-ui-components"
import Markdown from "./Markdown"
import { Messages } from "messages-provider"
import useStore from "../store"

const AssetDetailsReadme = ({ path }) => {
  const origin = useStore((state) => state.origin)
  const url = React.useMemo(() => {
    if (!origin || !path) return null
    return `${origin}/${path}`
  }, [origin, path])

  return (
    <Container py px={false}>
      {url && (
        <>
          <Messages className="pb-6" />
          <Markdown path={url} />
        </>
      )}
    </Container>
  )
}

export default AssetDetailsReadme
