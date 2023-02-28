import { Camera } from '../camera/Camera.js'
import { gl } from '../core.js'

export class Window {
  /**
   *
   * @param {string} title Window title
   * @param {Camera} camera Camera to recalculate
   */
  constructor(title = 'Window', camera) {
    this.canvas = document.querySelector('canvas')
    this.camera = camera

    //Data
    this.title = title
    this.width = innerWidth
    this.height = innerHeight

    //Set data
    this.SetData()
    this.ResizeSetup()
  }

  OnResize() {}

  /** @private */
  OnResizeCallback() {
    this.SetData()

    this.camera.Recalculate()

    //Any other resizing callback that shouldn't be implemented by the client will be written here
  }

  /** @private */
  ResizeSetup() {
    window.onresize = () => {
      this.OnResizeCallback()
      this.OnResize()
    }
  }

  /** @private */
  SetData() {
    this.width = innerWidth
    this.height = innerHeight

    this.canvas.width = this.width
    this.canvas.height = this.height

    gl.viewport(0, 0, this.width, this.height)

    this.camera.Recalculate()
  }
}
