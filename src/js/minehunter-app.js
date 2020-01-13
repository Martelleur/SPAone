import './chat-app.js'
import './timecounter-app.js'

const template = document.createElement('template')
template.innerHTML = /* html */ `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<div id="minehunterConteiner">
  <p id="title"></p>
    <div id="tools">
      <button id="restartMinehunter" class="button">Restart</button>
      <button id="chat" class="button">Chat</button>
      <select id="levelMinehunter" class="button" name="size">
        <option value="0">Medium</option>
        <option value="1">Hard</option>
        <option value="2">Impossible</option>
      </select>
      <button id="highscore" class="button">Highscore</button>
      <i id="deletMinehunter" class="material-icons">close</i>
      <i id="bigWindow" class="material-icons">add_box</i>
      <i id="adjustableWindow" class="material-icons">exposure</i>
      <i id="hideWindow" class="material-icons">indeterminate_check_box</i>
    </div>
    
    <div class=timeConteiner></div>
    
    <div id="gameField">
      <button id="start">Click me to start the game</button>
      <p>Rules: Clicks on a square with the left mouse button. The click reveals a number, each number tells you how many mines touch the square. You can mark a mine by putting a flag on it with the right mouse button.
      You win by clearing all the safe squares and lose if you click on a mine. A time counter keeps track of your score. There are three levels of difficulty: medium has 10 mines, hard has 20 mines, and impossible has 30 mines.</p> 
    </div>
    
    <div id="gameFooter"></div>
</div>
<div id="chatConteiner"></div>
<style>
* {
    box-sizing: border-box;
}
:host {
    position: absolute;
    width: 50%;
    hight: 50%;
    display: block;
    resize: both;
    overflow: auto;
    box-sizing: border-box;
    border: 5px solid #0c5cc4;
    background-color: black;
    color: white;
    outline: 1px solid black;
    z-index: 0;
}
:host #restartMinehunter, :host #levelMinehunter {
  display: none;
}
:host #minehunterConteiner, :host #gameField {
    width: 100%;
} 
:host #minehunterConteiner {
  background-color: black;
}
:host #title {
  text-align: center;
  background-color: #0c5cc4;
  color: white;
  padding: 0;
  margin: 0;
}
:host #gameField {
  padding: 5%;
}
:host #tools {
  padding: 0;
  padding-top: 3px;
  padding-left: 3px;
}
:host #title {
  cursor: move;
}
:host #start {
  display: block;
  margin: 0 auto;
  cursor: pointer;
}
:host #gameFooter {
  padding: 5%;
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
    this._minehunterConteiner = this.shadowRoot.querySelector('#minehunterConteiner')
    this._quantityOfBricks = 100
    this._levels = [1, 2, 3]
    this._currentLevel = this._levels[0]
    this._flagCounter = 0
    this._blackPictureCounter = 0
    this._gameFooter = this.shadowRoot.querySelector('#gameFooter')
    this._chatConteiner = this.shadowRoot.querySelector('#chatConteiner')
    this._timeConteiner = this.shadowRoot.querySelector('.timeConteiner')
    this._counter = document.createElement('timecounter-app')
    this._title = this.shadowRoot.querySelector('#title')
    this._isStarting = false

    // Tools memory
    this._start = this.shadowRoot.querySelector('#start')
    this._tools = this.shadowRoot.querySelector('#tools')
    this._chat = this.shadowRoot.querySelector('#chat')
    this._hideWindow = this.shadowRoot.querySelector('#hideWindow')
    this._adjustableWindow = this.shadowRoot.querySelector('#adjustableWindow')
    this._bigWindow = this.shadowRoot.querySelector('#bigWindow')
    this._deletMinehunter = this.shadowRoot.querySelector('#deletMinehunter')
    this._restartMinehunter = this.shadowRoot.querySelector('#restartMinehunter')
    this._sizeMinehunter = this.shadowRoot.querySelector('#sizeMinehunter')
    this._levelMinehunter = this.shadowRoot.querySelector('#levelMinehunter')
    this._highscore = this.shadowRoot.querySelector('#highscore')
  }

  /**
   * @readonly
   * @static
   * @memberof Minehunter
   */
  static get observedAttributes () {
    return ['id', 'data-hide', 'data-zedindex']
  }

  /**
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof Minehunter
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'data-zedindex') {
      if (newValue === 'high') {
        this.style.zIndex = '1'
        console.log('zIndex: 1')
      } else {
        this.style.zIndex = '0'
        console.log('zIndex: 0')
      }
    }
    if (name === 'id') {
      this._title.innerText = `${this.getAttribute('id')}-minehunter-app`
    }
    if (name === 'data-hide') {
      if (newValue === 'true') {
        this.style.display = 'none'
      }
      if (newValue === 'false') {
        this.style.display = 'initial'
      }
    }
  }

  /**
   * @memberof Minehunter
   */
  connectedCallback () {
    // eventlistner for this._highscore
    this._highscore.addEventListener('click', event => {
      event.preventDefault()
      this._gameFooter.innerHTML = ''
      const p = document.createElement('p')
      const argument = `highScoreMinehunter${this._currentLevel}`
      p.textContent = `Top 5 result level ${this._currentLevel}:`
      this._gameFooter.appendChild(p)
      const highscore = JSON.parse(window.localStorage.getItem(argument)) || []
      const tempArray = []
      for (let i = 0; i < highscore.length; i++) {
        tempArray.push(highscore[i].result)
      }
      console.log(tempArray.sort((a, b) => a - b))
      if (tempArray.length !== 0) {
        for (let i = 0; i < tempArray.length; i++) {
          const p = document.createElement('p')
          p.textContent = `Number${i + 1}, result: ${tempArray[i]}`
          this._gameFooter.appendChild(p)
          if (i === 4) {
            break
          }
        }
      } else {
        const p = document.createElement('p')
        p.textContent = 'No result'
        this._gameFooter.appendChild(p)
      }
    })

    // eventlistner for this._start
    this._start.addEventListener('click', event => {
      event.preventDefault()
      this._isStarting = true
      this._gameField.innerHTML = ''
      this.style.height = 'initial'
      this._minehunterConteiner.style.height = 'initial'
      this._restartMinehunter.style.display = 'initial'
      this._levelMinehunter.style.display = 'initial'
      this._mines = this.setMines()
      this.setGamefield()
      this._timeConteiner.appendChild(this._counter)
    }, { once: true })

    // eventlistner for this._chat
    this._chat.addEventListener('click', (event) => {
      event.preventDefault()
      // Only one chat can be created
      if (this._chatConteiner.childElementCount === 1) {
        return
      }
      const chat = document.createElement('chat-app')
      chat.setAttribute('data-freezewindow', 'true')
      console.log(chat.getAttribute('data-freezewindow'))
      this._chatConteiner.appendChild(chat)
      this._chatConteiner.appendChild(chat)
    })

    // eventlistner for this._adjustableWindow
    this._adjustableWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.style.position = 'absolute'
      this.style.resize = 'both'
      this.style.border = '5px solid #0c5cc4'
      this.style.outline = '1px solid black'
      this.style.height = 'initial'
      this._minehunterConteiner.style.height = 'initial'
      this._minehunterConteiner.style.border = 'none'
      this._title.style.cursor = 'move'
      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)
    })

    // eventlistner for this._bigWindow
    this._bigWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.style.position = 'static'
      if (!this._isStarting) {
        this.style.height = '100%'
        this._minehunterConteiner.style.height = '100%'
      }
      this.style.resize = 'none'
      this.style.border = 'none'
      this.style.outline = 'none'
      this._minehunterConteiner.style.border = '5px solid #0c5cc4'
      this._title.style.cursor = 'default'
      const myEvent = new window.CustomEvent('bigWindow')
      this.dispatchEvent(myEvent)
    })

    // eventlistner for this._hideWindow
    this._hideWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.setAttribute('data-hide', 'true')

      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)

      const myEvent2 = new window.CustomEvent('hideWindow')
      this.dispatchEvent(myEvent2)
    })

    // event for deletbutton
    this._deletMinehunter.addEventListener('click', event => {
      event.preventDefault()
      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)
      this.remove()
      this._counter.setAttribute('state', 'remove')
    })

    // event for restartButton
    this._restartMinehunter.addEventListener('click', event => {
      event.preventDefault()
      this.setGamefield()
      this._mines = this.setMines()
      this._counter.setAttribute('state', 'remove')
      this._counter = document.createElement('timecounter-app')
      this._timeConteiner.appendChild(this._counter)
    })

    // event for levelButton
    this._levelMinehunter.addEventListener('change', event => {
      event.preventDefault()
      this.setGamefield()
      this._counter.setAttribute('state', 'remove')
      this._counter = document.createElement('timecounter-app')
      this._timeConteiner.appendChild(this._counter)
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

      // user can only click ona blackbricks not flags or white bricks
      if (event.target.getAttribute('src') !== '../imageMinehunter/black.png') {
        console.log('Not a black brick')
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
        // show user the hided mines
        for (let i = 0; i < this._quantityOfBricks; i++) {
          if (this._mines[i].getAttribute('src') === '../imageMinehunter/mine.png') {
            this._gameField.querySelectorAll('img')[i].setAttribute('src', '../imageMinehunter/mine.png')
          }
        }

        this._counter.setAttribute('state', 'freeze') // stop counter

        const sorry = document.createElement('h3')
        sorry.innerText = 'Sorry you loose!'
        sorry.style.textAlign = 'center'
        sorry.style.color = 'white'
        this._gameFooter.appendChild(sorry)

        /*
        window.setTimeout(() => {
          this.setGamefield()
          this._mines = this.setMines()
        }, 5000)
        */
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
      console.log('newImageArray/JM')
      console.log(newImageArray)

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
              if (newMinesArray[neighbourArray1][neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png' && newImageArray[neighbourArray1][neighbourIndex1].getAttribute('src') !== '../imageMinehunter/flag.png') {
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
              if (newMinesArray[neighbourArray1][neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png' && newImageArray[neighbourArray1][neighbourIndex2].getAttribute('src') !== '../imageMinehunter/flag.png') {
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
              if (newMinesArray[neighbourArray2][neighbourIndex1].getAttribute('src') === '../imageMinehunter/white.png' && newImageArray[neighbourArray2][neighbourIndex1].getAttribute('src') !== '../imageMinehunter/flag.png') {
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
              if (newMinesArray[neighbourArray2][neighbourIndex2].getAttribute('src') === '../imageMinehunter/white.png' && newImageArray[neighbourArray2][neighbourIndex2].getAttribute('src') !== '../imageMinehunter/flag.png') {
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
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
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
      console.log('CONGRATULATION!')

      // show user the hided mines
      window.setTimeout(() => {
        for (let i = 0; i < this._quantityOfBricks; i++) {
          if (this._mines[i].getAttribute('src') === '../imageMinehunter/mine.png') {
            this._gameField.querySelectorAll('img')[i].setAttribute('src', '../imageMinehunter/mine.png')
          }
        }

        // timeCounter stop
        const argument = `highScoreMinehunter${this._currentLevel}`
        const highscore = JSON.parse(window.localStorage.getItem(argument)) || []
        this._counter.setAttribute('state', 'freeze')
        const result = window.sessionStorage.getItem('timecountervalue')
        window.sessionStorage.removeItem('timecountervalue')
        const score = {
          result: result
        }
        highscore.push(score)
        window.localStorage.setItem(argument, JSON.stringify(highscore))

        const congratulation = document.createElement('h3')
        congratulation.innerText = `CONGRATULATION! Your time is: ${result}`
        congratulation.style.textAlign = 'center'
        congratulation.style.color = 'white'
        this._gameFooter.appendChild(congratulation)
      }, 2000)
    }
  }

  /**
   *
   * @memberof Minehunter
   */
  setGamefield (bricks = this._quantityOfBricks) {
    // Building new memory
    this._gameField.innerHTML = ''
    try {
      this._gameFooter.innerHTML = ''
    } catch (error) {
      console.log(error)
    }
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
}

// Registers the custom event
window.customElements.define('minehunter-app', Minehunter)
