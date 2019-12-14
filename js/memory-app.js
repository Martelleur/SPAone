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
</div>
<style>
:host {
    position: absolute;
    width: 30%;
}
:host #memoryConteiner {
    border: 2px solid black;
    background-color: black;
    color: white;
}
:host #memoryConteiner:hover {
    cursor: move; 
}
:host #memoryPictures:hover {
    cursor: pointer; 
}
:host .removed {
    visibility: hidden;
}
:host .finished {
    display: block;
    text-align: center;
    width: 100%;
    height: 1000px;
    background-color: black;
    color: white;
}
  </style>
`

export class Memory extends window.HTMLElement {
  constructor (rows = 4, columns = 4) {
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
    this._rows = rows
    this._columns = columns
    this._numberOfPictures = this._rows * this._columns
    this._backOfTilesSrc = '../imageMemory/0.png'
    this._tiles = this.shuffleTiles(this._rows, this._columns)
    this._paires = this.shadowRoot.querySelector('#paires')
    this._quantityOfPaires = 0
    this._tempArray = []
    this._paires.innerText = `Paires: ${this._quantityOfPaires}`

    // Displaying 16 copys off image 0.png
    for (let i = 0; i < (this._rows * this._columns); i++) {
      const img = document.createElement('img')
      img.setAttribute('src', '../imageMemory/0.png')
      const idAttribute = `${i + 1}`
      img.setAttribute('id', idAttribute)
      img.style.width = '25%'
      this._memoryPictures.appendChild(img)
    }
  }
  /*
  static get observedAttributes () {
    return ['src']
  }
  */

  connectedCallback () {
    // eventlistner for this._input
    this._memoryPictures.addEventListener('click', (event) => {
      event.preventDefault()

      console.log(event.target)
      console.log(event.target.id)
      console.log(this._tiles[event.target.id - 1])
      // clonedPicture = this.shadowRoot.cloneNode
      // event.target = this._tiles[event.target.id - 1]
      event.target.innerHTML = this._tiles[event.target.id - 1]

      const attributeSrc = this._tiles[event.target.id - 1].getAttribute('src')
      console.log(attributeSrc)

      // storing even.target in temp array
      event.target.setAttribute('src', attributeSrc)
      this._tempArray.push(event.target)
      console.log(this._tempArray)

      // check if picture are the same
      if (this._tempArray.length === 2) {
        if (this._tempArray[0].getAttribute('src') === this._tempArray[1].getAttribute('src')) {
          console.log('Paire!!!')
          for (let i = 0; i < this.shadowRoot.querySelectorAll('#memoryPictures img').length; i++) {
            if (this.shadowRoot.querySelectorAll('#memoryPictures img')[i].getAttribute('src') === this._tempArray[1].getAttribute('src')) {
              console.log('hmmmmmmmmmmmm!!!')
              this._quantityOfPaires++
              this._paires.innerText = `Paires: ${this._quantityOfPaires / 2}`
              window.setTimeout(() => {
                this.shadowRoot.querySelectorAll('#memoryPictures img')[i].style.visibility = 'hidden'
              }, 500)
            }
          }
        }
      }

      // Turn back pictures
      window.setTimeout(() => {
        this.turnbackPictures()
      }, 2000)
    })

    // eventlistner for this._deletMemory
    this._deletMemory.addEventListener('click', (event) => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })

    // eventlistner for this._restartMemory
    this._restartMemory.addEventListener('click', (event) => {
      event.preventDefault()

      // 16 new pictures
      this._memoryPictures.innerHTML = ''
      for (let i = 0; i < (this._rows * this._columns); i++) {
        const img = document.createElement('img')
        img.setAttribute('src', '../imageMemory/0.png')
        const idAttribute = `${i + 1}`
        img.setAttribute('id', idAttribute)
        const pictureWidthValue = `${100 / this._columns}%`
        img.style.width = pictureWidthValue
        this._memoryPictures.appendChild(img)
      }
      // shuffle the tiles
      this._tiles = this.shuffleTiles(this._rows, this._columns)

      // reset paires
      this._quantityOfPaires = 0
      this._paires.innerText = `Paires: ${this._quantityOfPaires}`
    })

    // eventlistner for this._sizeMemory
    this._sizeMemory.addEventListener('change', (event) => {
      event.preventDefault()
      console.log('test this._sizeMemory event/JM')
      console.log(this._sizeMemory.value)

      // Reconstruct form for layout for the memory
      this._rows = Math.floor(Math.sqrt(this._sizeMemory.value))
      this._columns = this._sizeMemory.value / this._rows

      // Building new memory
      this._memoryPictures.innerHTML = ''
      for (let i = 0; i < (this._rows * this._columns); i++) {
        const img = document.createElement('img')
        img.setAttribute('src', '../imageMemory/0.png')
        const idAttribute = `${i + 1}`
        img.setAttribute('id', idAttribute)
        const pictureWidthValue = `${100 / this._columns}%`
        img.style.width = pictureWidthValue
        this._memoryPictures.appendChild(img)
      }

      // Shuffle the pictures
      this._tiles = this.shuffleTiles(this._rows, this._columns)
    })
  }

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
  }

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
    console.log(array)
    return array
  }
}

// Registers the custom event
window.customElements.define('memory-app', Memory)