import './timecounter-app.js'

const template = document.createElement('template')
template.innerHTML = /* html */ `
<div class=timeConteiner></div>
<div id="memoryConteiner">
  
  <div id="tools">
    <button id="deletMemory">Delet</button>
    <button id="restartMemory">Restart</button>
    <select id="sizeMemory" name="size">
      <option value="">Size</option>
      <option value="4">4 tiles</option>
      <option value="8">8 tiles</option>
      <option value="12">12 tiles</option>
      <option value="16">16 tiles</option>
    </select>
    <button id="highscore">Highscore</button>
    <button id="bigWindow">+</button>
    <button id="adjustableWindow">%</button>
    <button id="hideWindow">-</button>
    <p id="paires"></p>
  </div>
    
  <div id="memoryPictures">
    <button id="start">Click me to start the game</button>
    <p>Rules: Finish the meory as fast as you can. Result = time + tries. You can choice between 4 diffrent of sizes: 4 tiles, 8 tiles, 12 tiles and 16 tiles. Good luck!</p> 
  </div>
  
  <div id="gameFooter">
  </div>
</div>
<style>
* {
    box-sizing: border-box;
}
:host {
    position: absolute;
    width: 40%;
    display: block;
    resize: both;
    overflow: auto;
    border: 5px solid #0c5cc4;
    background-color: black;
}
:host #memoryConteiner {
    border: 5px solid black;
    color: white;
    padding: 5%;
    background-color: black;
} 
:host #memoryPictures:hover {
    cursor: pointer; 
}
:host #tools:hover {
  cursor: move; 
}
:host #sizeMemory, :host #restartMemory {
  display: none;
}
:host #start {
  display: block;
  margin: 0 auto;
} 
  </style>
`

/**
 * Class for memory-app
 * @export
 * @class Memory
 * @extends {window.HTMLElement}
 */
export class Memory extends window.HTMLElement {
  /**
   *Creates an instance of Memory.
   * @memberof Memory
   */
  constructor () {
    super()

    // Creatig shadowroot
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    // Tools memory
    this._start = this.shadowRoot.querySelector('#start')
    this._memoryTools = this.shadowRoot.querySelector('#tools')
    this._restartMemory = this.shadowRoot.querySelector('#restartMemory')
    this._deletMemory = this.shadowRoot.querySelector('#deletMemory')
    this._sizeMemory = this.shadowRoot.querySelector('#sizeMemory')
    this._hideWindow = this.shadowRoot.querySelector('#hideWindow')
    this._bigWindow = this.shadowRoot.querySelector('#bigWindow')
    this._adjustableWindow = this.shadowRoot.querySelector('#adjustableWindow')
    this._highscore = this.shadowRoot.querySelector('#highscore')

    // Data memory
    this._timeConteiner = this.shadowRoot.querySelector('.timeConteiner')
    this._counter = undefined
    this._memoryConteiner = this.shadowRoot.querySelector('#memoryConteiner')
    this._memoryPictures = this.shadowRoot.querySelector('#memoryPictures')
    this._rows = 4
    this._columns = 4
    this._numberOfPictures = this._rows * this._columns
    this._backOfTilesSrc = '../imageMemory/0.png'
    // this._tiles = this.shuffleTiles(this._rows, this._columns)
    this._paires = this.shadowRoot.querySelector('#paires')
    this._quantityOfPaires = 0
    this._tempArray = []
    this._paires.innerText = `Paires: ${this._quantityOfPaires}`
    this._gameFooter = this.shadowRoot.querySelector('#gameFooter')
    this._countHiddenPictures = 0
    this._tries = 0
    this._tools = this.shadowRoot.querySelector('#tools')

    // Building new memory
    // this.setTiles()
  }

  /**
   * @readonly
   * @static
   * @memberof Memory
   */
  static get observedAttributes () {
    return ['id', 'data-hide']
  }

