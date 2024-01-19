import React, { useMemo } from "react"
import { Stack } from "juno-ui-components"
import { createClient } from "sapcc-k8sclient"
import { useApiEndpoint, useAuthData } from "./StoreProvider"
import { C } from "juno-ui-components/build/ContentContainer.component-700aac71"

const OrgInfo = () => {
  const apiEndpoint = useApiEndpoint()
  console.log(apiEndpoint, "apiEndpoint")

  const authData = useAuthData()?.auth

  const namespace = useMemo(() => {
    if (!authData?.raw?.groups) return null
    const orgString = authData?.raw?.groups.find(
      (g) => g.indexOf("organization:") === 0
    )
    if (!orgString) return null
    return orgString.split(":")[1]
  }, [authData?.raw?.groups])

  const client = useMemo(() => {
    if (!apiEndpoint || !authData?.JWT) return null
    return createClient({ apiEndpoint, token: authData?.JWT })
  }, [apiEndpoint, authData?.JWT])

  console.log(client, "client")

  // const orgName = useMemo(() => {
  //   // plugin configs
  //   client
  //     .get(`/apis/greenhouse.sap/v1alpha1/organizations/${namespace}`)
  //     .then((res) => {
  //       console.log(res, "asfadsfadsfaafaffafaafaf  ")
  //     })
  //   return "ababa"
  // }, [])

  return (
    <div className="org-info p-8 mb-8 bg-theme-background-lvl-0">
      <div className="org-name">
        <p className="text-xs">Organization</p>
        {namespace && <h1 className="text-xl font-bold">{namespace}</h1>}
      </div>
      {/* <p className="org-description">Org description here</p> */}
      {/* <div className="grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] auto-rows-[minmax(8rem,_1fr)] gap-6 pt-8">
        <Stack
          direction="vertical"
          alignment="start"
          distribution="between"
          className="org-info-item bg-theme-background-lvl-1 p-4"
        >
          <h2 className="text-lg font-bold">Thing 1</h2>
          <div className="bg-theme-background-lvl-4 py-2 px-3 inline-flex">
            23
          </div>
        </Stack>

        <Stack
          direction="vertical"
          alignment="start"
          distribution="between"
          className="org-info-item bg-theme-background-lvl-1 p-4"
        >
          <h2 className="text-lg font-bold">Thing 2</h2>
          <div className="bg-theme-background-lvl-4 py-2 px-3 inline-flex">
            42
          </div>
        </Stack>

        <Stack
          direction="vertical"
          alignment="start"
          distribution="between"
          className="org-info-item bg-theme-background-lvl-1 p-4"
        >
          <h2 className="text-lg font-bold">Thing 3</h2>
          <div className="bg-theme-background-lvl-4 py-2 px-3 inline-flex">
            4711
          </div>
        </Stack>
      </div> */}
    </div>
  )
}

export default OrgInfo
