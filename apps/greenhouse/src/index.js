import { createRoot } from "react-dom/client"
import React from "react"

console.log(
  `%c
  ____ ____  _____ _____ _   _ _   _  ___  _   _ ____  _____ 
 / ___|  _ \\| ____| ____| \\ | | | | |/ _ \\| | | / ___|| ____|
| |  _| |_) |  _| |  _| |  \\| | |_| | | | | | | \\___ \\|  _|  
| |_| |  _ <| |___| |___| |\\  |  _  | |_| | |_| |___) | |___ 
 \\____|_| \\_\\_____|_____|_| \\_|_| |_|\\___/ \\___/|____/|_____|
`,
  "color:green"
)

// export mount and unmount functions
export const mount = (container, options = {}) => {
  import("./Shell").then((App) => {
    mount.root = createRoot(container)
    mount.root.render(React.createElement(App.default, options?.props))
  })
}

export const unmount = () => mount.root && mount.root.unmount()
