import { decode } from "./utils"
/**
 * Extract auth data from id_token
 * @param {string} idToken JWT
 * @returns {object} json
 */
export function decodeIDToken(idToken) {
  const [_head, tokenData, _signature] = idToken.split(".")
  return decode(tokenData)
}

/**
 *
 * @param {object} tokenData
 * @returns {object} parsed data
 */
export function parseIdTokenData(tokenData) {
  return {
    subject: tokenData.sub,
    login_name: tokenData.login_name,
    first_name: tokenData.first_name,
    last_name: tokenData.last_name,
    full_name: `${tokenData.first_name} ${tokenData.last_name}`,
    email: tokenData.mail,
    expiresAt: tokenData.exp * 1000,
    expiresAtDate: new Date(tokenData.exp * 1000),
    groups: tokenData.groups,
  }
}
