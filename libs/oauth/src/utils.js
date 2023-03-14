/**
 * This function generates a random string based on Math.random
 * @returns {string} random string
 */
export function randomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now()
  )
}

/**
 *
 * @param {object} props
 * @returns base64 encoded json string
 */
export const encode = (props) => btoa(JSON.stringify({ ...props }))

/**
 *
 * @param {string} string, base64 encoded json string
 * @returns {object} json
 */
export const decode = (string) => {
  try {
    return JSON.parse(atob(string))
  } catch (e) {
    return null
  }
}
