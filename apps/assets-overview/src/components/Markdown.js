import React, { useEffect } from "react"
import { Stack, Spinner } from "juno-ui-components"
import { useQuery } from "react-query"
import { fetchMarkdown } from "../actions"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeFormat from "https://esm.sh/rehype-format@4"
import { useMessageStore } from "messages-provider"
import { parseError } from "../helpers"

const Markdown = ({ path }) => {
  const addMessage = useMessageStore((state) => state.addMessage)

  const { isLoading, isError, data, error } = useQuery(
    ["markdown", path],
    fetchMarkdown,
    {
      enabled: !!path,
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
    <>
      {isLoading && !data ? (
        <Stack className="pt-2" alignment="center">
          <Spinner variant="primary" />
          Loading ...
        </Stack>
      ) : (
        <article className="markdown-body">
          {data && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeFormat]}
            >
              {data}
            </ReactMarkdown>
          )}
        </article>
      )}
    </>
  )
}

export default Markdown
