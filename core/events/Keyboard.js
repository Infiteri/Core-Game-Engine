export class Keyboard {
  static keys = {}

  static Init() {
    addEventListener('keydown', event => {
      Keyboard.keys[event.code] = true
      Keyboard.keys[event.keyCode] = true
      Keyboard.keys[event.key] = true
    })

    addEventListener('keyup', event => {
      Keyboard.keys[event.code] = false
      Keyboard.keys[event.keyCode] = false
      Keyboard.keys[event.key] = false
    })
  }

  static IsKeyDown(code) {
    const key = Keyboard.keys[code]

    if (key) {
      return true
    } else {
      return false
    }
  }
}
