import core from '../../core.js'
import { IAsset, IAssetLoader } from './AssetManager.js'

export class ImageAsset extends IAsset {
  constructor(name, data) {
    super()

    /** @type {string} */
    this.name = name

    /** @type {HTMLImageElement} */
    this.data = data
  }

  get width() {
    return this.data.width
  }

  get height() {
    return this.data.height
  }
}

export class ImageAssetLoader extends IAssetLoader {
  supportedExtensions = ['png', 'gif', 'jif', 'jpg', 'jpeg']

  /**
   * @param {string} name
   */
  LoadAsset(name) {
    const img = new Image()
    img.onload = this.OnImageLoaded.bind(this, img)
    img.src = name
  }

  /**
   * @param {string} name
   * @param {Image} image
   */
  OnImageLoaded(name, image) {
    if (core.debugLog) {
      console.log('OnImageLoaded', name, image)
      console.trace()
    }

    const asset = new ImageAsset(name, image)
    core.AssetManager.OnAssetLoaded(asset)
  }
}
