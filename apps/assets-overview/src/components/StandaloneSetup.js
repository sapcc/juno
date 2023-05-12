import React from "react"
import { panelSectionCss, h1SectionCss, h2Css } from "../styles"
import { CodeBlock } from "juno-ui-components"
import { scriptTag } from "../helpers"

const baseHtml = ({ name, version }) => {
  return `<!DOCTYPE html>
  <html style="margin: 0; padding: 0; display: flex; flex-direction: column;">
    <head>
      <title>Converged Cloud | ${name}</title>
      <link rel="icon" href="/assets/favicon.ico"/>
      <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
    </head>
    <body style="height: 100vh; flex-grow: 1; margin: 0; padding: 0;">
      ${scriptTag({ name, version })}
    </body>
  </html> 
  `
}

const StandaloneSetup = ({ asset }) => {
  return (
    <>
      <h1 className={`${h1SectionCss} mt-6`}>Standalone setup</h1>
      <CodeBlock className={panelSectionCss} heading="index.html" lang="html">
        {baseHtml({ name: asset?.name, version: asset?.version })}
      </CodeBlock>
    </>
  )
}

export default StandaloneSetup
