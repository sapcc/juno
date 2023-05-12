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
import StandaloneSetup from "./StandaloneSetup"
import { panelSectionCss, h1SectionCss, h2Css } from "../styles"
import { scriptTag } from "../helpers"

const AssetDetailsScripttag = ({ asset, dependencies, isLatest }) => {
  return (
    <Container py px={false}>
      <h1 className={h1SectionCss}>Script tag</h1>
      <h2 className={h2Css}>Data props</h2>
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
          version: isLatest ? "latest" : asset?.version,
          appProps: asset?.appProps,
        })}
        {dependencies?.length > 0 && (
          <>
            {"\n\n// Please add following assets to run this app \n"}
            {dependencies.map((app) =>
              scriptTag({
                name: app?.name,
                version: app?.version,
                appProps: app?.appProps,
              })
            )}
          </>
        )}
      </CodeBlock>
      <StandaloneSetup asset={asset} />
    </Container>
  )
}

export default AssetDetailsScripttag
