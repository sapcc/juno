import * as React from "react"
import { renderHook, act } from "@testing-library/react"
import StoreProvider, {
  useGlobalsActions,
  useGlobalsEndpoint,
} from "../../components/StoreProvider"

describe("createGlobalsSlice", () => {
  describe("setEndpoint", () => {
    it("examples a basic test", () => {
      const wrapper = ({ children }) => (
        <StoreProvider>{children}</StoreProvider>
      )
      const store = renderHook(
        () => ({
          globalsActions: useGlobalsActions(),
          endpoint: useGlobalsEndpoint(),
        }),
        { wrapper }
      )

      act(() => {
        store.result.current.globalsActions.setEndpoint("localhost:3000")
      })

      expect(store.result.current.endpoint).toEqual("localhost:3000")
    })
  })
})
