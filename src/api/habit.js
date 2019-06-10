import request from '@/utils/request'

export function getHabitIcons () {
  return request({
    url: 'api/habit/icons',
    method: 'get'
  })
}

export function getPublicHabits () {
  return request({
    url: 'api/habit/public',
    method: 'get'
  })
}

export function getHabitData(userId){
  return request({
    url: 'api/habit/data?userId='+userId,
    method: 'get'
  })
}

export function getAllTimes(userId){
  return request({
    url: 'api/habit/times?userId='+userId,
    method: 'get'
  })
}

export function addHabit(habit){
  return request({
    url: 'api/habit',
    method: 'post',
    data: habit
  })
}

export function getTodayHabits(userId){
  return request({
    url: 'api/habit?userId='+userId,
    method: 'get'
  })
}

export function checkHabit(habitCheckParam){
  return request({
    url: 'api/habit/check',
    method: 'put',
    data: habitCheckParam
  })
}
