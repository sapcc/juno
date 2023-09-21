const createAuthSlice = (set, get) => ({
  auth: {
    user: null,

    actions: {
      setUser: (user) =>
        set(
          (state) => ({
            auth: {
              ...state.auth,
              user,
            },
          }),
          false,
          "auth.setUser"
        ),
    },
  },
})

export default createAuthSlice
