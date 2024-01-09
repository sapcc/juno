import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryClientFnReady } from "./StoreProvider"

const AppContent = () => {
  const queryClientFnReady = useQueryClientFnReady()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`services`],
    enabled: !!queryClientFnReady,
  })

  console.log("AppContent data>>>>>>>>>>>>>>>>>>", data)

  return (
    <>
      <div>AppContent</div>
    </>
  )
}

export default AppContent
