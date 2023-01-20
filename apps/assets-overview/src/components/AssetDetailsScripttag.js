import React from "react"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
  Stack,
  Container,
  CodeBlock,
} from "juno-ui-components"
import { panelSectionCss } from "../styles"

const scriptTag = ({ name, version, appProps }) => {
  let newAppProps = ""
  if (appProps && typeof appProps === "object") {
    Object.keys(appProps).forEach((key, index) => {
      newAppProps = `${newAppProps}${
        index ? "\n" : ""
      }  data-props-${key}="REPLACE_ME"`
    })
  }
  return `<script
  defer
  src="https://assets.juno.eu-nl-1.cloud.sap/apps/widget-loader@latest/build/app.js" 
  data-name="${name}"
  data-version="${version || "latest"}"
${newAppProps}>
</script>`
}

// TODO display data props type (optional and required)
const AssetDetailsScripttag = ({ asset }) => {
  return (
    <Container py px={false}>
      <h1 className="font-bold text-xl">Data props</h1>
      <DataGrid className={panelSectionCss} columns={2}>
        <DataGridRow>
          <DataGridHeadCell>Name</DataGridHeadCell>
          <DataGridHeadCell>Description</DataGridHeadCell>
        </DataGridRow>
        {asset?.appProps && Object.keys(asset?.appProps).length > 0 ? (
          <>
            {Object.keys(asset?.appProps || {}).map((key, index) => (
              <DataGridRow key={index}>
                <DataGridCell>
                  <Stack direction="vertical" className="h-full">
                    <span>{key}</span>
                    {asset?.appProps[key]?.type && (
                      <span>
                        <small>({asset?.appProps[key].type})</small>
                      </span>
                    )}
                  </Stack>
                </DataGridCell>
                <DataGridCell>{asset?.appProps[key]?.description}</DataGridCell>
              </DataGridRow>
            ))}
          </>
        ) : (
          <DataGridRow>
            <DataGridCell colSpan={2}>
              <Stack
                alignment="center"
                distribution="center"
                direction="vertical"
                className="h-full"
              >
                <span>No props found</span>
              </Stack>
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>

      <CodeBlock className={panelSectionCss} heading="Script tag" lang="html">
        {scriptTag({
          name: asset?.name,
          version: asset?.version,
          appProps: asset?.appProps,
        })}
      </CodeBlock>
    </Container>
  )
}

export default AssetDetailsScripttag
