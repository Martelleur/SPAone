// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrag_addeventlistener
import './chat-app.js'

const template = document.createElement('template')
template.innerHTML = /* html */ `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<div id="wrapper">
  <div id="chessConteiner">
      <p id="title"></p>

      <div id="tools">
          <button id="options1">White options</button>
          <button id="options2">Black options</button>
          <button id="chat" class="button">Chat</button>
          <button id="commentBox" class="button">Comment-box</button>
          <select id="history" class="button">
            <option value="history">History</option>
            <option value="clear">Hide history!</option>
            <option value="allRounds">All rounds!</option>
          </select>
          <i id="deletChess" class="material-icons">close</i>
          <i id="bigWindow" class="material-icons">add_box</i>
          <i id="adjustableWindow" class="material-icons">exposure</i>
          <i id="hideWindow" class="material-icons">indeterminate_check_box</i>
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
      <p id="activePlayer">White players turn!</p>
      <p id="checkStatusWhite">White player is NOT check!</p>
      <p id="checkStatusBlack">Black player is NOT check!</p>
      <p id="winner"></p>
  </div>
  
  <div id="historyConteiner"></div>
  
  <div id="commentContainer"></div>

</div>

<div id="chatConteiner"></div>

<style>
:host {
  position: absolute;
  border: 5px solid #0c5cc4;
  background-color: black;
  resize: both;
  overflow: auto;
  outline: 1px solid black;
  z-index: 0;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-aligne: center;
  color: white;
  border-collapse: collapse;
}
:host #chessBoard {
  box-sizing: border-box;
  background-color: white;
  width: 30vw;
  height: 30vw;
  margin: 0 auto;
}
:host #title {
  text-align: center;
  background-color: #0c5cc4;
  color: white;
  padding: 0;
  margin: 0;
}
:host #title {
  cursor: move;
}
:host #tools {
  box-sizing: border-box;
  background-color: black;
  width: 100%;
  margin: 0 auto;
  padding: 3px;
  padding-right: 0;
}

:host #chessBoard>div {
  float: left;
  width: 12.5%;
  height: 12.5%;
  border: 1px solid black;
}
:host deletChess, :host startChess {
  margin: 0px;
  padding: 0px;
}
:host #chessBoard>div img {
  width: 100%;
  padding: 1px;
  background-color: white;
}
:host #chessBoard>div img {
  cursor: grab;
}
:host #information {
  text-align: center;
  background-color: black;
}
:host #options1 {
  background-color: green;
  color: white;
  border: 3px solid green;
  cursor: pointer;
}
:host #options2 {
  background-color: purple;
  color: white;
  border: 3px solid purple;
  cursor: pointer;
}
:host .button {
  cursor: pointer;
  background-color: black;
  border: 1px solid white;
  padding: 1px;
}
:host #chat, :host #commentBox {
  padding: 2px;
}
:host #historyConteiner {
  border-top: 3px solid black;
  clear: both;
  color: black;
  background-color: white;
}
:host .material-icons {
  float: right;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: white;
}
:host #commentContainer {
  width: 100%;
  display: none;
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

    // Data chess-app
    this._chessConteiner = this.shadowRoot.querySelector('#chessConteiner')
    this._chessBoard = this.shadowRoot.querySelector('#chessBoard')
    this._wrapper = this.shadowRoot.querySelector('#wrapper')
    this._clonedShadow = []
    this._chessBoardDivLength = this._chessBoard.querySelectorAll('div').length
    this._chessBoardImgLength = this._chessBoard.querySelectorAll('div>img').length
    this._chessBoardDiv = this._chessBoard.querySelectorAll('div')
    this._chessBoardImg = this._chessBoard.querySelectorAll('div>img')
    this._dragtarget = this.shadowRoot.querySelector('#dragtarget')
    this.createIdForSquares()
    this._whitePiecesTurn = true
    this._activePlayer = this.shadowRoot.querySelector('#activePlayer')
    this._checkStatusWhite = this.shadowRoot.querySelector('#checkStatusWhite')
    this._checkStatusBlack = this.shadowRoot.querySelector('#checkStatusBlack')
    this._first = false
    this._round = 0
    this._information = this.shadowRoot.querySelector('#information')
    this._historyConteiner = this.shadowRoot.querySelector('#historyConteiner')
    this._winner = this.shadowRoot.querySelector('#winner')
    this._chatConteiner = this.shadowRoot.querySelector('#chatConteiner')
    this._title = this.shadowRoot.querySelector('#title')
    this._commentContainer = this.shadowRoot.querySelector('#commentContainer')
    this._commentApp = document.createElement('comment-app')
    this._commentApp.setAttribute('data-storagename', 'chess')
    this._commentContainer.appendChild(this._commentApp)
    this._commentBox = this.shadowRoot.querySelector('#commentBox')

    // tools chess
    this._tools = this.shadowRoot.querySelector('#tools')
    this._chat = this.shadowRoot.querySelector('#chat')
    this._showWhiteOptions = this.shadowRoot.querySelector('#options1')
    this._showBlackOptions = this.shadowRoot.querySelector('#options2')
    this._history = this.shadowRoot.querySelector('#history')
    this._hideWindow = this.shadowRoot.querySelector('#hideWindow')
    this._bigWindow = this.shadowRoot.querySelector('#bigWindow')
    this._deletChess = this.shadowRoot.querySelector('#deletChess')
    this._adjustableWindow = this.shadowRoot.querySelector('#adjustableWindow')
    this._active = undefined
    this._status = false
    this._keyChat = true
    this._key = true

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
   * @readonly
   * @static
   * @memberof Chess
   */
  static get observedAttributes () {
    return ['id', 'data-hide', 'data-zedindex']
  }

  /**
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof Chess
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'data-zedindex') {
      if (newValue === 'high') {
        this.style.zIndex = '1'
        this.style.outline = '1px solid white'
        this._key = true
        console.log('zIndex: 1')
      } else {
        this.style.outline = '1px solid black'
        this._key = false
        this.style.zIndex = '0'
        console.log('zIndex: 0')
      }
    }
    // Changing of attribute id
    if (name === 'id') {
      this._title.innerHTML = `
      <p id="title">${this.getAttribute('id')}-chess-app
        <img id="chessIcon" src="../imageIcons/chess.png" alt="chess icon"></img>
        <style>
          #chessIcon {
            height: 15px;
            width: 15px;
            float: left;
            padding-bottom: 1px;
          }
        </style>
      </p>
      `
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
   * @memberof Chess
   */
  connectedCallback () {
    // eventlistener for this._commentBox
    this._commentBox.addEventListener('click', event => {
      if (!this._key) {
        return
      }
      if (this._commentContainer.style.display === '' || this._commentContainer.style.display === 'none') {
        this._commentContainer.style.display = 'initial'
      } else {
        this._commentContainer.style.display = 'none'
      }
    })

    // Events fired on the drag target
    this._chessBoard.addEventListener('dragstart', event => {
      if (!this._key) {
        return
      }
      console.log(event.target.parentNode)
      event.target.style.opacity = 0
      this._active = event.target

      // Reset border color
      for (let i = 0; i < this._chessBoardDivLength; i++) {
        this._chessBoardDiv[i].setAttribute('class', 'droptarget')
        this._chessBoardDiv[i].style.border = '1px solid black'
      }

      // if player move pawn for the first time
      this._first = false
      if (event.target.getAttribute('data-first') === 'true') {
        this._first = true
      }

      // Finding acceptable squares for event.target
      const index = this.indexTarget(event.target.parentNode)

      const acceptableSquares = this.acceptableSquares(event.target.getAttribute('src'), index[0], index[1], this._first) || []
      for (let i = 0; i < acceptableSquares.length; i++) {
        if (acceptableSquares[i].childElementCount === 1) {
          if (event.target.getAttribute('data-color') !== acceptableSquares[i].firstElementChild.getAttribute('data-color')) {
            acceptableSquares[i].setAttribute('class', 'acceptableSquare')
            acceptableSquares[i].style.border = '3px solid blue'
          }
        } else {
          acceptableSquares[i].setAttribute('class', 'acceptableSquare')
          acceptableSquares[i].style.border = '3px solid blue'
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
      if (!this._key) {
        return
      }
      event.preventDefault()
      console.log('Dragging')
    }, { once: true })

    // Events fired on the drop target
    this._chessBoard.addEventListener('dragover', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      // Reset backgroundecolor color
      for (let i = 0; i < this._chessBoardDivLength; i++) {
        if (this._chessBoardDiv[i].style.backgroundColor === 'blue') {
          this._chessBoardDiv[i].style.backgroundColor = 'white'
        }
      }

      if (event.target.getAttribute('class') === 'acceptableSquare' && event.target.nodeName === 'DIV') {
        event.target.style.backgroundColor = 'blue'
      }
    })

    // The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
    window.addEventListener('dragend', event => {
      if (!this._key) {
        return
      }
      event.target.style.opacity = 1
      for (let i = 0; i < this._chessBoardDivLength; i++) {
        if (this._chessBoardDiv[i].style.backgroundColor !== 'white') {
          this._chessBoardDiv[i].style.backgroundColor = 'white'
        }
        if (this._chessBoardDiv[i].style.borderColor !== 'black') {
          this._chessBoardDiv[i].style.border = '1px solid black'
        }
      }
      for (let i = 0; i < this._chessBoardImgLength; i++) {
        this._chessBoardImg[i].style.opacity = 1
      }
      this._chessBoard.addEventListener('drag', event => {
        event.preventDefault()
        console.log('Dragging')
      }, { once: true })
    })

    // Events fired when dropping over this._chessBoard
    this._chessBoard.addEventListener('drop', event => {
      if (!this._key) {
        return
      }
      event.preventDefault()

      try {
        if (event.target.className === 'acceptableSquare') {
          const data = event.dataTransfer.getData('chessPiece')
          event.target.removeAttribute('data-temp')

          const textArgument = `#${data}`

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
              return
            }
          } else if (event.target.nodeName === 'IMG' && event.target.getAttribute('data-color') === this.shadowRoot.querySelector(textArgument).getAttribute('data-color')) {
            return
          } else {
            // if player drop pawn for the first time
            if (this.shadowRoot.querySelector(textArgument).getAttribute('data-first') === 'true') {
              this.shadowRoot.querySelector(textArgument).setAttribute('data-first', 'false')
            }

            event.target.appendChild(this.shadowRoot.querySelector(textArgument))
          }
          // change activePlayer and test if player is scheck
          console.log(this._whitePiecesTurn)
          if (this._whitePiecesTurn) {
            this._whitePiecesTurn = false
            this.isPlayerSheck('isBlackSheck')
            this.isPlayerSheck('isWhiteSheck')
            this._activePlayer.innerHTML = 'Black players turn!'
          } else {
            this._whitePiecesTurn = true
            this.isPlayerSheck('isWhiteSheck')
            this.isPlayerSheck('isBlackSheck')
            this._activePlayer.innerHTML = 'White players turn!'
          }

          // Reset border color, class name and background color
          for (let i = 0; i < this._chessBoardDivLength; i++) {
            this._chessBoardDiv[i].setAttribute('class', 'droptarget')
            this._chessBoardDiv[i].style.border = '1px solid black'
            this._chessBoardDiv[i].style.backgroundColor = 'white'
          }
          for (let i = 0; i < this._chessBoardImgLength; i++) {
            this._chessBoardImg[i].style.backgroundColor = 'white'
          }

          // try to fix problem how to save when multipale tables is in action
          // saving in sessionstorage
          this._round++
          const argument = `Round${this._round}${this.getAttribute('id')}`
          window.sessionStorage.setItem(argument, JSON.stringify(this.indexAllSquares()))

          // adding option to this._history
          const option = document.createElement('option')
          option.setAttribute('value', argument)
          option.innerText = argument
          this._history.appendChild(option)

          // cloning
          this._clonedShadow.push(this.cloneNode(true))
        } else {
          return
        }
      } catch (error) {
        console.log(error)
      }

      // Change pawn to queen
      this.pawnToQueen()

      // Reset border color, class name and background color
      for (let i = 0; i < this._chessBoardDivLength; i++) {
        this._chessBoardDiv[i].setAttribute('class', 'droptarget')
        this._chessBoardDiv[i].style.border = '1px solid black'
        this._chessBoardDiv[i].style.backgroundColor = 'white'
      }

      // recount img
      this._chessBoardImgLength = this._chessBoard.querySelectorAll('div>img').length
      this._chessBoardImg = this._chessBoard.querySelectorAll('div>img')

      // decide winner
      if (this._activePlayer.innerText === 'White players turn!' && this._checkStatusBlack.innerText === 'Black player is scheck!') {
        this._checkStatusBlack.innerText = ''
        this._checkStatusWhite.innerText = ''
        this._activePlayer.innerText = ''
        this._winner.innerText = 'White player win!'
        for (let i = 0; i < this._chessBoardImgLength; i++) {
          this._chessBoardImg[i].setAttribute('data-color', 'undefined')
        }
      }
      if (this._activePlayer.innerText === 'Black players turn!' && this._checkStatusWhite.innerText === 'White player is scheck!') {
        this._checkStatusBlack.innerText = ''
        this._checkStatusWhite.innerText = ''
        this._activePlayer.innerText = ''
        this._winner.innerText = 'Black player win!'
        for (let i = 0; i < this._chessBoardImgLength; i++) {
          this._chessBoardImg[i].setAttribute('data-color', 'undefined')
        }
      }
    })

    // Events fired when click on this._deletChess
    this._deletChess.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)

      const myEvent2 = new window.CustomEvent('deletedWindow')
      this.dispatchEvent(myEvent2)
      for (let i = 0; i < this._round; i++) {
        const argument = `Round${i + 1}${this.getAttribute('id')}`
        window.sessionStorage.removeItem(argument)
      }
      this.remove()
    })

    // Events fired when click on this._showWhiteOptions
    this._showWhiteOptions.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      // Reset border color and background color
      for (let i = 0; i < this._chessBoardDivLength; i++) {
        this._chessBoardDiv[i].style.border = '1px solid black'
        this._chessBoardDiv[i].style.backgroundColor = 'white'
      }
      for (let i = 0; i < this._chessBoardImgLength; i++) {
        this._chessBoardImg[i].style.backgroundColor = 'white'
      }
      this.evryAcceptableSquare('white')
    })

    // Events fired when click on this._showBlackOptions
    this._showBlackOptions.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }
      // Reset border color and background color
      for (let i = 0; i < this._chessBoardDivLength; i++) {
        this._chessBoardDiv[i].style.border = '1px solid black'
        this._chessBoardDiv[i].style.backgroundColor = 'white'
      }
      for (let i = 0; i < this._chessBoardImgLength; i++) {
        this._chessBoardImg[i].style.backgroundColor = 'white'
      }
      this.evryAcceptableSquare('black')
    })

    // Events fired when click on this._history
    this._history.addEventListener('click', event => {
      event.preventDefault()
      if (!this._key) {
        return
      }

      let round = event.target.value
      if (round === 'clear') {
        this._historyConteiner.innerHTML = ''
        this._historyConteiner.style.border = 'none'
      } else if (round === 'history') {
        // console.log('start')
      } else if (round === 'allRounds') {
        this._historyConteiner.innerHTML = ''
        try {
          for (let i = 3; i < event.target.parentElement.querySelectorAll('option').length; i++) {
            round = event.target.parentElement.querySelectorAll('option')[i].value
            this.showHistory(round)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        this._historyConteiner.innerHTML = ''
        this.showHistory(round)
      }
    })

    // eventlistner for this._adjustableWindow
    this._adjustableWindow.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }

      this.style.position = 'absolute'
      this._title.style.cursor = 'move'
      this._chessConteiner.style.border = 'none'
      this.style.border = '5px solid #0c5cc4'
      this.style.outline = '1px solid black'
      this._chessConteiner.style.height = 'initial'
      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)
    })

    // eventlistner for this._bigWindow
    this._bigWindow.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }

      this.style.position = 'static'
      this._title.style.cursor = 'default'
      this._chessConteiner.style.border = '5px solid #0c5cc4'
      this.style.border = 'none'
      this.style.outline = 'none'
      this._chessConteiner.style.height = '89vh'
      this._chessConteiner.style.backgroundColor = 'black'
      const myEvent = new window.CustomEvent('bigWindow')
      this.dispatchEvent(myEvent)
    })

    // eventlistner for this._hideWindow
    this._hideWindow.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }

      this.setAttribute('data-hide', 'true')

      const myEvent = new window.CustomEvent('notBigWindow')
      this.dispatchEvent(myEvent)

      const myEvent2 = new window.CustomEvent('hideWindow')
      this.dispatchEvent(myEvent2)
    })

    // eventlistner for this._chat
    this._chat.addEventListener('click', (event) => {
      event.preventDefault()
      if (!this._key) {
        return
      }

      this._chatConteiner.innerHTML = ''
      if (!this._keyChat) {
        this._keyChat = true
        return
      }

      this._keyChat = false
      const chat = document.createElement('chat-app')
      chat.setAttribute('data-freezewindow', 'true')
      console.log(chat.getAttribute('data-freezewindow'))
      this._chatConteiner.appendChild(chat)
      // this._chatConteiner.style.float = 'left'
    })
  }

  /**
   * @memberof Chess
   */
  disconnectedCallback () {
    console.log('Goodby from element')
    const myEvent = new window.CustomEvent('disconnectedElement')
    this.dispatchEvent(myEvent)
  }

  /**
   * @memberof Chess
   */
  createIdForSquares () {
    for (let i = 0; i < this._chessBoardDivLength; i++) {
      const idName = `dragtarget${i + 1}`
      this._chessBoardDiv[i].setAttribute('id', idName)
    }
  }

  /**
   * @returns
   * @memberof Chess
   */
  squaresData () {
    const outerArray = []
    const outerArrayImages = []

    for (let i = 0; i < this._chessBoardDivLength; i++) {
      const innerArray = []
      const innerArrayImages = []

      for (let j = i; j < (i + Math.sqrt(this._chessBoardDivLength)); j++) {
        innerArray.push(this._chessBoardDiv[j])
        try {
          const image = this._chessBoardDiv[j].firstElementChild
          innerArrayImages.push(image.getAttribute('src'))
        } catch (error) {
          innerArrayImages.push('No image')
        }
      }
      i = i + Math.sqrt(this._chessBoardDivLength) - 1

      outerArray.push(innerArray)
      outerArrayImages.push(innerArrayImages)
    }

    const images = []
    const squares = []
    for (let i = 0; i < this._chessBoardDivLength; i++) {
      const image = this._chessBoardDiv[i].firstElementChild
      const square = this._chessBoardDiv[i]
      try {
        images.push(image.getAttribute('src'))
      } catch (error) {
        images.push('No image')
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
        if (squares[i][j].getAttribute('id') === target.getAttribute('id')) {
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
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j - 1]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1) {
            return [square[i - 1][j + 1]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j - 1]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j + 1], square[i - 1][j - 1], square[i - 1][j]]
              }
            } catch (error) {
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j + 1], square[i - 1][j - 1], square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
            }
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j + 1], square[i - 1][j]]
              }
            } catch (error) {
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j + 1], square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
            }
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j - 1].childElementCount === 1) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j - 1], square[i - 1][j]]
              }
            } catch (error) {
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j - 1], square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
            }
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0) {
            try {
              if (square[i - 2][j].childElementCount === 1) {
                return [square[i - 1][j]]
              }
            } catch (error) {
            }
            try {
              if (square[i - 2][j].childElementCount === 0) {
                return [square[i - 1][j], square[i - 2][j]]
              }
            } catch (error) {
            }
          }
        } catch (error) {
        }
      } else {
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 0 && square[i - 1][j - 1].childElementCount === 0) {
            return []
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j - 1]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j + 1].childElementCount === 1) {
            return [square[i - 1][j + 1]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j - 1]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j - 1], square[i - 1][j]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j + 1].childElementCount === 1) {
            return [square[i - 1][j + 1], square[i - 1][j]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i - 1][j - 1], square[i - 1][j]]
          }
        } catch (error) {
        }
        try {
          if (square[i - 1][j].childElementCount === 0) {
            return [square[i - 1][j]]
          }
        } catch (error) {
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
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j - 1]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1) {
            return [square[i + 1][j + 1]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j - 1]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j + 1], square[i + 1][j - 1], square[i + 1][j]]
              }
            } catch (error) {}
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j + 1], square[i + 1][j - 1], square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {}
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j + 1], square[i + 1][j]]
              }
            } catch (error) {}
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j + 1], square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {}
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j - 1].childElementCount === 1) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j - 1], square[i + 1][j]]
              }
            } catch (error) {}
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j - 1], square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {}
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0) {
            try {
              if (square[i + 2][j].childElementCount === 1) {
                return [square[i + 1][j]]
              }
            } catch (error) {}
            try {
              if (square[i + 2][j].childElementCount === 0) {
                return [square[i + 1][j], square[i + 2][j]]
              }
            } catch (error) {}
          }
        } catch (error) {}
      } else {
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 0 && square[i + 1][j - 1].childElementCount === 0) {
            return []
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j - 1]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j + 1].childElementCount === 1) {
            return [square[i + 1][j + 1]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 1 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j - 1]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1 && square[i - 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j - 1], square[i + 1][j]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j + 1].childElementCount === 1) {
            return [square[i + 1][j + 1], square[i + 1][j]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0 && square[i + 1][j - 1].childElementCount === 1) {
            return [square[i + 1][j - 1], square[i + 1][j]]
          }
        } catch (error) {}
        try {
          if (square[i + 1][j].childElementCount === 0) {
            return [square[i + 1][j]]
          }
        } catch (error) {}
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
      } catch (error) {}
      try {
        for (let y = 1; y < 8; y++) {
          if (square[i + y][j] !== undefined && stopArray[1] === false) {
            returnArray.push(square[i + y][j])
            if (square[i + y][j].childElementCount === 1) {
              stopArray[1] = true
            }
          }
        }
      } catch (error) {}
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j + x] !== undefined && stopArray[2] === false) {
            returnArray.push(square[i][j + x])
            if (square[i][j + x].childElementCount === 1) {
              stopArray[2] = true
            }
          }
        }
      } catch (error) {}
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j - x] !== undefined && stopArray[3] === false) {
            returnArray.push(square[i][j - x])
            if (square[i][j - x].childElementCount === 1) {
              stopArray[3] = true
            }
          }
        }
      } catch (error) {}

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
      } catch (error) {}
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
      } catch (error) {}
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
      } catch (error) {}
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
      } catch (error) {}

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
      } catch (error) {}
      try {
        for (let y = 1; y < 8; y++) {
          if (square[i + y][j] !== undefined && stopArray[1] === false) {
            returnArray.push(square[i + y][j])
            if (square[i + y][j].childElementCount === 1) {
              stopArray[1] = true
            }
          }
        }
      } catch (error) {}
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j + x] !== undefined && stopArray[2] === false) {
            returnArray.push(square[i][j + x])
            if (square[i][j + x].childElementCount === 1) {
              stopArray[2] = true
            }
          }
        }
      } catch (error) {}
      try {
        for (let x = 1; x < 8; x++) {
          if (square[i][j - x] !== undefined && stopArray[3] === false) {
            returnArray.push(square[i][j - x])
            if (square[i][j - x].childElementCount === 1) {
              stopArray[3] = true
            }
          }
        }
      } catch (error) {}
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
      } catch (error) {}
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
      } catch (error) {}
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
      } catch (error) {}
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
      } catch (error) {}

      return returnArray
    }

    // white and black king
    if (source === this._whiteKingSource || source === this._blackKingSource) {
      const returnArray = []
      try {
        if (square[i - 1][j] !== undefined) {
          returnArray.push(square[i - 1][j])
        }
      } catch (error) {}
      try {
        if (square[i + 1][j] !== undefined) {
          returnArray.push(square[i + 1][j])
        }
      } catch (error) {}
      try {
        if (square[i][j - 1] !== undefined) {
          returnArray.push(square[i][j - 1])
        }
      } catch (error) {}
      try {
        if (square[i][j + 1] !== undefined) {
          returnArray.push(square[i][j + 1])
        }
      } catch (error) {}
      try {
        if (square[i - 1][j - 1] !== undefined) {
          returnArray.push(square[i - 1][j - 1])
        }
      } catch (error) {}
      try {
        if (square[i - 1][j + 1] !== undefined) {
          returnArray.push(square[i - 1][j + 1])
        }
      } catch (error) {}
      try {
        if (square[i + 1][j - 1] !== undefined) {
          returnArray.push(square[i + 1][j - 1])
        }
      } catch (error) {}
      try {
        if (square[i + 1][j + 1] !== undefined) {
          returnArray.push(square[i + 1][j + 1])
        }
      } catch (error) {}

      return returnArray
    }

    // white and black hoarse
    if (source === this._whiteHoarseSource || source === this._blackHoarseSource) {
      const returnArray = []
      try {
        if (square[i - 2][j + 1] !== undefined) {
          returnArray.push(square[i - 2][j + 1])
        }
      } catch (error) {}
      try {
        if (square[i - 2][j - 1] !== undefined) {
          returnArray.push(square[i - 2][j - 1])
        }
      } catch (error) {}
      try {
        if (square[i + 2][j - 1] !== undefined) {
          returnArray.push(square[i + 2][j - 1])
        }
      } catch (error) {}
      try {
        if (square[i + 2][j + 1] !== undefined) {
          returnArray.push(square[i + 2][j + 1])
        }
      } catch (error) {}
      try {
        if (square[i - 1][j + 2] !== undefined) {
          returnArray.push(square[i - 1][j + 2])
        }
      } catch (error) {}
      try {
        if (square[i + 1][j + 2] !== undefined) {
          returnArray.push(square[i + 1][j + 2])
        }
      } catch (error) {}
      try {
        if (square[i + 1][j - 2] !== undefined) {
          returnArray.push(square[i + 1][j - 2])
        }
      } catch (error) {}
      try {
        if (square[i - 1][j - 2] !== undefined) {
          returnArray.push(square[i - 1][j - 2])
        }
      } catch (error) {}

      return returnArray
    }
  }

  /**
   * @memberof Chess
   */
  pawnToQueen () {
    const number1 = this._chessBoardDivLength - Math.sqrt(this._chessBoardDivLength)
    const number2 = Math.sqrt(this._chessBoardDivLength)
    // const number3 = this._chessBoard.querySelectorAll('div').length

    for (let i = 0; i < number2; i++) {
      try {
        if (this._chessBoardDiv[i].firstElementChild.getAttribute('src') === this._whitePawnSource) {
          this._chessBoardDiv[i].firstElementChild.setAttribute('src', this._whiteQueenSource)
        }
      } catch (error) {
        // console.log(error)
      }
    }

    for (let i = number1; i < this._chessBoardDivLength; i++) {
      try {
        if (this._chessBoardDiv[i].firstElementChild.getAttribute('src') === this._blackPawnSource) {
          this._chessBoardDiv[i].firstElementChild.setAttribute('src', this._blackQueenSource)
        }
      } catch (error) {}
    }
  }

  /**
   * index all div with childe-element (img)
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

    for (let i = 0; i < this._chessBoardDivLength; i++) {
      if (this._chessBoardDiv[i].childElementCount === 1) {
        chessPieaceArray.push(this.indexTarget(this._chessBoardDiv[i]))
        chessPieaceObject.roweValue.push(this.indexTarget(this._chessBoardDiv[i])[0])
        chessPieaceObject.columnValue.push(this.indexTarget(this._chessBoardDiv[i])[1])
        chessPieaceObject.imageSource.push(this._chessBoardDiv[i].firstElementChild.getAttribute('src'))
      }
    }

    return chessPieaceObject
  }

  /**
   * @param {string} [color='black']
   * @returns
   * @memberof Chess
   */
  evryAcceptableSquare (color = 'black') {
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
      if (tempObject.imageSource[i] === this._whiteTowerSource || tempObject.imageSource[i] === this._whiteHoarseSource || tempObject.imageSource[i] === this._whiteRunnerSource || tempObject.imageSource[i] === this._whiteKingSource || tempObject.imageSource[i] === this._whiteQueenSource || tempObject.imageSource[i] === this._whitePawnSource) {
        let tempValue
        if (tempObject.imageSource[i] === this._whitePawnSource && tempObject.roweValue[i] === 6) {
          tempValue = this.acceptableSquares(tempObject.imageSource[i], tempObject.roweValue[i], tempObject.columnValue[i], true)
        } else {
          tempValue = this.acceptableSquares(tempObject.imageSource[i], tempObject.roweValue[i], tempObject.columnValue[i], false)
        }
        whitePiecesOptions.push(tempValue)
      }
    }

    const blackPiecesOptionsFlat = blackPiecesOptions.flat()
    const whitePiecesOptionsFlat = whitePiecesOptions.flat()

    // Black players otions
    if (color === 'black') {
      for (let i = 0; i < blackPiecesOptionsFlat.length; i++) {
        if (blackPiecesOptionsFlat[i].childElementCount === 1) {
          if (blackPiecesOptionsFlat[i].firstElementChild.getAttribute('data-color') !== 'black') {
            blackPiecesOptionsFlat[i].style.border = '3px solid purple'
          }
        } else {
          blackPiecesOptionsFlat[i].style.backgroundColor = 'purple'
        }
      }
      return blackPiecesOptionsFlat
    }
    // White players otions
    if (color === 'white') {
      for (let i = 0; i < whitePiecesOptionsFlat.length; i++) {
        if (whitePiecesOptionsFlat[i].childElementCount === 1) {
          if (whitePiecesOptionsFlat[i].firstElementChild.getAttribute('data-color') !== 'white') {
            whitePiecesOptionsFlat[i].style.border = '3px solid green'
          }
        } else {
          whitePiecesOptionsFlat[i].style.backgroundColor = 'green'
        }
      }
      return whitePiecesOptionsFlat
    }
  }

  /**
   * @param {string} [color='isWhiteSheck']
   * @memberof Chess
   */
  isPlayerSheck (color = 'isWhiteSheck') {
    // test if white is shack
    let blackPiecesOptionsFlat
    let whitePiecesOptionsFlat

    if (color === 'isWhiteSheck') {
      blackPiecesOptionsFlat = this.evryAcceptableSquare('black')
    } else if (color === 'isBlackSheck') {
      whitePiecesOptionsFlat = this.evryAcceptableSquare('white')
    } else {
      return
    }

    if (color === 'isWhiteSheck') {
      for (let i = 0; i < blackPiecesOptionsFlat.length; i++) {
        try {
          if (blackPiecesOptionsFlat[i].childElementCount === 1) {
            if (blackPiecesOptionsFlat[i].firstElementChild.getAttribute('src') === this._whiteKingSource) {
              this._checkStatusWhite.innerText = 'White player is scheck!'
              window.alert('OBS! White player is check, if still check after this round white player loose!')
              this._status = true
              break
            } else {
              this._status = false
              this._checkStatusWhite.innerText = 'White player is NOT scheck!'
            }
          }
        } catch (error) {}
      }
    }
    // test if black is shack
    if (color === 'isBlackSheck') {
      for (let i = 0; i < whitePiecesOptionsFlat.length; i++) {
        try {
          if (whitePiecesOptionsFlat[i].childElementCount === 1) {
            if (whitePiecesOptionsFlat[i].firstElementChild.getAttribute('src') === this._blackKingSource) {
              this._checkStatusBlack.innerText = 'Black player is scheck!'
              window.alert('OBS! Black player is check, if still check after this round black player loose!')
              this._status = true
              break
            } else {
              this._checkStatusBlack.innerText = 'Black player is NOT scheck!'
              this._status = false
            }
          }
        } catch (error) {}
      }
    }
  }

  /**
   * @param {*} argument
   * @memberof Chess
   */
  showHistory (argument = 'history') {
    // this._information.innerHTML = ''
    const data = JSON.parse(window.sessionStorage.getItem(argument))
    const fragment = document.createDocumentFragment()

    let counter = 0
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        counter++
        const idName = `dragtarget${counter}`
        const div = document.createElement('div')
        div.setAttribute('id', idName)
        div.setAttribute('class', 'droptarget')
        div.style.width = '12.5%'
        div.style.height = '12.5%'
        div.style.float = 'left'
        div.style.border = '1px solid black'
        div.style.backgroundColor = 'white'
        for (let k = 0; k < data.roweValue.length; k++) {
          if (i === data.roweValue[k] && j === data.columnValue[k]) {
            const img = document.createElement('img')
            img.setAttribute('src', data.imageSource[k])
            img.setAttribute('class', 'acceptableSquare')
            if (img.getAttribute('src').slice(-9) === 'White.png') {
              img.setAttribute('data-color', 'white')
            } else {
              img.setAttribute('data-color', 'black')
            }
            img.setAttribute('data-first', 'false')
            img.setAttribute('draggable', 'true')
            img.style.width = '100%'
            img.style.padding = '1px'
            div.appendChild(img)
          }
        }
        fragment.appendChild(div)
      }
    }

    // create a div container bigDiv and indexnumber index
    const index = document.createElement('span')
    const bigDiv = document.createElement('div')
    console.log(this.getAttribute('id').length)
    console.log(this.getAttribute('id').length)
    if (this.getAttribute('id').length === 6) {
      index.textContent = argument.slice(-7, -6)
    }
    if (this.getAttribute('id').length === 7) {
      index.textContent = argument.slice(-8, -7)
    }

    index.style.color = 'black'
    bigDiv.style.width = '140px'
    bigDiv.style.height = '140px'
    bigDiv.style.display = 'inline-block'
    bigDiv.style.border = '3px solid black'
    bigDiv.appendChild(fragment)
    bigDiv.addEventListener('mouseover', event => {
      bigDiv.style.border = '3px solid #0c5cc4'
    })
    bigDiv.addEventListener('mouseout', event => {
      bigDiv.style.border = '3px solid black'
    })

    this._historyConteiner.appendChild(bigDiv)
    this._historyConteiner.appendChild(index)
    this._historyConteiner.style.paddingTop = '2px'
    this._historyConteiner.style.border = '5px solid #0c5cc4'

    // Event for bigDiv
    bigDiv.addEventListener('mouseover', event => {
      this._historyConteiner.style.border = '5px solid #0c5cc4'
    })
    /*
    bigDiv.addEventListener('dblclick', event => {
      const newShadow = this._clonedShadow[argument.slice(-1) - 1]
      console.log(newShadow)
      this.parentElement.appendChild(newShadow)
      this.remove()
      window.sessionStorage.clear()
    })
    */
  }
}

// Registers the custom event
window.customElements.define('chess-app', Chess)
