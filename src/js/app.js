import './memory-app.js'
import './chat-app.js'
import './minehunter-app.js'
import { moveElement } from './moveElement.js'

// Creating chat-elements
let chatId
let counterChats = 0
document.querySelector('#chatButton').addEventListener('click', (event) => {
  event.preventDefault()
  counterChats++
  const chat = document.createElement('chat-app')
  chatId = `chat${counterChats}`
  chat.setAttribute('id', chatId)
  document.querySelector('#wrapper').appendChild(document.createElement('br'))
  document.querySelector('#wrapper').appendChild(chat)
  document.querySelector('#wrapper').appendChild(document.createElement('br'))

  moveElement(chat)
  console.log('chat.id/JM')
  console.log(chat.id)
})

// Creating memory-elements
document.querySelector('#memoryButton').addEventListener('click', (event) => {
  event.preventDefault()
  const memory = document.createElement('memory-app')
  document.querySelector('#wrapper').appendChild(document.createElement('br'))
  document.querySelector('#wrapper').appendChild(memory)
  document.querySelector('#wrapper').appendChild(document.createElement('br'))

  moveElement(memory)
})

// Creating minehunter
document.querySelector('#minehunterButton').addEventListener('click', (event) => {
  event.preventDefault()
  const minehunter = document.createElement('minehunter-app')
  document.querySelector('#wrapper').appendChild(document.createElement('br'))
  document.querySelector('#wrapper').appendChild(minehunter)
  document.querySelector('#wrapper').appendChild(document.createElement('br'))

  moveElement(minehunter)
})
