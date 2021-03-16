import React from "react"
import { Modal, Button } from "juno-ui-components"
import { GlobalStyles } from "twin.macro"

const App = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <GlobalStyles />
      <Button danger onClick={() => setIsOpen(true)}>
        Test
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
export default App
