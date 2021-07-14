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
    <div className="flex justify-center">
      <div className="w-1/4">
        <Stack direction="vertical" gap={1}>
          <div className="mt-8">
            <SearchInput
              className="text-black rounded-full px-4 py-2 w-full"
              label="List of IPs or IP ranges (CIDR)"
              value={searchTerm}
              onKeyPress={(e) => {
                if (e.key === "Enter" && searchTerm !== "") onChange(searchTerm)
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="text-sm text-gray-500">
            Example: 127.0.0.1 127.1.0.1/16.
          </span>
          <span className="text-sm text-gray-500">
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
