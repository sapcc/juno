// __webpack_public_path__ = window.location
// console.log(window.location)

import React from "react"
import tw from "twin.macro"
import { Modal, Button } from "juno-ui-components"
import { GlobalStyles } from "twin.macro"

const Hi = tw.h1`
text-blue-500
`
export default () => {
  const [isOpen, setIsOpen] = React.useState(false)

  //identity-3.qa-de-1.cloud.sap

  return (
    <>
      <GlobalStyles />
      <Hi>Hello this is Auth App</Hi>
      <Button mode="primary" onClick={() => setIsOpen(true)}>
        Login
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Login"
      ></Modal>
    </>
  )
}
