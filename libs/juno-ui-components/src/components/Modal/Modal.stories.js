import React from "react"
import { Modal } from "./index.js"
import { ModalFooter } from "../ModalFooter/index.js"
import { Button } from "../Button/index.js"
import { Form } from "../Form/index.js"
import { TextInputRow } from "../TextInputRow"
import { CheckboxRow } from "../CheckboxRow"

const Template = (args) => <Modal {...args} ></Modal>
 
export default {
  title: "WiP/Modal",
  component: Modal,
  argTypes: {},
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <p>A default modal.</p>
  ]
}

export const WithTitle = Template.bind({})
WithTitle.args = {
  title: "Modal Title",
  children: [
    <p>A modal with a title</p>
  ]
}

export const NonCloseable = Template.bind({})
NonCloseable.args = {
  title: "Non-Closeable Modal",
  children: "Use only if all else fails. If you need to inform users about something, in 99.9% of cases <Message> is the better choice.",
  closeable: false
}

export const Login = Template.bind({})
Login.args = {
  title: "Log In",
  children:
    <Form>
      <TextInputRow label="Username" name="username" id="username" />
      <TextInputRow type="password" label="Password" name="password" id="password" />
      <CheckboxRow label="Remember Me" id="remember-me" />
    </Form>
  ,
  modalFooter:  <ModalFooter confirmButtonLabel="Log In" onConfirm={()=>{console.log("Log In")}} />,
}




// import React from "react"
// 
// import { Modal } from "./index.js"
// import { Button } from "../Button/index.js"
// import { FloatingLabelInput } from "../Form/index.js"
// 
// const Template = ({ isOpen: initOpenStatus, ...props }) => {
//   const [isOpen, setIsOpen] = React.useState(initOpenStatus)
// 
//   return (
//     <>
//       <Button mode="primary" onClick={() => setIsOpen(true)}>
//         Open Modal
//       </Button>
//       <Modal
//         isOpen={isOpen}
//         close={() => {
//           setIsOpen(false)
//         }}
//         {...props}
//       />
//     </>
//   )
// }
// 
// export default {
//   title: "WiP/Modal",
//   component: Modal,
// }
// 
// export const Simple = Template.bind({})
// Simple.parameters = {
//   docs: {
//     description: {
//       story: "DO NOT USE!!! The modal component isn't ready to be used.",
//     },
//   },
// }
// Simple.args = {
//   title: "Simple",
//   icon: "attention",
//   children: "I am a simple modal view.",
//   isOpen: true,
// }
// 
// export const CustomContent = Template.bind({})
// CustomContent.parameters = {
//   docs: {
//     description: {
//       story: "DO NOT USE!!! The modal component isn't ready to be used.",
//     },
//   },
// }
// CustomContent.args = {
//   title: "Custom Content",
//   icon: null,
//   children: ({ Body, Buttons, close }) => (
//     <>
//       <Body className="font-red-100">TEST</Body>
//       <Buttons>
//         <Button onClick={close}>Close</Button>
//       </Buttons>
//     </>
//   ),
// }
// 
// export const Login = Template.bind({})
// Login.args = {
//   title: "Login",
//   icon: null,
//   children: ({ Body, Buttons, close }) => (
//     <>
//       <Body>
//         <form className="space-y-3">
//           <FloatingLabelInput label="User" />
//           <FloatingLabelInput label="Password" type="password" />
//         </form>
//       </Body>
//       <Buttons>
//         <div className="space-x-3">
//           <Button variant="primary">Login</Button>
//           <Button onClick={close}>Cancel</Button>
//         </div>
//       </Buttons>
//     </>
//   ),
// }
