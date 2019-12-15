const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="minehunterConteiner">
    <div id="memoryTools">
      <button id="deletMinehunter">Delet</button>
      <button id="restartMinehunter">Restart</button>
      <select id="sizeMinehunter" name="size">
        <option value="">Size</option>
        <option value="16">16 bricks</option>
        <option value="36">36 bricks</option>
        <option value="64">64 bricks</option>
        <option value="100">100 bricks</option>
      </select>
      <select id="levelMinehunter" name="size">
        <option value="">Level</option>
        <option value="0">Easy</option>
        <option value="1">Medium</option>
        <option value="2">Hard</option>
      </select>
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
  /**
   *Creates an instance of Minehunter.
   * @memberof Minehunter
   */
  constructor () {
    super()

    // Creatig shadowroot
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._gameField = this.shadowRoot.querySelector('#gameField')
    this._quantityOfBricks = 16
    this._level = [1, 2, 3]
    this._mines = this.setMines()
    this.setGamefield()

    // Tools memory
    this._deletMinehunter = this.shadowRoot.querySelector('#deletMinehunter')
    this._restartMinehunter = this.shadowRoot.querySelector('#restartMinehunter')
    this._sizeMinehunter = this.shadowRoot.querySelector('#sizeMinehunter')
    this._levelMinehunter = this.shadowRoot.querySelector('#levelMinehunter')
  }

  /**
   *
   * @memberof Minehunter
   */
  setGamefield (bricks = this._quantityOfBricks) {
    // Building new memory
    this._gameField.innerHTML = ''
    for (let i = 0; i < bricks; i++) {
      const img = document.createElement('img')
      img.setAttribute('src', '../imageMinehunter/black.png')
      const idAttribute = `${i}`
      img.setAttribute('id', idAttribute)
      const widthProperty = `${100 / Math.sqrt(bricks)}%`
      img.style.width = widthProperty
      img.style.border = '2px solid white'
      img.style.boxSizing = 'border-box'
      this._gameField.appendChild(img)
    }
  }

  /**
   * @param {*} mines
   * @returns
   * @memberof Minehunter
   */
  setMines (mines = Math.sqrt(this._quantityOfBricks) * this._level[0]) {
    // Save mines in array with a number in [0,this._quantityOfBricks]
    const mineArr = []
    for (let i = 0; i < mines; i++) {
      let number = Math.floor(Math.random() * this._quantityOfBricks)
      while (mineArr.includes(number)) {
        number = Math.floor(Math.random() * this._quantityOfBricks)
      }
      mineArr.push(number)
    }
    console.log('mineArr/JM')
    console.log(mineArr)

    const arr = []
    for (let i = 0; i < this._quantityOfBricks; i++) {
      const img = document.createElement('img')
      if (mineArr.includes(i)) {
        img.setAttribute('src', '../imageMinehunter/mine.png')
      } else {
        img.setAttribute('src', '../imageMinehunter/white.png')
      }
      arr.push(img)
    }

    return arr
  }

  /**
   * @memberof Minehunter
   */
  connectedCallback () {
    // event for deletbutton
    this._deletMinehunter.addEventListener('click', event => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })

    // event for restartButton
    this._restartMinehunter.addEventListener('click', event => {
      event.preventDefault()
      this.setGamefield()
    })

    // event for sizeButton
    this._sizeMinehunter.addEventListener('click', event => {
      event.preventDefault()
      console.log('test this._sizeMemory event/JM')
      console.log(this._sizeMinehunter.value)
      this._quantityOfBricks = this._sizeMinehunter.value
      this.setGamefield(this._quantityOfBricks)
      this._mines = this.setMines(Math.sqrt(this._quantityOfBricks))
    })

    // event for levelButton
    this._levelMinehunter.addEventListener('click', event => {
      event.preventDefault()
      console.log('this._levelMinehunter.value/JM')
      console.log(this._levelMinehunter.value)

      // set level for game
      this._mines = this.setMines(Math.sqrt(this._quantityOfBricks) * this._level[this._levelMinehunter.value])
    })

    // event for gamefield
    this._gameField.addEventListener('click', event => {
      event.preventDefault()
      console.log(this._mines)
      console.log(event.target.id)
      const srcAttribute = this._mines[event.target.id].getAttribute('src')
      event.target.setAttribute('src', srcAttribute)
      event.target.style.border = '2px solid black'
    })
  }
}

// Registers the custom event
window.customElements.define('minehunter-app', Minehunter)
