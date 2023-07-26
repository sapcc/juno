import React from "react"
import useCommunication from "./useCommunication"
import { oidcSession, mockedSession } from "oauth"
import { MOCKED_TOKEN } from "./mockedToken"

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

  const oidc = React.useMemo(() => {
    if (
      props.mock === "true" ||
      props.mock === true ||
      typeof props.mock === "string"
    ) {
      let token

      try {
        token = JSON.parse(atob(props.mock))
      } catch (e) {
        try {
          token = JSON.parse(props.mock)
        } catch (e) {
          token = MOCKED_TOKEN
        }
      }

      return mockedSession({
        token,
        initialLogin: props.initialLogin,
        onUpdate: (authData) => {
          let data = enrichAuthData(authData)
          setAuthData(data)
        },
      })
    }

    return oidcSession({
      issuerURL: props.issuerUrl || props.issuerurl, // backwards compatibility
      clientID: props.clientId || props.clientid, // backwards compatibility
      initialLogin: props.initialLogin,
      refresh: true,
      requestParams: props.requestParams,
      flowType: "code",
      onUpdate: (authData) => {
        let data = enrichAuthData(authData)
        setAuthData(data)
      },
    })
  }, [setAuthData])

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

// import React from "react"
// import useCommunication from "./useCommunication"
// import { oidcSession } from "oauth"
// import { mockAuthData } from "./Mock"

// const enrichAuthData = (data) => {
//   if (!data) return data

//   const enrichedAuth = { ...data }
//   const userId = data.auth?.parsed?.loginName

//   if (userId) {
//     enrichedAuth.auth.parsed["avatarUrl"] = {
//       small: `https://avatars.wdf.sap.corp/avatar/${userId}?size=24x24`,
//     }
//   }
//   return enrichedAuth
// }

// // const App = (props = {}) => {
// //   const [authData, setAuthData] = React.useState()

// //   const oidc = React.useMemo(() => {
// //     console.log("===============")
// //     if (props.mock === "true" || props.mock === true) {
// //       let data = enrichAuthData(mockAuthData())
// //       if (props.initialLogin) {
// //         setAuthData(data)
// //       }
// //       return {
// //         login: () => setAuthData(data),
// //         logout: () => setAuthData(null),
// //       }
// //     }

// //     return (
// //       oidcSession({
// //         issuerURL: props.issuerUrl,
// //         clientID: props.clientId,
// //         initialLogin: props.initialLogin,
// //         refresh: true,
// //         requestParams: props.requestParams,
// //         flowType: "code",
// //         onUpdate: (authData) => {
// //           let data = enrichAuthData(authData)
// //           setAuthData(data)
// //         },
// //       }),
// //       [setAuthData]
// //     )
// //   }, [])

// //   useCommunication({
// //     authData,
// //     login: oidc.login,
// //     logout: () =>
// //       oidc.logout({
// //         resetOIDCSession: props.resetOIDCSession,
// //         silent: true,
// //       }),
// //     debug: props.debug === "true" || props.debug === true,
// //   })

// //   return null
// // }

// // export default App
