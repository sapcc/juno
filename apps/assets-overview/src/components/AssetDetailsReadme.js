import React, { useEffect } from "react"
import { Container, Stack, Spinner } from "juno-ui-components"
import { useQuery } from "react-query"
import { fetchAssetReadme } from "../actions"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import useStore from "../store"
import { Messages, useMessageStore } from "messages-provider"
import { parseError } from "../helpers"

const AssetDetailsReadme = ({ asset }) => {
  const origin = useStore((state) => state.origin)
  const addMessage = useMessageStore((state) => state.addMessage)

  // TODO display error and loading
  const { isLoading, isError, data, error } = useQuery(
    `${origin}${asset?.README}`,
    fetchAssetReadme,
    {
      enabled: !!asset?.README,
      staleTime: Infinity,
    }
  )

  // if error send error to the message store
  useEffect(() => {
    if (error) {
      addMessage({
        variant: "error",
        text: parseError(error),
      })
    }
  }, [error])

  return (
    <Container py px={false}>
      <Messages className="pb-6" />
      {isLoading && !data ? (
        <Stack className="pt-2" alignment="center">
          <Spinner variant="primary" />
          Loading ...
        </Stack>
      ) : (
        <article className="markdown-body">
          {data && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
          )}
        </article>
      )}
    </Container>
  )
}

export default AssetDetailsReadme
