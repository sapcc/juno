export const parseError = (error) => {
  let errMsg = JSON.stringify(error)
  if (error?.message) {
    errMsg = error?.message
    try {
      errMsg = JSON.parse(error?.message).msg
    } catch (error) {}
  }
  return errMsg
}

export const isExpired = (date) => {
  if (!(date instanceof Date) || date === undefined) {
    throw new Error("var date muss be an instance of Date")
  }
  const now = new Date()
  if (date < new Date()) return true
  return false
}
