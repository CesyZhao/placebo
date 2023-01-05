import { has } from 'lodash'

class Events {
  private events: Record<string, Function[]>
  constructor() {
    this.events = {}
  }

  /**
   * 触发事件执行
   * @param eventName
   * @param args
   */
  emit (eventName: string, ...args: any) {
    const handlers = this.events[eventName]
    if (handlers) {
      handlers.forEach((handler: Function) => handler(...args))
    }
  }

  // 监听事件，收集handler
  on (eventName: string, fn: Function) {
    const handlers = this.events[eventName]
    if (!handlers) {
      this.events[eventName] = [fn]
    } else {
      handlers.indexOf(fn) === -1 && handlers.push(fn)
    }
  }

  // 卸载事件
  off (eventName: string, fn?: Function) {
    if(!fn) {
      delete this.events[eventName]
      return
    }
    const handlers = this.events[eventName]
    if (handlers) {
      const index = handlers.indexOf(fn)
      index > -1 && handlers.splice(index, 1)
      !handlers.length && delete this.events[eventName]
    }
  }

  // 清空所有事件
  clear () {
    this.events = {}
  }

  getEvent(eventName: string) {
    if (!eventName) return undefined
    return this.events[eventName]
  }

  hasEvent (eventName: string) {
    return has(this.events, eventName)
  }
}

const events = new Events()

export default events
