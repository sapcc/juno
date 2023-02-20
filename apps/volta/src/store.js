import React from "react"
import create from "zustand"

// global zustand store. See how this works here: https://github.com/pmndrs/zustand
const useStore = create((set) => ({
  endpoint: "",
  setEndpoint: (endpoint) => set((state) => ({ endpoint: endpoint })),
  showNewSSO: false,
  setShowNewSSO: (show) => set((state) => ({ showNewSSO: show })),
  oidc: null,
  setOidc: (oidc) => set((state) => ({ oidc: oidc })),
  disabledCAs: [],
  setDisabledCAs: (cas) =>
    set((state) => {
      if (!cas || typeof cas !== "string") return state
      const disabledCAs = cas.split(",")
      return { disabledCAs: disabledCAs }
    }),
  documentationLinks: {},
  setDocumentationLinks: (links) =>
    set((state) => {
      if (!links || typeof links !== "string") return state
      let newLinks = {}
      const keyValueLinks = links.split(",")
      keyValueLinks.forEach((kv) => {
        const kvArr = kv.split("=")
        // ensure that there are key and value
        if (kvArr.length === 2) {
          newLinks[kvArr[0]] = kvArr[1]
        }
      })
      return { documentationLinks: newLinks }
    }),
}))

export default useStore
