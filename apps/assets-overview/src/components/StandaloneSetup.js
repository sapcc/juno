import React from "react"
import { sectionCss, h1Css, headerCss } from "../styles"
import { CodeBlock } from "juno-ui-components"

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
     
      <!--Add here the micro-frontend script tag-->
      <!--Add here the dependencies if given-->

    </body>
  </html> 
  `
}

const StandaloneSetup = ({ asset }) => {
  return (
    <>
      <h1 className={`${h1Css} ${headerCss} ${sectionCss}`}>
        Standalone setup
      </h1>
      <p className={sectionCss}>
        To be able to run the micro-frontend standalone please use the following
        base html markup and add the script tags as describe in the sections
        above. To ensure an optimal experience rendering the micro-frontend keep
        please the styles as they are set in the base html.
      </p>
      <CodeBlock className={sectionCss} heading="index.html" lang="html">
        {baseHtml({ name: asset?.name, version: asset?.version })}
      </CodeBlock>
    </>
  )
}

export default StandaloneSetup
