/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import jotai from "./jotai"

describe("encoding", () => {
  it("encodes a string ", () => {
    // console log encode hallo welt! with URI encoding

    const humanURI = jotai()
    const string =
      "hallo peter wie geht es ñ ~ lololol dsfesf%&/834294239477788 {}()"
    let urlState = humanURI.encode(string)
    expect(urlState).toBe(
      "hallo+peter+wie+geht+es+%C3%B1+~A+lololol+dsfesf~B~Q~G834294239477788+~H~I~J~K"
    )
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(string)
  })
  it("encodes null", () => {
    const humanURI = jotai()
    const data = null
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*A")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })

  it("encodes undefined", () => {
    const humanURI = jotai()
    const data = undefined
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*B")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes boolean", () => {
    const humanURI = jotai()
    const data = true
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*C")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes integer", () => {
    const humanURI = jotai()
    const data = 12345
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*12345")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes NaN", () => {
    const humanURI = jotai()
    const data = NaN
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*E")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes Infinity", () => {
    const humanURI = jotai()
    const data = Infinity
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*F")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes float", () => {
    const humanURI = jotai()
    const data = 123.45678
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*123.45678")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes negative float", () => {
    const humanURI = jotai()
    const data = -123.45678
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("~123.45678")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })

  it("encoded JSON", () => {
    const humanURI = jotai()
    // data with nested objects and arrays of different types of a company
    const data = {
      company: {
        name: "Example",
        continent: "Europe",
        city: undefined,
        tools: null,
        a: {},
        b: [""],
        c: [2, []],
        d: {
          a: 1,
          b: true,
          c: false,
          d: NaN,
          e: Infinity,
          f: -Infinity,
          g: [[[]], { regex: /ab+c/i }],
        },
        workers: {
          name: "John Doe",
          title: "CEO",
          term: 2,
          working_hours: [12, 13, 14, 15, { other: [] }],
        },
        id: 123456789,
      },
    }
    let urlState = humanURI.encode(data)
    expect(urlState).toBe(
      "(company:(name:Example,continent:Europe,city:*B,tools:*A,a:(),b:(*),c:(*2,(~)),d:(a:*1,b:*C,c:*D,d:*E,e:*F,f:*G,g:(((~)),(regex:*Rab~Lc*Ri*R))),workers:(name:John+Doe,title:CEO,term:*2,working_hours:(*12,*13,*14,*15,(other:(~)))),id:*123456789))"
    )
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes simple JSON", () => {
    const humanURI = jotai()
    const data = { a: 1, b: null, c: -3 }
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("(a:*1,b:*A,c:~3)")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })

  it("encodes nested JSON with numbers which are sting", () => {
    const humanURI = jotai()
    const data = {
      a: undefined,
      b: {
        k: ["1", 3],
        y: {},
        z: 2.3e9,
      },
      c: "-3",
    }
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("(a:*B,b:(k:(1,*3),y:(),z:*2300000000),c:-3)")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes array", () => {
    const humanURI = jotai()
    const data = ["a", "b", "c"]
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("(a,b,c)")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes empty array", () => {
    const humanURI = jotai()
    const data = []
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("(~)")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("array with empty sting", () => {
    const humanURI = jotai()
    const data = [""]
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("(*)")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
  it("encodes regex", () => {
    const humanURI = jotai()
    const data = /ab+c/i
    let urlState = humanURI.encode(data)
    expect(urlState).toBe("*Rab~Lc*Ri*R")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })

  it("encodes regex without flag", () => {
    const humanURI = jotai()
    const data =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let urlState = humanURI.encode(data)
    expect(urlState).toBe(
      "*R%5E~J~J~S%5E%3C%3E~J~K~F~S~F~T~F~F.%2C~V%3A~Fs~O%22~T~L~J~F.~S%5E%3C%3E~J~K~F~S~F~T~F~F.%2C~V%3A~Fs~O%22~T~L~K~U~K%7C~J%22.~L%22~K~K~O~J~J~F~S~S0-9~T~H1%2C3~I~F.~S0-9~T~H1%2C3~I~F.~S0-9~T~H1%2C3~I~F.~S0-9~T~H1%2C3~I~T~K%7C~J~J~Sa-zA-Z~F-0-9~T~L~F.~K~L~Sa-zA-Z~T~H2%2C~I~K~K~N*R*R"
    )
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(data)
  })
})

describe("base 64", () => {
  it("encodes a string ", () => {
    const humanURI = jotai()
    const string =
      "hallo peter wie geht es ñ ~ lololol dsfesf%&/834294239477788 {}()"
    let urlState = humanURI.encodeB64(string)
    expect(urlState).toBe(
      "aGFsbG8rcGV0ZXIrd2llK2dlaHQrZXMrJUMzJUIxK35BK2xvbG9sb2wrZHNmZXNmfkJ+UX5HODM0Mjk0MjM5NDc3Nzg4K35Ifkl+Sn5L"
    )
    const decoded = humanURI.decodeB64(urlState)
    expect(decoded).toStrictEqual(string)
  })

  it("encodes komplex json and b64 it", () => {
    const humanURI = jotai()
    const data = {
      company: {
        name: "Example",
        continent: "Europe",
        workers: { name: "John Doe", title: "CEO", term: 2 },
        id: 123456789,
      },
    }
    let urlState = humanURI.encodeB64(data)
    expect(urlState).toBe(
      "KGNvbXBhbnk6KG5hbWU6RXhhbXBsZSxjb250aW5lbnQ6RXVyb3BlLHdvcmtlcnM6KG5hbWU6Sm9obitEb2UsdGl0bGU6Q0VPLHRlcm06KjIpLGlkOioxMjM0NTY3ODkpKQ=="
    )
    const decoded = humanURI.decodeB64(urlState)
    expect(decoded).toStrictEqual(data)
  })
})

describe("lz-string compressed", () => {
  it("encodes a string ", () => {
    const humanURI = jotai()
    const string =
      "hallo peter wie geht es ñ ~ lololol dsfesf%&/834294239477788 {}()"
    let urlState = humanURI.encodeLZ(string)
    expect(urlState).toBe(
      "BYQwNmD2DUAOCmAXeAnaB3AlvaBzewi08AztAKQDCAzOQEICM0AfgILRSeRjQAmJAM1IDmdZgEVmAcQAc1ACwAmAJxLqqgOxaZMlgAlmASWYApZgGkgA"
    )
    const decoded = humanURI.decodeLZ(urlState)
    expect(decoded).toStrictEqual(string)
  })

  it("encodes komplex json and b64 it", () => {
    const humanURI = jotai()
    const data = {
      company: {
        name: "Example",
        continent: "Europe",
        workers: { name: "John Doe", title: "CEO", term: 2 },
        id: 123456789,
      },
    }
    let urlState = humanURI.encodeLZ(data)
    expect(urlState).toBe(
      "BQYw9gtgDghgdgTwFzDjCBTJBRAHuqAGwwBpw4AXASzg0pwFcAnMKUgdzCYGsMmBnFGkxIAUmAAWcANQARMKWoViSAMLYA8iQp8ISAFQAmAJQkqAEwMBGQwGYALAFYAbAHYAHAE5jxoA"
    )
    const decoded = humanURI.decodeLZ(urlState)
    expect(decoded).toStrictEqual(data)
  })
})
