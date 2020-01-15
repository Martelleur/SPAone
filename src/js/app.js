import './memory-app.js'
import './chat-app.js'
import './minehunter-app.js'
import './chess-app.js'
import './timecounter-app.js'
import { moveElement } from './moveElement.js'
// import SimpleCrypto from 'simple-crypto-js'
// Check if online not always true but a good check
// Insted we define online when client connected to server
// Like the heartbeat in websocketconnection

// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/sw.js', { scope: './js/' }).then(function (reg) {
    if (reg.installing) {
      console.log('Service worker installing')
    } else if (reg.waiting) {
      console.log('Service worker installed')
    } else if (reg.active) {
      console.log('Service worker active')
    }
  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error)
  })
}

// using moment-api
setInterval(() => {
  // let c = window.moment().format('LLLL')
  const d = window.moment().format('MMMM Do YYYY, h:mm:ss a')
  document.querySelector('#time').innerHTML = d
  document.querySelector('#time').style.float = 'right'
}, 1000)

// using emoji-api
window.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#emojiButton')
  const picker = new window.EmojiButton({
    position: 'bottom'
  })
  picker.on('emoji', emoji => {
    document.querySelector('input').value += emoji
  })

  button.addEventListener('click', () => {
    if (picker.pickerVisible) {
      picker.hidePicker()
    } else {
      picker.showPicker(button)
    }
  })
})
document.querySelector('#inputEmoji').style.float = 'right'
document.querySelector('#emojiButton').style.float = 'right'
document.querySelector('#emojiButton').style.cursor = 'pointer'

// Creating icons
/**
 * @param {*} element
 */
function showMemorySpan (element) {
  document.querySelector('#memorySpan').style.display = 'initial'
}

/**
 * @param {*} element
 */
function showChessSpan (element) {
  document.querySelector('#chessSpan').style.display = 'initial'
}

/**
 * @param {*} element
 */
function showMinehunterSpan (element) {
  document.querySelector('#minehunterSpan').style.display = 'initial'
}

/**
 * @param {*} element
 */
function showChatSpan (element) {
  document.querySelector('#chatSpan').style.display = 'initial'
}

/**
 * @param {*} element
 */
function showFullScreenSpan (element) {
  document.querySelector('#fullScreenSpan').style.display = 'initial'
}
let tempShowInfo
document.querySelector('#memoryButton').innerHTML = `
<img id="memoryIcon" src="../imageIcons/memory.png" alt="chess icon"></img>
<div id="memorySpan">Memory</div>
<style>
  #memoryIcon {
    position: absolute;
    top: 0;
    left: 5vh;
    height: 4vh;
    width: 4vh;
    padding-bottom: 1px;
    border: 1px solid black;
  }
  #memorySpan {
    top: 5vh;
    left: 5vh;
    position: absolute;
    display: none;
    color: #8f6d47;
    border: 1px solid #23d96c;
    background-color: #4a121e;
    z-index: 1000;
  }
</style>
`
document.querySelector('#memoryIcon').addEventListener('mouseover', event => {
  tempShowInfo = window.setTimeout(showMemorySpan, 500)
})
document.querySelector('#memoryIcon').addEventListener('mouseout', event => {
  clearTimeout(tempShowInfo)
  document.querySelector('#memorySpan').style.display = 'none'
})

document.querySelector('#chatButton').innerHTML = `
<img id="chatIcon" src="../imageIcons/chat.png" alt="chess icon"></img>
<span id="chatSpan">Chat</span>
<style>
  #chatIcon {
    position: absolute;
    top: 0;
    left: 0;
    height: 4vh;
    width: 4vh;
    padding-bottom: 1px;
    border: 1px solid black;
  }
  #chatSpan {
    position: absolute;
    top: 5vh;
    left: 0;
    display: none;
    color: #8f6d47;
    border: 1px solid #23d96c;
    background-color: #4a121e;
    z-index: 1000;
  }
</style>
`
document.querySelector('#chatIcon').addEventListener('mouseover', event => {
  tempShowInfo = window.setTimeout(showChatSpan, 500)
})
document.querySelector('#chatIcon').addEventListener('mouseout', event => {
  clearTimeout(tempShowInfo)
  document.querySelector('#chatSpan').style.display = 'none'
})

