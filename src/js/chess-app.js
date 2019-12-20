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

      // if player move pawn for the first time
      this._first = false
      if (event.target.getAttribute('data-first') === 'true') {
        this._first = true
      }

      // Finding acceptable squares for event.target
      const index = this.indexTarget(event.target.parentNode)
      console.log(index)
      console.log(index[0])
      console.log(index[1])
      console.log(event.target.getAttribute('src'))
      const acceptableSquares = this.acceptableSquares(event.target.getAttribute('src'), index[0], index[1], this._first)
      console.log(acceptableSquares)
      for (let i = 0; i < acceptableSquares.length; i++) {
        acceptableSquares[i].setAttribute('class', 'acceptableSquare')
        acceptableSquares[i].style.backgroundColor = 'blue'
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
            if (event.target.parentNode.style.backgroundColor === 'blue') {
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

      for (let i = 0; i < this._chessBoard.querySelectorAll('div').length; i++) {
        this._chessBoard.querySelectorAll('div')[i].setAttribute('class', 'droptarget')
        this._chessBoard.querySelectorAll('div')[i].style.backgroundColor = 'white'
      }
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
    console.log(squares)
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
        return [square[i - 1][j], square[i - 2][j]]
      } else {
        return [square[i - 1][j]]
      }
    }

    // black pawns
    if (source === this._blackPawnSource) {
      /*
      try {
        if (square[i + 1][j].firstElementChild.nodeName === 'IMG' && square[i + 1][j + 1].firstElementChild.nodeName === 'IMG' && square[i + 1][j - 1].firstElementChild.nodeName === 'IMG') {
          return [square[i + 1][j + 1], square[i + 1][j - 1]]
        } else if (square[i + 1][j].firstElementChild.nodeName === 'IMG' && square[i + 1][j + 1].firstElementChild.nodeName === 'IMG') {
          return [square[i + 1][j + 1]]
        } else if (square[i + 1][j].firstElementChild.nodeName === 'IMG' && square[i + 1][j - 1].firstElementChild.nodeName === 'IMG') {
          return [square[i + 1][j - 1]]
        } else if (square[i + 1][j].firstElementChild.nodeName === 'IMG') {
          return []
        }
      } catch (error) {
        console.log(error)
      }
      */
      if (first) {
        return [square[i + 1][j], square[i + 2][j]]
      } else {
        return [square[i + 1][j]]
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
}

// Registers the custom event
window.customElements.define('chess-app', Chess)
