import React from "react"
import { Stack, Button } from "juno-ui-components"
import Avatar from "./Avatar"
import {
  useAuthUser,
  useGlobalsActions,
  useAuthActions,
} from "../StoreProvider"

const HeaderUser = () => {
  const user = useAuthUser()
  const { setCurrentModal } = useGlobalsActions()
  const { setUser } = useAuthActions()

  return (
    <Stack alignment="center" className="ml-auto" distribution="end">
      {user ? (
        <>
          <div className="mr-4">
            <Avatar
              user={{ Name: "Max Mustermann", SapID: "test" }}
              displayName
            />
          </div>

          <Button label="Logout" size="small" onClick={() => setUser(null)} />
        </>
      ) : (
        <Button
          label="Login"
          size="small"
          onClick={() => setCurrentModal("LogIn")}
        />
      )}
    </Stack>
  )
}

export default HeaderUser
