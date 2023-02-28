import core from '../../core.js'

/** @enum */
export const MessagePriority = {
  HIGH: 'HIGH',
  NORMAL: 'NORMAL',
}

export class IMessageHandler {
  /**
   * Handles a message if the code is the same (use message.Is method to check)
   *
   * @param {Message} message
   */
  OnMessage(message) {}
}

export class Message {
  /**
   *
   * @param {string} code
   * @param {any} sender
   * @param {any} context
   * @param {MessagePriority} priority
   */
  constructor(code, sender, context, priority = MessagePriority.NORMAL) {
    this.code = code
    this.sender = sender
    this.context = context
    this.priority = priority
  }

  Is(code) {
    return this.code === code
  }

  static Send(code, sender, context) {
    core.MessageBus.Post(new Message(code, sender, context))
  }

  static SendPriority(code, sender, context) {
    core.MessageBus.Post(
      new Message(code, sender, context, MessagePriority.HIGH)
    )
  }

  static Subscribe(code, handler) {
    core.Message.Subscribe(code, handler)
  }

  static Unsubscribe(code, handler) {
    core.Message.Unsubscribe(code, handler)
  }
}
