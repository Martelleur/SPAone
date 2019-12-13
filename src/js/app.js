import './chat-app.js'

document.querySelector('#chatButton').addEventListener('click', (event) => {
  const chat = document.createElement('chat-app')
  document.querySelector('#chatWrapper').appendChild(chat)
})
