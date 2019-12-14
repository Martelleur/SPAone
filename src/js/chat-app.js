const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="chatConteiner">
<form action="">
    <fieldset id="chatTools">
        <button id="deletChat">Delet chat</button>
    </fieldset>

    <fieldset id="chatTitle"></fieldset>
    
    <fieldset id="messages"></fieldset>
    
    <fieldset id="newMessage">
        <input type="text" id="inputUser" placeholder="Write message here...">
        <input type="submit" id="sendButton" value="Send">
    </fieldset>
</form>
</div>
<style>
:host {
    position: absolute;
    width: 30%;
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
  }

  static get observedAttributes () {
    return ['id']
  }

  attributeChangedCallback (name, oldValue, newValue) {
  }

  connectedCallback () {
    // eventlistner for this._input
    this._input.addEventListener('input', (event) => {
      this._message = this._input.value
      console.log(this._input.value)
    })

    // eventlistner for this._input
    this._deletChat.addEventListener('click', (event) => {
      event.preventDefault()
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
      console.log('LETS GO')
    })
  }
}

// Registers the custom event
window.customElements.define('chat-app', Chat)
