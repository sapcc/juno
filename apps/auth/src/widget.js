export default (wrapper) => {
  import("./bootstrap").then((app) => app.init(wrapper))
}
