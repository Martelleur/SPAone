const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="timeContainer">
  <input type="text" id="counter">
</div>
`

/**
 * @export
 * @class TimeCounter
 * @extends {window.HTMLElement}
 */
export class TimeCounter extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    // data
    this._counterTotal = 0
    this._uppdatingTotal = undefined
    this._counter = this.shadowRoot.querySelector('#counter')
    this._temp = undefined
  }

  static get observedAttributes () {
    return ['state']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'state') {
      if (newValue === 'false') {
        this.remove()
      }
      if (newValue === 'freeze') {
        this.remove()
      }
    }
  }

  connectedCallback () {
    this.timeCounterMethod()
  }

  disconnectedCallback () {
    console.log('Element removed from dom')
    clearInterval(this._temp)
  }

  timeCounterMethod () {
    this._temp = setInterval(() => {
      console.log(this._counterTotal)
      this._counter.value = this._counterTotal
      this._counterTotal = this._counterTotal + 1
    }, 1000)
  }
}

// Registers the custom event
window.customElements.define('timecounter-app', TimeCounter)
