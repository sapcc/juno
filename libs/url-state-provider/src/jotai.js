/*
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
          }    
          return char
          }).join("")
    }

  function decodeString(value) {
    let result = "";

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

    // standard
    function encode(value){
        switch (typeof value) {
            case "string":
              return encodeString(value)
            default:
              return encodeString(JSON.stringify(value))
    }}

    function decode(value){
        return decodeString(value)
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