const template = document.createElement('template')
template.innerHTML = /* html */`
<div id="commentContainer">
<p id="header"></p>    
<div id="comments">
    <div class="comment flex itemsStart justifyStart">
        <div class="flex1">
            <div class="commentBody"></div> 
        </div>
    </div>
</div>    
<div class="comment commentNew flex itemsStart justifyStart">
    <div class="flex1">
        <form action="#" class="commentForm">
            <textarea placeholder="Add a comment..." class="commentInput"></textarea>
            <input type="submit" class="button commentSubmit" value="Submit">
            <button id="userComments" class="button" >Reveal past comments</button>
        </form>
    </div>
</div>
</div>
<style>
:host {
    box-sizing: border-box;
    width: 100%;    
}
:host .flex {
    display: flex;
}
:host .flex1 {
    flex: 1;
    overflow: hidden;
}
:host .button {
  cursor: pointer;
}
:host .itemsStart {
    align-items: flex-start;
}
:host .justifyStart {
    justify-content: flex-start;
}
:host #commentContainer {
    width: 100%;
    margin: 0 auto;
    background-color: black;
}
:host #comments {
  background-color: black;
  color: white;
}
:host .commentBody {
    overflow: hidden;
}
:host .comment {
    padding: 1em;  
}
:host .commentInput {
    width: 100%;
    color: black;
    min-height: 100px;
    background-color: white; 
    resize: none;
}

</style>
`
export default class CommentsElement extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._submit = this.shadowRoot.querySelector('.commentSubmit')
    this._commentList = this.shadowRoot.querySelector('#comments')
    this._commentInput = this.shadowRoot.querySelector('.commentInput')
    this._tempTest = true
    this._revealButton = this.shadowRoot.querySelector('#userComments')
    this._storageName = 'undefined'
  }

  /**
   * @readonly
   * @static
   * @memberof CommentsElement
   */
  static get observedAttributes () {
    return ['data-storagename']
  }

  /**
   *
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof CommentsElement
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'data-storagename') {
      if (newValue === 'minehunter') {
        this._storageName = 'minehunterComments'
      } else if (newValue === 'chess') {
        this._storageName = 'chessComments'
      } else if (newValue === 'memory') {
        this._storageName = 'memoryComments'
      } else {
        this._storageName = 'commentListning'
      }
    }
  }

  /**
   * @memberof CommentsElement
   */
  connectedCallback () {
    this._submit.addEventListener('click', event => {
      const data = {
        comment: this._commentInput.value,
        date: window.moment().format('MMMM Do YYYY, h:mm:ss a')
      }
      event.preventDefault()

      // if commet textarea value < 1 exit
      if (this._commentInput.value.length < 1) {
        return
      }
      this.template(data)

      this._commentInput.value = ''

      // Save to local storage
      window.localStorage.setItem(this._storageName, this._commentList.innerHTML)
    }, false)

    this.shadowRoot.querySelector('#userComments').addEventListener('click', (event) => {
      event.preventDefault()

      if (this._tempTest) {
        this._tempTest = false
        const saved = window.localStorage.getItem(this._storageName)
        if (saved) {
          this._commentList.innerHTML = saved
        }
        this._revealButton.textContent = 'Hide past comments'
      } else {
        this._commentList.innerHTML = ''
        this._tempTest = true
        this._revealButton.textContent = 'Reveal past comments'
      }
    })
  }

  /**
   * @param {*} data
   * @memberof CommentsElement
   */
  template (data) {
    this._commentList.insertAdjacentHTML('beforeend', `
    <div class="comment flex itemsStart justifyStart">
      <div class="flex1">
        <div class="commentBody">
          ${data.date}
          <br>
          ${data.comment}
        </div> 
      </div>
    </div>
    `)
  }
}
// Register custum element
window.customElements.define('comment-app', CommentsElement)
