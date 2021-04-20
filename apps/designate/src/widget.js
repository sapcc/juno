export default (wrapper, props) => {
  import("./bootstrap").then((app) => app.init(wrapper, props))
}
