import core from '../core.js'

export class Camera {
  constructor() {
    this.position = core.Vector3.ZERO

    this.projectionMatrix = core.Matrix4x4.Identity()
    this.modelMatrix = core.Matrix4x4.Translation(this.position)

    this.scripts = []
  }

  AddScript(script) {
    script.entity = this
    script.OnInit()
    this.scripts.push(script)
  }

  Update() {
    this.RecalculateModel()

    for (const c of this.scripts) {
      c.OnUpdate()
    }
  }

  Recalculate() {
    this.RecalculateProjection()
    this.RecalculateModel()
  }

  GetMatrix() {
    return core.Matrix4x4.Multiply(this.projectionMatrix, this.modelMatrix)
  }

  RecalculateProjection() {}

  RecalculateModel() {
    this.modelMatrix = core.Matrix4x4.Translation(this.position)
  }
}
