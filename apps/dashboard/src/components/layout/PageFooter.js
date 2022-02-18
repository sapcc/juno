import React from "react"
// import { Link } from "react-router-dom"

import { Button, Icon, PageFooter as JunoFooter, Stack } from "juno-ui-components"

import DocumentationIcon from "../../assets/images/icon_documentation.svg"
import SlackIcon from "../../assets/images/icon_slack.svg"
import SupportIcon from "../../assets/images/icon_support.svg"

const headlineStyles = `
  font-bold
  pb-6
  text-base
`

const boxStyles = `
  pt-6
  pb-8
  px-12
  rounded
`

const noBgBoxStyles = `
  pt-6
`

const PageFooter = () => {
  return (
    <>
      <div className="footer">
        <div className="max-w-[1280px] mx-auto grid grid-rows-[1fr,0.24fr] grid-cols-3 gap-x-20 gap-y-8 pb-12 pt-[calc(2rem+var(--cloud-image-overlap))]">
          <Stack
            direction="vertical"
            className={`row-span-2 bg-theme-background-lvl-0 ${boxStyles}`}
          >
            <DocumentationIcon className="mb-3" />
            <h5 className={headlineStyles}>
              <span className="text-theme-accent">Documentation</span>
              <br />
              Detailed information
            </h5>
            <p>
              The documentation has detailed information about all the services
              that Converged Cloud offers including how-tos and tutorials.
            </p>
            <div className="mt-auto">
              <Button
                label="Read the documentation"
                href="https://documentation.global.cloud.sap/"
                icon="description"
                size="small"
                target="_blank"
                className="w-auto"
              />
            </div>
          </Stack>

          <Stack direction="vertical" className={noBgBoxStyles}>
            <SlackIcon className="mb-3" />
            <h5 className={headlineStyles}>
              <span className="text-theme-accent">Join the community</span>
              <br />
              Ask questions and connect with others
            </h5>
            <p className="pb-6">
              Join the #cc-users channel on Slack to connect with other users or
              ask questions.
            </p>
            <div className="mt-auto">
              <Button
                label="Find our Slack channel"
                href="https://convergedcloud.slack.com/archives/C374AQJ3W"
                icon="forum"
                size="small"
                target="_blank"
                variant="subdued"
                className="w-auto"
              />
            </div>
          </Stack>

          <Stack direction="vertical" className={noBgBoxStyles}>
            <SupportIcon className="mb-3" />
            <h5 className={headlineStyles}>
              <span className="text-theme-accent">Need help?</span>
              <br />
              Contact our support team *
            </h5>
            <p className="pb-6">
              Our support team is available during EMEA business hours and for
              emergencies we offer 24/7 premium support.
            </p>
            <div className="mt-auto">
              <Button
                label="Contact our support"
                href="https://documentation.global.cloud.sap/docs/support#support"
                icon="insertComment"
                size="small"
                target="_blank"
                variant="subdued"
                className="w-auto"
              />
            </div>
          </Stack>

          <a
            className="group block col-span-2 bg-theme-accent text-juno-grey-blue-11 rounded"
            href="https://documentation.global.cloud.sap/docs/support-prod-sys-down"
            target="_blank"
          >
            <Stack gap="2">
              <div className="text-2xl font-bold py-2 pl-8">*</div>
              <div className="py-2">
                <div className="text-2xl font-bold">
                  Premium 24 hour emergency support
                </div>
                For emergencies in productive systems.
              </div>
              <Stack
                direction="vertical"
                alignment="center"
                distribution="center"
                className="bg-theme-background-lvl-0 ml-auto px-4 py-2 font-bold text-theme-accent group-hover:text-white"
              >
                <Icon icon="exitToApp" size="32" />
                <div>Learn more</div>
              </Stack>
            </Stack>
          </a>
        </div>
      </div>

      <JunoFooter />
    </>
  )
}

export default PageFooter
