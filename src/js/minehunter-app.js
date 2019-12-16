const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="minehunterConteiner">
    <div id="memoryTools">
      <button id="deletMinehunter">Delet</button>
      <button id="restartMinehunter">Restart</button>
      <!--
      <select id="sizeMinehunter" name="size">
        <option value="">Size</option>
        <option value="16">16 bricks</option>
        <option value="36">36 bricks</option>
        <option value="64">64 bricks</option>
        <option value="100">100 bricks</option>
      </select>
      -->
      <select id="levelMinehunter" name="size">
        <option value="0">Medium</option>
        <option value="1">Hard</option>
        <option value="2">Impossible</option>
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
    this._quantityOfBricks = 100
    this._levels = [1, 2, 3]
    this._currentLevel = this._levels[0]
    this._mines = this.setMines()
    this.setGamefield()
    this._flagCounter = 0
    this._blackPictureCounter = 0

    // Tools memory
    this._deletMinehunter = this.shadowRoot.querySelector('#deletMinehunter')
    this._restartMinehunter = this.shadowRoot.querySelector('#restartMinehunter')
    this._sizeMinehunter = this.shadowRoot.querySelector('#sizeMinehunter')
    this._levelMinehunter = this.shadowRoot.querySelector('#levelMinehunter')
  }

  /**
   * @memberof Minehunter
   */
  isPlayerFinished () {
    // reset this._flagcounter and this._blackPictureCounter
    this._flagCounter = 0
    this._blackPictureCounter = 0

    for (let i = 0; i < this._quantityOfBricks; i++) {
      if (this._gameField.querySelectorAll('img')[i].getAttribute('src') === '../imageMinehunter/flag.png') {
        this._flagCounter++
      }
      if (this._gameField.querySelectorAll('img')[i].getAttribute('src') === '../imageMinehunter/black.png') {
        this._blackPictureCounter++
      }
    }
    console.log(`this._flagCounter: ${this._flagCounter}`)
    console.log(`this._blacPictureCounter: ${this._blackPictureCounter}`)

    // player have won
    if (this._blackPictureCounter === 0 && this._flagCounter === Math.sqrt(this._quantityOfBricks) * this._currentLevel) {
      console.log('CONGRATULATION!!!')
      window.setTimeout(() => {
        this._gameField.innerHTML = ''
        const congratulation = document.createElement('h3')
        congratulation.innerText = 'CONGRATULATION!'
        congratulation.style.textAlign = 'center'
        congratulation.style.color = 'white'
        this._gameField.appendChild(congratulation)
      }, 1000)
    }
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
    // if this tool implemented you need to change code in event for gamefield
    /*
    // event for sizeButton
    this._sizeMinehunter.addEventListener('click', event => {
      event.preventDefault()
      // console.log('test this._sizeMemory event/JM')
      // console.log(this._sizeMinehunter.value)
      this._quantityOfBricks = this._sizeMinehunter.value
      this.setGamefield(this._quantityOfBricks)
      this._mines = this.setMines()
    })
    */
    // event for levelButton
    this._levelMinehunter.addEventListener('change', event => {
      event.preventDefault()
      // console.log('this._levelMinehunter.value/JM')
      // console.log(this._levelMinehunter.value)

      // set level for game
      this.setGamefield()
      this._currentLevel = this._levels[this._levelMinehunter.value]
      this._mines = this.setMines()
    })

    // event for gamefield rightclick
    this._gameField.addEventListener('contextmenu', event => {
      event.preventDefault()

      // reset this._flagcounter and this._blackPictureCounter
      this._flagCounter = 0
      this._blackPictureCounter = 0

      if (event.target.getAttribute('src') === '../imageMinehunter/black.png') {
        event.target.setAttribute('src', '../imageMinehunter/flag.png')
      } else if (event.target.getAttribute('src') === '../imageMinehunter/flag.png') {
        event.target.setAttribute('src', '../imageMinehunter/black.png')
      }

      this.isPlayerFinished()
    })

    // event for gamefield
    this._gameField.addEventListener('click', event => {
      event.preventDefault()
      // console.log(event.target.tagName)

      // if user not click on a img-tag
      if (event.target.tagName !== 'IMG') {
        console.log('Not an image-tag')
        return
      }

      // user can not click ona a white picture to open neighbour picture
      if (event.target.getAttribute('src') === '../imageMinehunter/white.png') {
        console.log('white picture')
        return
      }
      // console.log('this._mines array/JM')
      // console.log(this._mines)
      // console.log(event.target.id)
      const srcAttribute = this._mines[event.target.id].getAttribute('src')
      event.target.setAttribute('src', srcAttribute)
      event.target.style.border = '2px solid black'
      // console.log(srcAttribute)

      // If user click on mine user lose
      if (srcAttribute === '../imageMinehunter/mine.png') {
        // console.log('You lose')

        window.setTimeout(() => {
          this.setGamefield()
          this._mines = this.setMines()
        }, 2000)

        return
      }

      // reconstruct this._mines to an array of arrays
      const newMinesArray = this.reconstructArray(this._mines)
      // console.log('newMinesArray/JM')
      // console.log(newMinesArray)

      const quantityOfBricks = this._gameField.querySelectorAll('img').length

      const imageArr = []
      for (let i = 0; i < quantityOfBricks; i++) {
        imageArr.push(this._gameField.querySelectorAll('img')[i])
      }

      // reconstruct imageArray to an array of arrays
      const newImageArray = this.reconstructArray(imageArr)
      // console.log('newImageArray/JM')
      // console.log(newImageArray)

      // Only if gamefield 10 * 10
      const indexLenght = event.target.id.length
      const indexNumber = event.target.id[indexLenght - 1]
      const arrayNumber = event.target.id[indexLenght - 2] || 0
      // console.log(`indexNumber: ${indexNumber}`)
      // console.log(`arrayNumber: ${arrayNumber}`)
      // console.log(typeof indexNumber)
      // console.log(typeof indexNumber)

      // Open up neighboutbricks
      const executeArray = [true, true, true, true]
      for (let i = 0; i < 9; i++) {
      // New neighbourbricks
        const neighbourIndex1 = Number(indexNumber) + i
        const neighbourIndex2 = Number(indexNumber) - i

        for (let j = 0; j < 9; j++) {
          // Neighbourarrays
          const neighbourArray1 = Number(arrayNumber) + j
          const neighbourArray2 = Number(arrayNumber) - j
          if (executeArray[0]) {
            try {
              if (newMinesArray[neighbourArray1][neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png') {
                newImageArray[neighbourArray1][neighbourIndex1].setAttribute('src', '../imageMinehunter/white.png')
                newImageArray[neighbourArray1][neighbourIndex1].style.border = '2px solid black'
              } else {
                executeArray[0] = false
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
          }
          if (executeArray[1]) {
            try {
              if (newMinesArray[neighbourArray1][neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png') {
                newImageArray[neighbourArray1][neighbourIndex2].setAttribute('src', '../imageMinehunter/white.png')
                newImageArray[neighbourArray1][neighbourIndex2].style.border = '2px solid black'
              } else {
                executeArray[1] = false
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
          }
          if (executeArray[2]) {
            try {
              if (newMinesArray[neighbourArray2][neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png') {
                newImageArray[neighbourArray2][neighbourIndex1].setAttribute('src', '../imageMinehunter/white.png')
                newImageArray[neighbourArray2][neighbourIndex1].style.border = '2px solid black'
              } else {
                executeArray[2] = false
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
          }
          if (executeArray[3]) {
            try {
              if (newMinesArray[neighbourArray2][neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png') {
                newImageArray[neighbourArray2][neighbourIndex2].setAttribute('src', '../imageMinehunter/white.png')
                newImageArray[neighbourArray2][neighbourIndex2].style.border = '2px solid black'
              } else {
                executeArray[3] = false
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
          }
        }
      }

      // Check surrounding of white picture and set new picture if mines surrounder it
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          let counter = 0
          // console.log(newImageArray[i][j])
          if (newImageArray[i][j].getAttribute('src') === '../imageMinehunter/white.png') {
            try {
              if (newMinesArray[i][j + 1].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            try {
              if (newMinesArray[i][j - 1].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            try {
              if (newMinesArray[i + 1][j + 1].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            try {
              if (newMinesArray[i + 1][j - 1].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            try {
              if (newMinesArray[i - 1][j + 1].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            try {
              if (newMinesArray[i - 1][j - 1].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            try {
              if (newMinesArray[i + 1][j].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            try {
              if (newMinesArray[i - 1][j].getAttribute('src') === '../imageMinehunter/mine.png') {
                counter++
              }
            } catch (error) {
              // console.log(error)
              // console.log('not an index')
            }
            // console.log(counter)
            // set new picture if counter have changed to 1... ...8
            if (counter === 1) {
              // console.log('counter === 1')
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/one.png')
            }
            if (counter === 2) {
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/two.png')
            }
            if (counter === 3) {
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/three.png')
            }
            if (counter === 4) {
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/foure.png')
            }
            if (counter === 5) {
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/five.png')
            }
            if (counter === 6) {
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/six.png')
            }
            if (counter === 7) {
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/seven.png')
            }
            if (counter === 8) {
              newImageArray[i][j].setAttribute('src', '../imageMinehunter/eight.png')
            }
          }
        }
      }

      this.isPlayerFinished()
    })
  }
}

// Registers the custom event
window.customElements.define('minehunter-app', Minehunter)
