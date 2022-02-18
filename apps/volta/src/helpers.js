import * as x509 from "@peculiar/x509"

// ski subject key identifier
export const generateCsr = (algorithm, keys) => {
  //#region Certificate extensions
  const extensions = []
  // add key usages if needed
  // extensions.push(new x509.KeyUsagesExtension(keyUsages, true));

  const attributes = []
  // add attributes if needed
  // attributes.push(new x509.ChallengePasswordAttribute(password));

  // Certificate extensions
  return x509.SubjectKeyIdentifierExtension.create(keys.publicKey).then(
    (extension) => {
      extensions.push(extension)
      return x509.Pkcs10CertificateRequestGenerator.create({
        name: "CN=Test",
        signingAlgorithm: algorithm,
        keys: keys,
        extensions,
        attributes,
      })
    }
  )
}

export const generateKeys = (algorithm) => {
  return crypto.subtle.generateKey(algorithm, true, ["sign", "verify"])
}

// Export a key and return an exported-key space.
export const pemEncodeKey = (key) => {
  // set the format
  // KeyFormat = "jwk" | "pkcs8" | "raw" | "spki";
  let KeyFormat = "raw"
  if (key.type === "public") KeyFormat = "spki"
  else if (key.type === "private") KeyFormat = "pkcs8"

  // export crypto key
  return crypto.subtle.exportKey(KeyFormat, key).then((exportedKey) => {
    return new Promise((handleSuccess, handleError) => {
      try {
        const pemExported = abToBase64String(exportedKey, key.type)
        handleSuccess(pemExported)
      } catch (error) {
        handleError(error)
      }
    })
  })
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
const abToBase64String = (keyBuffer, keyType) => {
  // Convert  an ArrayBuffer into a string
  // from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  const exportedAsString = String.fromCharCode.apply(
    null,
    new Uint8Array(keyBuffer)
  )
  const exportedAsBase64 = window.btoa(exportedAsString)
  if (keyType == "public") {
    return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`
  } else if (keyType == "private") {
    return `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`
  } else {
    return `-----KEY TYPE NOT KNOWN-----\n${exportedAsBase64}\n-----KEY TYPE NOT KNOWN-----`
  }
}

export const getAlgorithm = (keyAlgorithm) => {
  const alg = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
  }
  switch (keyAlgorithm) {
    case "RSA-2048":
      alg.modulusLength = 2048
      alg.publicExponent = new Uint8Array([1, 0, 1])
      break
    case "RSA-4096":
      alg.modulusLength = 4096
      alg.publicExponent = new Uint8Array([1, 0, 1])
      break
    case "EC-P-256":
      alg.name = "ECDSA"
      alg.namedCurve = "P-256"
      break
    case "EC-P-384":
      alg.name = "ECDSA"
      alg.namedCurve = "P-384"
      break
    case "EC-P-521":
      alg.name = "ECDSA"
      alg.namedCurve = "P-521"
      break
    default:
  }
  return alg
}
