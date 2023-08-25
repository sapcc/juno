module.exports = {
  transform: { "\\.[jt]sx?$": "babel-jest" },
  transformIgnorePatterns: [
    "node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)",
  ],
}
