const template = document.createElement('template')
template.innerHTML = /* html */ `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<p id="title"></p>

<div id="chatConteiner">
  <form action="">
    <fieldset id="tools">
      <button id="goLiveChat" class="button">Go online</button>
      <button id="closeLiveChat" class="button">Go offline</button>
      <button id="scrollToBottom" class="button">Scroll to bottom</button>
      <i id="deletChat" class="material-icons">close</i>
      <i id="bigWindow" class="material-icons">add_box</i>
      <i id="adjustableWindow" class="material-icons">exposure</i>
      <i id="hideWindow" class="material-icons">indeterminate_check_box</i>
      <p id="onlineStatus">You are online</p>
    </fieldset>

    <fieldset id="messages"><img id="welcome" src="../imageIcons/welcome.png" alt="welcome"></fieldset>
      
    <fieldset id="newMessage">
      <textarea id="inputUser" rows="5" placeholder="Write message here..."></textarea>
      <input type="submit" class="button" id="sendButton" value="Send">
      <button id="changeUsername" class="button">Change username</button>
      <button id="changeChannel" class="button">Change channel</button>
      <button id="scrollToTop" class="button">Scroll to top</button>
      <button id="emojiButton" class="button">😀</button>
    </fieldset>
  </form>
</div>
<div id="footer"
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
    z-index: 0;
    outline: 1px solid black;
}
:host #title {
  text-align: center;
  background-color: #0c5cc4;
  color: white;
  padding: 0;
  margin: 0;
}
:host #chatConteiner {
    width: 100%;
    color: white;
    background-color: black;
}
:host #title {
  cursor: move;
}
:host textarea {
  width: 100%;
  resize: none;
}
:host #tools {
  border-bottom: 5px solid #0c5cc4;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: black;
  margin: 0;
  padding: 0;
  padding-top: 3px;
  padding-left: 3px;
}
:host #newMessage {
  border-top: 5px solid #0c5cc4;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background-color: black;
  margin: 0;
}
:host #welcome {
  width: 100%;
  height: 30vh;
  padding: 0 10% 0 10%;
}
:host #messages, :host #onlineStatus, :host #chatTitle, {
  background-color: white;
  color: black;
}
:host .button {
  cursor: pointer;
}
:host .material-icons {
  float: right;
  padding: 0;
  margin: 0;
  cursor: pointer;
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
    this._chatKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this._onlineStatus = this.shadowRoot.querySelector('#onlineStatus')
    this._chatConteiner = this.shadowRoot.querySelector('#chatConteiner')
    this._newMessage = this.shadowRoot.querySelector('#newMessage')
    this._title = this.shadowRoot.querySelector('#title')
    this._welcome = this.shadowRoot.querySelector('#welcome')

    // Tools chat
    this._emoji = this.shadowRoot.querySelector('#emojiButton')
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
      position: 'left-end'
    })
    console.log(this._picker)
    this._picker.on('emoji', emoji => {
      this._input.value += emoji
    })
    this._scrollToTop = this.shadowRoot.querySelector('#scrollToTop')
    this._scrollToBottom = this.shadowRoot.querySelector('#scrollToBottom')
    this._scrollKey = true
    this._key = true
  }

  static get observedAttributes () {
    return ['id', 'data-hide', 'data-freezewindow', 'data-zedindex']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'data-zedindex') {
      if (newValue === 'high') {
        this.style.zIndex = '1'
        this.style.outline = '1px solid white'
        this._key = true
        console.log('zIndex: 1')
      } else {
        this.style.outline = '1px solid black'
        this._key = false
        this.style.zIndex = '0'
        console.log('zIndex: 0')
      }
    }
    // Changing of attribute data-freezeWindow
    if (name === 'data-freezewindow') {
      if (newValue === 'true') {
        this._bigWindow.style.display = 'none'
        this._hideWindow.style.display = 'none'
        this._adjustableWindow.style.display = 'none'
        this._deletChat.style.display = 'none'
        this.style.width = '100%'
        this.style.resize = 'none'
        this.style.boxSizing = 'border-box'
        this._title.style.cursor = 'default'
      }
      if (newValue === 'false') {
        this._bigWindow.style.display = 'initial'
        this._hideWindow.style.display = 'initial'
        this._adjustableWindow.style.display = 'initial'
        this.style.width = '50%'
        this._title.style.cursor = 'move'
        this.style.resize = 'both'
      }
    }

    // Changing of attribute data-hide
    if (name === 'data-hide') {
      if (newValue === 'true') {
        this.style.display = 'none'
      }
      if (newValue === 'false') {
        this.style.display = 'initial'
      }
    }

    // Changing of attribute id
    if (name === 'id') {
      this._title.innerHTML = `
      <p id="title">${this.getAttribute('id')}-chess-app
        <img id="chessIcon" src="../imageIcons/chat.png" alt="chess icon"></img>
        <style>
          #chessIcon {
            height: 15px;
            width: 15px;
            float: left;
            padding-bottom: 1px;
          }
        </style>
      </p>
      `
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

  /**
   * @memberof Chat
   */
  connectedCallback () {
    // Test
    function hashHandler () {
      console.log('The hash has changed!')
    }
    window.addEventListener('hashchange', hashHandler, false)

    // eventlistner for this._scrollToBottom
    this._scrollToBottom.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      this.scrollIntoView(false)
      this._scrollKey = true
    })

    // eventlistner for this._scrollToTop
    this._scrollToTop.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      this.scrollIntoView(true)
      this._scrollKey = false
    })

    // eventlistner for this._emoji
    this._emoji.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      if (this._picker.pickerVisible) {
        this._picker.hidePicker()
      } else {
        this._picker.showPicker(this)
      }
    })

    // eventlistner for this._changeUsername
    this._changeChannel.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }
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
      if (!this._key) {
        return
      }
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
      if (!this._key) {
        return
      }
      this.style.position = 'absolute'
      this.style.resize = 'both'
      this.style.border = '5px solid #0c5cc4'
      this._welcome.style.height = '30vh'
      this._tools.style.border = 'none'
      this._newMessage.style.border = 'none'
      this._newMessage.style.borderTop = '5px solid #0c5cc4'
      this._tools.style.borderBottom = '5px solid #0c5cc4'
      this.style.outline = '1px solid black'
      this._title.style.cursor = 'move'
      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)
    })

    // eventlistner for this._bigWindow
    this._bigWindow.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      this.style.position = 'static'
      this.style.resize = 'none'
      this.style.border = 'none'
      this.style.outline = '0'
      this._welcome.style.height = '60vh'
      this._tools.style.border = '5px solid #0c5cc4'
      this._newMessage.style.border = '5px solid #0c5cc4'
      // this.style.height = '100%'

      const myEvent = new window.CustomEvent('bigWindow')
      this.dispatchEvent(myEvent)
    })

    // eventlistner for this._hideWindow
    this._hideWindow.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      this.setAttribute('data-hide', 'true')

      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)

      const myEvent2 = new window.CustomEvent('hideWindow')
      this.dispatchEvent(myEvent2)
    })

    // eventlistner for this._input
    this._input.addEventListener('input', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }

      this._message = this._input.value
    })

    // eventlistner for this._deletChat
    this._deletChat.addEventListener('click', (event) => {
      event.preventDefault()

      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)

      const myEvent2 = new window.CustomEvent('deletedWindow')
      this.dispatchEvent(myEvent2)

      // Close websocket
      this._socket.close()
      this.remove()
    })

    // eventlistner for this._send
    this._send.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }

      const post = {
        type: this._type,
        data: this._message,
        username: this._username,
        channel: this._channel,
        key: this._chatKey
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

    // eventlistner for this._socket
    this._socket.addEventListener('open', event => {
      // console.log('websocket in action/JM')
      this._socket.send(JSON.stringify(this._data))
    })

    // listning for message from other users
    this._socket.addEventListener('message', event => {
      const dataParse = JSON.parse(event.data)
      const d = window.moment().format('MMMM Do YYYY, h:mm:ss a')

      const p1 = document.createElement('p')
      const p2 = document.createElement('p')
      const p3 = document.createElement('p')
      const p4 = document.createElement('p')
      const p5 = document.createElement('p')
      if (dataParse.username !== 'The Server') {
        const messages = JSON.parse(window.sessionStorage.getItem('messages')) || []
        /*
        console.log(window.sessionStorage.getItem('messages').lenght)
        if (window.sessionStorage.getItem('messages').lenght >= 10) {
          window.sessionStorage.removeItem('messages')
        }
        */

        dataParse.date = d
        messages.push(dataParse)
        window.sessionStorage.setItem('messages', JSON.stringify(messages))

        p1.textContent = `Date: ${d}`
        p2.textContent = `Username: ${dataParse.username}`
        p3.textContent = `Channel: ${dataParse.channel}`
        p4.textContent = `Data: ${dataParse.data}`
        p5.textContent = `Type: ${dataParse.type}`
        this._messages.appendChild(p1)
        this._messages.appendChild(p2)
        this._messages.appendChild(p3)
        this._messages.appendChild(p4)
        this._messages.appendChild(p5)
        this._messages.appendChild(document.createElement('hr'))
        this._messages.appendChild(document.createElement('br'))

        const tempStr = `/chat-app/${this.getAttribute('id')}`

        if (this._scrollKey && tempStr === window.location.pathname) {
          this.scrollIntoView(false)
        }
      }
    })

    // close WS
    this._closeLiveChat.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      console.log('ws offline')
      this._socket.close()
      this._onlineStatus.innerText = 'You are offline'
    })
  }

  /**
   * @memberof Chat
   */
  disconnectedCallback () {
    console.log('Goodby from element')
    const myEvent = new window.CustomEvent('disconnectedElement')
    this.dispatchEvent(myEvent)
  }
}

// Registers the custom event
window.customElements.define('chat-app', Chat)