document.querySelector('#chessButton').innerHTML = `
<img id="chessIcon" src="../imageIcons/chess.png" alt="chess icon"></img>
<span id="chessSpan">Chess</span>
<style>
  #chessIcon {
    position: absolute;
    top: 0;
    left: 15vh;
    height: 4vh;
    width: 4vh;
    padding-bottom: 1px;
    border: 1px solid black;
  }
  #chessSpan {
    position: absolute;
    top: 5vh;
    left: 15vh;
    display: none;
    color: #8f6d47;
    border: 1px solid #23d96c;
    background-color: #4a121e;
    z-index: 1000;
  }
</style>
`
document.querySelector('#chessIcon').addEventListener('mouseover', event => {
  tempShowInfo = window.setTimeout(showChessSpan, 500)
})
document.querySelector('#chessIcon').addEventListener('mouseout', event => {
  clearTimeout(tempShowInfo)
  document.querySelector('#chessSpan').style.display = 'none'
})

document.querySelector('#minehunterButton').innerHTML = `
<img id="minehunterIcon" src="../imageIcons/minehunter.png" alt="chess icon"></img>
<span id="minehunterSpan">Minehunter</span>
<style>
  #minehunterIcon {
    position: absolute;
    top: 0;
    left: 10vh;
    height: 4vh;
    width: 4vh;
    padding-bottom: 1px;
    border: 1px solid black;
  }
  #minehunterSpan {
    position: absolute;
    top: 5vh;
    left: 10vh;
    display: none;
    color: #8f6d47;
    border: 1px solid #23d96c;
    background-color: #4a121e;
    z-index: 1000;
  }
</style>
`

document.querySelector('#minehunterIcon').addEventListener('mouseover', event => {
  tempShowInfo = window.setTimeout(showMinehunterSpan, 500)
})
document.querySelector('#minehunterIcon').addEventListener('mouseout', event => {
  clearTimeout(tempShowInfo)
  document.querySelector('#minehunterSpan').style.display = 'none'
})

document.querySelector('.material-icons').addEventListener('mouseover', event => {
  tempShowInfo = window.setTimeout(showFullScreenSpan, 500)
})
document.querySelector('.material-icons').addEventListener('mouseout', event => {
  clearTimeout(tempShowInfo)
  document.querySelector('#fullScreenSpan').style.display = 'none'
})

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
let y = 50
let x = 0

