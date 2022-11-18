module.exports = {
  transform: { "\\.[jt]sx?$": "babel-jest" },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      require.resolve("./__mocks__/fileMock"),
    "\\.(css|less)$": require.resolve("./__mocks__/styleMock"),
    // Mock import with resource queries since it is not supported
    // https://github.com/facebook/jest/issues/4181
    // To differentiate between svgs that are to be used as bg images and those that are to be loaded
    // as components we have to add a query parameter `?url` to the images to be loaded as url for use in background images in jsx files
    // see webpack.config.js for more information
    "\\.(svg)(\\?.+)?$": require.resolve("./__mocks__/fileMock"),
  },
}