  /**
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof Memory
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'id') {
      // console.log('test attributeChangedCallback/JM')
      const p = document.createElement('p')
      p.innerText = this.getAttribute('id')
      this._tools.appendChild(p)
      // console.log(this.getAttribute('id'))
    }
    if (name === 'data-hide') {
      // console.log(newValue)
      // console.log(oldValue)
      if (newValue === 'true') {
        this.style.display = 'none'
      }
      if (newValue === 'false') {
        this.style.display = 'initial'
      }
    }
  }

  /**
   * connectedCallback for memory-app
   * @memberof Memory
   */
  connectedCallback () {
    // eventlistner for this._highscore
    this._highscore.addEventListener('click', event => {
      event.preventDefault()
      this._gameFooter.innerHTML = ''
      this._paires.innerHTML = ''
      const p = document.createElement('p')
      const argument = `highScoreMemory${this._numberOfPictures}`
      p.textContent = `Top 5 result ${this._numberOfPictures} tiles memory:`
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
      this._gameFooter.innerHTML = ''
      this._memoryPictures.innerHTML = ''
      this._counter = document.createElement('timecounter-app')
      this._timeConteiner.appendChild(this._counter)
      this._restartMemory.style.display = 'initial'
      this._sizeMemory.style.display = 'initial'
      this._tiles = this.shuffleTiles(this._rows, this._columns)
      this.setTiles()
    })

    // eventlistner for this._adjustableWindow
    this._adjustableWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.style.position = 'absolute'
      this.style.resize = 'both'
      this.style.border = '5px solid #0c5cc4'
      this._memoryConteiner.style.border = '5px solid black'
      this._tools.style.cursor = 'move'
    })

    // eventlistner for this._bigWindow
    this._bigWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.style.position = 'static'
      this.style.resize = 'none'
      this.style.border = 'none'
      this._memoryConteiner.style.border = '5px solid #0c5cc4'
      this._tools.style.cursor = 'default'
    })

    // eventlistner for this._hideWindow
    this._hideWindow.addEventListener('click', (event) => {
      event.preventDefault()
      this.setAttribute('data-hide', 'true')
    })

    // eventlistner for this._memoryPictures
    this._memoryPictures.addEventListener('click', (event) => {
      event.preventDefault()
      if (event.target === this._start) {
        return
      }

      // player can not open more then two tiles
      if (this.countOpenTiles() > 1) {
        return
      }

      // if user click on a turned picture with the mouse
      if (event.target.tagName === 'IMG') {
        // If user click on a turned tile nothing change
        if (event.target.getAttribute('src') !== this._backOfTilesSrc) {
          console.log('Picture is already turned')
          return
        }
      }

      // if user click on a turned picture with the keyboard
      if (event.target.tagName === 'A') {
        // If user click on a turned tile nothing change
        if (event.target.firstElementChild.getAttribute('src') !== this._backOfTilesSrc) {
          console.log('Picture is already turned')
          return
        }
      }

      // something is wrong here
      // print tries and paires
      this._tries++
      this._paires.innerText = `Paires: ${this._quantityOfPaires / 2}\nTries: ${Math.floor(this._tries / 2)}`

      const visiblePicture = this._tiles[event.target.getAttribute('class') - 1]

      // if target are an a or img-tagg target get
      let target
      if (event.target.tagName === 'IMG') {
        target = event.target
        target.innerHTML = visiblePicture
      }
      if (event.target.tagName === 'A') {
        target = event.target.firstElementChild
        target.innerHTML = visiblePicture
      }

      const attributeSrc = visiblePicture.getAttribute('src')

      // storing even.target in temp array
      target.setAttribute('src', attributeSrc)
      this._tempArray.push(target)

      // check if picture are the same
      if (this._tempArray.length === 2) {
        if (this._tempArray[0].getAttribute('src') === this._tempArray[1].getAttribute('src')) {
          // count paires
          for (let i = 0; i < this.shadowRoot.querySelectorAll('#memoryPictures img').length; i++) {
            if (this.shadowRoot.querySelectorAll('#memoryPictures img')[i].getAttribute('src') === this._tempArray[1].getAttribute('src')) {
              this._quantityOfPaires++
              this._paires.innerText = `Paires: ${this._quantityOfPaires / 2}\nTries: ${Math.floor(this._tries / 2)}`
              window.setTimeout(() => {
                this.shadowRoot.querySelectorAll('#memoryPictures img')[i].style.visibility = 'hidden'
              }, 500)
            }
          }
        }
      }
      // console.log('this.turnbackPictures()/JM')
      // console.log(this.turnbackPictures())
      window.setTimeout(() => {
        this.turnbackPictures()
      }, 2000)

      // Congrat the user an shoulde later also show result
      window.setTimeout(() => {
        this._countHiddenPictures = 0
        for (let i = 0; i < this._memoryPictures.querySelectorAll('img').length; i++) {
          if (this._memoryPictures.querySelectorAll('img')[i].style.visibility === 'hidden') {
            this._countHiddenPictures++
            if (this._countHiddenPictures === this._memoryPictures.querySelectorAll('img').length) {
              // timeCounter stop
              const argument = `highScoreMemory${this._numberOfPictures}`
              const highscore = JSON.parse(window.localStorage.getItem(argument)) || []
              this._counter.setAttribute('state', 'freeze')
              const resultTime = window.sessionStorage.getItem('timecountervalue')
              const result = String(Number(resultTime) + Math.floor(this._tries / 2))
              window.sessionStorage.removeItem('timecountervalue')
              const score = {
                result: result
              }
              highscore.push(score)
              window.localStorage.setItem(argument, JSON.stringify(highscore))

              // Displaying result
              const congratulation = document.createElement('h3')
              congratulation.innerText = `CONGRATULATION! Your result is: ${result}`
              congratulation.style.textAlign = 'center'
              congratulation.style.color = 'white'
              this._gameFooter.appendChild(congratulation)
              this._memoryPictures.innerHTML = ''
            }
          }
        }
      }, 500)
    })

    // eventlistner for this._deletMemory
    this._deletMemory.addEventListener('click', (event) => {
      event.preventDefault()
      // remove this._counter
      this._counter.setAttribute('state', 'remove')

      this.remove()
    })

    // eventlistner for this._restartMemory
    this._restartMemory.addEventListener('click', (event) => {
      event.preventDefault()

      // reset this._counter
      this._counter.setAttribute('state', 'remove')
      this._counter = document.createElement('timecounter-app')
      this._timeConteiner.appendChild(this._counter)

      // reset this._countHiddenPictures and gameFooter
      this._countHiddenPictures = 0
      this._gameFooter.innerHTML = ''

      // Building new memory
      this.setTiles()

      // shuffle the tiles
      this._tiles = this.shuffleTiles(this._rows, this._columns)

      // reset data
      this._tries = 0
      this._quantityOfPaires = 0
      this._paires.innerText = `Paires: ${this._quantityOfPaires}`
    })

    // eventlistner for this._sizeMemory
    this._sizeMemory.addEventListener('change', (event) => {
      event.preventDefault()
      // reset this._counter
      this._counter.setAttribute('state', 'remove')
      this._counter = document.createElement('timecounter-app')
      this._timeConteiner.appendChild(this._counter)

      // reset this._countHiddenPictures and gameFooter
      this._countHiddenPictures = 0
      this._gameFooter.innerHTML = ''

      // Reconstruct form for layout for the memory
      this._rows = Math.floor(Math.sqrt(this._sizeMemory.value))
      this._columns = this._sizeMemory.value / this._rows
      this._numberOfPictures = this._rows * this._columns

      // Building new memory
      this.setTiles()

      // Shuffle the pictures
      this._tiles = this.shuffleTiles(this._rows, this._columns)

      // reset data
      this._tries = 0
      this._quantityOfPaires = 0
      this._paires.innerText = `Paires: ${this._quantityOfPaires}`
    })
  }

  /**
   * Turn back pictures
   * @returns
   * @memberof Memory
   */
  turnbackPictures () {
    let counter = 0
    for (let i = 0; i < this.shadowRoot.querySelectorAll('#memoryPictures img').length; i++) {
      if (this.shadowRoot.querySelectorAll('#memoryPictures img')[i].getAttribute('src') !== this._backOfTilesSrc) {
        counter++
      }
    }
    if (counter >= 2) {
      for (let i = 0; i < this.shadowRoot.querySelectorAll('#memoryPictures img').length; i++) {
        this.shadowRoot.querySelectorAll('#memoryPictures img')[i].setAttribute('src', this._backOfTilesSrc)
        this._tempArray = []
      }
    }
    return counter
  }

  /**
   * Set the tiles
   * @memberof Memory
   */
  setTiles () {
    // Building new memory
    this._gameFooter.innerHTML = ''
    this._memoryPictures.innerHTML = ''
    for (let i = 0; i < (this._rows * this._columns); i++) {
      const img = document.createElement('img')
      const a = document.createElement('a')
      img.setAttribute('src', '../imageMemory/0.png')
      a.setAttribute('href', '#')
      const classAttribute = `${i + 1}`
      img.setAttribute('class', classAttribute)
      a.setAttribute('class', classAttribute)
      const pictureWidthValue = `${100 / this._columns}%`
      img.style.width = pictureWidthValue
      a.appendChild(img)
      this._memoryPictures.appendChild(a)
    }
  }

  /**
   * Shuffle the tiles
   * @param {*} rows
   * @param {*} columns
   * @returns
   * @memberof Memory
   */
  shuffleTiles (rows, columns) {
    const array = []

    for (let i = 1; i <= (rows * columns / 2); i++) {
      const img = document.createElement('img')
      const imageSrc = `../imageMemory/${i}.png`
      img.setAttribute('src', imageSrc)
      img.style.width = '25%'
      array.push(img)
      array.push(img)
    }
    console.log(array)
    for (let i = array.length - 1; i > 0; i--) {
      const randomNumber = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[randomNumber]
      array[randomNumber] = temp
    }
    console.log('Shuffled array:')
    console.log(array)
    return array
  }

  /**
   * @returns
   * @memberof Memory
   */
  countOpenTiles () {
    let counter = 0
    const tiles = this._memoryPictures.querySelectorAll('img')
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].getAttribute('src') !== this._backOfTilesSrc && tiles[i].style.visibility !== 'hidden') {
        counter++
      }
    }
    return counter
  }
}

// Registers the custom event
window.customElements.define('memory-app', Memory)
