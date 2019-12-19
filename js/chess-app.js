// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrag_addeventlistener

const template = document.createElement('template')
template.innerHTML = /* html */ `

<div id="chessConteiner">

    <div id="chessTools">
        <button id="deletChess">Delet</button>
    </div>
        
    <div id="chessBoard">
        <div class="droptarget"><img src="../imageChess/tower.png" draggable="true" id="dragTarget1"></div>
        <div class="droptarget"><img src="../imageChess/hoarse.png" draggable="true" id="dragTarget2"></div>
        <div class="droptarget"><img src="../imageChess/runner.png" draggable="true" id="dragTarget3"></div>
        <div class="droptarget"><img src="../imageChess/king.png" draggable="true" id="dragTarget4"></div>
        <div class="droptarget"><img src="../imageChess/queen.png" draggable="true" id="dragTarget5"></div>
        <div class="droptarget"><img src="../imageChess/runner.png" draggable="true" id="dragTarget6"></div>
        <div class="droptarget"><img src="../imageChess/hoarse.png" draggable="true" id="dragTarget7"></div>
        <div class="droptarget"><img src="../imageChess/tower.png" draggable="true" id="dragTarget8"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget9"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget10"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget11"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget12"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget13"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget14"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget15"></div>
        <div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget16"></div>
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
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget17"></div>
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget18"></div>
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget19"></div>
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget20"></div>
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget21"></div>
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget22"></div>
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget23"></div>
        <div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget24"></div>
        <div class="droptarget"><img src="../imageChess/towerWhite.png" draggable="true" id="dragTarget25"></div>
        <div class="droptarget"><img src="../imageChess/hoarseWhite.png" draggable="true" id="dragTarget26"></div>
        <div class="droptarget"><img src="../imageChess/runnerWhite.png" draggable="true" id="dragTarget27"></div>
        <div class="droptarget"><img src="../imageChess/kingWhite.png" draggable="true" id="dragTarget28"></div>
        <div class="droptarget"><img src="../imageChess/queenWhite.png" draggable="true" id="dragTarget29"></div>
        <div class="droptarget"><img src="../imageChess/runnerWhite.png" draggable="true" id="dragTarget30"></div>
        <div class="droptarget"><img src="../imageChess/hoarseWhite.png" draggable="true" id="dragTarget31"></div>
        <div class="droptarget"><img src="../imageChess/towerWhite.png" draggable="true" id="dragTarget32"></div>

    </div>    

</div>

<style>
:host {
    // position: absolute;
}
:host * {
    box-sizing: border-box;
}
:host #chessConteiner {
    width: 516px;
    margin: 0px;
    padding: 0px;
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
    padding: 0px;
    margin: 0 auto;
}
:host #chessTools {
  box-sizing: border-box;
  background-color: black;
  width: 100%;
  padding: 0px;
  margin 0px;
}
:host #chessBoard>div {
    float: left;
    width: 63.25px;
    height: 63.25px;
    paddinf: 1px;
    border: 1px solid black;
    box-sizing: border-box;
    padding: 0px;
    margin 0px;
}
:host deletChess, :host startChess {
    margin: 0px;
    padding: 0px;
}
:host #chessBoard>div img {
  dispaly: initial;
  width: 100%;
  box-sizing: border-box;
  padding: 0px;
  margin 0px;
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
    this.squaresContains()
  }

  connectedCallback () {
    // Events fired on the drag target
    this._chessBoard.addEventListener('dragstart', event => {
      console.log(event.target)
      event.dataTransfer.setData('chessPiece', event.target.id)
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
      if (event.target.className === 'droptarget') {
        const data = event.dataTransfer.getData('chessPiece')
        console.log(data)
        const textArgument = `#${data}`
        console.log(this.shadowRoot.querySelector(textArgument))
        event.target.appendChild(this.shadowRoot.querySelector(textArgument))
      }

      this.squaresContains()

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

  squaresContains () {
    for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
      const contains = this._chessBoard.querySelectorAll('div')[i].firstElementChild
      const square = this._chessBoard.querySelectorAll('div')[i]
      try {
        console.log(`Square: ${square.getAttribute('id')}. Contains picture: ${contains.getAttribute('src')}`)
      } catch (error) {
        // console.log('Contains nothing')
        console.log((`Square: ${square.getAttribute('id')}. Contains nothing`))
      }
    }
  }
}

// Registers the custom event
window.customElements.define('chess-app', Chess)
