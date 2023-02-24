import React from "react"
import { create } from "zustand"

const createOidcSlice = (set) => ({
  auth: null,
  setAuth: (auth) => set((state) => ({ auth: auth })),
  loggedIn: false,
  setLoggedIn: (loggedIn) => set((state) => ({ loggedIn: loggedIn })),
  logout: null,
  setLoggedOut: (logout) => set((state) => ({ logout: logout })),
  login: null,
  setLogin: (login) => set((state) => ({ login: login })),
})

const creatGlobalsSlice = (set) => ({
  endpoint: "",
  setEndpoint: (endpoint) => set((state) => ({ endpoint: endpoint })),
})

const useStore = create((...a) => ({
  ...createOidcSlice(...a),
  ...creatGlobalsSlice(...a),
}))

export default useStore
