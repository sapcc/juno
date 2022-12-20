import React from "react"
import { IntroBox } from "juno-ui-components"
import heroImage from "../img/app_bg_example.svg?url"

const CustomIntroBox = ({}) => {
  return (
    <div className="mt-6">
      <IntroBox
        title="Client Certificate Self-Service"
        variant="hero"
        heroImage={`url(${heroImage})`}
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
