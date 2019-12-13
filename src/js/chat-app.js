export class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this._template = document.querySelector('#chatTemplate')
    this._templateImport = document.importNode(this._template.content, true)
    this.shadowRoot.appendChild(this._templateImport)
    this._send = this.shadowRoot.querySelector('#sendButton')
    this._input = this.shadowRoot.querySelector('#inputUser')
    this._messages = this.shadowRoot.querySelector('#messages')
    this._message = undefined
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

    // eventlistner for this._send
    this._send.addEventListener('click', (event) => {
      event.preventDefault()
      const p = document.createElement('p')
      p.innerText = this._message
      this._messages.appendChild(p)
      console.log('LETS GO')
    })
  }
}

// Registers the custom event
window.customElements.define('chat-app', Chat)
