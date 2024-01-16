import React from "react"
import { Messages } from "messages-provider"

const NotificationsContainer = () => {
  // do not use a container here to align the messages to the ones comming from each plugin
  return <Messages className="mx-4" />
}

export default NotificationsContainer
