const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="memoryConteiner">
    <div id="memoryPictures">
    </div>
    <div id="memoryTools">
        <button id="deletMemory">Delet memory</button>
    </div>
</div>
<style>
:host {
    position: absolute;
    width: 30%;
}
:host #memoryConteiner {
    border: 2px solid black;
    background-color: black;
}
:host #memoryConteiner:hover {
    cursor: move; 
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

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._memoryConteiner = this.shadowRoot.querySelector('#memoryConteiner')
    this._memoryPictures = this.shadowRoot.querySelector('#memoryPictures')
    this._memoryTools = this.shadowRoot.querySelector('#memoryTools')
    this._deletMemory = this.shadowRoot.querySelector('#deletMemory')
    this._rows = rows
    this._columns = columns
    this._numberOfPictures = this._rows * this._columns

    this._tiles = this.shuffleTiles(this._rows, this._columns)
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
      event.target.setAttribute('src', attributeSrc)

      // turn back pictures
      // if (this.turnbackPictures() >= 2) {
      //  window.setTimeout(event.target.setAttribute('src', '../imageMemory/0.png'), 3000)
      // }
      window.setTimeout(this.turnbackPictures(), 3000)
    })

    // eventlistner for this._input
    this._deletMemory.addEventListener('click', (event) => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })
  }

  turnbackPictures () {
    let counter = 0
    for (let i = 0; i < this.shadowRoot.querySelectorAll('#memoryPictures img').length; i++) {
      if (this.shadowRoot.querySelectorAll('#memoryPictures img')[i].getAttribute('src') !== '../imageMemory/0.png') {
        counter++
      }
    }
    if (counter > 2) {
      for (let i = 0; i < this.shadowRoot.querySelectorAll('#memoryPictures img').length; i++) {
        this.shadowRoot.querySelectorAll('#memoryPictures img')[i].setAttribute('src', '../imageMemory/0.png')
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
