import core from '../Core/core.js'
import { Test } from './testscript.js'

export class Application extends core.CoreApp {
  constructor() {
    super('Main App')

    this.scene = new core.Scene('Main Scene')

    this.engine.activeCamera.AddScript(new Test())

    this.entity = new core.Entity()
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
    this.scene.Init()

    core.SceneManager.UploadScene(this.scene)
    core.SceneManager.ActivateScene('Main Scene')

    //Bind engine render / update extra callbacks
    this.engine.OnRender = this.OnRender.bind(this)
    this.engine.OnUpdate = this.OnUpdate.bind(this)
  }

  OnRender() {
    this.entity.transform.rotation++
    this.meshComponent2.transform.rotation++

  }

  OnUpdate() {}

  Run() {
    this.engine.Loop()
  }
}
