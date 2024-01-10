import React, { useMemo } from "react"
import { Stack } from "juno-ui-components"

const OrgInfo = () => {
  // temporay fix to display org name until we have the k8sclient to fetch the metadata
  const orgName = useMemo(() => {
    const currentUrl = new URL(window.location.href)
    let match = currentUrl.host.match(/^(.+)\.dashboard\..+/)
    return match ? match[1] : currentUrl.searchParams.get("org")
  }, [])

  return (
    <div className="org-info p-8 mb-8 bg-theme-background-lvl-0">
      <div className="org-name">
        <p className="text-xs">Organization</p>
        {orgName?.length > 0 && (
          <h1 className="text-xl font-bold">{orgName}</h1>
        )}
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
