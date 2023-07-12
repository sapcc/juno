import { createRoot } from "react-dom/client"
import React from "react"

// export mount and unmount functions
export const mount = (container, options = {}) => {
  let loadApp
  if (options?.props?.protocol === "oidc") {
    loadApp = import(`./oidc/App`)
  } else if (options?.props?.protocol === "openstack") {
    loadApp = import(`./openstack/App`)
  }
  loadApp.then((App) => {
    mount.root = createRoot(container)
    mount.root.render(React.createElement(App.default, options?.props))
  })
}

export const unmount = () => mount.root && mount.root.unmount()
