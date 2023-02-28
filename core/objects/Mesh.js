import { Camera } from '../camera/Camera.js'
import core from '../core.js'

export class Mesh {
  constructor(name, geometry, materialName) {
    this.name = name
    this.data = geometry.data

    this.material = new core.ColorMaterial('material', core.Color.SEMI_BLUE)

    this.buffer = new core.Buffer(5)
    this.buffer.AddAttribute(new core.Attribute(0, 0, 3))
    this.buffer.AddAttribute(new core.Attribute(1, 3, 2))
    this.buffer.PushBackData(this.data)
    this.buffer.Upload()
  }

  Init() {}

  Update() {}

  Render(model) {
    this.material.Render()
    this.material.UploadModel('uEntityMatrix', model.ToFloat32Array())

    this.buffer.Bind()
    this.buffer.Draw()
  }
}
