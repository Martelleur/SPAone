import './memory-app.js'
import './chat-app.js'
import './minehunter-app.js'
import './chess-app.js'
import { moveElement } from './moveElement.js'

// Check if online not always true but a good check
// Insted we define online when client connected to server
// Like the heartbeat in websocketconnection
if (window.navigator.onLine) {
  console.log('You are online!')
}
window.addEventListener('online', event => {
  console.log('You are online!')
})
window.addEventListener('offline', event => {
  console.log('You are offline!')
})

// data
let nameIdApplication
let counterChatApplication = 0
let counterMemoryApplication = 0
let counterMinehunterApplication = 0
let counterChessApplication = 0

// creating custom-elements
document.querySelector('#buttons').addEventListener('click', (event) => {
  event.preventDefault()

  // data
  const chatApp = document.querySelectorAll('chat-app')
  const memoryApp = document.querySelectorAll('memory-app')
  const minehunterApp = document.querySelectorAll('minehunter-app')
  const chessApp = document.querySelectorAll('chess-app')

  // if user not click on a a-tag
  if (event.target.tagName !== 'A') {
    console.log('Not an image-tag')
    return
  }

  // reset counters to 0 if elements not exist
  if (chatApp.length === 0) {
    counterChatApplication = 0
  }
  if (memoryApp.length === 0) {
    counterMemoryApplication = 0
  }
  if (minehunterApp.length === 0) {
    counterMinehunterApplication = 0
  }
  if (chessApp.length === 0) {
    counterChessApplication = 0
  }

  // Resets counters to the highest id
  try {
    counterChatApplication = Number(chatApp[chatApp.length - 1].getAttribute('id').slice(4))
  } catch (error) {
    console.log(error)
  }
  try {
    counterMemoryApplication = Number(memoryApp[memoryApp.length - 1].getAttribute('id').slice(6))
  } catch (error) {
    console.log(error)
  }
  try {
    counterMinehunterApplication = Number(minehunterApp[minehunterApp.length - 1].getAttribute('id').slice(10))
  } catch (error) {
    console.log(error)
  }
  try {
    counterChessApplication = Number(chessApp[chessApp.length - 1].getAttribute('id').slice(5))
  } catch (error) {
    console.log(error)
  }

  // get type of element that will be created
  console.log(event.target.getAttribute('data-create-element'))
  const elementType = event.target.getAttribute('data-create-element')

  // create element and ids for elements
  const element = document.createElement(elementType)
  if (event.target.getAttribute('data-create-element') === 'chat-app') {
    counterChatApplication++
    nameIdApplication = `chat${counterChatApplication}`
  }
  if (event.target.getAttribute('data-create-element') === 'memory-app') {
    counterMemoryApplication++
    nameIdApplication = `memory${counterMemoryApplication}`
  }
  if (event.target.getAttribute('data-create-element') === 'minehunter-app') {
    counterMinehunterApplication++
    nameIdApplication = `minehunter${counterMinehunterApplication}`
  }
  if (event.target.getAttribute('data-create-element') === 'chess-app') {
    counterChessApplication++
    nameIdApplication = `chess${counterChessApplication}`
  }
  element.setAttribute('id', nameIdApplication)
  console.log(element.getAttribute('id'))
  element.setAttribute('data-hide', 'false')
  // console.log(element.hasAttribute('data-hide'))

  // Adding created elements
  document.querySelector('#wrapper').appendChild(document.createElement('br'))
  document.querySelector('#wrapper').appendChild(element)
  document.querySelector('#wrapper').appendChild(document.createElement('br'))

  moveElement(element)

  // window.history and window.location
  const stateObj = {
    element: event.target.getAttribute('data-create-element'),
    id: element.getAttribute('id')
  }

  window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}`)
  console.log(stateObj)

  const currentState = window.history.state
  console.log('currentState: ')
  console.log(currentState)
})

// Cache hidden elements in select-element
window.addEventListener('click', event => {
  event.preventDefault()

  // Only custumelements else return with ending -app
  if (event.target.tagName.slice(-4) !== '-APP') {
    return
  }

  // Creating select-elements for caching in
  console.log(document.querySelectorAll('chat-app').length)
  const selectChat = document.createElement('select')
  const option = document.createElement('option')
  option.textContent = 'Hidden chat-apps'
  selectChat.appendChild(option)
  const selectMemory = document.createElement('select')
  const option2 = document.createElement('option')
  option2.textContent = 'Hidden memory-apps'
  selectMemory.appendChild(option2)
  const selectMinehunter = document.createElement('select')
  const option3 = document.createElement('option')
  option3.textContent = 'Hidden minehunter-apps'
  selectMinehunter.appendChild(option3)
  const selectChess = document.createElement('select')
  const option4 = document.createElement('option')
  option4.textContent = 'Hidden chess-apps'
  selectChess.appendChild(option4)

  // appending options to the select-elements
  for (let i = 0; i < counterChatApplication; i++) {
    const temp = `#chat${i + 1}`
    try {
      if (document.querySelector(temp).getAttribute('data-hide') === 'true') {
        const option = document.createElement('option')
        option.setAttribute('value', temp)
        option.textContent = temp
        selectChat.appendChild(option)
      }
    } catch (error) {
      console.log(error)
    }
  }
  for (let i = 0; i < counterMemoryApplication; i++) {
    const temp = `#memory${i + 1}`
    try {
      if (document.querySelector(temp).getAttribute('data-hide') === 'true') {
        const option = document.createElement('option')
        option.setAttribute('value', temp)
        option.textContent = temp
        selectMemory.appendChild(option)
      }
    } catch (error) {
      console.log(error)
    }
  }
  for (let i = 0; i < counterMinehunterApplication; i++) {
    const temp = `#minehunter${i + 1}`
    try {
      if (document.querySelector(temp).getAttribute('data-hide') === 'true') {
        const option = document.createElement('option')
        option.setAttribute('value', temp)
        option.textContent = temp
        selectMinehunter.appendChild(option)
      }
    } catch (error) {
      console.log(error)
    }
  }
  for (let i = 0; i < counterChessApplication; i++) {
    const temp = `#chess${i + 1}`
    try {
      if (document.querySelector(temp).getAttribute('data-hide') === 'true') {
        const option = document.createElement('option')
        option.setAttribute('value', temp)
        option.textContent = temp
        selectChess.appendChild(option)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // appending select-elements to document.querySelector('#hiddenElements')
  if (document.querySelector('#hiddenElements').innerHTML !== null) {
    document.querySelector('#hiddenElements').innerHTML = ''
  }
  if (selectChat.length >= 2) {
    document.querySelector('#hiddenElements').appendChild(selectChat)
  }
  if (selectMemory.length >= 2) {
    document.querySelector('#hiddenElements').appendChild(selectMemory)
  }
  if (selectMinehunter.length >= 2) {
    document.querySelector('#hiddenElements').appendChild(selectMinehunter)
  }
  if (selectChess.length >= 2) {
    document.querySelector('#hiddenElements').appendChild(selectChess)
  }

  /*
  // My event
  for (let i = 0; i < document.querySelectorAll('chat-app').length; i++) {
    document.querySelectorAll('chat-app')[i].addEventListener('hiddenElement', event => {
      // event.preventDefault()
      console.log('My custom event is working')
      const p = document.createElement('p')
      p.textContent = 'hello'
      document.querySelector('#wrapper').appendChild(p)
    })
  }
  */

  // Display hidden elements
  console.log(selectChat.length)
  selectChat.addEventListener('change', event => {
    event.preventDefault()
    const value = event.target.value.slice(1)
    console.log('document.querySelectorAll(chatApp).length')
    console.log(document.querySelectorAll('chat-app').length)
    console.log('counterChatApplication')
    console.log(counterChatApplication)
    for (let i = 0; i < counterChatApplication; i++) {
      const temp = `#chat${i + 1}`
      // console.log(document.querySelector(temp).getAttribute('id'))
      console.log(event.target)
      try {
        if (document.querySelector(temp).getAttribute('data-hide') === 'true' && document.querySelector(temp).getAttribute('id') === value) {
          document.querySelector(temp).setAttribute('data-hide', 'false')
          // event.target.children[i + 1].remove()
          for (let j = 0; j < event.target.children.length; j++) {
            if (event.target.children[j].value === temp) {
              event.target.children[j].remove()
              if (event.target.children.length === 1) {
                event.target.remove()
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  selectMemory.addEventListener('change', event => {
    event.preventDefault()
    const value = event.target.value.slice(1)
    for (let i = 0; i < counterMemoryApplication; i++) {
      const temp = `#memory${i + 1}`
      try {
        if (document.querySelector(temp).getAttribute('data-hide') === 'true' && document.querySelector(temp).getAttribute('id') === value) {
          document.querySelector(temp).setAttribute('data-hide', 'false')
          // event.target.children[i + 1].remove()
          for (let j = 0; j < event.target.children.length; j++) {
            if (event.target.children[j].value === temp) {
              event.target.children[j].remove()
              if (event.target.children.length === 1) {
                event.target.remove()
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  selectMinehunter.addEventListener('change', event => {
    event.preventDefault()
    const value = event.target.value.slice(1)
    for (let i = 0; i < counterMinehunterApplication; i++) {
      const temp = `#minehunter${i + 1}`
      try {
        if (document.querySelector(temp).getAttribute('data-hide') === 'true' && document.querySelector(temp).getAttribute('id') === value) {
          document.querySelector(temp).setAttribute('data-hide', 'false')
          for (let j = 0; j < event.target.children.length; j++) {
            if (event.target.children[j].value === temp) {
              event.target.children[j].remove()
              if (event.target.children.length === 1) {
                event.target.remove()
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  selectChess.addEventListener('change', event => {
    event.preventDefault()
    const value = event.target.value.slice(1)
    for (let i = 0; i < counterChessApplication; i++) {
      const temp = `#chess${i + 1}`
      try {
        if (document.querySelector(temp).getAttribute('data-hide') === 'true' && document.querySelector(temp).getAttribute('id') === value) {
          document.querySelector(temp).setAttribute('data-hide', 'false')
          for (let j = 0; j < event.target.children.length; j++) {
            if (event.target.children[j].value === temp) {
              event.target.children[j].remove()
              if (event.target.children.length === 1) {
                event.target.remove()
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
})

// popstate event
window.addEventListener('popstate', event => {
  console.log(`id: ${event.state.id}. Element: ${event.state.element}`)
})

/*
// Router
window.addEventListener('hashchange', event => {
  const hash = window.location.hash

  if (hash === '#!/minehunter/') {
    console.log('haschchange/Joel Martelleur')
    console.log(hash)
  }
})
*/

// window.history.back()

/*
console.log(`window.location.host: ${window.location.host}`)
console.log(`window.location.hostname: ${window.location.hostname}`)
console.log(`window.location.port: ${window.location.port}`)
console.log(`window.location.hash: ${window.location.hash}`)
console.log(`window.location.search: ${window.location.search}`)
console.log(`window.location.pathname: ${window.location.pathname}`)
console.log(stateObj)
*/
