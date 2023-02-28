import core from '../../core.js'
import { Component } from './Component.js'

export class MeshComponent extends Component {
  constructor(name, materialName, geometry = new core.BoxGeometry(100, 100)) {
    super(name)

    this.transform = new core.Transform()

    /** @private */
    this.mesh = new core.Mesh(name + ' MESH_INSTANCE', geometry, materialName)

    this.type = 'MeshComponent'
  }

  Init() {
    this.mesh.Init()

    super.Init()
  }

  Render() {
    this.mesh.Render(
      core.Matrix4x4.Multiply(
        this.parent.worldMatrix,
        this.transform.GetMatrix()
      )
    )

    super.Render()
  }

  Update() {
    this.mesh.Update()

    super.Update()
  }
}
