export class Mouse {
  /** @private */
  static leftButton = false

  /** @private */
  static scrollButton = false

  /** @private */
  static rightButton = false

  static LEFT = 0
  static SCROLL = 1
  static RIGHT = 2

  //Mouse position
  static clickY = 0
  static clickY = 0

  static currentX = 0
  static currentY = 0

  /**
   * @param {number} mouseId The mouse id
   */
  static IsMouseDown(mouseId) {
    if (mouseId === 0) return Mouse.leftButton
    if (mouseId === 1) return Mouse.scrollButton
    if (mouseId === 3) return Mouse.rightButton
  }

  static Init() {
    addEventListener('mousedown', event => {
      if (event.button === 0) Mouse.leftButton = true
      if (event.button === 1) Mouse.scrollButton = true
      if (event.button === 2) Mouse.rightButton = true

      Mouse.clickX = event.clientX
      Mouse.clickY = event.clientY
    })

    addEventListener('mousemove', ({ clientX, clientY }) => {
      Mouse.currentX = clientX
      Mouse.currentY = clientY
    })

    addEventListener('mouseup', event => {
      if (event.button === 0) Mouse.leftButton = false
      if (event.button === 1) Mouse.scrollButton = false
      if (event.button === 2) Mouse.rightButton = false
    })
  }
}
