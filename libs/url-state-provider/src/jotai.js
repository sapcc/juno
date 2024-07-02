/*
  https://documentation.mapp.com/1.0/en/url-encoding-and-what-characters-are-valid-in-a-uri-36147771.html

  + is a space
  ~ indentifies a non URI safe character with is not % encoded when followed by a character from the keys
  ~ equals - if followed by a number 
  * indentifies non character like null or undefined
  () object
	,	Delimiter in objects and arrays
	:	Key/value separator in objects
  % to encode everything else beside a-z A-Z 0-9 - _ . ! ~ * ' ( ) 

  // all other stuff should be added to keys
*/

module.exports = function (){
    const nonURIsafe = "~%\t\n\r\\\/{}()+#"
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$-;@?&=![]_"

    function encodeString(value){

        return value.split("").map((char) => {
          if (char === " ") {
            return "+"
          }
          else if (nonURIsafe.includes(char)) {
            return "~" + keys[nonURIsafe.indexOf(char)]
          } else if (!keys.includes(char)) {  
          return encodeURIComponent(char)
          }
          return char
          }).join("")
    }

  function decodeString(value) {
    let result = "";
    value = decodeURIComponent(value);

    for (let i = 0; i < value.length; i++) {
      let char = value[i];
      if (char === "+") {
        result += " ";
      } else if (char === "~" && keys.includes(value[i + 1])) {
        result += nonURIsafe[keys.indexOf(value[i + 1])];
        i++; // Skip the next character
      } else {
        result += char;
      }
    }
    return result;
  }

  function encodeObject(value){
    return "(" + value + ")"
  }

    // standard
    function encode(value){
      switch(typeof value){
        case "object":
          if (value === null) {
            return "*A"
            }
          else {
            return encodeObject(value)
          }
        case "undefined":
          return "*B"
        case "boolean":
          return "*" + (value ? "C" : "D")
        case "string":
          return encodeString(value)
        case "number":
          if (isNaN(value)) {
            return "*E"
          }
          if (value === +Infinity) {
            return "*F"
          }
          if (value === -Infinity) {
            return "*G"
          }
          else{
            return encodeNumber(value)
          }
      }}

    function decode(value){
      if (value[0] === "*") {
        switch(value[1]){
          case "A":
            return null
          case "B":
            return undefined
          case "C":
            return true
          case "D":
            return false
          case "E":
            return NaN
          case "F":
            return +Infinity
          case "G":
            return -Infinity
          default:
            return decodeNumber(value)
        }
      }
      // if value[0] is ~ and value[1] - if existent is a number from 0 -9
      if (/^~\d/.test(value)) {
        return decodeNumber(value)
      }

      if (value[0] === "(" && value[value.length - 1] === ")") {
        return value.slice(1, value.length - 1)
      }
      return decodeString(value)

    }

    function encodeNumber(value){
      if(value<0){
        // delete - through ~
        return "~" + -value}
      else{
        return "*" + value
      }
    }

    function decodeNumber(value){
      console.log(value, "decodeNumber")
      if (value[0] === "~") {
        console.log(value, "decodeNumber", -value.slice(1))
        return -value.slice(1)
      }
      return +value.slice(1)
    }

    function encodeB64(value){
        return encode(btoa(value))
    }
    function decodeB64(value){
        return atob(decode(value))
    }


    return {
        encode: encode,
        decode: decode,
        encodeB64: encodeB64,
        decodeB64: decodeB64
      }
}