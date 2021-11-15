import React, { useCallback, useMemo } from "react"

import useStore from "../../store"

import { Stack } from "juno-ui-components"

const DomainSelect = () => {

  const selectedRegionKey = useStore(useCallback((state) => state.region))
  const regions           = useStore(useCallback((state) => state.regions))
  const domains           = useStore(useCallback((state) => state.domains))
  
  const selectedRegion = useMemo(() => {return (regions[selectedRegionKey])}, [selectedRegionKey])

  return (
    <>
      <Stack gap={3} className="items-center">
        {selectedRegion.icon}
        <div>
          {selectedRegion.key}<br />
          {selectedRegion.country}
        </div>
      </Stack>
      <div className="grid grid-cols-6 gap-4 mt-12">
        { domains.map((domain) => (
          <a href={`https://dashboard.${selectedRegionKey}.cloud.sap/${domain.toLowerCase()}/home`} className="bg-juno-grey-blue-1 text-theme-high p-4 block hover:ring-2 ring-juno-blue hover:text-juno-turquoise" key={domain}>
            {domain}
          </a>
        ))}
      </div>
    </>
  )
}

// <Stack gap={6} className="justify-center">
// { regions.map(continent => (
//   <Stack direction="vertical" gap={1.5} className="flex-1" key={continent.name}>
//     <div className="text-lg text-theme-high pb-2">{continent.name}</div>
//     { continent.regions.map( region => (
//       <Stack 
//         key={region.key}
//         onClick={() => selectRegion(region.key)}
//         className="bg-juno-grey-blue-1 py-3 px-5 items-center cursor-pointer hover:ring-2 ring-juno-blue">
//         <div>
//           {region.key}<br />
//           {region.label}
//         </div>
//         <div className="ml-auto">
//           {region.icon}
//         </div>
//       </Stack>
//     ))}
//   </Stack>
// ))}
// </Stack>

export default DomainSelect