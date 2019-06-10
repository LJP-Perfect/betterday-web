import request from '@/utils/request'

export function createEvent (event) {
  return request({
    url: 'api/event',
    method: 'post',
    data: event
  })
}

export function getTodayEvents(userId){
  return request({
    url: 'api/event/today/events?userId='+userId,
    method: 'get'
  })
}

export function getEvents(userId){
  return request({
    url: 'api/event?userId='+userId,
    method: 'get'
  })
}

export function getEventVOById(id){
  return request({
    url: 'api/event/eventVo/'+id,
    method: 'get'
  })
}

export function getEventById(id){
  return request({
    url: 'api/event/event/'+id,
    method: 'get'
  })
}

export function updateEvent(event){
  return request({
    url: 'api/event',
    method: 'put',
    data: event
  })
}

export function deleteEvent(id){
  return request({
    url: 'api/event?id='+id,
    method: 'delete'
  })
}
