import React, { useCallback, useMemo } from "react"

import useStore from "../../store"

import { Icon, Stack } from "juno-ui-components"

const DomainSelect = () => {

  const selectedRegionKey = useStore(useCallback((state) => state.region))
  const regions           = useStore(useCallback((state) => state.regions))
  const domains           = useStore(useCallback((state) => state.domains))
  
  const selectedRegion = useMemo(() => {return (regions[selectedRegionKey])}, [selectedRegionKey])

  const domainCardClasses = `
    group
    relative
    bg-juno-grey-blue-1 
    text-theme-high
    font-bold
    p-4 
    block
    h-24
    hover:bg-juno-turquoise
    hover:text-black
  `

  const iconClasses = `
    absolute 
    bottom-2 
    right-2
  `

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
          <a 
            href={`https://dashboard.${selectedRegionKey}.cloud.sap/${domain.toLowerCase()}/home`} 
            className={domainCardClasses} 
            key={domain}>
            {domain}
            <div className={`${iconClasses} opacity-40 block group-hover:hidden`}>
              <Icon icon="autoAwesomeMotion" color="text-theme-high" size="36" />
            </div>
            <div className={`${iconClasses} hidden group-hover:block`}>
              <Icon icon="openInBrowser" color="text-black" size="36" />
            </div>
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