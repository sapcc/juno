import React from "react"
import { IntroBox, Stack, Button } from "juno-ui-components"

const customIntroBox = (isLoggedIn) => {
  return `
			${!isLoggedIn && `min-h-[25rem]`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const CustomIntroBox = ({ isLoggedIn }) => {
  const onLoginClicked = () => {}

  const documentationLink = (
    <a
      href="https://github.wdf.sap.corp/cc/volta/blob/master/docs/api-v1.md"
      target="_blank"
    >
      Read more about Volta service in our documentation
    </a>
  )

  return (
    <IntroBox
      variant="hero"
      heroImage="bg-[url('img/app_bg_example.svg')]"
      className={customIntroBox(isLoggedIn)}
    >
      {!isLoggedIn ? (
        <Stack
          alignment="start"
          distribution="center"
          direction="vertical"
          className="h-full"
        >
          <h1>Secure storage and management of single sign-on certificates</h1>
          <small>{documentationLink}</small>
          <Button
            label="Login"
            variant="primary"
            onClick={onLoginClicked}
            className="mt-2"
          />
        </Stack>
      ) : (
        <>
          Secure storage and management of single sign-on certificates
          <div>
            <small>{documentationLink}</small>
          </div>
        </>
      )}
    </IntroBox>
  )
}

export default CustomIntroBox
