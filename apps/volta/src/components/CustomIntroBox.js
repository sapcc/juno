import React from "react"
import { IntroBox, Stack, Button } from "juno-ui-components"

const CustomIntroBox = ({}) => {
  return (
    <IntroBox variant="hero" heroImage="bg-[url('img/app_bg_example.svg')]">
      Secure storage and management of single sign-on certificates
      <div>
        <small>
          {" "}
          <a
            href="https://github.wdf.sap.corp/cc/volta/blob/master/docs/api-v1.md"
            target="_blank"
          >
            Read more about Volta service in our documentation
          </a>
        </small>
      </div>
    </IntroBox>
  )
}

export default CustomIntroBox
