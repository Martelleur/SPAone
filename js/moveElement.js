function moveElement (element) {
  let newPossitionX = 0
  let newPossitionY = 0
  let possitionX = 0
  let possitionY = 0

  /*
  console.log('element/JM')
  console.log(element)
  console.log(element.shadowRoot.querySelector('#tools'))
  */
  if (element.shadowRoot.querySelector('#tools')) {
    element.shadowRoot.querySelector('#tools').onmousedown = moveMouseDown
  } else {
    element.onmousedown = moveMouseDown
  }

  function moveMouseDown (event) {
    // get possition for mouse
    possitionX = event.clientX
    possitionY = event.clientY
    // console.log(event.clientX)
    // console.log(event.clientY)
    document.onmouseup = stopElementMove
    // call function when cursor moves
    document.onmousemove = elementMove
  }

  function elementMove (event) {
    // calculate new position for mouse
    newPossitionX = possitionX - event.clientX
    newPossitionY = possitionY - event.clientY
    possitionX = event.clientX
    possitionY = event.clientY
    // console.log(possitionX - event.clientX)
    // console.log(possitionY - event.clientY)
    // set elements new position
    element.style.top = (element.offsetTop - newPossitionY) + 'px'
    element.style.left = (element.offsetLeft - newPossitionX) + 'px'
    // console.log(element.offsetTop)
    // console.log(element.offsetTop)
  }

  function stopElementMove () {
    // stop moving
    document.onmouseup = null
    document.onmousemove = null
  }
}

export { moveElement }
