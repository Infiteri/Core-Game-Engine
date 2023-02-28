//Lil utils
dat.GUI.prototype.removeFolder = function (name) {
  var folder = this.__folders[name]
  if (!folder) {
    return
  }
  folder.close()
  this.__ul.removeChild(folder.domElement.parentNode)
  delete this.__folders[name]
  this.onResize()
}

export class Sidebar {
  static gui = new dat.GUI({ width: 300 })

  static FillWithEntity(entity, p) {
    Sidebar.Empty()
    const folders = Sidebar.CreateFolders()

    folders.common.add(entity, 'name').onChange(value => {
      p.innerText = value
      entity.name = value
    })

    Sidebar.AddTransform(folders.transform, entity)
  }

  static AddTransform(folder, entity) {
    const position = folder.addFolder('Position')
    position.add(entity.transform.position, 'x')
    position.add(entity.transform.position, 'y')
    position.add(entity.transform.position, 'z')

    const rotation = folder.addFolder('Rotation')
    rotation.add(entity.transform.rotation, 'x', 0, 360)
    rotation.add(entity.transform.rotation, 'y', 0, 360)
    rotation.add(entity.transform.rotation, 'z', 0, 360)

    const scale = folder.addFolder('Scale')
    scale.add(entity.transform.scale, 'x')
    scale.add(entity.transform.scale, 'y')
    scale.add(entity.transform.scale, 'z')
  }

  static Empty() {
    Sidebar.gui.removeFolder('Common')
    Sidebar.gui.removeFolder('Transforms')
  }

  static CreateFolders() {
    const folders = {
      common: Sidebar.gui.addFolder('Common'),
      transform: Sidebar.gui.addFolder('Transforms'),
    }

    return folders
  }

  static Init() {
    Sidebar.gui.domElement.style.cssText = `
    position: absolute;
    top: 0;
    right: 0;
    `

    Sidebar.gui.domElement.querySelector('.close-button').remove()
  }
}
