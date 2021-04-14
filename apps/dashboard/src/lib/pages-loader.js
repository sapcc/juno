export const getPages = () => {
  const r = require.context("../pages", false, /^\.\/[^\.js]+$/)
  return r.keys().map((key) => ({
    name: key.replace(/\.\//, ""),
    component: r(key).default,
  }))
}
