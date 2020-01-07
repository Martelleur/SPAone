const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="timeContainer">
  <input type="text" id="counter">
</div>
<style>
  :host #timeContainer, :host #counter{
      width: 100%;
      text-align: center;
  }
</style>
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
      if (newValue === 'remove') {
        clearInterval(this._temp)
        this.remove()
      }
      if (newValue === 'freeze') {
        clearInterval(this._temp)
        console.log('this._counter.value')
        console.log(this._counter.value)
        window.sessionStorage.setItem('timecountervalue', this._counter.value)
      }
    }
  }

  connectedCallback () {
    this.timeCounterMethod()
  }

  disconnectedCallback () {
    console.log('Element removed from dom')
  }

  timeCounterMethod () {
    this._temp = setInterval(() => {
      this._counter.value = this._counterTotal
      this._counterTotal = this._counterTotal + 1
    }, 1000)
  }
}

// Registers the custom event
window.customElements.define('timecounter-app', TimeCounter)
