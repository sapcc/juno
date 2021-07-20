import React from "react"
import { SearchInput, Stack } from "juno-ui-components"
import cidrRegex from "cidr-regex"
import ipRegex from "ip-regex"

const Search = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredSearchTerm = React.useMemo(() => {
    let cidrs = searchTerm.match(cidrRegex()) || []
    let rest = searchTerm
    for (let cidr of cidrs) rest = rest.replace(cidr, "")

    return cidrs.concat(rest.match(ipRegex()) || [])
  }, [searchTerm])

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/4">
        <Stack direction="vertical" gap={1}>
          <div className="mt-8">
            <SearchInput
              placeholder="IPs, IP lists, or IP ranges (CIDR)"
              variant="hero"
              value={searchTerm}
              onKeyPress={(e) => {
                if (e.key === "Enter" && searchTerm !== "") onChange(searchTerm)
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="">
            {filteredSearchTerm &&
              filteredSearchTerm.length > 0 &&
              `Will search for: ${filteredSearchTerm.join(", ")}`}
          </span>
          {/* <Button variant="primary" onClick={(e) => onChange(searchTerm)}>
            Go
          </Button> */}
        </Stack>
      </div>
    </div>
  )
}

export default Search
