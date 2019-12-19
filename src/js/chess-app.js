// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrag_addeventlistener

const template = document.createElement('template')
template.innerHTML = /* html */ `

<div id="chessConteiner">

<div id="tools">
<button id="deletChess">Delet</button>
</div>

<div id="chessBoard">
<div class="droptarget"><img src="../imageChess/tower.png" draggable="true" id="dragTarget1" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/hoarse.png" draggable="true" id="dragTarget2" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/runner.png" draggable="true" id="dragTarget3" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/king.png" draggable="true" id="dragTarget4" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/queen.png" draggable="true" id="dragTarget5" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/runner.png" draggable="true" id="dragTarget6" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/hoarse.png" draggable="true" id="dragTarget7" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/tower.png" draggable="true" id="dragTarget8" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget9" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget10" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget11" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget12" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget13" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget14" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget15" class="droptarget" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget16" class="droptarget" data-color="black"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget17" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget18" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget19" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget20" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget21" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget22" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget23" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget24" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/towerWhite.png" draggable="true" id="dragTarget25" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/hoarseWhite.png" draggable="true" id="dragTarget26" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/runnerWhite.png" draggable="true" id="dragTarget27" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/kingWhite.png" draggable="true" id="dragTarget28" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/queenWhite.png" draggable="true" id="dragTarget29" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/runnerWhite.png" draggable="true" id="dragTarget30" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/hoarseWhite.png" draggable="true" id="dragTarget31" class="droptarget" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/towerWhite.png" draggable="true" id="dragTarget32" class="droptarget" data-color="white"></div>

</div> 

<div id="information">
<p id="activePlayer">Whithe players turn!</p>
<div>

</div>

<style>
:host {
  position: absolute;
}
:host * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
:host #chessConteiner {
  width: 516px;
  border: 5px solid black;
}
:host #chessConteiner:hover {
  border: 5px solid blue;
}
:host #chessBoard {
  box-sizing: border-box;
  background-color: white;
  width: 506px;
  height: 506px;
}
:host #tools {
  box-sizing: border-box;
  background-color: black;
  width: 100%;
  cursor: move;
}

:host #chessBoard>div {
  float: left;
  width: 63.25px;
  height: 63.25px;
  border: 1px solid black;
}
:host deletChess, :host startChess {
  margin: 0px;
  padding: 0px;
}
:host #chessBoard>div img {
  dispaly: initial;
  width: 100%;
  padding: 1px;
}
:host #information {
  text-align: center;
  color: white;
  background-color: black;
}

</style>
`

/**
* Class for memory-app
* @export
* @class Memory
* @extends {window.HTMLElement}
*/
export class Chess extends window.HTMLElement {
  /**
  *Creates an instance of Minehunter.
  * @memberof Minehunter
  */
  constructor () {
    super()

    // Creating shadowroot
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._deletChess = this.shadowRoot.querySelector('#deletChess')
    this._chessBoard = this.shadowRoot.querySelector('#chessBoard')
    this._dragtarget = this.shadowRoot.querySelector('#dragtarget')
    this.createIdForSquares()
    this._whitePiecesTurn = true
    this._activePlayer = this.shadowRoot.querySelector('#activePlayer')
  }

