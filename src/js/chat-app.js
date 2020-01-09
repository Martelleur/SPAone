const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="chatConteiner">
<form action="">
    <fieldset id="tools">
        <button id="deletChat">Delet chat</button>
        <button id="goLiveChat">Go online</button>
        <button id="closeLiveChat">Go offline</button>
        <button id="bigWindow">+</button>
        <button id="adjustableWindow">%</button>
        <button id="hideWindow">-</button>
        <button id="emoji">Emoji</button>
        <p id="onlineStatus">You are online</p>
    </fieldset>

    <fieldset id="messages"></fieldset>
    
    <fieldset id="newMessage">
        <textarea id="inputUser" rows="10" name="usrtxt" wrap="hard" placeholder="Write message here..."></textarea>
        <input type="submit" id="sendButton" value="Send">
        <button id="changeUsername">Change username</button>
        <button id="changeChannel">Change channel</button>
    </fieldset>
</form>
</div>
<style>
* {
    box-sizing: border-box;
    margin: 0;
}
:host {
    position: absolute;
    width: 50%;
    color: white;
    background-color: black;
    box-sizing: border-box;
    border: 5px solid #0c5cc4;
    resize: both;
    overflow: auto;
}
:host #chatConteiner {
    width: 100%;
    color: white;
    background-color: black;
}
:host #tools:hover {
  cursor: move;
}
:host textarea {
  width: 100%;
  resize: none;
}
:host #tools {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: black;
  margin: 0;
}
:host #newMessage {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background-color: black;
  margin: 0;
}
:host #messages, :host #onlineStatus, :host #chatTitle, {
  background-color: white;
  color: black;
}
</style>
`

export class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    // this.shadowRoot.height = `${window.innerHeight * 0.4}px`
    this._input = this.shadowRoot.querySelector('#inputUser')
    this._messages = this.shadowRoot.querySelector('#messages')
    this._message = undefined
    this._chatTitle = this.shadowRoot.querySelector('#chatTitle')
    this._chatCounter = 0
    this._goLiveChat = this.shadowRoot.querySelector('#goLiveChat')
    this._closeLiveChat = this.shadowRoot.querySelector('#closeLiveChat')
    this._socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'charcords') // charcoard är ett egendefinierat protcol (urlen och protocol måste överenstämma)
    this._data = undefined
    this._username = 'Joel Martelleur'
    this._type = 'message'
    this._channel = 'my, not so secret, channel'
    this._key = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this._onlineStatus = this.shadowRoot.querySelector('#onlineStatus')
    this._chatConteiner = this.shadowRoot.querySelector('#chatConteiner')
    this._newMessage = this.shadowRoot.querySelector('#newMessage')

    // Tools chat
    this._emoji = this.shadowRoot.querySelector('#emoji')
    this._tools = this.shadowRoot.querySelector('#tools')
    this._adjustableWindow = this.shadowRoot.querySelector('#adjustableWindow')
    this._hideWindow = this.shadowRoot.querySelector('#hideWindow')
    this._bigWindow = this.shadowRoot.querySelector('#bigWindow')
    this._deletChat = this.shadowRoot.querySelector('#deletChat')
    this._send = this.shadowRoot.querySelector('#sendButton')
    this._changeUsername = this.shadowRoot.querySelector('#changeUsername')
    this._changeChannel = this.shadowRoot.querySelector('#changeChannel')
    console.log(window.moment())
    console.log(window.moment().format('MMMM Do YYYY, h:mm:ss a'))
    this._picker = new window.EmojiButton({
      position: 'right-start'
    })
    console.log(this._picker)
    this._picker.on('emoji', (emoji) => {
      this._message.value += emoji
    })
    console.log()
  }

  static get observedAttributes () {
    return ['id', 'data-hide', 'data-freezewindow']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    // Changing of attribute data-freezeWindow
    if (name === 'data-freezewindow') {
      if (newValue === 'true') {
        this._bigWindow.style.display = 'none'
        this._hideWindow.style.display = 'none'
        this._adjustableWindow.style.display = 'none'
        this.style.width = '100%'
        this._tools.style.cursor = 'default'
      }
      if (newValue === 'false') {
        this._bigWindow.style.display = 'initial'
        this._hideWindow.style.display = 'initial'
        this._adjustableWindow.style.display = 'initial'
        this.style.width = '50%'
      }
    }

    // Changing of attribute data-hide
    if (name === 'data-hide') {
      // console.log(newValue)
      // console.log(oldValue)
      if (newValue === 'true') {
        this.style.display = 'none'
      }
      if (newValue === 'false') {
        this.style.display = 'initial'
      }
    }

    // Changing of attribute id
    if (name === 'id') {
      // console.log('test attributeChangedCallback/JM')
      const p = document.createElement('p')
      p.innerText = this.getAttribute('id')
      this._tools.appendChild(p)
      // console.log(this.getAttribute('id'))
    }

    // Changing of attribute id
    if (name === 'id') {
      let username
      let channel
      // saving username and channel in localstorage
      if (window.localStorage.getItem('username') === null) {
        username = window.prompt('Please enter your username', 'user1')
        window.localStorage.setItem('username', username)
      } else {
        username = window.localStorage.getItem('username')
      }
      if (window.localStorage.getItem('channel') === null) {
        channel = window.prompt('Please enter channel', this._channel)
        window.localStorage.setItem('channel', channel)
      } else {
        channel = window.localStorage.getItem('channel')
      }

      // test if username is null or not
      if (username != null) {
        this._username = username
      } else {
        this._username = 'user1'
      }

      // adding usernamename to chat-app
      const p = document.createElement('p')
      p.textContent = `Username: ${this._username}`
      this._tools.appendChild(p)

      // adding channel to chat-app
      const p2 = document.createElement('p')
      p2.textContent = `Channel: ${this._channel}`
      this._newMessage.appendChild(p2)
    }
  }

  connectedCallback () {
    this._emoji.addEventListener('click', event => {
      this._picker.pickerVisible ? this._picker.hidePicker() : this._picker.showPicker(this._message)
    })

    // eventlistner for this._changeUsername
    this._changeChannel.addEventListener('click', (event) => {
      event.preventDefault()
      const channel = window.prompt('Please enter channel', this._channel)
      if (channel != null) {
        this._channel = channel
      } else {
        this._channel = this._channel
      }

      // adding channel to localstorage
      window.localStorage.setItem('channel', this._channel)

      // adding channel to chat-app
      this._newMessage.lastChild.remove()
      const p = document.createElement('p')
      p.textContent = `Channel: ${this._channel}`
      this._newMessage.appendChild(p)
    })

    // eventlistner for this._changeUsername
    this._changeUsername.addEventListener('click', (event) => {
      event.preventDefault()
      const username = window.prompt('Please enter your username', 'user1')
      if (username != null) {
        this._username = username
      } else {
        this._username = 'user1'
      }

      // adding usernamename to localstorage
      window.localStorage.setItem('username', username)

      // adding usernamename to chat-app
      this._tools.lastChild.remove()
      const p = document.createElement('p')
      p.textContent = `Username: ${this._username}`
      this._tools.appendChild(p)
    })

    // eventlistner for this._adjustableWindow
    this._adjustableWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.style.position = 'absolute'
      this.style.resize = 'both'
      this.style.border = '5px solid #0c5cc4'
      this._tools.style.border = 'none'
      this._newMessage.style.border = 'none'
      this._tools.style.cursor = 'move'
      this._messages.style.height = '50%'
    })

    // eventlistner for this._bigWindow
    this._bigWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.style.position = 'static'
      this.style.resize = 'none'
      this.style.border = 'none'
      this._tools.style.border = '5px solid #0c5cc4'
      this._newMessage.style.border = '5px solid #0c5cc4'
      const temp = window.innerWidth
      this._messages.style.height = `${temp}px`
      this._tools.style.cursor = 'default'
    })

    // eventlistner for this._hideWindow
    this._hideWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.setAttribute('data-hide', 'true')
      if (this.getAttribute('data-hide') === 'true') {
        this.dispatchEvent(new window.CustomEvent('hiddenElement'))
        // console.log('My custom event is dispatched')
        // console.log(event)
      }
    })

    // eventlistner for this._input
    this._input.addEventListener('input', (event) => {
      this._message = this._input.value
      // console.log(this._input.value)
    })

    // eventlistner for this._deletChat
    this._deletChat.addEventListener('click', (event) => {
      event.preventDefault()

      // Close websocket
      this._socket.close()
      this.remove()
    })

    // eventlistner for this._send
    this._send.addEventListener('click', (event) => {
      event.preventDefault()
      this._input.innerHTML = ''

      const post = {
        type: 'message',
        data: this._message,
        username: this._username,
        channel: this._channel,
        key: this._key
      }

      this._socket.send(JSON.stringify(post))
    })

    // eventlistner for this._goLiveChat (bygger på callback) (kan göras om till async awaite)
    this._goLiveChat.addEventListener('click', (event) => {
      event.preventDefault()
      this._onlineStatus.innerText = 'You are online'
      // console.log('websocket trys to connect to server/JM')
      this._socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'charcords')
    })

    this._socket.addEventListener('open', event => {
      console.log('websocket in action/JM')
      this._socket.send(JSON.stringify(this._data))
    })

    // listning for message from other users
    this._socket.addEventListener('message', event => {
      // console.log('websocket message event.data:')
      // console.log(event.data)
      const dataParse = JSON.parse(event.data)
      const p = document.createElement('p')
      // p.textContent = event.data
      if (dataParse.username !== 'The Server') {
        p.innerHTML = `Date: ${new Date()}.<br>Username: ${dataParse.username}.<br>Channel: ${dataParse.channel}.<br>Data: ${dataParse.data}<br>Type: ${dataParse.type}<hr>`
        this._messages.appendChild(p)
      }
      console.log('event.data:')
      console.log(event.data)
    })

    // close WS
    this._closeLiveChat.addEventListener('click', event => {
      console.log('ws offline/JM')
      this._socket.close()
      this._onlineStatus.innerText = 'You are offline'
    })
  }
}

// Registers the custom event
window.customElements.define('chat-app', Chat)
