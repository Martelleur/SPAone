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
   * Math.sqrt(array.length)) need to be even
   * @param {*} array
   * @returns
   * @memberof Minehunter
   */
  reconstructArray (array) {
    const newArray = []
    let innerArray = []
    for (let i = 0; i < array.length; i++) {
      if (innerArray.length === Math.sqrt(array.length)) {
        newArray.push(innerArray)
        innerArray = []
        innerArray.push(array[i])
      } else if (i === (array.length - 1)) {
        innerArray.push(array[i])
        newArray.push(innerArray)
      } else {
        innerArray.push(array[i])
      }
    }

    return newArray
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

      // reconstruct this._mines to an array of arrays
      const newMinesArray = this.reconstructArray(this._mines)
      console.log('newMinesArray/JM')
      console.log(newMinesArray)

      const quantityOfBricks = this._gameField.querySelectorAll('img').length

      const imageArr = []
      for (let i = 0; i < quantityOfBricks; i++) {
        imageArr.push(this._gameField.querySelectorAll('img')[i])
      }

      // reconstruct imageArray to an array of arrays
      const newImageArray = this.reconstructArray(imageArr)
      console.log('newImageArray/JM')
      console.log(newImageArray)

      // Only if gamefield 10 * 10
      const indexLenght = event.target.id.length
      const indexNumber = event.target.id[indexLenght - 1]
      const arrayNumber = event.target.id[indexLenght - 2] || 0
      console.log(`indexNumber: ${indexNumber}`)
      console.log(`arrayNumber: ${arrayNumber}`)
      console.log(typeof indexNumber)
      console.log(typeof indexNumber)

      // Open up neighboutbricks
      const stopArray = [true, true, true, true, true, true, true, true, true, true, true, true]
      for (let i = 0; i < 9; i++) {
      // New neighbourbricks
        const neighbourIndex1 = Number(indexNumber) + i + 1
        const neighbourIndex2 = Number(indexNumber) - i - 1
        const neighbourIndex3 = Number(indexNumber) + 1
        const neighbourIndex4 = Number(indexNumber) - 1
        const neighbourArray1 = Number(arrayNumber) + i + 1
        const neighbourArray2 = Number(arrayNumber) - i - 1
        const neighbourArray3 = Number(arrayNumber) + 1
        const neighbourArray4 = Number(arrayNumber) - 1

        if (stopArray[0]) {
          try {
            if (newMinesArray[Number(arrayNumber)][neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[Number(arrayNumber)][neighbourIndex1].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[Number(arrayNumber)][neighbourIndex1].style.border = '2px solid black'
            } else {
              stopArray[0] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[1]) {
          try {
            if (newMinesArray[Number(arrayNumber)][neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[Number(arrayNumber)][neighbourIndex2].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[Number(arrayNumber)][neighbourIndex2].style.border = '2px solid black'
            } else {
              stopArray[1] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[2]) {
          try {
            if (newMinesArray[neighbourArray1][Number(indexNumber)].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray1][Number(indexNumber)].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray1][Number(indexNumber)].style.border = '2px solid black'
            } else {
              stopArray[2] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[3]) {
          try {
            if (newMinesArray[neighbourArray2][Number(indexNumber)].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray2][Number(indexNumber)].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray2][Number(indexNumber)].style.border = '2px solid black'
            } else {
              stopArray[3] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[4]) {
          try {
            if (newMinesArray[neighbourArray3][neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray3][neighbourIndex1].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray3][neighbourIndex1].style.border = '2px solid black'
            } else {
              stopArray[4] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[5]) {
          try {
            if (newMinesArray[neighbourArray4][neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray4][neighbourIndex1].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray4][neighbourIndex1].style.border = '2px solid black'
            } else {
              stopArray[5] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[6]) {
          try {
            if (newMinesArray[neighbourArray3][neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray3][neighbourIndex2].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray3][neighbourIndex2].style.border = '2px solid black'
            } else {
              stopArray[6] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[7]) {
          try {
            if (newMinesArray[neighbourArray4][neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray4][neighbourIndex2].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray4][neighbourIndex2].style.border = '2px solid black'
            } else {
              stopArray[7] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[8]) {
          try {
            if (newMinesArray[neighbourArray1][neighbourIndex3].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray1][neighbourIndex3].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray1][neighbourIndex3].style.border = '2px solid black'
            } else {
              stopArray[8] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[9]) {
          try {
            if (newMinesArray[neighbourArray1][neighbourIndex4].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray1][neighbourIndex4].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray1][neighbourIndex4].style.border = '2px solid black'
            } else {
              stopArray[9] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[10]) {
          try {
            if (newMinesArray[neighbourArray2][neighbourIndex3].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray2][neighbourIndex3].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray2][neighbourIndex3].style.border = '2px solid black'
            } else {
              stopArray[10] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
        if (stopArray[11]) {
          try {
            if (newMinesArray[neighbourArray2][neighbourIndex4].getAttribute('src') === '../imageMinehunter/white.png') {
              newImageArray[neighbourArray2][neighbourIndex4].setAttribute('src', '../imageMinehunter/white.png')
              newImageArray[neighbourArray2][neighbourIndex4].style.border = '2px solid black'
            } else {
              stopArray[11] = false
            }
          } catch (error) {
            console.log(error)
            console.log('not an index')
          }
        }
      }
    })
  }
}

// Registers the custom event
window.customElements.define('minehunter-app', Minehunter)
