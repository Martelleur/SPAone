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
  if (element.shadowRoot.querySelector('#title')) {
    element.shadowRoot.querySelector('#title').onmousedown = moveMouseDown
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
    if (element.offsetLeft > 0) {
      newPossitionX = possitionX - event.clientX
      possitionX = event.clientX
      // console.log(possitionX - event.clientX)
      // console.log(possitionY - event.clientY)
      // set elements new position
      element.style.left = (element.offsetLeft - newPossitionX) + 'px'
      console.log(element.offsetTop)
      console.log(element.offsetLeft)
    } else {
      // element.style.top = '1px'
      element.style.left = '1px'
    }
    if (element.offsetTop > 0) {
      newPossitionY = possitionY - event.clientY
      possitionY = event.clientY
      // console.log(possitionX - event.clientX)
      // console.log(possitionY - event.clientY)
      // set elements new position
      element.style.top = (element.offsetTop - newPossitionY) + 'px'
      console.log(element.offsetTop)
      console.log(element.offsetLeft)
    } else {
      element.style.top = '1px'
    }
  }

  function stopElementMove () {
    // stop moving
    document.onmouseup = null
    document.onmousemove = null
  }
}

export { moveElement }
