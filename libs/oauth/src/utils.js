/**
 * This function generates a random string based on Math.random
 * @returns {string} random string
 */
export function randomString(length) {
  if (!length) length = 60
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

/**
 *
 * @param {object} props
 * @returns base64 encoded json string
 */
export const encodeBase64Json = (props) =>
  window.btoa(JSON.stringify({ ...props }))

/**
 *
 * @param {string} string, base64 encoded json string
 * @returns {object} json
 */
export const decodeBase64Json = (string) => {
  try {
    return JSON.parse(window.atob(string))
  } catch (e) {
    return null
  }
}
