import core, { gl } from '../core.js'
import { Camera } from './Camera.js'

export class OrthographicCamera extends Camera {
  constructor() {
    super()

    //Data
    this.left = 0
    this.right = gl.canvas.width
    this.bottom = gl.canvas.height
    this.top = 0
    this.far = 100
    this.near = -1

    //Update projection
    this.projectionMatrix = core.Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.far,
      this.near
    )
  }

  RecalculateProjection() {
    this.right = gl.canvas.width
    this.bottom = gl.canvas.height

    this.projectionMatrix = core.Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.far,
      this.near
    )
  }
}
