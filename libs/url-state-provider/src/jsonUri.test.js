/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import jsonUri from "./jsonUri"

describe("JSON URI encoding", () => {
  it("encodes json with numbers and undefined ", () => {
    const jsonURLSerializer = jsonUri()
    let json = { a: 1, b: -1 }
    let urlState = jsonURLSerializer.encode(json)
    expect(urlState).toBe("(a:+1,b:!1)")
    let decoded = jsonURLSerializer.decode(urlState)
    expect(decoded).toStrictEqual(json)
  })

  it("encodes json with empty string, string, object, false, NaN ", () => {
    const jsonURLSerializer = jsonUri()
    let json = {
      a: "",
      b: "hello-world",
      c: { d: "tag" },
      e: false,
      g: NaN,
    }
    let urlState = jsonURLSerializer.encode(json)
    expect(urlState).toBe("(a:'',b:hello-world,c:(d:tag),e:!!,g:**)")
    let decoded = jsonURLSerializer.decode(urlState)
    expect(decoded).toStrictEqual(json)
  })

  it("encodes true", () => {
    const jsonURLSerializer = jsonUri()
    let json = true
    let urlState = jsonURLSerializer.encode(json)
    expect(urlState).toBe("++")
    let decoded = jsonURLSerializer.decode(urlState)
    expect(decoded).toBe(json)
  })

  it("encodes string", () => {
    const jsonURLSerializer = jsonUri()
    let json = "!#$%&'() ** )* (* !* *) !! +,!./:;<=>?@[]^_`{|}~|\t\n\r\"ds"
    let urlState = jsonURLSerializer.encode(json)
    expect(urlState).toBe(
      "~3~5$~7~8~9~A~B_~C~C_~B~C_~A~C_~3~C_~C~B_~3~3_~D~E~3.~H~I~J~K~L~M~N@~P~Q~R~S~T~U~V~W~X~V~0~1~2~4ds"
    )
    let decoded = jsonURLSerializer.decode(urlState)
    expect(decoded).toBe(json)
  })

  it("decodes string with juri-cutlerly and modern -", () => {
    const jsonURLSerializer = jsonUri()
    let encodedString = "backward~Fcompatible_forward-also"

    let decoded = jsonURLSerializer.decode(encodedString)
    expect(decoded).toBe("backward-compatible forward-also")
  })

  it("encodes floating numbers", () => {
    const jsonURLSerializer = jsonUri()
    let array = [123.45678, -123.45678]
    let urlState = jsonURLSerializer.encode(array)
    expect(urlState).toBe("(+l65E!5,!l65E!5)")
    let decoded = jsonURLSerializer.decode(urlState)
    expect(decoded).toStrictEqual(array)
  })
})
