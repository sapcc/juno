import React from "react"
import { Stack, Message, Checkbox, CodeBlock } from "juno-ui-components"

const preClasses = `
whitespace-pre-wrap
bg-theme-background-lvl-5
p-4
mt-2
rounded
max-h-40
overflow-y-scroll
`
const codeClasses = `
w-full 
break-all
`

const NewCertificateResutls = ({ pk, ssoCert, onCopied }) => {
  return (
    <div>
      {pk && (
        <>
          <Message
            text="Please make sure to copy the private key below used to create the SSO certificate and store it in a safe place, you won’t be able to see it again! This key was used to create the SSO certificate and it is not store anywhere!"
            variant="warning"
          />
          {/* <b>Private key</b> */}

          <CodeBlock heading="Private key">{pk}</CodeBlock>

          {/* <pre className={preClasses}>
            <code className={codeClasses}>{pk}</code>
          </pre> */}
        </>
      )}

      <div className="mt-8">
        <b>SSO certificate</b>

        <CodeBlock heading="SSO certificate">{ssoCert}</CodeBlock>

        {/* <pre className={preClasses}>
          <code className={codeClasses}>{ssoCert}</code>
        </pre> */}
      </div>

      <Stack alignment="center" className="mt-8">
        <Checkbox
          onChange={(e) => {
            onCopied(e.target.checked)
          }}
        />
        <span className="ml-2">
          {`I am sure I have copyed and stored the sso certificate ${
            pk && "and the provided private key"
          }`}
        </span>
      </Stack>
    </div>
  )
}

export default NewCertificateResutls
