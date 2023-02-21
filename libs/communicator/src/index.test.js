globalThis.console.error = jest.fn()
globalThis.console.warn = jest.fn()
globalThis.console.error = jest.fn()

const bc = {
  postMessage: jest.fn(),
  close: jest.fn(() => true),
}

globalThis.BroadcastChannel = jest.fn().mockImplementation(() => {
  return bc
})

const { broadcast, watch, get, onGet } = require("./index")

describe("Communicator", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // ################ BROADCAST #####################
  describe("broadcast", () => {
    test("log error on missing name", () => {
      broadcast()
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(broadcast) the message name must be given."
      )
    })
    test("log warning on missing data", () => {
      broadcast("TEST")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(broadcast) the message data must be given (null is allowed)."
      )
    })

    test("unknown options", () => {
      broadcast("TEST", { test: "test" }, { unknownOption: true })
      expect(globalThis.console.warn).toHaveBeenCalledWith(
        "Communicator Warning:",
        "(broadcast) unknown options: unknownOption"
      )
    })

    test("create new broadcast channel", () => {
      broadcast("TEST_12345", { name: "test" })
      expect(BroadcastChannel).toHaveBeenCalledWith(
        expect.stringContaining("TEST_12345")
      )
    })

    test("include options in message payload", () => {
      broadcast("TEST", { name: "test" }, { debug: true })
      expect(bc.postMessage).toHaveBeenCalledWith({ name: "test" })
    })

    test("log error if wrong debug value", () => {
      broadcast("TEST", { name: "test" }, { debug: "true" })

      expect(globalThis.console.warn).toHaveBeenCalledWith(
        "Communicator Warning:",
        "(broadcast) debug must be a boolean"
      )
    })

    test("close channel after broadcast", () => {
      broadcast("TEST", { name: "test" }, { debug: "true" })

      expect(bc.close).toHaveBeenCalled()
    })
  })

  // ################## WATCH ###################
  describe("watch", () => {
    test("log error on missing name", () => {
      watch()
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(watch) the message name must be given."
      )
    })
    test("log error on missing callback", () => {
      watch("TEST")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(watch) the callback parameter must be a function."
      )
    })

    test("log error if callback is not a function", () => {
      watch("TEST", "callback")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(watch) the callback parameter must be a function."
      )
    })

    test("unknown options", () => {
      watch("TEST", () => null, { unknownOption: true })
      expect(globalThis.console.warn).toHaveBeenCalledWith(
        "Communicator Warning:",
        "(watch) unknown options: unknownOption"
      )
    })

    test("create new broadcast channel", () => {
      watch("TEST_12345", () => null)
      expect(BroadcastChannel).toHaveBeenCalledWith(
        expect.stringContaining("TEST_12345")
      )
    })

    test("set onmessage", () => {
      const callback = () => null
      bc.onmessage = undefined
      watch("TEST", callback)
      expect(bc.onmessage).not.toBeUndefined()
    })

    test("do not call close on channel", () => {
      watch("TEST_12345", () => null)
      expect(bc.close).not.toHaveBeenCalled()
    })

    test("call close", () => {
      const unregister = watch("TEST", () => null)
      unregister()
      expect(bc.close).toHaveBeenCalled()
    })
  })

  // ############### GET ##################
  describe("get", () => {
    test("log error on missing name", () => {
      get()
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(get) the message name must be given."
      )
    })
    test("log error on missing callback", () => {
      get("TEST")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(get) the callback parameter must be a function."
      )
    })

    test("log error if callback is not a function", () => {
      get("TEST", "callback")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(get) the callback parameter must be a function."
      )
    })

    test("unknown options", () => {
      get("TEST", () => null, { unknownOption: true })
      expect(globalThis.console.warn).toHaveBeenCalledWith(
        "Communicator Warning:",
        "(get) unknown options: unknownOption"
      )
    })

    test("create two broadcast channels", () => {
      get("TEST_12345", () => null)
      expect(BroadcastChannel).toHaveBeenCalledTimes(2)
    })

    test("create request broadcast channel", () => {
      get("TEST_12345", () => null)
      expect(BroadcastChannel).toHaveBeenCalledWith(
        expect.stringMatching(/#GET:TEST_12345$/)
      )
    })

    test("create response broadcast channel", () => {
      get("TEST_12345", () => null)
      expect(BroadcastChannel).toHaveBeenCalledWith(
        expect.stringMatching(/#GET:TEST_12345:RESPONSE:\d/)
      )
    })

    test("broadcast get message on request channel", () => {
      get("TEST", () => null)
      expect(bc.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          receiverID: expect.anything(),
        })
      )
    })

    test("returns a function", () => {
      const cancel = get("TEST", () => null)
      expect(typeof cancel).toEqual("function")
    })
  })

  // ############### ON GET ##################
  describe("onGet", () => {
    test("log error on missing name", () => {
      onGet()
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(onGet) the message name must be given."
      )
    })

    test("log error on missing callback", () => {
      onGet("TEST")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(onGet) the callback parameter must be a function."
      )
    })
    test("log error if callback is not a function", () => {
      onGet("TEST", "callback")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(onGet) the callback parameter must be a function."
      )
    })
    test("unknown options", () => {
      onGet("TEST", () => null, { unknownOption: true })
      expect(globalThis.console.warn).toHaveBeenCalledWith(
        "Communicator Warning:",
        "(onGet) unknown options: unknownOption"
      )
    })
    test("create one broadcast channel", () => {
      onGet("TEST_12345", () => null)
      expect(BroadcastChannel).toHaveBeenCalledTimes(1)
    })

    test("create request broadcast channel", () => {
      onGet("TEST_12345", () => null)
      expect(BroadcastChannel).toHaveBeenCalledWith(
        expect.stringMatching(/#GET:TEST_12345$/)
      )
    })

    test("create response broadcast channel", () => {
      get("TEST_12345", () => null)
      expect(BroadcastChannel).toHaveBeenCalledWith(
        expect.stringMatching(/#GET:TEST_12345:RESPONSE:\d/)
      )
    })

    test("broadcast get message on request channel", () => {
      get("TEST", () => null)
      expect(bc.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          receiverID: expect.anything(),
        })
      )
    })

    test("returns a function", () => {
      const cancel = get("TEST", () => null)
      expect(typeof cancel).toEqual("function")
    })
  })
})
