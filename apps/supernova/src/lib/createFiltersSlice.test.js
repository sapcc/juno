import * as React from "react"
import { renderHook, act } from "@testing-library/react"
import {
  useFilterLabels,
  useFilterActions,
  useSearchTerm,
  StoreProvider,
} from "../hooks/useAppStore"

const originalConsoleError = global.console.warn

describe("createFiltersSlice", () => {
  describe("setLabels", () => {
    it("return default status label", () => {
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
      expect(store.result.current.filterLabels).toEqual(["status"])
    })

    it("Adds array with strings to dropdown", () => {
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
          "support_group",
          "tier",
          "type",
        ])
      })

      expect(store.result.current.filterLabels).toEqual(
        expect.arrayContaining([
          "app",
          "status",
          "cluster",
          "cluster_type",
          "context",
          "job",
          "region",
          "service",
          "severity",
          "support_group",
          "tier",
          "type",
        ])
      )
    })

    it("Adds empty array to dropdown", () => {
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
        store.result.current.actions.setLabels([])
      })

      expect(store.result.current.filterLabels).toEqual(
        expect.arrayContaining(["status"])
      )
    })

    it("warns the user if labels are not an array", () => {
      const spy = jest.spyOn(console, "warn").mockImplementation(() => {})

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

      act(() =>
        store.result.current.actions.setLabels(
          "app,cluster,cluster_type,context,job,region,service,severity,status,support_group,tier,type"
        )
      )

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(
        "[supernova]::setLabels: labels object is not an array"
      )
      spy.mockRestore()
    })

    it("warns the user if labels also includes non-strings", () => {
      const spy = jest.spyOn(console, "warn").mockImplementation(() => {})

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

      act(() => store.result.current.actions.setLabels(["app", 1, 9]))

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(
        "[supernova]::setLabels: Some elements of the array are not strings."
      )
      spy.mockRestore()
    })
  })

  describe("setSearchTerm", () => {
    it("empty search term", () => {
      const wrapper = ({ children }) => (
        <StoreProvider>{children}</StoreProvider>
      )
      const store = renderHook(
        () => ({
          actions: useFilterActions(),
          searchTerm: useSearchTerm(),
        }),
        { wrapper }
      )

      expect(store.result.current.searchTerm).toEqual("")
    })

    it("Set a search term", () => {
      const wrapper = ({ children }) => (
        <StoreProvider>{children}</StoreProvider>
      )
      const store = renderHook(
        () => ({
          actions: useFilterActions(),
          searchTerm: useSearchTerm(),
        }),
        { wrapper }
      )

      act(() => {
        store.result.current.actions.setSearchTerm("k8s")
      })

      expect(store.result.current.searchTerm).toEqual("k8s")
    })
  })
})
