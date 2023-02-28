import core from '../../core.js'

export const messages = {
  ON_ASSET_LOADED: 'MESSAGE_ASSET_MANAGER_ON_ASSET_LOADED::',
}

export class IAsset {
  name
  data
}

export class IAssetLoader {
  supportedExtensions = []

  /**
   * Loads an asset
   * @param {IAsset} asset
   */
  LoadAsset(asset) {}
}

export class AssetManager {
  /** @type {Array.<IAssetLoader>} */
  static loaders = []

  /** @type {Object.<name, IAsset>} */
  static loadedAssets = {}

  static Init() {
    AssetManager.loaders.push(new core.ImageAssetLoader())
  }

  /**
   * Adds a new loader
   *
   * @param {IAssetLoader} loader
   */
  static RegisterLoader(loader) {
    if (loader) {
      AssetManager.loaders.push(loader)
    } else {
      console.error(`Unable to push loader of type undefined`)
      console.trace()
      return
    }
  }

  /**
   * @param {IAsset} asset
   */
  static OnAssetLoaded(asset) {
    AssetManager.loadedAssets[asset.name] = asset

    core.Message.Send(messages.ON_ASSET_LOADED + asset.name, this, asset)
  }

  /**
   *
   * @param {string} name Name of the file
   */
  static LoadAsset(name) {
    const extension = name.split('.').pop().toLowerCase()

    for (let i = 0; i < AssetManager.loaders.length; i++) {
      const loader = AssetManager.loaders[i]

      if (loader.supportedExtensions.indexOf(extension) !== -1) {
        loader.LoadAsset(name)
        break
      }
    }

    console.warn('NO ASSET WITH NAME: ' + name + ' EXTENSION: ' + extension)
  }

  static IsAssetLoaded(name) {
    return AssetManager.loadedAssets[name] !== undefined
  }

  /**
   * @param {name} name
   * @returns {IAsset}
   */
  static GetAsset(name) {
    if (AssetManager.loadedAssets[name]) {
      return AssetManager.loadedAssets[name]
    } else {
      console.warn('Unable to get asset ' + name + ' does not exist.')
      AssetManager.LoadAsset(name)
    }

    return undefined
  }
}
