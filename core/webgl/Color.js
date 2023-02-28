export class Color {
  constructor(r = 255, g = 255, b = 255, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  static get WHITE() {
    return new Color(255, 255, 255, 1)
  }

  static get RED() {
    return new Color(255, 0, 0, 1)
  }

  static get BLUE() {
    return new Color(0, 255, 0, 1)
  }

  static get GREEN() {
    return new Color(0, 0, 255, 1)
  }

  static get SEMI_BLUE() {
    return new Color(0, 125, 255, 1)
  }

  ToWebGLArray() {
    return [this.r / 255, this.g / 255, this.b / 255, this.a]
  }

  To32Array() {
    return new Float32Array(this.ToWebGLArray())
  }
}
