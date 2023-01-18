import React from "react"
import { Container } from "juno-ui-components"
import { useQuery } from "react-query"
import { fetchAssetReadme } from "../actions"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import useStore from "../store"

const AssetDetailsReadme = ({ asset }) => {
  const origin = useStore((state) => state.origin)

  // TODO display error and loading
  const { isLoading, isError, data, error } = useQuery(
    `${origin}${asset?.README}`,
    fetchAssetReadme,
    {
      enabled: !!asset?.README,
      staleTime: Infinity,
    }
  )

  return (
    <Container py px={false}>
      <article className="markdown-body">
        {data && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
        )}
      </article>
    </Container>
  )
}

export default AssetDetailsReadme
