import create from "zustand"

// global store
const useStore = create((set) => ({
  loginOverlayVisible: false,
  toggleLoginOverlay:   () => set((state) => ({loginOverlayVisible: !state.loginOverlayVisible})),
  showLoginOverlay:     () => set((state) => ({loginOverlayVisible: true})),
  hideLoginOverlay:     () => set((state) => ({loginOverlayVisible: false})),
}))

export default useStore