import React from "react"
import { IntroBox, Stack, Button } from "juno-ui-components"

const CustomIntroBox = ({}) => {
  return (
    <div className="mt-6">
      <IntroBox
        title="Client Certificate Self-Service"
        variant="hero"
        heroImage="bg-[url('img/app_bg_example.svg')]"
      >
        Creation and Management of client certificates for Converged Cloud users
        <div>
          <small>
            {" "}
            <a
              href="https://github.wdf.sap.corp/cc/volta/blob/master/docs/api-v1.md"
              target="_blank"
            >
              Read more...
            </a>
          </small>
        </div>
      </IntroBox>
    </div>
  )
}

export default CustomIntroBox
