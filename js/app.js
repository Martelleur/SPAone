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

  const stateObj = {
    minehunter: event.target.getAttribute('data-minehunter')
  }

  window.history.pushState(stateObj, `/${stateObj.minehunter}`)

  console.log(`window.location.host: ${window.location.host}`)
  console.log(`window.location.hostname: ${window.location.hostname}`)
  console.log(`window.location.port: ${window.location.port}`)
  console.log(`window.location.hash: ${window.location.hash}`)
  console.log(`window.location.search: ${window.location.search}`)
  console.log(`window.location.href: ${window.location.href}`)
  console.log(`window.location.pathname: ${window.location.pathname}`)

  console.log(stateObj)

  const currentState = window.history.state
  console.log(currentState)
})

// Router
window.addEventListener('hashchange', event => {
  const hash = window.location.hash

  if (hash === '/minehunter/') {
    console.log('haschchange')
    console.log(hash)
  }
})

window.addEventListener('popstate', event => {
  console.log('popstate')
})
