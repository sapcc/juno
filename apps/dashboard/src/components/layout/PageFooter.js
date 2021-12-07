import React from "react"
// import { Link } from "react-router-dom"

import { Stack } from "juno-ui-components"

import SAPLogo from "../../assets/images/sap_logo.svg"
import DocumentationIcon from "../../assets/images/icon_documentation.svg"
import SlackIcon from "../../assets/images/icon_slack.svg"
import SupportIcon from "../../assets/images/icon_support.svg"

const headlineStyles = `
  font-bold
  pb-6
`

const boxStyles = `
  py-6
  px-12
`

const noBgBoxStyles = `
  pt-6
`

const PageFooter = () => {
  return (
    <div className="mt-32">
      <div className="footer">
        <div className="container mx-auto grid grid-rows-[1fr,0.25fr] grid-cols-3 gap-x-20 gap-y-8 py-8">
          
          <div className={`row-span-2 bg-juno-grey-blue-10 ${boxStyles}`}>
            <DocumentationIcon className="mb-3" />
            <h5 className={headlineStyles}>
              <span className="text-juno-turquoise">Documentation</span>
              <br />
              Detailed information
            </h5>
            <p>
              The documentation has detailed information about all the services that Converged Cloud offers including how-tos and tutorials.
            </p>
          </div>

          <div className={noBgBoxStyles}>
            <SlackIcon className="mb-3" />
            <h5 className={headlineStyles}>
            <span className="text-juno-turquoise">Join the community</span>
              <br />
              Ask questions and connect with others
            </h5>
            <p>
              Join the Converged Cloud Slack community to connect with other users or ask questions.
            </p>
          </div>

          <div className={noBgBoxStyles}>
            <SupportIcon className="mb-3" />
            <h5 className={headlineStyles}>
            <span className="text-juno-turquoise">Need help?</span>
              <br />
              Contact our support team *
            </h5>
            <p>
              Our support team is available during EMEA business hours and for emergencies we offer 24/7 premium support.
            </p>
          </div>
          
          <div className="col-span-2 bg-juno-turquoise text-juno-grey-blue-10 rounded py-2 px-8">
            <Stack gap={2}>
              <div className="text-3xl font-bold">
                *
              </div>
              <div>
                <div className="text-3xl font-bold">
                  Premium 24 hour emergency support
                </div>
                For emergencies in productive systems
              </div>
            </Stack>
          </div>
        </div>
      </div>

      <div className="bg-juno-grey-blue-10 py-6">
        <div className="container mx-auto">
          <SAPLogo className="h-6" />
        </div>
      </div>
    </div>
  )
}

export default PageFooter
