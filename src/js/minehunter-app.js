const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="minehunterConteiner">
    <div id="memoryTools">
      <button id="deletMinehunter">Delet</button>
    </div>  
    <div id="gameField">
    </div>
</div>
<style>
:host {
    position: absolute;
    width: 30%;
}
:host #minehunterConteiner {
    background-color: black;
    border: 5px solid black;
}
:host #minehunterConteiner:hover {
    border: 5px solid blue;
}
:host #minehunterConteiner, :host #gameField {
    width: 100%;
} 
</style>
`

/**
 * Class for memory-app
 * @export
 * @class Memory
 * @extends {window.HTMLElement}
 */
export class Minehunter extends window.HTMLElement {
  constructor () {
    super()

    // Creatig shadowroot
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._gameField = this.shadowRoot.querySelector('#gameField')
    this._quantityOfBricks = 16
    this._mines = []
    this.createBricks()

    // Tools memory
    this._deletMinehunter = this.shadowRoot.querySelector('#deletMinehunter')
  }

  createBricks () {
    // Building new memory
    this._gameField.innerHTML = ''
    for (let i = 0; i < this._quantityOfBricks; i++) {
      const img = document.createElement('img')
      img.setAttribute('src', '../imageMinehunter/black.png')
      const idAttribute = `${i}`
      img.setAttribute('id', idAttribute)
      img.style.width = '25%'
      img.style.border = '2px solid white'
      img.style.boxSizing = 'border-box'
      this._gameField.appendChild(img)
    }
  }

  setMines (mines) {
    for (let i = 0; i < Math.sqrt(this._quantityOfBricks); i++) {
      const arr = []
      for (let j = 0; j < Math.sqrt(this._quantityOfBricks); j++) {
        const img = document.createElement('img')
        img.setAttribute('src', '../imageMinehunter/mine.png')
        arr.push(img)
      }
      this._mines.push(arr)
    }
    return this._mines
  }

  connectedCallback () {
    // event for deletbutton
    this._deletMinehunter.addEventListener('click', event => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })

    // event for gamefield
    this._gameField.addEventListener('click', event => {
      event.preventDefault()
      console.log(this.setMines())
    })
  }
}

// Registers the custom event
window.customElements.define('minehunter-app', Minehunter)
