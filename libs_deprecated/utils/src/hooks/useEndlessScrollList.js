/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react"

/*
  This hook is used to create an endless scroll list.
  @param items: complete list of items to be displayed
  @param options: options for the hook
    @param options.delay: the delay in ms between adding items to the list. Default is 500ms
    @param options.showLoading: whether to show the loading indicator. Default is true and it renders a span with the text "Loading..."
    @param options.loadingObject: the object to be rendered as the loading indicator. Default is a span with the text "Loading..."
    @param options.showRef: whether to show the ref element
    @param options.refFunction: the function to be used to render the ref element. It receives the ref as a parameter
  @return: an object with the following properties:
    @property scrollListItems: the items to be displayed
    @property iterator: an iterator to be used to render the list. It has a map function that receives a function to be used to render each item
 */
const useEndlessScrollList = (items, options = {}) => {
  const [visibleAmount, setVisibleAmount] = useState(20)
  const [isAddingItems, setIsAddingItems] = useState(false)
  const timeoutRef = useRef(null)
  const observer = useRef()

  useEffect(() => {
    // clear when component is unmounted
    return () => clearTimeout(timeoutRef.current)
  }, [])

  // recalculate if items change
  const scrollListItems = useMemo(() => {
    if (items) {
      return items.slice(0, visibleAmount)
    }
  }, [items, visibleAmount])

  // recalculate if items change
  const lastLisItemRef = useCallback(
    (node) => {
      // skip if already adding items
      if (isAddingItems) return
      // disconnect previous observer
      if (observer.current) observer.current.disconnect()
      // create new observer
      observer.current = new IntersectionObserver((entries) => {
        // if the last element is intersecting and there are still items to show
        if (entries[0].isIntersecting && visibleAmount <= items.length) {
          clearTimeout(timeoutRef.current)
          setIsAddingItems(true)
          timeoutRef.current = setTimeout(() => {
            setIsAddingItems(false)
            setVisibleAmount((prev) => prev + 10)
          }, options?.delay || 500)
        }
      })
      if (node) observer.current.observe(node)
    },
    [items, isAddingItems]
  )

  const iterator = useMemo(() => {
    return {
      map: (f) => {
        const content = scrollListItems.map(f)
        return (
          <>
            {content}
            {isAddingItems && options?.showLoading !== false && (
              <>
                {options?.loadingObject ? (
                  options.loadingObject
                ) : (
                  <span id="endlessScrollListLoading">Loading...</span>
                )}
              </>
            )}
            {options?.showRef !== false && (
              <>
                {options?.refFunction ? (
                  options.refFunction(lastLisItemRef)
                ) : (
                  <span
                    id="endlessScrollListLastItemRef"
                    ref={lastLisItemRef}
                  />
                )}
              </>
            )}
          </>
        )
      },
    }
  }, [scrollListItems, lastLisItemRef])

  return { scrollListItems, iterator }
}

export default useEndlessScrollList