// creating custom-elements
document.querySelector('#buttons').addEventListener('click', (event) => {
  event.preventDefault()

  // if user not click on a a-tag
  if (event.target.tagName !== 'IMG') {
    console.log('Not an img-tag')
    return
  }

  if (y < (window.innerHeight - 600)) {
    y = y + 20
  } else {
    y = 70
  }
  if (x < (window.innerWidth - 600)) {
    x = x + 20
  } else {
    x = 20
  }

  // data
  const chatApp = document.querySelectorAll('chat-app')
  const memoryApp = document.querySelectorAll('memory-app')
  const minehunterApp = document.querySelectorAll('minehunter-app')
  const chessApp = document.querySelectorAll('chess-app')

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
  const elementType = event.target.parentElement.getAttribute('data-create-element')

  // create element and ids for elements
  const element = document.createElement(elementType)
  if (event.target.parentElement.getAttribute('data-create-element') === 'chat-app') {
    counterChatApplication++
    nameIdApplication = `chat${counterChatApplication}`
  }
  if (event.target.parentElement.getAttribute('data-create-element') === 'memory-app') {
    counterMemoryApplication++
    nameIdApplication = `memory${counterMemoryApplication}`
  }
  if (event.target.parentElement.getAttribute('data-create-element') === 'minehunter-app') {
    counterMinehunterApplication++
    nameIdApplication = `minehunter${counterMinehunterApplication}`
  }
  if (event.target.parentElement.getAttribute('data-create-element') === 'chess-app') {
    counterChessApplication++
    nameIdApplication = `chess${counterChessApplication}`
  }

  element.setAttribute('id', nameIdApplication)
  element.setAttribute('data-hide', 'false')
  element.setAttribute('data-zedindex', 'high')

  // Adding created elements and use operator moveElement
  document.querySelector('main').appendChild(element)
  element.style.top = y + 'px'
  element.style.left = x + 'px'
  moveElement(element)

  // window.history and window.location
  const stateObj = {
    element: event.target.parentElement.getAttribute('data-create-element'),
    id: element.getAttribute('id')
  }

  window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}`)

  // Event changing url
  element.addEventListener('dblclick', event => {
    console.log(event.taregt)
    window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}`)
    element.setAttribute('data-zedindex', 'high')
    for (let i = 0; i < document.querySelector('main').children.length; i++) {
      if (document.querySelector('main').children[i] !== element) {
        document.querySelector('main').children[i].setAttribute('data-zedindex', 'low')
      }
    }
  })

  // Info to user
  const info = document.createElement('div')
  info.setAttribute('id', 'info')
  document.querySelector('main').appendChild(info)
  info.innerHTML = `
  <p>dblclick on an element to get focus</p>
  <style>
    #info {
      top: 1vh;
      left: 50vh;
      position: absolute;
      display: none;
      color: #8f6d47;
      border: 1px solid #23d96c;
      background-color: #4a121e;
      z-index: 1000;
    } 
  </style>
  `
  function hoverCustomElement () {
    console.log('dblclick to get focus')
    info.style.display = 'initial'
  }
  function hoverCustomElement2 () {
    info.style.display = 'none'
  }
  element.addEventListener('mouseover', event => {
    window.setTimeout(hoverCustomElement, 1000)
    window.setTimeout(hoverCustomElement2, 4000)
  })
  element.addEventListener('mousemove', event => {
    clearTimeout(hoverCustomElement)
    clearTimeout(hoverCustomElement)
    info.style.display = 'none'
  })

  // Listning on custom event bigWindow
  element.addEventListener('bigWindow', event => {
    for (let i = 0; i < document.querySelector('main').children.length; i++) {
      if (document.querySelector('main').children[i] !== element) {
        document.querySelector('main').children[i].style.visibility = 'hidden'
      }
    }
  })

  // Listning on custom event notBigWindow
  element.addEventListener('notBigWindow', event => {
    for (let i = 0; i < document.querySelector('main').children.length; i++) {
      document.querySelector('main').children[i].style.visibility = 'visible'
    }
  })

  const currentState = window.history.state
  console.log('currentState.id: ')
  console.log(typeof currentState.id)
  console.log(currentState.id)

  // Listning on custom event hidewindow and cache hidden elements in select-element
  element.addEventListener('hideWindow', event => {
    event.preventDefault()
    stateObj.visibility = 'hidden'
    window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}/${stateObj.visibility}`)
    /*
    window.history.back()
    console.log(window.location.pathname)
    window.history.forward()
    */
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

    // Display hidden elements
    selectChat.addEventListener('change', event => {
      event.preventDefault()
      const value = event.target.value.slice(1)
      for (let i = 0; i < counterChatApplication; i++) {
        const temp = `#chat${i + 1}`
        // console.log(document.querySelector(temp).getAttribute('id'))
        console.log(event.target)
        try {
          if (document.querySelector(temp).getAttribute('data-hide') === 'true' && document.querySelector(temp).getAttribute('id') === value) {
            document.querySelector(temp).setAttribute('data-hide', 'false')
            document.querySelector(temp).style.visibility = 'visible'
            // event.target.children[i + 1].remove()
            for (let j = 0; j < event.target.children.length; j++) {
              if (event.target.children[j].value === temp) {
                event.target.children[j].remove()
                // changing url
                stateObj.id = temp.slice(1)
                stateObj.element = 'chat-app'
                window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}`)
                // Change focus to the element showing in the url
                for (let i = 0; i < document.querySelector('main').children.length; i++) {
                  if (document.querySelector('main').children[i].getAttribute('id') !== stateObj.id) {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'low')
                  } else {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'high')
                  }
                }
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
            document.querySelector(temp).style.visibility = 'visible'
            // event.target.children[i + 1].remove()
            for (let j = 0; j < event.target.children.length; j++) {
              if (event.target.children[j].value === temp) {
                event.target.children[j].remove()
                // changing url
                stateObj.id = temp.slice(1)
                stateObj.element = 'memory-app'
                // Change focus to the element showing in the url
                for (let i = 0; i < document.querySelector('main').children.length; i++) {
                  if (document.querySelector('main').children[i].getAttribute('id') !== stateObj.id) {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'low')
                  } else {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'high')
                  }
                }
                window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}`)
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
            document.querySelector(temp).style.visibility = 'visible'
            for (let j = 0; j < event.target.children.length; j++) {
              if (event.target.children[j].value === temp) {
                event.target.children[j].remove()
                // changing url
                stateObj.id = temp.slice(1)
                stateObj.element = 'minehunter-app'
                window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}`)
                // Change focus to the element showing in the url
                for (let i = 0; i < document.querySelector('main').children.length; i++) {
                  if (document.querySelector('main').children[i].getAttribute('id') !== stateObj.id) {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'low')
                  } else {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'high')
                  }
                }
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
            document.querySelector(temp).style.visibility = 'visible'
            for (let j = 0; j < event.target.children.length; j++) {
              if (event.target.children[j].value === temp) {
                event.target.children[j].remove()
                // changing url
                stateObj.id = temp.slice(1)
                stateObj.element = 'chess-app'
                window.history.pushState(stateObj, `/${stateObj.id}`, `/${stateObj.element}/${stateObj.id}`)
                // Change focus to the element showing in the url
                for (let i = 0; i < document.querySelector('main').children.length; i++) {
                  if (document.querySelector('main').children[i].getAttribute('id') !== stateObj.id) {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'low')
                  } else {
                    document.querySelector('main').children[i].setAttribute('data-zedindex', 'high')
                  }
                }
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
})

// popstate event
window.addEventListener('popstate', event => {
  // remove element when window.location.pathname === '/'
  if (window.location.pathname === '/') {
    document.querySelector('main').innerHTML = ''
    return
  }
  try {
    console.log(`id: ${event.state.id}. Element: ${event.state.element}`)
  } catch (error) {
    console.log(error)
  }

  // Change focus to the element that shows in the url
  for (let i = 0; i < document.querySelector('main').children.length; i++) {
    let tempStr
    document.querySelector('main').children[i].style.visibility = 'visible'
    if (document.querySelector('main').children[i].nodeName === 'CHAT-APP') {
      tempStr = `/chat-app/${document.querySelector('main').children[i].getAttribute('id')}`
    }
    if (document.querySelector('main').children[i].nodeName === 'CHESS-APP') {
      tempStr = `/chess-app/${document.querySelector('main').children[i].getAttribute('id')}`
    }
    if (document.querySelector('main').children[i].nodeName === 'MINEHUNTER-APP') {
      tempStr = `/minehunter-app/${document.querySelector('main').children[i].getAttribute('id')}`
    }
    if (document.querySelector('main').children[i].nodeName === 'MEMORY-APP') {
      tempStr = `/memory-app/${document.querySelector('main').children[i].getAttribute('id')}`
    }

    if (window.location.pathname !== tempStr) {
      document.querySelector('main').children[i].setAttribute('data-zedindex', 'low')
    } else {
      document.querySelector('main').children[i].setAttribute('data-zedindex', 'high')
    }
  }

  // Open upp hided element if that element shows in the url
  for (let i = 0; i < document.querySelectorAll('select').length; i++) {
    let tempStr2
    let tempStr3
    let tempStr4
    const select = document.querySelectorAll('select')[i]

    for (let j = 1; j < select.querySelectorAll('option').length; j++) {
      try {
        tempStr3 = select.querySelectorAll('option')[j]
        if (tempStr3.getAttribute('value') === tempStr3.value && tempStr3.value === tempStr3.textContent) {
          console.log(true)
        }
      } catch (error) {
        console.log(error)
      }

      if (tempStr3.textContent.slice(1, 5) === 'chat') {
        tempStr4 = tempStr3.textContent.slice(1)
        console.log(tempStr4)
        tempStr2 = '/chat-app/' + tempStr4
        console.log(tempStr2)
      } else if (tempStr3.textContent.slice(1, 6) === 'chess') {
        tempStr4 = tempStr3.textContent.slice(1)
        console.log(tempStr4)
        tempStr2 = '/chess-app/' + tempStr4
        console.log(tempStr2)
      } else if (tempStr3.textContent.slice(1, 7) === 'memory') {
        tempStr4 = tempStr3.textContent.slice(1)
        console.log(tempStr4)
        tempStr2 = '/memory-app/' + tempStr4
        console.log(tempStr2)
      } else if (tempStr3.textContent.slice(1, 11) === 'minehunter') {
        tempStr4 = tempStr3.textContent.slice(1)
        console.log(tempStr4)
        tempStr2 = '/minehunter-app/' + tempStr4
        console.log(tempStr2)
      }
      if (tempStr2 === window.location.pathname) {
        //  && document.querySelector(temp).getAttribute('id') === value
        try {
          if (document.querySelector(tempStr3.textContent).getAttribute('data-hide') === 'true') {
            document.querySelector(tempStr3.textContent).setAttribute('data-hide', 'false')
            document.querySelector(tempStr3.textContent).style.visibility = 'visible'
            // event.target.children[i + 1].remove()
            tempStr3.remove()
            if (select.length === 1) {
              select.remove()
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})

// Full screen mode
document.querySelector('#fullScreen').addEventListener('click', event => {
  event.preventDefault()

  if (document.querySelector('.material-icons').textContent === 'fullscreen') {
    event.target.textContent = 'fullscreen_exit'
    document.querySelector('#fullScreenSpan').textContent = 'Exit fullscreen'
  } else {
    document.querySelector('.material-icons').textContent = 'fullscreen'
    document.querySelector('#fullScreenSpan').textContent = 'Fullscreen'
    document.exitFullscreen()
    return
  }

  const html = document.querySelector('html')
  if (event.target.requestFullscreen) {
    html.requestFullscreen()
  } else if (event.target.mozRequestFullScreen) { /* Firefox */
    html.mozRequestFullScreen()
  } else if (event.target.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    html.webkitRequestFullscreen()
  } else if (event.target.msRequestFullscreen) { /* IE/Edge */
    html.msRequestFullscreen()
  }
})
