export const AUTH_ACTIONS = {
  SIGN_ON: "signOn",
  SIGN_OUT: "signOut",
}

const createAuthSlice = (set, get) => ({
  auth: {
    data: null,
    isProcessing: false,
    loggedIn: false,
    error: null,
    lastAction: {},
    actions: {
      setData: (data) => {
        if (!data) return
        set(
          (state) => ({
            auth: {
              ...state.auth,
              isProcessing: data?.isProcessing,
              loggedIn: data?.loggedIn,
              error: data?.error,
              data: data?.auth,
            },
          }),
          false,
          "auth/setData"
        )
      },
    },
  },
})

export default createAuthSlice
