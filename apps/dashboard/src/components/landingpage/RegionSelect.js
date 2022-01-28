import React, { useCallback } from "react"

import useStore from "../../store"

import { Stack } from "juno-ui-components"

const RegionSelect = () => {
  const selectRegion = useStore(useCallback((state) => state.selectRegion))
  const regionsByContinent = useStore(
    useCallback((state) => state.regionsByContinent)
  )

  return (
    <Stack gap="6" distribution="center">
      {regionsByContinent.map((continent) => (
        <Stack
          direction="vertical"
          gap="1.5"
          className="flex-1"
          key={continent.name}
        >
          <div className="text-lg text-theme-high pb-2">{continent.name}</div>
          {continent.regions.map((region) => (
            <Stack
              key={region.key}
              onClick={() => selectRegion(region.key)}
              alignment="center"
              className="bg-theme-background-lvl-8 py-3 px-5 cursor-pointer hover:bg-theme-accent hover:text-black"
            >
              <div>
                <span className="font-bold">{region.key}</span>
                <br />
                {region.country}
              </div>
              <div className="ml-auto">{region.icon}</div>
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  )
}

export default RegionSelect
