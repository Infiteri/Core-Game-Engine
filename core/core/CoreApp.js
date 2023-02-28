import core from '../core.js'
import { IMessageHandler } from '../global/messages/Message.js'

export class CoreApp extends IMessageHandler {
  constructor(name) {
    super()

    this.name = name

    this.engine = new core.Engine()
  }
}
