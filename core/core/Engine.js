import core, { gl } from '../core.js'
import { Layer } from '../layer/Layer.js'

export class Engine extends Layer {
  constructor() {
    super('EngineLayer')

    //Init
    core.ShaderManager.Init()

    /** @private */
    this.editorCamera = new core.OrthographicCamera()

    /** @private */
    this.playCamera = new core.OrthographicCamera()
    this.playCamera.position.x = 50
    this.playCamera.position.y = 50

    //Main active
    this.activeCamera = this.editorCamera

    this.window = new core.Window('CoreWindow', this.activeCamera)

    //Init handlers
    core.Keyboard.Init()
    core.Mouse.Init()

    this.activeCamera.Recalculate()

    //Gets assigned on attach @see Layer.js / @see LayerStack.js
    this.isRunning = null

    //Upload to the stack
    core.LayerStack.LoadLayer(this)
    core.LayerStack.ActivateLayer(this.name)
  }

  OnAttach() {
    this.isRunning = true
  }

  OnDetach() {
    this.isRunning = false
  }

  ToEditorCamera() {
    this.SetActiveCamera(this.editorCamera)
  }

  ToPlayCamera() {
    this.SetActiveCamera(this.playCamera)
  }

  SetActiveCamera(camera) {
    this.activeCamera = camera
    this.activeCamera.Recalculate()
  }

  OnRender() {}

  OnUpdate() {}

  Loop() {
    if (this.isRunning) {
      this.Render()
      this.Update()
    }

    requestAnimationFrame(this.Loop.bind(this))
  }

  /** @private */
  Render() {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    core.SceneManager.Render()

    this.OnRender()
  }

  /** @private */
  Update() {
    this.OnUpdate()

    core.SceneManager.Update()

    //Update the core
    this.activeCamera.Update()
    core.ShaderManager.Update(this.activeCamera)
    core.MessageBus.Update()
  }
}
