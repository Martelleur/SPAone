var Cryptr = require('cryptr')
const cryptr = new Cryptr('joel')

var encryptedText = cryptr.encrypt('Joel Martelleur')
var decryptedText = cryptr.decrypt(encryptedText)

console.log(encryptedText)
console.log(decryptedText)
