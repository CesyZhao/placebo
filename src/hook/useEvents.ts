import { useEffect } from 'react'
import { isArray, isFunction } from 'lodash'
import events from '../util/event'
import { IEvent } from '../defination/event'

type fn = () => IEvent[]
type param =  IEvent[]|fn

/**
 * useEvents 事件处理
 * onMount 的时候绑定事件，onUnmount 的时候自动解绑事件
 * @param { IEvent[]|fn } param 事件对象列表或者返回一个事件列表的函数
 * */
const useEvents = (param: param) => {

  useEffect(() => {
    const eventList = isFunction(param) ? param() : param
    if (!isArray(eventList)) return
    eventList.forEach(e => {
      const { name, handler } = e
      if (!handler) return
      events.on(name, handler)
    })

    return () => {
      eventList.forEach(e => {
        const { name, handler } = e
        events.off(name, handler)
      })
    }

  }, [])
}

export default useEvents
