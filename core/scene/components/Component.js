import { MonoScript } from '../../script/MonoScript.js'
import { Entity } from '../Entity.js'

export class Component {
  constructor(name) {
    this.name = name

    this.type = 'Component'

    /** @type {Entity} */
    this.parent

    /** @type {Array.<MonoScript>} */
    this.scripts = []

    this.isLoaded = false
  }

  AttachScript(script) {
    if (this.isLoaded) script.OnInit()
    script.entity = this
    this.scripts.push(script)
  }

  Init() {
    for (let i = 0; i < this.scripts.length; i++) {
      this.scripts[i].OnInit()
    }

    this.isLoaded = true
  }

  Render() {}

  Update() {
    for (let i = 0; i < this.scripts.length; i++) {
      this.scripts[i].OnUpdate()
    }
  }
}
