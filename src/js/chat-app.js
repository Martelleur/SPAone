const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="chatConteiner">
<form action="">
    <fieldset id="chatTools">
        <button id="deletChat">Delet chat</button>
        <button id="goLiveChat">Go online</button>
        <button id="closeLiveChat">Go offline</button>
        <button id="biggerWindow">+</button>
        <button id="smallerWindow">-</button>
    </fieldset>
    <fieldset id="onlineStatus">
        <p>You are online</p>
    </fieldset>
    <fieldset id="chatTitle"></fieldset>
    
    <fieldset id="messages"></fieldset>
    
    <fieldset id="newMessage">
        <!--<input type="text" id="inputUser" placeholder="Write message here...">-->
        <textarea id="inputUser" rows="10" cols="45" name="usrtxt" wrap="hard">Write message here...</textarea>
        <input type="submit" id="sendButton" value="Send">
    </fieldset>
</form>
</div>
<style>
:host {
    position: absolute;
    width: 50%;
    color: white;
    background-color: black;
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
:host #chatConteiner {
  border: 5px solid black;
    z-index: -1;
}
:host #chatConteiner:hover {
    cursor: move; 
    border: 5px solid blue;
    z-index: 1;
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
    this._deletChat = this.shadowRoot.querySelector('#deletChat')
    this._chatTitle = this.shadowRoot.querySelector('#chatTitle')
    this._chatCounter = 0
    this._goLiveChat = this.shadowRoot.querySelector('#goLiveChat')
    this._closeLiveChat = this.shadowRoot.querySelector('#closeLiveChat')
    this._socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'charcords') // charcoard är ett egendefinierat protcol (urlen och protocol måste överenstämma)
    this._data = undefined
    this._onlineStatus = this.shadowRoot.querySelector('#onlineStatus p')
    this._smallerWindow = this.shadowRoot.querySelector('#smallerWindow')
    this._biggerWindow = this.shadowRoot.querySelector('#biggerWindow')
    this._chatConteiner = this.shadowRoot.querySelector('#chatConteiner')
  }

  static get observedAttributes () {
    return ['id', 'width']
  }

  attributeChangedCallback (name, oldValue, newValue) {
  }

  connectedCallback () {
    // eventlistner for this._biggerWindow
    this._biggerWindow.addEventListener('click', (event) => {
      event.preventDefault()
      const width = this._chatConteiner.setAttribute('color', 'red')
      console.log(width)
    })

    // eventlistner for this._smallerWindow
    this._smallerWindow.addEventListener('click', (event) => {
      event.preventDefault()
      const width = this._chatConteiner.getAttribute('backgroundColor')
      console.log(`width: ${width}`)
    })

    // eventlistner for this._input
    this._input.addEventListener('input', (event) => {
      this._message = this._input.value
      console.log(this._input.value)
    })

    // eventlistner for this._deletChat
    this._deletChat.addEventListener('click', (event) => {
      event.preventDefault()
      this._socket.close()
      event.target.parentNode.parentNode.parentNode.remove()
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
      this._messages.appendChild(p)
    })

    // eventlistner for this._goLiveChat (bygger på callback) (kan göras om till async awaite)
    this._goLiveChat.addEventListener('click', (event) => {
      event.preventDefault()
      this._onlineStatus.innerText = 'Thank you! You are online'
      console.log('websocket trys to connect to server/JM')
      this._socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'charcords')
    })

    this._socket.addEventListener('open', event => {
      console.log('websocket in action/JM')

      this._data = {
        type: 'message',
        data: this._message,
        username: 'Joel Martelleur',
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      this._socket.send(JSON.stringify(this._data))
    })

    // listning for message from other users
    this._socket.addEventListener('message', event => {
      console.log('websocket message event.data:')
      console.log(event.data)
    })

    // listning on servers heartbeat
    this._socket.addEventListener('heartbeat', event => {
      console.log('websocket heartbeat event.data:')
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
