import core from '../../core.js'
import { IMessageHandler, Message } from './Message.js'

export class MessageSubscriptionNode {
  message

  handler

  /**
   *
   * @param {Message} message
   * @param {IMessageHandler} handler
   */
  constructor(message, handler) {
    this.message = message
    this.handler = handler
  }
}

export class MessageBus {
  /** @type {Object.<string, Array.<IMessageHandler>>} */
  static subscriptions = {}

  static normalQueueMessagePerUpdate = 10

  /** @type {Array.<MessageSubscriptionNode>} */
  static normalMessageQueue = []

  /**
   *
   * @param {string} code
   * @param {IMessageHandler} handler
   */
  static AddSubscription(code, handler) {
    //Setup and container for the handlers at the specified code if doesn't exist otherwise if checks for a duplicate and if no duplicate is found it just gets added
    if (MessageBus.subscriptions[code] === undefined) {
      MessageBus.subscriptions[code] = []
    }

    //Duplicate found
    if (MessageBus.subscriptions[code].indexOf(handler) !== -1) {
      console.warn(
        `Found a duplicate handler for the code: ${code} handler not added`
      )
      console.trace()

      return
    }

    //Add it if no duplicate was found
    MessageBus.subscriptions[code].push(handler)
  }

  /**
   * Setups ahead of time a handler container for a specific code
   *
   * @param {string} name
   *
   * @returns {number} -1 = no success; 1 = success
   */
  static SetupContainer(name) {
    if (MessageBus.subscriptions[name]) {
      console.warn(
        `MessageBus.SetupContainer: Found a container available at name: ${name}; Function aborted (returns with -1)`
      )
      console.trace()

      return -1
    } else {
      MessageBus.subscriptions[name] = []
      return 1
    }
  }

  static RemoveSubscription(code, handler) {
    //Setup and container for the handlers at the specified code if doesn't exist otherwise if checks for a duplicate and if no duplicate is found it just gets added
    if (MessageBus.subscriptions[code] === undefined) {
      console.warn(`Cannot unsubscribe with code: ${code} not found`)
      console.trace()

      return
    }

    //Duplicate found
    const index = MessageBus.subscriptions[code].indexOf(handler)

    //Found
    if (index !== -1) {
      MessageBus.subscriptions[code].splice(index, 1) // Remove at the index by one
    }
  }

  /**
   * Posts a message
   * @param {Message} message
   */
  static Post(message) {
    if (core.debugLog) {
      console.log('Message posted with code: ' + message.code)
      console.table(message)
      console.trace()
    }

    const handlers = MessageBus.subscriptions[message.code]

    //No handlers no loop
    if (handlers === undefined) return

    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i]

      if (message.priority === core.MessagePriority.HIGH) {
        //Send it right away
        handler.OnMessage(message)
      } else {
        //Queue it up
        MessageBus.normalMessageQueue.push(
          new MessageSubscriptionNode(message, handler)
        )
      }
    }
  }

  static Update() {
    //No care if the length is 0
    if (MessageBus.normalMessageQueue.length === 0) return

    const messageList = Math.min(
      MessageBus.normalQueueMessagePerUpdate,
      MessageBus.normalMessageQueue.length
    )

    for (let i = 0; i < messageList; i++) {
      const node = MessageBus.normalMessageQueue.pop()

      //Handle normal messages
      node.handler.OnMessage(node.message)
    }
  }
}
