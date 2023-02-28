import core from '../../core/core.js'
import { Editor } from './Editor.js'

export class ScenePanel {
  constructor(root) {
    this.root = root

    this.domElement = document.createElement('div')
    this.domElement.innerHTML += `
        <h3>Scene Hierarchy</h3>
        <button class="add">Add Entity</button>
    `
    this.domElement.classList.add('ScenePanel')

    this.elements = this.root.children

    document.body.appendChild(this.domElement)

    this.Init()
  }

  CreateUIForChild(entity) {
    let name = entity.name

    const nameElement = document.createElement('p')
    nameElement.innerText = name
    nameElement.style.marginLeft = 10 + 'px'

    nameElement.onclick = () => {
      name = entity.name
      const gotEnTT = this.root.GetByName(name)
      Editor.FillWithEntity(gotEnTT, nameElement)
    }

    this.domElement.appendChild(nameElement)
  }

  Init() {
    //Apply button add callback
    this.domElement.querySelector('button').onclick = () => {
      const e = new core.Entity('Entity')
      e.AddComponent(new core.MeshComponent('Mesh'))

      //Add to the tree
      this.root.AddChild(e)
      this.CreateUIForChild(e)
    }

    this.elements.forEach(e => {
      this.CreateUIForChild(e)
    })
  }
}
