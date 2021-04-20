export const getPages = () => {
  const r = require.context("../pages", false, /^.*\.js$/)

  return r.keys().map((key) => ({
    name: key.replace(/\.\/(.+)\.js/, "$1"),
    component: r(key).default,
  }))
}
