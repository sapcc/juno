import React, { useReducer, useEffect, useCallback } from "react"
import { broadcast, get, watch } from "communicator"
import useStore from "./useStore"

const useCommunication = () => {
  console.log("useCommunication setup")
  const setIsActive = useStore((state) => state.userActivity.setIsActive)

  useEffect(() => {
    // watch for user activity updates messages
    // with the watcher we get the user activity object when this app is loaded before the Auth app
    const unwatch = watch(
      "GREENHOUSE_USER_ACTIVITY",
      (data) => {
        console.log("got message GREENHOUSE_USER_ACTIVITY: ", data)
        setIsActive(data?.isActive)
      },
      { debug: true }
    )
    return unwatch
  }, [setIsActive])
}

export default useCommunication
