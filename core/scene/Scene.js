import core from '../core.js'

export class Scene {
  constructor(name) {
    this.name = name
    this.root = new core.Entity('__ROOT__')
  }

  OnLoad() {}

  OnUnload() {}

  OnUpdate() {}

  GetByName(name) {
    return this.root.GetByName(name)
  }

  /**
   * Adds a new entity
   *
   * @param {Entity} entity Entity to add
   */
  AddChild(entity) {
    if (entity === this) {
      throw new Error(
        'Unable to add child to scene because the scene gets added to the scene (this.scene.AddChild(this.scene)) this causes maximum callStack to exceed'
      )
    }

    if (entity === undefined) {
      throw new Error(
        'Unable to add child to scene because entity is undefined'
      )
    }

    this.root.AddChild(entity)
  }

  Init() {
    //Init children
    this.root.Init()
  }

  Render() {
    //Render children
    this.root.Render()
  }

  Update() {
    //Update children
    this.root.Update()

    //Extra update callback
    this.OnUpdate()
  }
}
