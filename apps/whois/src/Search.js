import React from "react"
import { SearchInput } from "juno-ui-components"
import cidrRegex from "cidr-regex"
import ipRegex from "ip-regex"

const Search = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredSearchTerm = React.useMemo(() => {
    let cidrs = searchTerm.match(cidrRegex()) || []
    let rest = searchTerm
    for (let cidr of cidrs) rest = rest.replace(cidr, "")

    console.log(cidrs, rest)
    return cidrs.concat(rest.match(ipRegex()) || [])
  }, [searchTerm])

  return (
    <>
      <div className="flex space-x-1">
        <div className="w-6/12">
          <SearchInput
            className="text-sap-blue-70 rounded-full"
            label="List of IPs or IP ranges (CIDR)"
            value={searchTerm}
            onKeyPress={(e) => {
              if (e.key === "Enter" && searchTerm !== "") onChange(searchTerm)
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <Button variant="primary" onClick={(e) => onChange(searchTerm)}>
          Go
        </Button> */}
      </div>
      <span className="text-sm text-gray-500">
        Example: 127.0.0.1 127.1.0.1/16.
      </span>{" "}
      <span className="text-sm text-gray-500">
        {filteredSearchTerm &&
          filteredSearchTerm.length > 0 &&
          `Will search for: ${filteredSearchTerm.join(", ")}`}
      </span>
    </>
  )
}

export default Search
