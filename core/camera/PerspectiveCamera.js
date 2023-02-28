import core, { gl } from '../core.js'
import { Camera } from './Camera.js'

export class PerspectiveCamera extends Camera {
  constructor(fov = 1) {
    super()

    this.fov = fov
    this.aspect = gl.canvas.width / gl.canvas.height
    this.near = -10
    this.far = 1001

    this.projectionMatrix = core.Matrix4x4.Perspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    )
  }

  RecalculateProjection() {
    this.aspect = gl.canvas.width / gl.canvas.height

    this.projectionMatrix = core.Matrix4x4.Perspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    )
  }
}
