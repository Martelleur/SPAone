const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="memoryConteiner">
  
  <div id="memoryTools">
    <button id="deletMemory">Delet</button>
    <button id="restartMemory">Restart</button>
    <select id="sizeMemory" name="size">
      <option value="">Size</option>
      <option value="4">4 tiles</option>
      <option value="8">8 tiles</option>
      <option value="12">12 tiles</option>
      <option value="16">16 tiles</option>
    </select>
    <p id="paires"></p>
  </div>
    
  <div id="memoryPictures"></div>
  
  <div id="gameFooter"></div>
</div>
<style>
:host {
    position: absolute;
    width: 30%;
}
:host #memoryConteiner {
    border: 5px solid black;
    background-color: black;
    color: white;
    z-index: -1;
}
:host #memoryConteiner:hover {
    cursor: move;
    border: 5px solid blue;
    z-index: 1; 
}
:host #memoryPictures:hover {
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
    this._memoryTools = this.shadowRoot.querySelector('#memoryTools')
    this._restartMemory = this.shadowRoot.querySelector('#restartMemory')
    this._deletMemory = this.shadowRoot.querySelector('#deletMemory')
    this._sizeMemory = this.shadowRoot.querySelector('#sizeMemory')

    // Data memory
    this._memoryConteiner = this.shadowRoot.querySelector('#memoryConteiner')
    this._memoryPictures = this.shadowRoot.querySelector('#memoryPictures')
    this._rows = 4
    this._columns = 4
    this._numberOfPictures = this._rows * this._columns
    this._backOfTilesSrc = '../imageMemory/0.png'
    this._tiles = this.shuffleTiles(this._rows, this._columns)
    this._paires = this.shadowRoot.querySelector('#paires')
    this._quantityOfPaires = 0
    this._tempArray = []
    this._paires.innerText = `Paires: ${this._quantityOfPaires}`
    this._gameFooter = this.shadowRoot.querySelector('#gameFooter')
    this._countHiddenPictures = 0
    this._tries = 0

    // Building new memory
    this.setTiles()
  }

  /*
  static get observedAttributes () {
    return ['src']
  }
  */

  /**
   * connectedCallback for memory-app
   * @memberof Memory
   */
  connectedCallback () {
    // eventlistner for this._memoryPictures
    this._memoryPictures.addEventListener('click', (event) => {
      event.preventDefault()

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

      // something is wronh here
      // print tries and paires
      this._tries++
      this._paires.innerText = `Paires: ${this._quantityOfPaires / 2}\nTries: ${Math.floor(this._tries / 2)}`

      const visiblePicture = this._tiles[event.target.getAttribute('class') - 1]
      console.log(this._tiles)
      // clonedPicture = this.shadowRoot.cloneNode
      // event.target = this._tiles[event.target.id - 1]

      // if target are an a or img-tagg target get
      let target
      if (event.target.tagName === 'IMG') {
        console.log('You cliking on an img tag')
        console.log(visiblePicture)
        console.log(event.target.innerHTML)
        target = event.target
        target.innerHTML = visiblePicture
        console.log(event.target.innerHTML)
        console.log(event.target)
      }
      if (event.target.tagName === 'A') {
        console.log('You cliking on an a tag')
        console.log(visiblePicture)
        target = event.target.firstElementChild
        console.log(event.target.firstElementChild.innerHTML)
        target.innerHTML = visiblePicture
        console.log(event.target.firstElementChild.innerHTML)
        console.log(event.target)
      }

      const attributeSrc = visiblePicture.getAttribute('src')
      console.log(attributeSrc)

      // storing even.target in temp array
      target.setAttribute('src', attributeSrc)
      this._tempArray.push(target)
      console.log(this._tempArray)

      // check if picture are the same
      if (this._tempArray.length === 2) {
        if (this._tempArray[0].getAttribute('src') === this._tempArray[1].getAttribute('src')) {
          console.log('Paire!!!')
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
            console.log(`countPictures: ${this._countHiddenPictures}`)
            if (this._countHiddenPictures === this._memoryPictures.querySelectorAll('img').length) {
              console.log('CONGRATULATION!!!')
              const congratulation = document.createElement('h3')
              congratulation.innerText = 'CONGRATULATION!'
              congratulation.style.textAlign = 'center'
              congratulation.style.color = 'white'
              this._gameFooter.appendChild(congratulation)
            }
          }
        }
      }, 500)
    })

    // eventlistner for this._deletMemory
    this._deletMemory.addEventListener('click', (event) => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })

    // eventlistner for this._restartMemory
    this._restartMemory.addEventListener('click', (event) => {
      event.preventDefault()

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
      console.log('test this._sizeMemory event/JM')
      console.log(this._sizeMemory.value)

      // reset this._countHiddenPictures and gameFooter
      this._countHiddenPictures = 0
      this._gameFooter.innerHTML = ''

      // Reconstruct form for layout for the memory
      this._rows = Math.floor(Math.sqrt(this._sizeMemory.value))
      this._columns = this._sizeMemory.value / this._rows

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
}

// Registers the custom event
window.customElements.define('memory-app', Memory)
