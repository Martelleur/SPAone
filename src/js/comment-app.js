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
            <button id="userComments">Reveal past comments</button>
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
:host .commentBody {
    background-color: white;
    color: black;
    max-width: 95%;
    margin: 0 auto;
    overflow: hidden;
}
:host .comment {
    padding: 1em;  
}
:host .commentInput {
    width: 95%;
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
window.customElements.define('comment-app', CommentsElement)
