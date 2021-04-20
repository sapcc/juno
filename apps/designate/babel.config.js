module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "macros",
    [
      "@emotion/babel-plugin-jsx-pragmatic",
      {
        export: "jsx",
        import: "__cssprop",
        module: "@emotion/react",
      },
    ],
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "__cssprop",
        pragmaFrag: "React.Fragment",
      },
    ],
  ],
}
