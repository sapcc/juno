import * as React from "react"
import { renderHook, act } from "@testing-library/react"
import {
  useFilterLabels,
  useFilterActions,
  StoreProvider,
} from "../hooks/useAppStore"

const originalConsoleError = global.console.warn

// catch consol WARNS: https://www.jackfranklin.co.uk/blog/failing-tests-on-react-proptypes/
beforeEach(() => {
  global.console.warn = (...args) => {
    const fetchWarns = [/setLabels/]

    if (fetchWarns.some((p) => p.test(args[0]))) {
      throw new Error(args[0])
    }

    originalConsoleError(...args)
  }
})

describe("createFiltersSlice", () => {
  describe("setLabels", () => {
    it("return empty array as default", () => {
      const wrapper = ({ children }) => (
        <StoreProvider>{children}</StoreProvider>
      )
      const store = renderHook(
        () => ({
          actions: useFilterActions(),
          filterLabels: useFilterLabels(),
        }),
        { wrapper }
      )
      expect(store.result.current.filterLabels).toEqual([])
    })

    it("just accepts array of strings", () => {
      const wrapper = ({ children }) => (
        <StoreProvider>{children}</StoreProvider>
      )
      const store = renderHook(
        () => ({
          actions: useFilterActions(),
          filterLabels: useFilterLabels(),
        }),
        { wrapper }
      )

      act(() => {
        store.result.current.actions.setLabels([
          "app",
          "cluster",
          "cluster_type",
          "context",
          "job",
          "region",
          "service",
          "severity",
          "status",
          "support_group",
          "tier",
          "type",
        ])
      })

      expect(store.result.current.filterLabels).toEqual([
        "app",
        "cluster",
        "cluster_type",
        "context",
        "job",
        "region",
        "service",
        "severity",
        "status",
        "support_group",
        "tier",
        "type",
      ])
    })
  })

  it("warn the user if labels are different then an array of strings", () => {
    const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>
    const store = renderHook(
      () => ({
        actions: useFilterActions(),
        filterLabels: useFilterLabels(),
      }),
      { wrapper }
    )

    expect(() => {
      act(() =>
        store.result.current.actions.setLabels(
          "app,cluster,cluster_type,context,job,region,service,severity,status,support_group,tier,type"
        )
      )
    }).toThrow(/is not an array of strings/)
  })
})
