import React from "react"
import {
  Modal,
  AppShellProvider,
  Form,
  TextInputRow,
  Stack,
  Select,
  SelectOption,
  FormSection,
  Label,
  Button,
  ModalFooter,
  Message,
} from "juno-ui-components"

import useCommunication from "../useCommunication"

const scopeConf = ({ domain, domainId, project, projectId }) => {
  if (projectId) return { project: { id: projectId } }

  if (project) {
    const scope = { project: { name: project } }
    if (domainId) scope.project.domain = { id: domainId }
    else if (domain) scope.project.domain = { name: domain }
    return scope
  }

  if (domainId) return { domain: { id: domainId } }
  if (domain) return { domain: { name: domain } }
  return null
}

// props = { userName, userDomain, userDomainId, scopeDomain, scopeDomainId, scopeProjectId, open, onSubmit }
const PasswordLoginForm = (props) => {
  const [userName, setUserName] = React.useState(props.userName)
  const [userPassword, setUserPassword] = React.useState("")
  const [userDomain, setUserDomain] = React.useState(props.userDomain)
  const [scopeDomain, setScopeDomain] = React.useState(props.scopeDomain)
  const [scopeProject, setScopeProject] = React.useState(props.scopeProject)

  React.useEffect(() => {
    const authConf = {
      identity: {
        methods: ["password"],
        password: { user: { name: userName, password: userPassword } },
      },
    }

    if (props?.userDomainId)
      authConf.identity.password.user.domain = { id: props.userDomainId }
    else if (userDomain)
      authConf.identity.password.user.domain = { name: userDomain }
    const scope = scopeConf({
      domain: scopeDomain,
      domainId: props?.scopeDomainId,
      project: scopeProject,
      projectId: props?.scopeProjectId,
    })
    if (scope) authConf.scope = scope
    props.onChange(authConf)
  }, [
    userName,
    userPassword,
    userDomain,
    scopeDomain,
    props?.userDomainId,
    props?.scopeDomainId,
    props?.scopeProjectId,
    scopeProject,
  ])

  return (
    <Form>
      <FormSection title="User">
        {!(props.userDomainId || props.userDomain) && (
          <TextInputRow
            label="Domain"
            value={userDomain || userDomainId}
            onChange={(e) => setUserDomain(e.target.value)}
          />
        )}
        <TextInputRow
          label="D/I/C"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextInputRow
          type="password"
          label="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          autoFocus
        />
      </FormSection>

      {props.showScopeForm && (
        <FormSection title="Scope (optional)">
          <TextInputRow
            label="Domain"
            value={scopeDomainId || scopeDomain}
            onChange={(e) => setScopeDomain(e.target.value)}
          />
          <TextInputRow
            label="Project"
            value={scopeProjectId || scopeProject}
            onChange={(e) => setScopeProject(e.target.value)}
          />
        </FormSection>
      )}
      {/* <Button onClick={props.onSubmit}>Submit</Button> */}
    </Form>
  )
}

const App = (props) => {
  const [show, setShow] = React.useState(
    props.initialLogin === "true" || props.initialLogin === true
  )
  const [authConf, setAuthConf] = React.useState(null)
  const [authData, setAuthData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isProcessing, setIsProcessing] = React.useState(false)

  useCommunication({
    authData,
    login: () => setShow(true),
    logout: () => console.log("===logout"),
    debug: props.debug === "true" || props.debug === true,
  })

  const authenticate = React.useCallback(() => {
    setIsProcessing(true)

    console.log(
      "===authConf",
      JSON.stringify({ auth: authConf }, null, 2).replace(
        /"password":\s*".+"/,
        '"password": "********"'
      )
    )

    let headers = { "Content-Type": "application/json" }
    let url = new URL(props.authEndpoint)
    let version = url.pathname.split("/")[1] || "v3"

    url.pathname = `/${version}/auth/tokens`

    console.log(":::", version, url.href)

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(authConf),
    })
      .then((response) => {
        console.log("===response", response)
        if (response.status >= 400) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => console.log("=============data", data))
      .catch((error) => setError(error.message))
      .finally(() => setIsProcessing(false))

    //   result = @connection.post( body: auth_params.to_json, headers: headers)

    //   if result and result.respond_to?(:status)
    //   if result.status>=500
    //     raise MonsoonOpenstackAuth::ConnectionDriver::AuthenticationError.new(result.body,result.status)
    //   end
    // end

    // body = JSON.parse(result.body)

    // unless body['token']
    //   message = body['error']['message'] rescue "Response does not contain token. #{body.to_s}"
    //   code = body['error']['code'] rescue nil
    //   error = MonsoonOpenstackAuth::ConnectionDriver::AuthenticationError.new(message,code)
    //   raise error
    // end

    // token = body['token']
    // token['value'] = result.headers['X-Subject-Token']
  }, [authConf, setAuthData])

  // React.useEffect(() => {
  //   if (props?.authMethod === "password") return

  //   const authConf = { identity: { methods: [props?.authMethod] } }
  //   const scope = scopeConf({
  //     domain: props?.scopeDomain,
  //     domainId: props?.scopeDomainId,
  //     project: props?.scopeProject,
  //     projectId: props?.scopeProjectId,
  //   })
  //   if (scope) authConf.scope = scope

  //   if (props?.authMethod === "token") {
  //     authConf.identity["token"] = { id: props?.authToken }
  //   } else if (props?.authMethod === "external") {
  //     authConf.identity["external"] = {}
  //   }

  //   authenticate(authConf)
  // }, [authenticate])

  return (
    <Modal
      onConfirm={props?.authMethod === "password" ? authenticate : null}
      closeable={!isProcessing}
      open={show}
      title="Authentication"
      cancelButtonLabel={
        props.authMethod === "password" ? "Never Mind" : "Close"
      }
      confirmButtonIcon={
        props.authMethod === "password" ? "accountCircle" : null
      }
      confirmButtonLabel={props.authMethod === "password" ? "Sign In" : ""}
    >
      {error ? (
        <Message variant="danger" text={error} />
      ) : props?.authMethod === "password" ? (
        <PasswordLoginForm {...props} onChange={setAuthConf} />
      ) : isProcessing ? (
        <Message text="You are being logged in..." />
      ) : authData ? (
        <Message
          variant="success"
          text="You have been successfully logged in."
        />
      ) : (
        "Unknown state"
      )}
    </Modal>
  )
}

export default (props) => {
  return (
    <AppShellProvider>
      <App {...props} />
    </AppShellProvider>
  )
}
