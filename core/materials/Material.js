import { Shader } from '../webgl/Shader.js'

export class Material {
  constructor(name) {
    this.name = name

    /** @type {Shader} */
    this.shader
  }

  Init() {}

  UploadModel(name, model) {
    this.shader.UploadMat4(name, model)
  }

  Render() {}
}
