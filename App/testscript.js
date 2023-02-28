import core from '../Core/core.js'
import { MonoScript } from '../core/script/MonoScript.js'

export class Test extends MonoScript {
  OnUpdate() {
    if (core.Keyboard.IsKeyDown('KeyA')) {
      this.entity.position.x += 10
    }

    if (core.Keyboard.IsKeyDown('KeyD')) {
      this.entity.position.x -= 10
    }

    if (core.Keyboard.IsKeyDown('KeyW')) {
      this.entity.position.y += 10
    }

    if (core.Keyboard.IsKeyDown('KeyS')) {
      this.entity.position.y -= 10
    }
  }
}
