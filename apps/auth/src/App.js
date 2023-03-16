import React from "react"
import useCommunication from "./useCommunication"

const App = (props = {}) => {
  const state = useCommunication(props)

  if (state?.loggedIn)
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>
                {state?.auth?.parsed?.avatarUrl?.small && (
                  <img src={state.auth.parsed.avatarUrl.small} />
                )}{" "}
                {state?.auth?.parsed?.fullName}
              </td>
            </tr>
            <tr>
              <th>E-Mail</th>
              <td>{state?.auth?.parsed?.email}</td>
            </tr>
            <tr>
              <th>Groups</th>
              <td>{state?.auth?.parsed?.groups}</td>
            </tr>
          </tbody>
        </table>
        {/* <code>{JSON.stringify(state?.auth?.parsed, null, 2)}</code> */}
      </>
    )

  return "Loading..."
}

export default App
