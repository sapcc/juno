export const getPages = (pagesFolderPath) => {
  const r = require.context(pagesFolderPath, true, /^\.\/[^\.js]+$/)
  return r.keys().map((key) => ({
    name: key.replace(/\.\//, ""),
    component: r(key).default,
  }))
}
