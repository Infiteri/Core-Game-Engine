import { Layer } from './Layer.js'

export class LayerStack {
  /** @type {Object.<string, Layer>} */
  static layers = {}

  /** @type {Object.<string, Layer>} */
  static activeLayers = {}

  static GetLayer(name) {
    return LayerStack.layers[name]
  }

  static ActivateLayer(name) {
    const layer = LayerStack.layers[name]

    LayerStack.activeLayers[name] = layer
    layer.OnAttach()
  }

  static DeactivateLayer(name) {
    const layer = LayerStack.activeLayers[name]

    LayerStack.activeLayers[layer.name] = undefined
    layer.OnDetach()

    //Delete
    delete LayerStack.activeLayers[layer.name]
  }

  /**
   * Uploads a Layer to the stack
   *
   * @param {Layer} layer Layer to upload
   */
  static LoadLayer(layer) {
    LayerStack.layers[layer.name] = layer
  }
}
