import React from "react"
import { send, on } from "communicator"
import { useClient } from "./lib/hooks/useClient"
// import Zones from "./components/Zones"

export default ({ color }) => {
  const [auth, setAuth] = React.useState()
  const endpoint = React.useMemo(() => {
    // console.log("============auth", auth)
    if (!auth || !auth.token || !auth.token.catalog) return
    const service = auth.token.catalog.find(
      (service) => service.name === "designate"
    )
    console.log("service", service)
    if (!service) return
    const publicEndpoint = service.endpoints.find(
      (endpoint) => endpoint.interface === "public"
    )
    return publicEndpoint && publicEndpoint.url
  }, [auth])

  const client = useClient(endpoint, auth && auth.token)
  React.useEffect(() => {
    if (!client) return
    client.getZones().then((zones) => console.log("===============", zones))
  }, [client])

  React.useEffect(() => {
    return on("AUTH_UPDATE_TOKEN", ({ token, authToken }) => {
      setAuth(token && authToken ? { token, authToken } : null)
    })
  }, [])

  console.log(auth, endpoint)
  return (
    <div>
      <h2>Designate</h2>
      {!auth ? (
        <p>Authentication required</p>
      ) : (
        <div>
          <span>Welcome</span>
        </div>
      )}
    </div>
  )
}
