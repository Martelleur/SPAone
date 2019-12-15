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
    this._levels = [1, 2, 3]
    this._currentLevel = this._levels[0]
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
  setMines (mines = Math.sqrt(this._quantityOfBricks) * this._currentLevel) {
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
      this._mines = this.setMines()
    })

    // event for sizeButton
    this._sizeMinehunter.addEventListener('click', event => {
      event.preventDefault()
      // console.log('test this._sizeMemory event/JM')
      // console.log(this._sizeMinehunter.value)
      this._quantityOfBricks = this._sizeMinehunter.value
      this.setGamefield(this._quantityOfBricks)
      this._mines = this.setMines()
    })

    // event for levelButton
    this._levelMinehunter.addEventListener('click', event => {
      event.preventDefault()
      // console.log('this._levelMinehunter.value/JM')
      // console.log(this._levelMinehunter.value)

      // set level for game
      this._currentLevel = this._levels[this._levelMinehunter.value]
      this._mines = this.setMines()
    })

    // event for gamefield
    this._gameField.addEventListener('click', event => {
      event.preventDefault()
      console.log('this._mines array/JM')
      console.log(this._mines)
      console.log(event.target.id)
      const srcAttribute = this._mines[event.target.id].getAttribute('src')
      event.target.setAttribute('src', srcAttribute)
      event.target.style.border = '2px solid black'
      console.log(srcAttribute)

      // If user click on mine user lose
      if (srcAttribute === '../imageMinehunter/mine.png') {
        console.log('You lose')

        window.setTimeout(() => {
          this.setGamefield()
          this._mines = this.setMines()
        }, 2000)

        return
      }

      // Reconstruct this._mines to an arrar of arrays
      const newArray = []
      let innerArray = []
      for (let i = 0; i < this._mines.length; i++) {
        if (innerArray.length === Math.sqrt(this._mines.length)) {
          newArray.push(innerArray)
          innerArray = []
          innerArray.push(this._mines[i])
        } else if (i === (this._mines.length - 1)) {
          innerArray.push(this._mines[i])
          newArray.push(innerArray)
        } else {
          innerArray.push(this._mines[i])
        }
      }
      console.log('newArray/JM')
      console.log(newArray)

      const quantityOfBricks = this._gameField.querySelectorAll('img').length

      const imageArr = []
      for (let i = 0; i < quantityOfBricks; i++) {
        imageArr.push(this._gameField.querySelectorAll('img')[i])
      }

      // neighbourbricks
      console.log(this._mines)
      const neighbourIndex1 = Number(event.target.id) + 1
      const neighbourIndex2 = Number(event.target.id) - 1
      const neighbourIndex3 = Number(event.target.id) + Math.sqrt(quantityOfBricks)
      const neighbourIndex4 = Number(event.target.id) - Math.sqrt(quantityOfBricks)
      const neighbourIndex5 = Number(event.target.id) + Math.sqrt(quantityOfBricks) + 1
      const neighbourIndex6 = Number(event.target.id) + Math.sqrt(quantityOfBricks) - 1
      const neighbourIndex7 = Number(event.target.id) - Math.sqrt(quantityOfBricks) + 1
      const neighbourIndex8 = Number(event.target.id) - Math.sqrt(quantityOfBricks) - 1
      console.log(neighbourIndex1)

      // open upp neighbourbricks if they have src = ../imageMinehunter/white.png
      if (this._mines[neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex1].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex1].style.border = '2px solid black'
      }
      if (this._mines[neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex2].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex2].style.border = '2px solid black'
      }
      if (this._mines[neighbourIndex3].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex3].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex3].style.border = '2px solid black'
      }
      if (this._mines[neighbourIndex4].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex4].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex4].style.border = '2px solid black'
      }
      if (this._mines[neighbourIndex5].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex5].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex5].style.border = '2px solid black'
      }
      if (this._mines[neighbourIndex6].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex6].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex6].style.border = '2px solid black'
      }
      if (this._mines[neighbourIndex7].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex7].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex7].style.border = '2px solid black'
      }
      if (this._mines[neighbourIndex8].getAttribute('src') === '../imageMinehunter/white.png') {
        imageArr[neighbourIndex8].setAttribute('src', '../imageMinehunter/white.png')
        imageArr[neighbourIndex8].style.border = '2px solid black'
      }
    })
  }
}

// Registers the custom event
window.customElements.define('minehunter-app', Minehunter)
