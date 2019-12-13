import './chat-app.js'
import { moveElement } from './moveElement.js'

let chatId
let counterChats = 0
document.querySelector('#chatButton').addEventListener('click', (event) => {
  event.preventDefault()
  counterChats++
  const chat = document.createElement('chat-app')
  chatId = `chat${counterChats}`
  chat.setAttribute('id', chatId)
  document.querySelector('#chatWrapper').appendChild(document.createElement('br'))
  document.querySelector('#chatWrapper').appendChild(chat)
  document.querySelector('#chatWrapper').appendChild(document.createElement('br'))

  moveElement(chat)
  console.log('chat.id/JM')
  console.log(chat.id)
})
