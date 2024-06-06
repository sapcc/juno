/*
 * SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Juno contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import jsonUri from "./juriEncoder"

describe("JSON URI encoding", () => {
  it("encodes json with numbers and undefined ", () => {
    const jsonURLSerializer = jsonUri()
    let json = { a: 1, b: -1 }
    let urlState = jsonURLSerializer.encode(json)
    expect(urlState).toBe("(a:+1,b:-1)")
    let decoded = jsonURLSerializer.decode(urlState)
    expect(decoded).toStrictEqual(json)
  })
})
