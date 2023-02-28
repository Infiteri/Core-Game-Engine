import core from '../core.js'
import { Material } from './Material.js'

export class ColorMaterial extends Material {
  constructor(name, color = core.Color.WHITE) {
    super(name)

    this.color = color
    this.shader = core.ShaderManager.Get('ColorShader')
  }

  Render() {
    this.shader.Use()

    this.shader.UploadVec4fv('uColor', this.color.To32Array())
  }
}
