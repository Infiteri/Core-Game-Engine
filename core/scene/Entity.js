import core from '../core.js'

export class Entity {
  constructor(name = 'DefaultName') {
    this.name = name
    this.isLoaded = false

    /** @type {Entity | undefined} */
    this.parent = undefined

    this.transform = new core.Transform()

    /** @private */
    this.localMatrix = core.Matrix4x4.Identity()

    /** @private */
    this.worldMatrix = core.Matrix4x4.Identity()

    //Hierarchy
    this.children = []
    this.components = []
    this.scripts = []
  }

  AddComponent(component) {
    component.parent = this
    if (this.isLoaded) component.Init()
    this.components.push(component)
  }

  AddScript(script) {
    script.entity = this
    script.OnInit()
    this.scripts.push(script)
  }

  /**
   * Adds a new entity
   *
   * @param {Entity} entity Entity to add
   */
  AddChild(entity) {
    entity.parent = this
    if (this.isLoaded) entity.Init() //Assuming that the entity is already loaded we will init it
    this.children.push(entity)
  }

  GetByName(name) {
    if (name === this.name) return this

    //Loop in the tree
    for (const c of this.children) {
      const result = c.GetByName(name)
      if (result) {
        return result
      }
    }

    return undefined
  }

  Init() {
    //Init children
    for (let i = 0; i < this.children.length; i++) {
      const c = this.children[i]
      c.Init()
    }

    for (let i = 0; i < this.components.length; i++) {
      const c = this.components[i]
      c.Init()
    }

    this.isLoaded = false
  }

  Render() {
    //Render children
    for (let i = 0; i < this.children.length; i++) {
      const c = this.children[i]
      c.Render()
    }

    for (let i = 0; i < this.components.length; i++) {
      const c = this.components[i]
      c.Render()
    }
  }

  Update() {
    //Update the world position / rotation / scale
    this.localMatrix = this.transform.GetMatrix()
    this.UpdateWorldMatrix(this.parent ? this.parent.localMatrix : undefined)

    //Update children
    for (let i = 0; i < this.children.length; i++) {
      const c = this.children[i]
      c.Update()
    }

    for (let i = 0; i < this.scripts.length; i++) {
      const c = this.scripts[i]
      c.OnUpdate()
    }

    for (let i = 0; i < this.components.length; i++) {
      const c = this.components[i]
      c.Update()
    }
  }

  UpdateWorldMatrix(parentMatrix) {
    if (parentMatrix) {
      this.worldMatrix = core.Matrix4x4.Multiply(parentMatrix, this.localMatrix)
    } else {
      this.worldMatrix.CopyFrom(this.localMatrix)
    }
  }
}
