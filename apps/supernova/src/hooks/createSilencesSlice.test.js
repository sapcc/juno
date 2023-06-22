import { renderHook, act, waitFor } from "@testing-library/react"
import {
  useSilencesActions,
  useSilencesLocalItems,
  useAlertsActions,
  useAlertsItems,
} from "./useStore"
import {
  createFakeAlertStatustWith,
  createFakeAlertWith,
  createFakeSilenceWith,
} from "./fakeObjects"
import { countAlerts } from "../lib/utils"

describe("createSilencesSlice", () => {
  describe("updateLocalItems", () => {
    it("return default empty object if not items to update", () => {
      const actions = renderHook(useSilencesActions)

      act(() => actions.result.current.updateLocalItems())

      const { result } = renderHook(useSilencesLocalItems)
      waitFor(() => {
        expect(result.current).toEqual({})
      })
    })

    it("removes local silences whose alert reference has a silencedBy with the silence id itself", () => {
      const alertActions = renderHook(useAlertsActions)
      const silenceActions = renderHook(useSilencesActions)

      // create a silence
      const silence = createFakeSilenceWith({ id: "test1" })
      const silence2 = createFakeSilenceWith({ id: "test2" })
      // create an alert
      const status = createFakeAlertStatustWith({ silencedBy: silence.id })
      const alert = createFakeAlertWith({ status: status })

      // set the alert
      act(() =>
        alertActions.result.current.setAlertsData({
          items: [alert],
          counts: countAlerts([alert]),
        })
      )

      // check if the alert is saved
      const { result: savedAlerts } = renderHook(useAlertsItems)
      waitFor(() => {
        expect(savedAlerts.current).toBe(1)
      })

      // set the silence
      act(() => silenceActions.result.current.addLocalItem(silence))
      act(() => silenceActions.result.current.addLocalItem(silence2))

      // check if the silence and alert are saved
      const { result: savedLocalSilences } = renderHook(useSilencesLocalItems)
      waitFor(() => {
        expect(savedLocalSilences.current).toBe(2)
      })

      // update local items
      act(() => silenceActions.result.current.updateLocalItems())
      waitFor(() => {
        expect(savedLocalSilences.current).toBe(1)
        expect(savedLocalSilences.current.id).toEqual("test2")
      })
    })
  })
})
