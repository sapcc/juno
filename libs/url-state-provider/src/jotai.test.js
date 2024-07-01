/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import fakeData from "./fakedata"
import jotai from "./jotai"

describe("encoding", () => {
  it("encodes a string ", () => {
     // console log encode hallo welt! with URI encoding 

    const humanURI = jotai()
    const string = "hallo peter wie geht es ñ ~ lololol dsfesf%&/834294239477788 {}()"
    let urlState = humanURI.encode(string)
    expect(urlState).toBe("hallo+peter+wie+geht+es+%C3%B1+~A+lololol+dsfesf~B&~G834294239477788+~H~I~J~K")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(string)
  })
  it ("encodes null", () => {
    const humanURI = jotai()
    const data = null
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*A")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  } )

  it ("encodes undefined", () => {
    const humanURI = jotai()
    const data = undefined
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*B")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it ("encodes boolean", () => {
    const humanURI = jotai()
    const data = true
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*C")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it ("encodes integer", () => {
    const humanURI = jotai()
    const data = 12345
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("12345")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it ("encodes NaN", () => {
    const humanURI = jotai()
    const data = NaN
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*E")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  }
  )
  it ("encodes Infinity", () => {
    const humanURI = jotai()
    const data = Infinity
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*F")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  }
  ) 
  
})


describe("base 64", () => {
  it("encodes a string ", () => {
    const humanURI = jotai()
    const string = "hallo peter wie geht es ñ ~ lololol dsfesf%&/834294239477788 {}()"
    let urlState = humanURI.encodeB64(string)
    expect(urlState).toBe("aGFsbG8gcGV0ZXIgd2llIGdlaHQgZXMg8SB~LIGxvbG9sb2wgZHNmZXNmJSYvODM0Mjk0MjM5NDc3Nzg4IHt9KCk=")
    const decoded = humanURI.decodeB64(urlState)
    expect(decoded).toStrictEqual(string)
  })
})
