import './memory-app.js'
import './chat-app.js'
import './minehunter-app.js'
import { moveElement } from './moveElement.js'

// creating custom-elements
let nameIdApplication
let counterChatApplication = 0
let counterMemoryApplication = 0
let counterMinehunterApplication = 0
document.querySelector('#buttons').addEventListener('click', (event) => {
  event.preventDefault()

  // if user not click on a a-tag
  if (event.target.tagName !== 'A') {
    console.log('Not an image-tag')
    return
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
  element.setAttribute('id', nameIdApplication)
  console.log(element.getAttribute('id'))

  // Adding created elements
  document.querySelector('#wrapper').appendChild(document.createElement('br'))
  document.querySelector('#wrapper').appendChild(element)
  document.querySelector('#wrapper').appendChild(document.createElement('br'))

  moveElement(element)

  // windo.history and window.location
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
