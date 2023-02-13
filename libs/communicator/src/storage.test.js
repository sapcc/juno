import Storage from "./storage"
const { get, set } = Storage("TEST_STORAGE:")

globalThis.localStorage = jest.fn()
localStorage.setItem = jest.fn()
localStorage.getItem = jest.fn()

describe("Storage", () => {
  describe("set", () => {
    test("name is required", () => {
      expect(() => {
        set()
      }).toThrow(
        "Communicator Storage Error: (set) the message name must be given."
      )
    })

    test("payload is required", () => {
      expect(() => {
        set("test")
      }).toThrow(
        "Communicator Storage Error: (set) the message data must be given (null is allowed)."
      )
    })

    test("message name prefix", () => {
      set("test", null)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "TEST_STORAGE:test",
        "null"
      )
    })

    test("stringified message payload", () => {
      const payload = { data: { name: "test" }, options: { expires: 12345678 } }
      set("test", payload)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "TEST_STORAGE:test",
        JSON.stringify(payload)
      )
    })

    test("proceed debug option", () => {
      globalThis.console.log = jest.fn()
      set("test", null, { debug: true })
      expect(globalThis.console.log).toHaveBeenCalledWith(
        "TEST_STORAGE:",
        "store test",
        null
      )
    })
    test("proceed disabled debug option", () => {
      globalThis.console.log = jest.fn()
      set("test", null, { debug: false })
      expect(globalThis.console.log).not.toHaveBeenCalled()
    })
  })

  describe("get", () => {
    test("name is required", () => {
      expect(() => {
        get()
      }).toThrow(
        "Communicator Storage Error: (get) the message name must be given."
      )
    })

    test("proceed debug option", () => {
      globalThis.console.log = jest.fn()
      get("test", { debug: true })
      expect(globalThis.console.log).toHaveBeenCalledWith(
        "TEST_STORAGE:",
        "no message for name test found"
      )
    })

    test("proceed disabled debug option", () => {
      globalThis.console.log = jest.fn()
      get("test", { debug: false })
      expect(globalThis.console.log).not.toHaveBeenCalled()
    })

    test("do not log debug infos if no debug option provided", () => {
      globalThis.console.log = jest.fn()
      get("test")
      expect(globalThis.console.log).not.toHaveBeenCalled()
    })

    test("receive last message", () => {
      const payload = {
        data: { name: "test" },
        options: { expires: 123456, updatedAt: 123456 },
      }
      globalThis.localStorage.getItem = jest.fn(() => JSON.stringify(payload))
      const message = get("test")
      expect(message).toEqual(payload)
    })
  })
})
