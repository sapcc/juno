import { useState, useEffect } from "react"

let queryString = window.location.search || window.location.hash
if (queryString[0] === "#") queryString = queryString.substring(1)
const searchParams = new URLSearchParams(queryString)

function randomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

function isOIDCCallback() {
  return searchParams.get("id_token") && searchParams.get("state")
}

function handleOIDCResponse() {
  const id_token = searchParams.get("id_token")
  if (!id_token) return
  const state = searchParams.get("state")
  if (!state) return

  // get state and last URL from the local store (browser)
  const storedState = window.sessionStorage.getItem("state")
  const storedNonce = window.sessionStorage.getItem("nonce")
  const lastURL = window.sessionStorage.getItem("uri")
  window.sessionStorage.clear()

  if (state !== storedState) return

  window.history.replaceState("", "", lastURL || "/")

  const result = { id_token }
  try {
    const [_, tokenData] = id_token.split(".")
    let tokenJson = JSON.parse(atob(tokenData))
    if (tokenJson.nonce !== storedNonce) return
    result["first_name"] = tokenJson.first_name
    result["last_name"] = tokenJson.last_name
    result["full_name"] = `${tokenJson.first_name} ${tokenJson.last_name}`
    result["email"] = tokenJson.mail
    console.log(tokenJson)
  } catch (e) {}

  return result
}

function oidcRequest({ issuerURL, clientID }) {
  // generate a random string to use as state
  const state = randomString()
  // generate a random string to use as nonce (it is encoded into the id_token from provider)
  const nonce = randomString()

  // store state and current URL to the local store (browser)
  window.sessionStorage.setItem("state", state)
  window.sessionStorage.setItem("nonce", nonce)
  window.sessionStorage.setItem("uri", window.location.href)

  let url = `${issuerURL}/oauth2/authorize`
  url += "?response_type=id_token"
  url += `&client_id=${clientID}`
  url += `&redirect_uri=${window.location.origin}`
  url += "&scope=openid"
  url += `&state=${state}`
  url += `&nonce=${nonce}`

  window.location.replace(url)
}

console.log("1. ", searchParams.toString())
/**
 * This hook ensures that the user is logged on via OIDC and SAP ID Provider.
 * Use this hook only in web applications. OIDC flow requires a redirect!
 * @param {Object} oidcConf - The configuration.
 * @param {string} oidcConf.clientID - The ID of the client. This information is stored in the OpenID provider.
 * @param {string} oidcConf.issuerURL - The URL of the OpenID Provider. This URL can usually be found under the
 * endpoint https://PROVIDER_HOST/.well-known/openid-configuration.
 * @returns {Object} {id_token,first_name,last_name,full_name,email}
 */
const useOidcAuth = ({ clientID, issuerURL }) => {
  if (!clientID)
    throw new Error("clientID is undefined. Please provide a clientID.")
  if (!issuerURL)
    throw new Error("issuerURL is undefined. Please provide a issuerURL.")

  let result
  if (isOIDCCallback()) {
    result = handleOIDCResponse()
  } else {
    oidcRequest({ issuerURL, clientID })
  }

  return result
}

export default useOidcAuth
