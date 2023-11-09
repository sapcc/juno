import { createPluginConfig } from "./plugin"

describe("Plugin", () => {
  describe("createPluginConfig", () => {
    it("requires at least an id and name", () => {
      const spy = jest.spyOn(console, "warn").mockImplementation(() => {})

      createPluginConfig()
      createPluginConfig({ id: "test" })
      createPluginConfig({ name: "test" })

      expect(spy).toHaveBeenCalledTimes(3)
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining(
          "[greenhouse]::createPluginConfig: id and name are required."
        )
      )
      spy.mockRestore()
    })

    it("maps name to displayName if missing", () => {
      expect(createPluginConfig({ id: "id_test", name: "name_test" })).toEqual(
        expect.objectContaining({ displayName: "name_test" })
      )
    })

    it("sets weight to default 0 if missing", () => {
      expect(createPluginConfig({ id: "id_test", name: "name_test" })).toEqual(
        expect.objectContaining({ weight: 0 })
      )
    })

    it("sets version to latest if missing", () => {
      expect(createPluginConfig({ id: "id_test", name: "name_test" })).toEqual(
        expect.objectContaining({ version: "latest" })
      )
    })

    it("sets navigable to true if missing", () => {
      expect(createPluginConfig({ id: "id_test", name: "name_test" })).toEqual(
        expect.objectContaining({ navigable: true })
      )
    })

    it("sets navigation type to app", () => {
      expect(createPluginConfig({ id: "id_test", name: "name_test" })).toEqual(
        expect.objectContaining({ navType: Plugin().navTypes.APP })
      )
    })

    it("adds id to the props", () => {
      expect(createPluginConfig({ id: "id_test", name: "name_test" })).toEqual(
        expect.objectContaining({
          props: expect.objectContaining({ id: "id_test" }),
        })
      )
    })

    it("does not save not known keys", () => {
      expect(
        createPluginConfig({
          id: "id_test",
          name: "name_test",
          miau: "bup",
        })
      ).not.toEqual(
        expect.objectContaining({
          miau: "bup",
        })
      )
    })

    it("creates a plugin", () => {
      const config = {
        id: "id_test",
        name: "name_test",
        displayName: "displayName_Test",
        version: "1.2.3",
        url: "http://miau.bup",
        weight: 9,
        navigable: false,
        navType: Plugin().navTypes.MNG,
        props: {
          test1: "test1",
          test2: "test2",
        },
      }
      expect(createPluginConfig(config)).toEqual({
        ...config,
        props: { ...config.props, id: config.id },
      })
    })
  })
})