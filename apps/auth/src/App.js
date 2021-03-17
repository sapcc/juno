// __webpack_public_path__ = window.location
// console.log(window.location)

import React from "react"
import tw from "twin.macro"
import { Modal, Button } from "juno-ui-components"
import { GlobalStyles } from "twin.macro"

const Hi = tw.h1`
text-purple-500
`
// import tw from "twin.macro"

// console.log(":::::::::::::::::::::::::::.", tw)
export default () => {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <GlobalStyles />
      <Hi>Hello this is Auth App</Hi>
      <Button danger onClick={() => setIsOpen(true)}>
        Test
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

// export default () => {
//   return (
//     <div>
//       <Modal isOpen={true} />
//       {/* <Button>test</Button> */}
//       <h4>Hello this is Auth App</h4>
//     </div>
//   )
// }
