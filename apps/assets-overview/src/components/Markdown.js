import React, { useEffect } from "react"
import { Container, Stack, Spinner } from "juno-ui-components"
import { useQuery } from "react-query"
import { fetchAssetReadme } from "../actions"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Messages, useMessageStore } from "messages-provider"
import { parseError } from "../helpers"

const Markdown = ({ path }) => {
  const addMessage = useMessageStore((state) => state.addMessage)

  console.log("README: ", path)

  const { isLoading, isError, data, error } = useQuery(path, fetchAssetReadme, {
    enabled: !!path,
    staleTime: Infinity,
  })

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
    <>
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
    </>
  )
}

export default Markdown
