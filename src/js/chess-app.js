// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrag_addeventlistener

const template = document.createElement('template')
template.innerHTML = /* html */ `

<div id="chessConteiner">

<div id="tools">
<button id="deletChess">Delet</button>
</div>

<div id="chessBoard">
<div class="droptarget"><img src="../imageChess/tower.png" draggable="true" id="dragTarget1" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/hoarse.png" draggable="true" id="dragTarget2" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/runner.png" draggable="true" id="dragTarget3" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/king.png" draggable="true" id="dragTarget4" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/queen.png" draggable="true" id="dragTarget5" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/runner.png" draggable="true" id="dragTarget6" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/hoarse.png" draggable="true" id="dragTarget7" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/tower.png" draggable="true" id="dragTarget8" class="acceptableSquare" data-color="black"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget9" class="acceptableSquare" data-color="black" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget10" class="acceptableSquare" data-color="black" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget11" class="acceptableSquare" data-color="black" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget12" class="acceptableSquare" data-color="black" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget13" class="acceptableSquare" data-color="black" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget14" class="acceptableSquare" data-color="black" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget15" class="acceptableSquare" data-color="black" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawn.png" draggable="true" id="dragTarget16" class="acceptableSquare" data-color="black" data-first="true"></div>
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
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget17" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget18" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget19" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget20" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget21" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget22" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget23" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/pawnWhite.png" draggable="true" id="dragTarget24" class="acceptableSquare" data-color="white" data-first="true"></div>
<div class="droptarget"><img src="../imageChess/towerWhite.png" draggable="true" id="dragTarget25" class="acceptableSquare" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/hoarseWhite.png" draggable="true" id="dragTarget26" class="acceptableSquare" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/runnerWhite.png" draggable="true" id="dragTarget27" class="acceptableSquare" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/kingWhite.png" draggable="true" id="dragTarget28" class="acceptableSquare" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/queenWhite.png" draggable="true" id="dragTarget29" class="acceptableSquare" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/runnerWhite.png" draggable="true" id="dragTarget30" class="acceptableSquare" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/hoarseWhite.png" draggable="true" id="dragTarget31" class="acceptableSquare" data-color="white"></div>
<div class="droptarget"><img src="../imageChess/towerWhite.png" draggable="true" id="dragTarget32" class="acceptableSquare" data-color="white"></div>

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
:host #chessBoard>div img:hover {
  cursor: grab;
}
:host #information {
  text-align: center;
  color: white;
  background-color: black;
  font-size: 3em;
}

</style>
`

