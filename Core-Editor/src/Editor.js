import core from '../../core/core.js'
import { ScenePanel } from './ScenePanel.js'
import { Sidebar } from './Sidebar.js'

export class Editor extends core.CoreApp {
  static FillWithEntity(entity, p) {
    Sidebar.FillWithEntity(entity, p)
  }

  constructor() {
    super('CoreEditor')

    Sidebar.Init()

    //TODO: Make it dynamic
    this.engine = new core.Engine()

    this.scene = new core.Scene()

    this.entity = new core.Entity('Player')
    this.entity.transform.position.x = 500
    this.entity.transform.position.y = 250
    this.entity.Init()

    this.meshComponent = new core.MeshComponent('asd')
    this.meshComponent.transform.position.x = 100
    this.meshComponent.transform.position.y = -100
    this.entity.AddComponent(this.meshComponent)

    this.meshComponent2 = new core.MeshComponent('asd2')
    this.meshComponent2.transform.position.x = 350
    this.meshComponent2.transform.position.y = -200
    this.entity.AddComponent(this.meshComponent2)

    this.scene.AddChild(this.entity)
    this.engine.ToScene(this.scene)
    this.scene.Init()

    new ScenePanel(this.engine.activeScene.root)
  }

  Sp() {}

  Run() {
    this.engine.Loop()
  }

  Init() {
    this.Run()
  }
}
