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

const capitalize = (str) => {  
  if(!str || str.length===0) return ""

  let result = str.charAt(0).toUpperCase()
  if(str.length>1) result += str.slice(1)
  return result
}
/**
 *
 * @param {object} tokenData
 * @returns {object} parsed data
 */
export function parseIdTokenData(tokenData) {
  const email = tokenData.mail || tokenData.email || ""
  let firstName = tokenData.first_name
  let lastName = tokenData.last_name
  
  try{
    if(!firstName && !lastName) {
      const [_,emailName] = email.match(/^(.+)@.*$/)
      const emailParts = emailName.split(".")
      const first = emailParts.shift()
      firstName = capitalize(first)
      lastName = emailParts.map((t) => capitalize(t)).join(" ")


    }
  }catch(e) {
    console.info("(OAUTH) could not determine first and last names")
  }
  return {
    loginName: tokenData.login_name || tokenData.name || tokenData.sub,
    email,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    expiresAt: tokenData.exp * 1000,
    expiresAtDate: new Date(tokenData.exp * 1000),
    groups: tokenData.groups,
  }
}