/**
 * @export
 * @class Chess
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
    this._first = false

    // chesspieces image sources
    this._whitePawnSource = '../imageChess/pawnWhite.png'
    this._whiteHoarseSource = '../imageChess/hoarseWhite.png'
    this._whiteTowerSource = '../imageChess/towerWhite.png'
    this._whiteRunnerSource = '../imageChess/runnerWhite.png'
    this._whiteKingSource = '../imageChess/kingWhite.png'
    this._whiteQueenSource = '../imageChess/queenWhite.png'
    this._blackPawnSource = '../imageChess/pawn.png'
    this._blackHoarseSource = '../imageChess/hoarse.png'
    this._blackTowerSource = '../imageChess/tower.png'
    this._blackRunnerSource = '../imageChess/runner.png'
    this._blackKingSource = '../imageChess/king.png'
    this._blackQueenSource = '../imageChess/queen.png'
  }

  /**
   * @memberof Chess
   */
  connectedCallback () {
    // Events fired on the drag target
    this._chessBoard.addEventListener('dragstart', event => {
      console.log(event.target.parentNode)

      // Reset border color
      for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
        this._chessBoard.querySelectorAll('div')[i].setAttribute('class', 'droptarget')
        this._chessBoard.querySelectorAll('div')[i].style.border = '1px solid black'
      }

      // if player move pawn for the first time
      this._first = false
      if (event.target.getAttribute('data-first') === 'true') {
        this._first = true
      }

      // Finding acceptable squares for event.target
      const index = this.indexTarget(event.target.parentNode)
      console.log('index/JM')
      console.log(index)
      console.log(index[0])
      console.log(index[1])
      console.log(event.target.getAttribute('src'))
      const acceptableSquares = this.acceptableSquares(event.target.getAttribute('src'), index[0], index[1], this._first) || []
      console.log(acceptableSquares)
      for (let i = 0; i < acceptableSquares.length; i++) {
        if (acceptableSquares[i].childElementCount === 1) {
          if (event.target.getAttribute('data-color') !== acceptableSquares[i].firstElementChild.getAttribute('data-color')) {
            acceptableSquares[i].setAttribute('class', 'acceptableSquare')
            acceptableSquares[i].style.border = '3px solid blue'
          }
        } else {
          acceptableSquares[i].setAttribute('class', 'acceptableSquare')
          acceptableSquares[i].style.border = '3px solid blue'
        }
      }

      // white or black player
      if (event.target.getAttribute('data-color') === 'white' && this._whitePiecesTurn === true) {
        event.dataTransfer.setData('chessPiece', event.target.id)
      }
      if (event.target.getAttribute('data-color') === 'black' && this._whitePiecesTurn === false) {
        event.dataTransfer.setData('chessPiece', event.target.id)
      }
    })

    // Events fired when dragging
    this._chessBoard.addEventListener('drag', event => {
      // event.preventDefault()
      // console.log(event.target)
      // event.target.style.cursor = 'grabbing'
      // console.log(event.target)
    })

    // Events fired on the drop target
    this._chessBoard.addEventListener('dragover', event => {
      event.preventDefault()
      // console.log(event.target)

      // Reset backgroundecolor color
      for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
        this._chessBoard.querySelectorAll('div')[i].style.backgroundColor = 'white'
      }

      // Set backgroundecolor to blue over the event.target
      if (event.target.getAttribute('class') === 'acceptableSquare' && event.target.nodeName === 'DIV') {
        event.target.style.backgroundColor = 'blue'
      }
    })

    // Events fired when dropping over this._chessBoard
    this._chessBoard.addEventListener('drop', event => {
      event.preventDefault()
      console.log(event.target)

      // when chesspiece id dropped
      try {
        if (event.target.className === 'acceptableSquare') {
          const data = event.dataTransfer.getData('chessPiece')

          // console.log(data)
          const textArgument = `#${data}`
          // console.log(this.shadowRoot.querySelector(textArgument))
          console.log(this.shadowRoot.querySelector(textArgument).getAttribute('data-color'))
          console.log(event.target.getAttribute('data-color'))
          // drop over a img element
          if (event.target.nodeName === 'IMG' && event.target.getAttribute('data-color') !== this.shadowRoot.querySelector(textArgument).getAttribute('data-color')) {
            if (event.target.parentNode.style.border === '3px solid blue') {
              const srcArgument = this.shadowRoot.querySelector(textArgument).getAttribute('src')
              const idArgument = this.shadowRoot.querySelector(textArgument).getAttribute('id')
              const dataColorArgument = this.shadowRoot.querySelector(textArgument).getAttribute('data-color')
              this.shadowRoot.querySelector(textArgument).remove()

              // change pieces
              event.target.setAttribute('data-color', dataColorArgument)
              event.target.setAttribute('src', srcArgument)
              event.target.setAttribute('id', idArgument)
            } else {
              console.log('must move to blue squares')
              return
            }
          } else if (event.target.nodeName === 'IMG' && event.target.getAttribute('data-color') === this.shadowRoot.querySelector(textArgument).getAttribute('data-color')) {
            console.log('must move to blue squares')
            console.log('You can not take pieces with same color')
            return
          } else {
            // if player drop pawn for the first time
            if (this.shadowRoot.querySelector(textArgument).getAttribute('data-first') === 'true') {
              this.shadowRoot.querySelector(textArgument).setAttribute('data-first', 'false')
            }

            event.target.appendChild(this.shadowRoot.querySelector(textArgument))
          }
        } else {
          return
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

      // Reset border color, class name and background color
      for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
        this._chessBoard.querySelectorAll('div')[i].setAttribute('class', 'droptarget')
        this._chessBoard.querySelectorAll('div')[i].style.border = '1px solid black'
        this._chessBoard.querySelectorAll('div')[i].style.backgroundColor = 'white'
      }
      for (let i = 0; i < this._chessBoard.querySelectorAll('div>img').length; i++) {
        this._chessBoard.querySelectorAll('div>img')[i].style.backgroundColor = 'white'
      }

      // Change pawn to queen
      this.pawnToQueen()

      this.evryAcceptableSquare()
    })

    // Events fired when click on this._deletChess
    this._deletChess.addEventListener('click', event => {
      event.preventDefault()
      event.target.parentNode.parentNode.remove()
    })
  }

  /**
   * @memberof Chess
   */
  createIdForSquares () {
    for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
      const idName = `dragtarget${i + 1}`
      this._chessBoard.querySelectorAll('div')[i].setAttribute('id', idName)
      console.log(this._chessBoard.querySelectorAll('div')[i])
    }
  }

  /**
   * @returns
   * @memberof Chess
   */
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

  /**
   * @param {*} target
   * @returns
   * @memberof Chess
   */
  indexTarget (target) {
    const squares = this.squaresData().matrixSquares
    // console.log(squares)
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (squares[i][j] === target) {
          return [i, j]
        }
      }
    }
  }

  /**
   * @param {*} source
   * @param {*} i
   * @param {*} j
   * @param {*} first
   * @returns
   * @memberof Chess
   */
  acceptableSquares (source, i, j, first) {
    // i stands for the row of the starting point and j stand for the column of the starting point
    const square = this.squaresData().matrixSquares // starting point

    // white pawns
    if (source === this._whitePawnSource) {
      if (first) {
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 0 && square[i - 1][j - 1].childElementCount === 0) {
            return []
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1) {
            return [square[i - 1][j + 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j + 1], square[i - 1][j - 1], square[i - 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j + 1], square[i - 1][j - 1], square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j + 1], square[i - 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j + 1], square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j - 1].childElementCount === 1) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j - 1], square[i - 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j - 1], square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 0 && square[i - 1][j - 1].childElementCount === 0) {
            return []
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1) {
            return [square[i - 1][j + 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j - 1], square[i - 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j - 1], square[i - 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i - 1][j].childElementCount === 0) {
            return [square[i - 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    // black pawns
    if (source === this._blackPawnSource) {
      if (first) {
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 0 && square[i + 1][j - 1].childElementCount === 0) {
            return []
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1) {
            return [square[i + 1][j + 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j + 1], square[i + 1][j - 1], square[i + 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j + 1], square[i + 1][j - 1], square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j + 1], square[i + 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j + 1], square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j - 1].childElementCount === 1) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j - 1], square[i + 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j - 1], square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j]]
              }
            } catch (error) {
              console.log(error)
            }
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 0 && square[i + 1][j - 1].childElementCount === 0) {
            return []
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1) {
            return [square[i + 1][j + 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j - 1]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j - 1], square[i + 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j - 1], square[i + 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
        try {
          if (square[i + 1][j].childElementCount === 0) {
            return [square[i + 1][j]]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    // white and black tower
    if (source === this._whiteTowerSource || source === this._blackTowerSource) {
      const returnArray = []
      const stopArray = [false, false, false, false]
      try {
        for (let y = 1; y < 8; y++) {
          if (square[i - y][j] !== undefined && stopArray[0] === false) {
            returnArray.push(square[i - y][j])
            if (square[i - y][j].childElementCount === 1) {
              stopArray[0] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          if (square[i + y][j] !== undefined && stopArray[1] === false) {
            returnArray.push(square[i + y][j])
            if (square[i + y][j].childElementCount === 1) {
              stopArray[1] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j + x] !== undefined && stopArray[2] === false) {
            returnArray.push(square[i][j + x])
            if (square[i][j + x].childElementCount === 1) {
              stopArray[2] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j - x] !== undefined && stopArray[3] === false) {
            returnArray.push(square[i][j - x])
            if (square[i][j - x].childElementCount === 1) {
              stopArray[3] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log('returnArray/JM')
      console.log(returnArray)
      return returnArray
    }

    // white and black runner
    if (source === this._whiteRunnerSource || source === this._blackRunnerSource) {
      const returnArray = []
      const stopArray = [false, false, false, false]
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i - y][j + x] !== undefined && stopArray[0] === false) {
              returnArray.push(square[i - y][j + x])
              if (square[i - y][j + x].childElementCount === 1) {
                stopArray[0] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i - y][j - x] !== undefined && stopArray[1] === false) {
              returnArray.push(square[i - y][j - x])
              if (square[i - y][j - x].childElementCount === 1) {
                stopArray[1] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i + y][j + x] !== undefined && stopArray[2] === false) {
              returnArray.push(square[i + y][j + x])
              if (square[i + y][j + x].childElementCount === 1) {
                stopArray[2] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i + y][j - x] !== undefined && stopArray[3] === false) {
              returnArray.push(square[i + y][j - x])
              if (square[i + y][j - x].childElementCount === 1) {
                stopArray[3] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log('returnArray/JM')
      console.log(returnArray)
      return returnArray
    }

    // white and black queen
    if (source === this._whiteQueenSource || source === this._blackQueenSource) {
      const returnArray = []
      const stopArray = [false, false, false, false, false, false, false, false]
      try {
        for (let y = 1; y < 8; y++) {
          if (square[i - y][j] !== undefined && stopArray[0] === false) {
            returnArray.push(square[i - y][j])
            if (square[i - y][j].childElementCount === 1) {
              stopArray[0] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          if (square[i + y][j] !== undefined && stopArray[1] === false) {
            returnArray.push(square[i + y][j])
            if (square[i + y][j].childElementCount === 1) {
              stopArray[1] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j + x] !== undefined && stopArray[2] === false) {
            returnArray.push(square[i][j + x])
            if (square[i][j + x].childElementCount === 1) {
              stopArray[2] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j - x] !== undefined && stopArray[3] === false) {
            returnArray.push(square[i][j - x])
            if (square[i][j - x].childElementCount === 1) {
              stopArray[3] = true
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i - y][j + x] !== undefined && stopArray[4] === false) {
              returnArray.push(square[i - y][j + x])
              if (square[i - y][j + x].childElementCount === 1) {
                stopArray[4] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i - y][j - x] !== undefined && stopArray[5] === false) {
              returnArray.push(square[i - y][j - x])
              if (square[i - y][j - x].childElementCount === 1) {
                stopArray[5] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i + y][j + x] !== undefined && stopArray[6] === false) {
              returnArray.push(square[i + y][j + x])
              if (square[i + y][j + x].childElementCount === 1) {
                stopArray[6] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      try {
        for (let y = 1; y < 8; y++) {
          for (let x = 1; x < 8; x++) {
            if (square[i + y][j - x] !== undefined && stopArray[7] === false) {
              returnArray.push(square[i + y][j - x])
              if (square[i + y][j - x].childElementCount === 1) {
                stopArray[7] = true
              }
            }
            y++
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log('returnArray/JM')
      console.log(returnArray)
      return returnArray
    }

    // white and black king
    if (source === this._whiteKingSource || source === this._blackKingSource) {
      const returnArray = []
      try {
        if (square[i - 1][j] !== undefined) {
          returnArray.push(square[i - 1][j])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i + 1][j] !== undefined) {
          returnArray.push(square[i + 1][j])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i][j - 1] !== undefined) {
          returnArray.push(square[i][j - 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i][j + 1] !== undefined) {
          returnArray.push(square[i][j + 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i - 1][j - 1] !== undefined) {
          returnArray.push(square[i - 1][j - 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i - 1][j + 1] !== undefined) {
          returnArray.push(square[i - 1][j + 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i + 1][j - 1] !== undefined) {
          returnArray.push(square[i + 1][j - 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i + 1][j + 1] !== undefined) {
          returnArray.push(square[i + 1][j + 1])
        }
      } catch (error) {
        console.log(error)
      }
      console.log('returnArray/JM')
      console.log(returnArray)
      return returnArray
    }

    // white and black hoarse
    if (source === this._whiteHoarseSource || source === this._blackHoarseSource) {
      const returnArray = []
      try {
        if (square[i - 2][j + 1] !== undefined) {
          returnArray.push(square[i - 2][j + 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i - 2][j - 1] !== undefined) {
          returnArray.push(square[i - 2][j - 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i + 2][j - 1] !== undefined) {
          returnArray.push(square[i + 2][j - 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i + 2][j + 1] !== undefined) {
          returnArray.push(square[i + 2][j + 1])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i - 1][j + 2] !== undefined) {
          returnArray.push(square[i - 1][j + 2])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i + 1][j + 2] !== undefined) {
          returnArray.push(square[i + 1][j + 2])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i + 1][j - 2] !== undefined) {
          returnArray.push(square[i + 1][j - 2])
        }
      } catch (error) {
        console.log(error)
      }
      try {
        if (square[i - 1][j - 2] !== undefined) {
          returnArray.push(square[i - 1][j - 2])
        }
      } catch (error) {
        console.log(error)
      }
      console.log('returnArray/JM')
      console.log(returnArray)
      return returnArray
    }
  }

  /**
   * @memberof Chess
   */
  pawnToQueen () {
    const number1 = this._chessBoard.querySelectorAll('div').length - Math.sqrt(this._chessBoard.querySelectorAll('div').length)
    const number2 = Math.sqrt(this._chessBoard.querySelectorAll('div').length)
    const number3 = this._chessBoard.querySelectorAll('div').length

    for (let i = 0; i < number2; i++) {
      try {
        if (this._chessBoard.querySelectorAll('div')[i].firstElementChild.getAttribute('src') === this._whitePawnSource) {
          this._chessBoard.querySelectorAll('div')[i].firstElementChild.setAttribute('src', this._whiteQueenSource)
        }
      } catch (error) {
        console.log(error)
      }
    }

    for (let i = number1; i < number3; i++) {
      try {
        if (this._chessBoard.querySelectorAll('div')[i].firstElementChild.getAttribute('src') === this._blackPawnSource) {
          this._chessBoard.querySelectorAll('div')[i].firstElementChild.setAttribute('src', this._blackQueenSource)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * @returns
   * @memberof Chess
   */
  indexAllSquares () {
    const chessPieaceArray = []
    const chessPieaceObject = {
      roweValue: [],
      columnValue: [],
      imageSource: []
    }
    for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
      if (this._chessBoard.querySelectorAll('div')[i].childElementCount === 1) {
        chessPieaceArray.push(this.indexTarget(this._chessBoard.querySelectorAll('div')[i]))
        chessPieaceObject.roweValue.push(this.indexTarget(this._chessBoard.querySelectorAll('div')[i])[0])
        chessPieaceObject.columnValue.push(this.indexTarget(this._chessBoard.querySelectorAll('div')[i])[1])
        chessPieaceObject.imageSource.push(this._chessBoard.querySelectorAll('div')[i].firstElementChild.getAttribute('src'))
      }
    }
    // console.log(chessPieaceObject)
    // console.log(chessPieaceObject.acceptableSquares)
    console.log(typeof chessPieaceObject.roweValue)
    console.log(typeof chessPieaceObject.columnValue)
    console.log(typeof chessPieaceObject.imageSource)
    console.log(chessPieaceObject.roweValue)
    console.log(chessPieaceObject.columnValue)
    console.log(chessPieaceObject.imageSource)
    /*
    for (let i = 0; i < chessPieaceObject.roweValue.lenght; i++) {
      const temp = this.acceptableSquares(chessPieaceObject.imageSource[i], chessPieaceObject.roweValue[i], chessPieaceObject.columnValue[i], false)
      console.log(temp)
      acceptableSquaresArray.push(temp)
    }
    */
    return chessPieaceObject
  }

  evryAcceptableSquare () {
    const tempObject = this.indexAllSquares()
    const blackPiecesOptions = []
    const whitePiecesOptions = []
    for (let i = 0; i < tempObject.roweValue.length; i++) {
      if (tempObject.imageSource[i] === this._blackTowerSource || tempObject.imageSource[i] === this._blackHoarseSource || tempObject.imageSource[i] === this._blackRunnerSource || tempObject.imageSource[i] === this._blackKingSource || tempObject.imageSource[i] === this._blackQueenSource || tempObject.imageSource[i] === this._blackPawnSource) {
        let tempValue = 0
        if (tempObject.imageSource[i] === this._blackPawnSource && tempObject.roweValue[i] === 1) {
          tempValue = this.acceptableSquares(tempObject.imageSource[i], tempObject.roweValue[i], tempObject.columnValue[i], true)
        } else {
          tempValue = this.acceptableSquares(tempObject.imageSource[i], tempObject.roweValue[i], tempObject.columnValue[i], false)
        }
        blackPiecesOptions.push(tempValue)
      }
      if (tempObject.imageSource[i] === this._whiteTowerSource || tempObject.imageSource[i] === this._whitekHoarseSource || tempObject.imageSource[i] === this._whiteRunnerSource || tempObject.imageSource[i] === this._whiteKingSource || tempObject.imageSource[i] === this._whiteQueenSource || tempObject.imageSource[i] === this._whitePawnSource) {
        let tempValue
        if (tempObject.imageSource[i] === this._whitePawnSource && tempObject.roweValue[i] === 6) {
          tempValue = this.acceptableSquares(tempObject.imageSource[i], tempObject.roweValue[i], tempObject.columnValue[i], true)
        } else {
          tempValue = this.acceptableSquares(tempObject.imageSource[i], tempObject.roweValue[i], tempObject.columnValue[i], false)
        }
        whitePiecesOptions.push(tempValue)
      }
    }
    console.log('tempObject/JM')
    console.log(tempObject)
    console.log('blackPiecesOptions.flat/JM')
    console.log(blackPiecesOptions.flat())
    console.log('whitePiecesOptions.flat/JM')
    console.log(whitePiecesOptions.flat())

    // Black players otions
    if (this._activePlayer.innerText === 'White players turn!') {
      for (let i = 0; i < blackPiecesOptions.flat().length; i++) {
        if (blackPiecesOptions.flat()[i].childElementCount === 1) {
          if (blackPiecesOptions.flat()[i].firstElementChild.getAttribute('data-color') !== 'black') {
            blackPiecesOptions.flat()[i].style.border = '3px solid red'
          }
        } else {
          blackPiecesOptions.flat()[i].style.backgroundColor = 'red'
        }
      }
    }
    // White players otions
    if (this._activePlayer.innerText === 'Black players turn!') {
      for (let i = 0; i < whitePiecesOptions.flat().length; i++) {
        if (whitePiecesOptions.flat()[i].childElementCount === 1) {
          if (whitePiecesOptions.flat()[i].firstElementChild.getAttribute('data-color') !== 'white') {
            whitePiecesOptions.flat()[i].style.border = '3px solid red'
          }
        } else {
          whitePiecesOptions.flat()[i].style.backgroundColor = 'red'
        }
      }
    }
  }
}

// Registers the custom event
window.customElements.define('chess-app', Chess)
