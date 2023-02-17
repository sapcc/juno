import Storage from "./storage"
import { send, listen } from "./index"

jest.mock("./storage", () => {
  const Storage = { get: jest.fn(), set: jest.fn() }
  return jest.fn(() => Storage)
})

globalThis.console.error = jest.fn()
globalThis.console.warn = jest.fn()

const bc = {
  postMessage: jest.fn(),
  onmessage: jest.fn(),
  close: jest.fn(),
}

globalThis.BroadcastChannel = jest.fn().mockImplementation(() => bc)

describe("Communicator", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("send", () => {
    test("throw error on missing name", () => {
      send()
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(send) the message name must be given."
      )
    })
    test("throw error on missing data", () => {
      send("TEST")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(send) the message data must be given (null is allowed)."
      )
    })

    test("include options in message payload", () => {
      const expires = Math.floor(Date.now() / 1000) + 60
      send("TEST", { name: "test" }, { expires: expires })
      expect(Storage().set).toHaveBeenCalledWith(
        "TEST",
        {
          data: { name: "test" },
          expires: expires,
          updatedAt: expect.anything(),
        },
        { debug: undefined }
      )
      expect(bc.postMessage).toHaveBeenCalledWith({ name: "test" })
    })

    test("without options", () => {
      const expires = Math.floor(Date.now() / 1000) + 60
      send("TEST", { name: "test" })
      expect(Storage().set).toHaveBeenCalledWith(
        "TEST",
        {
          data: { name: "test" },
          updatedAt: expect.anything(),
        },
        { debug: undefined }
      )
      expect(bc.postMessage).toHaveBeenCalledWith({ name: "test" })
    })
  })

  describe("listen", () => {
    test("log error on missing name", () => {
      listen()
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(listen) the message name must be given."
      )
    })
    test("log error callback must be a function", () => {
      listen("TEST")
      expect(globalThis.console.error).toHaveBeenCalledWith(
        "Communicator Error:",
        "(listen) the callback parameter must be a function."
      )
    })

    test("log warning if unknown option", () => {
      listen("TEST", () => null, {
        youngerThan: 12345,
        debug: false,
        blabla: "test",
      })
      expect(globalThis.console.warn).toHaveBeenCalledWith(
        "Communicator Warning:",
        "(listen) unknown options: blabla"
      )
    })

    test("accept null options", () => {
      listen("TEST", () => null)

      expect(globalThis.console.warn).not.toHaveBeenCalled()
    })

    test("log warning if youngerThan is not a number", () => {
      listen("TEST", () => null, {
        youngerThan: "test",
      })
      expect(globalThis.console.warn).toHaveBeenCalledWith(
        "Communicator Warning:",
        "(listen) youngerThan option must be a boolean or number"
      )
    })

    test("execute the callback with data of last message", () => {
      const callback = jest.fn(() => null)
      Storage().get.mockImplementation(() => ({
        data: "TEST",
      }))
      listen("TEST", callback)
      expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
      expect(callback).toHaveBeenCalledWith("TEST")
    })

    test("call the callback with last message if youngerThan 5 seconds and not expired", () => {
      const callback = jest.fn(() => null)
      const updatedAt = Math.floor(Date.now() / 1000) - 200
      Storage().get.mockImplementation(() => ({
        data: "TEST",
        updatedAt,
        expires: updatedAt + 500,
      }))
      listen("TEST", callback, { youngerThan: 300 })
      expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
      expect(callback).toHaveBeenCalledWith("TEST")
    })

    test("do call the callback if youngerThan 5 seconds but expired", () => {
      const callback = jest.fn(() => null)
      const updatedAt = Math.floor(Date.now() / 1000) - 200
      Storage().get.mockImplementation(() => ({
        data: "TEST",
        updatedAt,
        expires: updatedAt + 100,
      }))
      listen("TEST", callback, { youngerThan: 300 })
      expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
      expect(callback).not.toHaveBeenCalled()
    })

    test("do call the callback if too old but not expired", () => {
      const callback = jest.fn(() => null)
      const updatedAt = Math.floor(Date.now() / 1000) - 200
      Storage().get.mockImplementation(() => ({
        data: "TEST",
        updatedAt,
        expires: updatedAt + 300,
      }))
      listen("TEST", callback, { youngerThan: 100 })
      expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
      expect(callback).not.toHaveBeenCalled()
    })

    describe("expires", () => {
      test("do not call the callback with last message if expired", () => {
        const callback = jest.fn(() => null)
        const expires = Math.floor(Date.now() / 1000) - 100
        Storage().get.mockImplementation(() => ({
          data: "TEST",
          expires,
        }))
        listen("TEST", callback)
        expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
        expect(callback).not.toHaveBeenCalled()
      })

      test("call the callback with last message if not expired", () => {
        const callback = jest.fn(() => null)
        const expires = Math.floor(Date.now() / 1000) + 100
        Storage().get.mockImplementation(() => ({
          data: "TEST",
          expires,
        }))
        listen("TEST", callback)
        expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
        expect(callback).toHaveBeenCalledWith("TEST")
      })

      test("call the callback with last message if no expires option", () => {
        const callback = jest.fn(() => null)
        Storage().get.mockImplementation(() => ({
          data: "TEST",
          expires: undefined,
        }))
        listen("TEST", callback)
        expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
        expect(callback).toHaveBeenCalledWith("TEST")
      })
    })

    describe("youngerThan", () => {
      test("do not call the callback with last message if too old", () => {
        const callback = jest.fn(() => null)
        const updatedAt = Math.floor(Date.now() / 1000) - 400
        Storage().get.mockImplementation(() => ({
          data: "TEST",
          updatedAt,
        }))
        listen("TEST", callback, { youngerThan: 300 })
        expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
        expect(callback).not.toHaveBeenCalled()
      })

      test("call the callback with last message if youngerThan 5 seconds", () => {
        const callback = jest.fn(() => null)
        const updatedAt = Math.floor(Date.now() / 1000)
        Storage().get.mockImplementation(() => ({
          data: "TEST",
          updatedAt,
        }))
        listen("TEST", callback, { youngerThan: 300 })
        expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
        expect(callback).toHaveBeenCalledWith("TEST")
      })

      test("call the callback with last message if no youngerThan option", () => {
        const callback = jest.fn(() => null)
        const updatedAt = Math.floor(Date.now() / 1000)
        Storage().get.mockImplementation(() => ({
          data: "TEST",
          updatedAt,
        }))
        listen("TEST", callback)
        expect(Storage().get).toHaveBeenCalledWith("TEST", expect.anything())
        expect(callback).toHaveBeenCalledWith("TEST")
      })
    })
  })
})
