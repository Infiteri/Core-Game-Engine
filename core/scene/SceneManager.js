import { Scene } from './Scene.js'

export class SceneManager {
  /** @type {Object.<string, Scene>} */
  static scenes = {}

  /** @type {Scene} */
  static activeScene = null

  static GetScene(name) {
    const scene = SceneManager.scenes[name]

    if (!scene) {
      throw new Error('Unable to get scene: ' + name + ' not found')
    } else return scene
  }

  /**
   * Uploads a scene to the dictionary
   *
   * @param {Scene} scene Scene that gets updated
   */
  static UploadScene(scene) {
    const exists = SceneManager.scenes[scene.name]

    if (exists) {
      console.warn(
        `Found another scene while trying to upload scene: ${scene.name}`
      )
    } else {
      SceneManager.scenes[scene.name] = scene
    }
  }

  static ActivateScene(name) {
    const exists = SceneManager.scenes[name]

    if (!exists) {
      throw new Error(`Can't start scene: ${name} not found`)
    } else {
      //Check if the current scene is the passed in scene
      if (SceneManager.activeScene === SceneManager.scenes[name]) {
        console.warn('Changing scenes to the current active scene: ' + name)
        return
      } else {
        //If another scene is present, unload it
        if (SceneManager.activeScene !== null) {
          SceneManager.activeScene.OnUnload()
        }

        //Reset
        SceneManager.activeScene = SceneManager.scenes[name]
        SceneManager.activeScene.Init()
        SceneManager.activeScene.OnLoad()
      }
    }
  }

  static Update() {
    if (SceneManager.activeScene !== null) {
      SceneManager.activeScene.Render()
    }
  }

  static Render() {
    if (SceneManager.activeScene !== null) {
      SceneManager.activeScene.Update()
    }
  }
}
