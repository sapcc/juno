import React from "react"
import { Container } from "juno-ui-components"
import SVGAsComponent from "./assets/juno-danger.svg"
import svgAsBackgroundImage from "./assets/juno-danger.svg?url"
import mapBackgroundImage from "./assets/map.svg?url"
import rocketImage from "./assets/rocket.gif"

// This is your starting point of tour application
// see several examples in the exampleApp
const AppContent = (props) => {
  return (
    <Container>
      <div>Hello World!!!</div>
      <h3 className="text-xl pt-8">SVG Example 1: SVG as component</h3>
      <p>
        The SVG will be included as text, this way it can be colored with CSS.{" "}
        <br />
        Uses svgr lib
      </p>
      <SVGAsComponent className="text-theme-accent fill-current w-28 h-auto" />

      <h3 className="text-xl pt-8">
        SVG Example 2: SVG as background image in JSX
      </h3>
      <div
        style={{
          background: `url('${
            new URL(svgAsBackgroundImage, import.meta.url).href
          }')`,
        }}
      >
        This time the image should be a background image
        <code>
          background: url('new URL(svgAsBackgroundImage, import.meta.url).href')
        </code>{" "}
        to the className of the div, so that tailwind applies the bg image.
        <br />
        It should also decide automatically between embedding the image as a
        dataUrl or referencing it via link, depending on file size (see CSS
        examples below)
      </div>

      <h3 className="text-xl pt-8">
        SVG Example 3: SVG as background image in CSS
      </h3>
      <div className="svg-bg-test">
        This has a background image applied in CSS.
        <br />
        Because the image is very small it will be embedded inline in the CSS as
        a dataURL.
      </div>

      <h3 className="text-xl pt-8">
        SVG Example 4: SVG as background image in CSS (big file)
      </h3>

      <div
        className="svg-bg-test-big-file h-[400px]"
        style={{
          backgroundImage: `url('${
            new URL(mapBackgroundImage, import.meta.url).href
          }')`,
        }}
      >
        This has a background image applied as style.
        <br />
        Because the image has a large filesize it is not embedded as a dataURL
        but instead is referenced as a link.
        <br />
        This happens automatically (the loader decides when the image is too
        large to embed inline)
      </div>

      <h3 className="text-xl pt-8">Image Example</h3>
      <img src={new URL(rocketImage, import.meta.url).href} />
    </Container>
  )
}

export default AppContent
