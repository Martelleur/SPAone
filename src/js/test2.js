var Cryptr = require('cryptr')
const cryptr = new Cryptr('joel')

var encryptedText = cryptr.encrypt('Key1')
var decryptedText = cryptr.decrypt(encryptedText)

console.log(encryptedText)
console.log(decryptedText)
