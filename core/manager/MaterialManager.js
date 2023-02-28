import core from '../core.js'
import { Material } from '../materials/Material.js'

/**
 * @namespace core
 *
 * @description
 */
export class MaterialManager {
  /** @type {Object.<string, Material>} */
  static materials = {}

  /**
   *
   * @param {Material} material
   */
  static Upload(material) {
    const exists = MaterialManager.materials[material.name] !== undefined

    if (exists) {
      core.Logger.Warn(
        'Unable to upload material bcz was found: ' + material.name
      )
      return
    } else {
      MaterialManager.materials[material.name] = material
    }
  }

  static Get(name) {
    const exists = MaterialManager.materials[name] !== undefined

    if (!exists) {
      core.Logger.Fatal('Unable to get material bcz was not found: ' + name)
      return
    } else {
      return MaterialManager.materials[name]
    }
  }
}
