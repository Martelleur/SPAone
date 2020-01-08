const template = document.createElement('template')
template.innerHTML = /* html */`
<div id="commentContainer">    
<div class="comments">
    <div class="comment flex itemsStart justifyStart">
        <div class="flex1">
            <div class="commentBody">Comments</div> 
        </div>
    </div>
</div>    
<div class="comment commentNew flex itemsStart justifyStart">
    <div class="flex1">
        <form action="#" class="commentForm">
            <textarea placeholder="Add a comment" class="commentInput"></textarea>
            <input type="submit" class="commentSubmit" value="Submit">
            <button id="userComments">REVEAL PAST COMMENTS</button>
        </form>
    </div>
</div>
</div>
<style>
:host {
    box-sizing: border-box;    
}
:host .flex {
    display: flex;
}
:host .flex1 {
    flex: 1;
    overflow: hidden;
}
:host .itemsStart {
    align-items: flex-start;
}
:host .justifyStart {
    justify-content: flex-start;
}
:host #commentContainer {
    width: 80%;
    border: 2px solid #3b121f;
    min-height: 400px;
    margin: 0 auto;
    background-color: black;
    color: #0c5cc4;
    text-transform: uppercase;
}
:host .commentBody {
    background-color: #011626;
    color: #0c5cc4;
    line-height: 2em;
    max-width: 95%;
    margin: 0 auto;
    border: 2px solid black;
    overflow: hidden;
}
:host .comment {
    padding: 1em;  
}
:host .commentBody:hover {
    background-color: #3b121f;
    border: 2px solid #0c5cc4;
}
:host .commentInput {
    font-size: 1.3em;
    border: 2px solid #3b121f;
    width: 95%;
    color: #0c5cc4;
    min-height: 100px;
    background-color: #011626; 
    text-transform: uppercase;
}
:host .commentInput:focus, .commentInput:hover {
    background-color: #3b121f;
    border: 2px solid #0c5cc4;
    outline: none;
    color: #81a655;
    cursor: pointer;
}
:host .commentSubmit, :host #userComments {
    background: #011626;
    border: 2px solid #3b121f;
    color:  #8f6d47;
    cursor: pointer;
    text-transform: uppercase;
}
:host .commentSubmit:hover, :host #userComments:hover {
    background-color: #3b121f;
    border: 2px solid #0c5cc4;
    color: #0c5cc4; 
}
</style>
`
export default class CommentsElement extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._submit = this.shadowRoot.querySelector('.commentSubmit')
    this._commentList = this.shadowRoot.querySelector('.comments')
    this._commentInput = this.shadowRoot.querySelector('.commentInput')
  }

  /**
   * @readonly
   * @static
   * @memberof CommentsElement
   */
  static get observedAttributes () {
    return ['src', 'class', 'id']
  }

  /**
   *
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @memberof CommentsElement
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'src') {
      this._src = newValue
    }
  }

  /**
   * @memberof CommentsElement
   */
  connectedCallback () {
    this._submit.addEventListener('click', event => {
      const data = {
        comment: this._commentInput.value
      }
      // prevent form from submitting
      event.preventDefault()

      // if commet textarea value < 1 exit
      if (this._commentInput.value.length < 1) {
        return
      }
      // append comment
      this.template(data)

      // reset textarea value
      this._commentInput.value = ''

      // Save to local storage
      window.localStorage.setItem('commentListning', this._commentList.innerHTML)
    }, false)

    this.shadowRoot.querySelector('#userComments').addEventListener('click', (event) => {
      event.preventDefault()

      // get instance of local storage key/value
      const saved = window.localStorage.getItem('commentListning')

      // checked if it exits and if so set HTML to value
      if (saved) {
        this._commentList.innerHTML = saved
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
        <div class="commentBody">${data.comment}</div> 
      </div>
    </div>
    `)
  }
}
// Register custum element
window.customElements.define('comments-element', CommentsElement)
