// __webpack_public_path__ = window.location
// console.log(window.location)

import React from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Modal } from "ui-components"

export default () => {
  return (
    <div>
      <Modal isOpen={true} />
      <h4>Hello this is Auth App</h4>

      <Calendar />
    </div>
  )
}