  connectedCallback () {
    // Events fired on the drag target
    this._chessBoard.addEventListener('dragstart', event => {
      console.log(event.target)
      if (event.target.getAttribute('data-color') === 'white' && this._whitePiecesTurn === true) {
        event.dataTransfer.setData('chessPiece', event.target.id)
      }
      if (event.target.getAttribute('data-color') === 'black' && this._whitePiecesTurn === false) {
        event.dataTransfer.setData('chessPiece', event.target.id)
      }
    })

    // Events fired when dragging
    this._chessBoard.addEventListener('drag', event => {
      // console.log(event.target)
    })

    // Events fired on the drop target
    this._chessBoard.addEventListener('dragover', event => {
      event.preventDefault()
      // console.log(event.target)
    })

    // Events fired when dropping over this._chessBoard
    this._chessBoard.addEventListener('drop', event => {
      event.preventDefault()
      console.log(event.target)

      // when chesspiece id dropped
      try {
        if (event.target.className === 'droptarget') {
          const data = event.dataTransfer.getData('chessPiece')

          // console.log(data)
          const textArgument = `#${data}`
          // console.log(this.shadowRoot.querySelector(textArgument))
          console.log(this.shadowRoot.querySelector(textArgument).getAttribute('data-color'))
          console.log(event.target.getAttribute('data-color'))
          // drop over a img element
          if (event.target.nodeName === 'IMG' && event.target.getAttribute('data-color') !== this.shadowRoot.querySelector(textArgument).getAttribute('data-color')) {
            const srcArgument = this.shadowRoot.querySelector(textArgument).getAttribute('src')
            const idArgument = this.shadowRoot.querySelector(textArgument).getAttribute('id')
            const dataColorArgument = this.shadowRoot.querySelector(textArgument).getAttribute('data-color')
            this.shadowRoot.querySelector(textArgument).remove()

            // change pieces
            event.target.setAttribute('data-color', dataColorArgument)
            event.target.setAttribute('src', srcArgument)
            event.target.setAttribute('id', idArgument)
          } else if (event.target.nodeName === 'IMG' && event.target.getAttribute('data-color') === this.shadowRoot.querySelector(textArgument).getAttribute('data-color')) {
            console.log('You can not take pieces with same color')
          } else {
            event.target.appendChild(this.shadowRoot.querySelector(textArgument))
          }
        }

        // change activePlayer
        if (this._whitePiecesTurn) {
          this._whitePiecesTurn = false
          this._activePlayer.innerHTML = 'Black players turn!'
        } else {
          this._whitePiecesTurn = true
          this._activePlayer.innerHTML = 'White players turn!'
        }
      } catch (error) {
        console.log(error)
      }
      /*
      const squares = this.squaresData()
      console.log('squares.arraySquares/JM')
      console.log(squares.arraySquares)
      console.log('squares.matrixImages/JM')
      console.log(squares.matrixImages)
      console.log('squares.arrayImages/JM')
      console.log(squares.arrayImages)
      console.log('squares.matrixSquares')
      console.log(squares.matrixSquares)
      */
      // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
    })

    // Events fired when click on this._deletChess
    this._deletChess.addEventListener('click', event => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })
  }

  createIdForSquares () {
    for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
      const idName = `dragtarget${i + 1}`
      this._chessBoard.querySelectorAll('div')[i].setAttribute('id', idName)
      console.log(this._chessBoard.querySelectorAll('div')[i])
    }
  }

  squaresData () {
    const outerArray = []
    const outerArrayImages = []
    for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
      const innerArray = []
      const innerArrayImages = []
      // console.log(Math.sqrt(this._chessBoard.querySelectorAll('div').length))
      for (let j = i; j < (i + Math.sqrt(this._chessBoard.querySelectorAll('div').length)); j++) {
        innerArray.push(this._chessBoard.querySelectorAll('div')[j])
        // console.log(rowArray)
        try {
          const image = this._chessBoard.querySelectorAll('div')[j].firstElementChild
          innerArrayImages.push(image.getAttribute('src'))
        } catch (error) {
          innerArrayImages.push('No image')
          // console.log('Contains nothing')
          // console.log((`Square: ${square.getAttribute('id')}. Contains nothing`))
        }
      }
      i = i + Math.sqrt(this._chessBoard.querySelectorAll('div').length) - 1
      // console.log(rowArray)
      outerArray.push(innerArray)
      outerArrayImages.push(innerArrayImages)
    }
    // console.log('indexArray/JM')
    // console.log(indexArray)
    const images = []
    const squares = []
    for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
      const image = this._chessBoard.querySelectorAll('div')[i].firstElementChild
      const square = this._chessBoard.querySelectorAll('div')[i]
      try {
        // console.log(`Square: ${square.getAttribute('id')}. Contains picture: ${image.getAttribute('src')}`)
        images.push(image.getAttribute('src'))
      } catch (error) {
        images.push('No image')
        // console.log('Contains nothing')
        // console.log((`Square: ${square.getAttribute('id')}. Contains nothing`))
      }
      squares.push(square)
    }

    return {
      matrixSquares: outerArray,
      arrayImages: images,
      matrixImages: outerArrayImages,
      arraySquares: squares
    }
  }
}

// Registers the custom event
window.customElements.define('chess-app', Chess)
