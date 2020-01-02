const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="chatConteiner">
<form action="">
    <fieldset id="tools">
        <button id="deletChat">Delet chat</button>
        <button id="goLiveChat">Go online</button>
        <button id="closeLiveChat">Go offline</button>
        <button id="bigWindow">+</button>
        <button id="hideWindow">-</button>
    </fieldset>
    <fieldset id="onlineStatus">
        <p>You are online</p>
    </fieldset>
    <fieldset id="chatTitle"></fieldset>
    
    <fieldset id="messages"></fieldset>
    
    <fieldset id="newMessage">
        <!--<input type="text" id="inputUser" placeholder="Write message here...">-->
        <textarea id="inputUser"  rows="10" name="usrtxt" wrap="hard">Write message here...</textarea>
        <input type="submit" id="sendButton" value="Send">
    </fieldset>
</form>
</div>
<style>
:host {
    position: absolute;
    width: 500px;
    height: 500px;
    color: white;
    background-color: black;
    box-sizing: border-box;
    border: 5px solid blue;
    resize: both;
    overflow: scroll;
}
:host #chatConteiner {
    width: 100%;
    color: white;
    background-color: black;
}
:host #chatConteiner form {
    border: 2px solid black;
    padding: 1%;
}
:host #tools:hover {
  cursor: move;
}
:host textarea {
  width: 100%;
  resize: none;
}
</style>
`

export class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._send = this.shadowRoot.querySelector('#sendButton')
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
    this._onlineStatus = this.shadowRoot.querySelector('#onlineStatus p')
    this._chatConteiner = this.shadowRoot.querySelector('#chatConteiner')

    // Tools chat
    this._tools = this.shadowRoot.querySelector('#tools')
    this._hideWindow = this.shadowRoot.querySelector('#hideWindow')
    this._bigWindow = this.shadowRoot.querySelector('#bigWindow')
    this._deletChat = this.shadowRoot.querySelector('#deletChat')
  }

  static get observedAttributes () {
    return ['id', 'width', 'data-hide']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'width') {
      this._width = newValue
    }
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
    if (name === 'id') {
      // console.log('test attributeChangedCallback/JM')
      const p = document.createElement('p')
      p.innerText = this.getAttribute('id')
      this._tools.appendChild(p)
      // console.log(this.getAttribute('id'))
    }
  }

  connectedCallback () {
    // eventlistner for this._bigWindow
    this._bigWindow.addEventListener('click', (event) => {
      event.preventDefault()
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

      this._chatCounter = Math.floor(Math.random() * 10000000)
      const title = document.createElement('p')
      title.innerText = `Code for message: ${this._chatCounter}`
      this._chatTitle.appendChild(title)

      const p = document.createElement('p')
      p.innerText = this._message
      p.innerHTML = `Username: ${this._username}.<br>Channel: ${this._channel}.<br>Data: ${this._message}.<br>Type: ${this._type}`
      this._messages.appendChild(p)
    })

    // eventlistner for this._goLiveChat (bygger på callback) (kan göras om till async awaite)
    this._goLiveChat.addEventListener('click', (event) => {
      event.preventDefault()
      this._onlineStatus.innerText = 'Thank you! You are online'
      // console.log('websocket trys to connect to server/JM')
      this._socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'charcords')
    })

    this._socket.addEventListener('open', event => {
      console.log('websocket in action/JM')

      this._data = {
        type: this._type,
        data: this._message,
        username: this._username,
        channel: this._channel,
        key: this._key
      }

      this._socket.send(JSON.stringify(this._data))
    })

    // listning for message from other users
    this._socket.addEventListener('message', event => {
      // console.log('websocket message event.data:')
      // console.log(event.data)
      const dataParse = JSON.parse(event.data)
      /*
      console.log(dataParse)
      console.log(dataParse.username)
      console.log(dataParse.channel)
      console.log(dataParse.data)
      console.log(dataParse.type)
      */
      const p = document.createElement('p')
      // p.textContent = event.data
      p.innerHTML = `Username: ${dataParse.username}.<br>Channel: ${dataParse.channel}.<br>Data: ${dataParse.data}.<br>Type: ${dataParse.type}`
      this._messages.appendChild(p)
    })

    // listning on servers heartbeat
    this._socket.addEventListener('heartbeat', event => {
      console.log('websocket heartbeat event.data:')
      console.log(event.data)
      /*
      const p = document.createElement('p')
      p.textContent = event.data
      this._messages.appendChild(p)
      */
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
