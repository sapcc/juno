async function show(_args, context) {
  return context.currentUser
}

async function update({ email, fullName, settings }, context) {
  if (email) context.currentUser.email = email
  if (fullName) context.currentUser.fullName = fullName
  if (settings) context.currentUser.settings = settings
  return context.currentUser.save()
}

module.exports = {
  show,
  update,
}
