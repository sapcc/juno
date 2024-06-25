/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import fakeData from "./fakedata"
import jotai from "./jotai"

describe("encoding", () => {
  it("encodes a string ", () => {
    const humanURI = jotai()
    const string = "hallo peter wie geht es ñ ~ lololol dsfesf%&/834294239477788 {}()"
    let urlState = humanURI.encode(string)
    expect(urlState).toBe("hallo_peter_wie_geht_es_ñ_~A_lololol_dsfesf~B&~G834294239477788_~H~I~J~K")
    const decoded = humanURI.decode(urlState)
    expect(decoded).toStrictEqual(string)
  })
})


describe("base 64", () => {
  it("encodes a string ", () => {
    const humanURI = jotai()
    const string = "hallo peter wie geht es ñ ~ lololol dsfesf%&/834294239477788 {}()"
    let urlState = humanURI.encodeB64(string)
    expect(urlState).toBe("aGFsbG8gcGV0ZXIgd2llIGdlaHQgZXMg8SB+IGxvbG9sb2wgZHNmZXNmJSYvODM0Mjk0MjM5NDc3Nzg4IHt9KCk=")
    const decoded = humanURI.decodeB64(urlState)
    expect(decoded).toStrictEqual(string)
  })
})
