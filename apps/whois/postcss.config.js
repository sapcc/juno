
// module.exports = {
//   plugins: {
//     tailwindcss: {config: 'juno-ui-components/tailwind.config.js'},
//     autoprefixer: {},
//   },
// }
module.exports = {
  plugins: [require("tailwindcss")({config: '../../libs/juno-ui-components/tailwind.config.js'}), require("autoprefixer")],
}