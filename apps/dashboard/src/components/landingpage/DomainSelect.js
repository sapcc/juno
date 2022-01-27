import React, { useCallback, useMemo } from "react"

import useStore from "../../store"

import { Icon, Stack } from "juno-ui-components"

const domainCardClasses = `
  group
  relative
  bg-theme-background-lvl-8 
  text-theme-high
  p-4
  block
  min-h-[6.25rem]
  hover:bg-theme-accent
  hover:text-black
`

const iconClasses = `
  absolute 
  bottom-2 
  right-2
`

const DomainSelect = () => {
  const selectedRegionKey = useStore(useCallback((state) => state.region))
  const regions = useStore(useCallback((state) => state.regions))
  const domains = useStore(useCallback((state) => state.domains))

  const selectedRegion = useMemo(() => {
    return regions[selectedRegionKey]
  }, [selectedRegionKey])

  return (
    <>
      <Stack gap="3" className="items-center">
        {selectedRegion.icon}
        <div>
          {selectedRegion.key}
          <br />
          {selectedRegion.country}
        </div>
      </Stack>
      <h4 className="text-lg uppercase mt-10 mb-3">General Purpose</h4>
      <div className="grid grid-cols-3 gap-4">
        {domains.general.map((domain) => (
          <a
            href={`https://dashboard.${selectedRegionKey}.cloud.sap/${domain?.name?.toLowerCase()}/home`}
            className={domainCardClasses}
            key={domain?.name}
          >
            <h5 className="font-bold pb-1">{domain?.name}</h5>
            <div className="pr-9">{domain?.description}</div>
            <div
              className={`${iconClasses} opacity-40 block group-hover:hidden`}
            >
              <Icon
                icon="autoAwesomeMotion"
                color="text-theme-high"
                size="36"
              />
            </div>
            <div className={`${iconClasses} hidden group-hover:block`}>
              <Icon icon="openInBrowser" color="text-black" size="36" />
            </div>
          </a>
        ))}
      </div>
      <h4 className="text-lg uppercase mt-12 mb-3">Special Purpose</h4>
      <div className="grid grid-cols-6 gap-4">
        {domains.special.map((domain) => (
          <a
            href={`https://dashboard.${selectedRegionKey}.cloud.sap/${domain.toLowerCase()}/home`}
            className={domainCardClasses}
            key={domain}
          >
            <h5 className="font-bold pb-1">{domain}</h5>
            <div
              className={`${iconClasses} opacity-40 block group-hover:hidden`}
            >
              <Icon
                icon="autoAwesomeMotion"
                color="text-theme-high"
                size="36"
              />
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

// <Stack gap="6" className="justify-center">
// { regions.map(continent => (
//   <Stack direction="vertical" gap="1.5" className="flex-1" key={continent.name}>
//     <div className="text-lg text-theme-high pb-2">{continent.name}</div>
//     { continent.regions.map( region => (
//       <Stack
//         key={region.key}
//         onClick={() => selectRegion(region.key)}
//         className="bg-juno-grey-blue-3 py-3 px-5 items-center cursor-pointer hover:ring-2 ring-juno-blue">
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
