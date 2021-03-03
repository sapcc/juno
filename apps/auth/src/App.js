// __webpack_public_path__ = window.location
// console.log(window.location)

import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default () => {
  const [value, onChange] = useState(new Date())

  return (
    <div>
      <h4>Hello this is Auth App</h4>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}
