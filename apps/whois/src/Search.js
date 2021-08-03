import React from "react"
import { SearchInput, Stack } from "juno-ui-components"
import cidrRegex from "cidr-regex"
// import ipRegex from "ip-regex"

const searchClasses = (resultsShown) => {
  return (`
    w-1/4

    ${resultsShown && `
      ml-auto
      mr-8
    `}
  `)
}

const Search = ({ onChange, resultsShown }) => {
  const [searchTerm, setSearchTerm] = React.useState("")

  // const filteredSearchTerm = React.useMemo(() => {
  //   let cidrs = searchTerm.match(cidrRegex()) || []
  //   let rest = searchTerm
  //   for (let cidr of cidrs) rest = rest.replace(cidr, "")

  //   return cidrs.concat(rest.match(ipRegex()) || [])
  // }, [searchTerm])



  return (
      <Stack direction="vertical" gap={2} className={`${searchClasses(resultsShown)}`}>
        <SearchInput
          placeholder="IPs, IP lists, or IP ranges (CIDR)"
          variant="hero"
          value={searchTerm}
          autoFocus={true}
          onKeyPress={(e) => {
            if (e.key === "Enter" && searchTerm !== "") onChange(searchTerm)
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        { !resultsShown && searchTerm.match(cidrRegex()) &&
          <span className="text-theme-disabled pl-6">Searching for CIDR ranges may take a while, please be patient :)</span>
        }
      </Stack>
  )
}

export default Search
