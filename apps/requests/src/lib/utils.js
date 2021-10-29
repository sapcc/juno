export const formatDate = (timestampString) => {
  const date = new Date(parseInt(timestampString))
  return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString(
    "en-GB"
  )}`
}
