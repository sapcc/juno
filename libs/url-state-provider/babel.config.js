module.exports = {
  env: {
    test: {
      presets: ["@babel/preset-env"],
      plugins: [["babel-plugin-transform-import-meta", { module: "ES6" }]],
    },
  },
}
