import React from "react"
import { Container } from "juno-ui-components"
import SVGAsComponent from "./assets/juno-danger.svg"
/* This used to work but now gives the error if we try to use it in tailwind:
ERROR in ./src/styles.scss 5:36-87
Module not found: Error: Can't resolve '${svgAsBackgroundImage}' in '/app/apps/template/src'
*/
import svgAsBackgroundImage from "./assets/juno-danger.svg?url"


// This is your starting point of tour application
// see several examples in the exampleApp
const AppContent = (props) => {
  return (
    <Container>
      <div>Hello World!!!</div>
      <h3 className="text-xl pt-8">SVG Example 1: SVG as component</h3>
      <p>
        The SVG will be included as text, this way it can be colored with CSS. <br />
        Uses svgr lib
      </p>
      <SVGAsComponent className="text-theme-accent fill-current w-28 h-auto" />

      <h3 className="text-xl pt-8">SVG Example 2: SVG as background image in JSX</h3>
      <p>This should and did work in the past, however the recent changes to how we build the CSS seems to have broken this.</p>
      <div className={`add-bg-url-statement-here`} style={{background: `url('${svgAsBackgroundImage})`}}>
        This time the image should be a background image but it doesn't work. The dataUrl that's generated is somehow invalid, it's super weird (see browser console for error message).
        <br />
        What we actually want to be able to do is to add <code>bg-[url('svgAsBackgroundImage')</code> to the className of the div, so that tailwind applies the bg image.
        <br />
        It should also decide automatically between embedding the image as a dataUrl or referencing it via link, depending on file size (see CSS examples below)
      </div>

      <h3 className="text-xl pt-8">SVG Example 3: SVG as background image in CSS</h3>
      <div className="svg-bg-test">
        This has a background image applied in CSS.<br />
        Because the image is very small it will be embedded inline in the CSS as a dataURL.
      </div>

      <h3 className="text-xl pt-8">SVG Example 4: SVG as background image in CSS (big file)</h3>
      <div className="svg-bg-test-big-file h-[400px]">
        This has a background image applied in CSS.<br />
        Because the image has a large filesize it is not embedded as a dataURL but instead is referenced as a link.<br />
        This happens automatically (the loader decides when the image is too large to embed inline)
      </div>
    </Container>
  )
}

export default AppContent
