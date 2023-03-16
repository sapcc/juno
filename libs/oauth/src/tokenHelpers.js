import { decodeBase64Json } from "./utils"
/**
 * Extract auth data from id_token
 * @param {string} idToken JWT
 * @returns {object} json
 */
export function decodeIDToken(idToken) {
  const [_head, tokenData, _signature] = idToken.split(".")
  return decodeBase64Json(tokenData)
}

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ""
/**
 *
 * @param {object} tokenData
 * @returns {object} parsed data
 */
export function parseIdTokenData(tokenData) {
  const email = tokenData.mail || tokenData.email || ""
  let [_, first, last] = email.match(/^([^\.]+)\.([^\.]+)@.*/)
  let firstName = tokenData.first_name || capitalize(first)
  let lastName = tokenData.last_name || capitalize(last)
  return {
    loginName: tokenData.login_name || tokenData.name,
    email,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    expiresAt: tokenData.exp * 1000,
    expiresAtDate: new Date(tokenData.exp * 1000),
    groups: tokenData.groups,
  }
}
