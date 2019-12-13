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

    this._tiles = []
    // Displaying 16 copys off image 0.png
    for (let i = 0; i < (this._rows * this._columns); i++) {
      const img = document.createElement('img')
      img.setAttribute('src', '../imageMemory/0.png')
      img.style.width = '25%'
      this._memoryPictures.appendChild(img)
    }
  }

  connectedCallback () {
    // eventlistner for this._input
    this._memoryPictures.addEventListener('click', (event) => {
      event.preventDefault()
    })

    // eventlistner for this._input
    this._deletMemory.addEventListener('click', (event) => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })
  }
}

// Registers the custom event
window.customElements.define('memory-app', Memory)
