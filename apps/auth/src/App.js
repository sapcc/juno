import React from "react"
import useCommunication from "./useCommunication"
import { oidcSession } from "oauth"

const enrichAuthData = (data) => {
  if (!data) return data

  const enrichedAuth = { ...data }
  const userId = data.auth?.parsed?.loginName

  if (userId) {
    enrichedAuth.auth.parsed["avatarUrl"] = {
      small: `https://avatars.wdf.sap.corp/avatar/${userId}?size=24x24`,
    }
  }
  return enrichedAuth
}

const App = (props = {}) => {
  const [authData, setAuthData] = React.useState()

  const oidc = React.useMemo(
    () =>
      oidcSession({
        issuerURL: props.issuerurl,
        clientID: props.clientid,
        initialLogin: props.initialLogin,
        refresh: true,
        requestParams: props.requestParams,
        flowType: "code",
        onUpdate: (authData) => {
          let data = enrichAuthData(authData)
          setAuthData(data)
        },
      }),
    [setAuthData]
  )

  useCommunication({
    authData,
    login: oidc.login,
    logout: () =>
      oidc.logout({
        resetOIDCSession: props.resetOIDCSession,
        silent: true,
      }),
    debug: props.debug === "true" || props.debug === true,
  })

  return null

  //########## TEST
  // if (authData?.loggedIn)
  //   return (
  //     <>
  //       <table style={{ maxWidth: 500 }}>
  //         <tbody>
  //           <tr>
  //             <th>Name</th>
  //             <td>
  //               {authData?.auth?.parsed?.avatarUrl?.small && (
  //                 <img src={authData.auth.parsed.avatarUrl.small} />
  //               )}{" "}
  //               {authData?.auth?.parsed?.fullName}
  //             </td>
  //           </tr>
  //           <tr>
  //             <th>E-Mail</th>
  //             <td>{authData?.auth?.parsed?.email}</td>
  //           </tr>
  //           <tr>
  //             <th>Groups</th>
  //             <td>
  //               {JSON.stringify(authData?.auth?.parsed?.groups || {}, null, 2)}
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //       {/* <code>{JSON.stringify(authData?.auth?.parsed, null, 2)}</code> */}
  //     </>
  //   )

  // return "Loading..."
}

export default App
