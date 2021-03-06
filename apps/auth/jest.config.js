module.exports = {
  transform: { "\\.[jt]sx?$": "babel-jest" },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      require.resolve("./__mocks__/fileMock"),
    "\\.(css|less)$": require.resolve("./__mocks__/styleMock"),
  },
}
