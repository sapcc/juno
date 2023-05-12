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
import { sectionCss, headerCss, h1Css, h2Css } from "../styles"
import { scriptTag } from "../helpers"

const AssetDetailsGetStarted = ({ asset, dependencies, isLatest }) => {
  return (
    <Container py px={false}>
      <h1 className={`${h1Css} ${headerCss} ${sectionCss}`}>Script tag</h1>
      <p>
        To run this micro-frontend please setup a script tag with following data
        props. Replace the prop values with string <i>REPLACE_ME</i> with the
        correspondig values if required.
      </p>

      <div className={sectionCss}>
        <h2 className={h2Css}>Data props</h2>
        <DataGrid className={sectionCss} columns={2}>
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
                  <DataGridCell>
                    {asset?.appProps[key]?.description}
                  </DataGridCell>
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

        <CodeBlock className="" heading="Script tag" lang="html">
          {scriptTag({
            name: asset?.name,
            version: isLatest ? "latest" : asset?.version,
            appProps: asset?.appProps,
          })}
        </CodeBlock>
      </div>

      <div className={sectionCss}>
        {dependencies?.length > 0 && (
          <>
            <h1 className={`${h1Css} ${headerCss} ${sectionCss}`}>
              Dependencies
            </h1>
            <p className={sectionCss}>
              Additional to the script tag described in the section above add
              please following script tags (asset dependencies) to be able to
              run this micro-frontend.
            </p>
            <CodeBlock className="" heading="Script tag" lang="html">
              {dependencies.map((app) =>
                scriptTag({
                  name: app?.name,
                  version: app?.version,
                  appProps: app?.appProps,
                })
              )}
            </CodeBlock>
          </>
        )}
      </div>

      <StandaloneSetup asset={asset} />
    </Container>
  )
}

export default AssetDetailsGetStarted
