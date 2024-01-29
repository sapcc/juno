let swc = null

export async function transformCode(codeString) {
  if (swc === null) {
    const module = await import("@swc/wasm-web")
    await module.default()
    swc = module
  }
  return swc.transform(codeString, {
    filename: "index.jsx",
    // jsc: {
    //   parser: {
    //     syntax: "typescript",
    //     tsx: true,
    //     decorators: true,
    //   },
    //   target: "commonjs",
    // },
  }).code
}

export async function executeCode(codeString, dependencies) {
  const transformedCode = await transformCode(codeString)
  const exports = {}

  const require = (path) => {
    if (dependencies[path]) {
      return dependencies[path]
    }
    throw Error(`Module not found: ${path}. `)
  }

  const result = new Function("exports", "require", transformedCode)
  result(exports, require)

  return exports.default
}
