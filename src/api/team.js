import request from '@/utils/request'

export function getAllTeams (userId) {
  return request({
    url: 'api/team?userId='+userId,
    method: 'get'
  })
}

export function createTeam(team){
  return request({
    url: 'api/team',
    method: 'post',
    data: team
  })
}

export function joinTeam(joinParam){
  return request({
    url: 'api/team/join',
    method: 'post',
    data: joinParam
  })
}

export function getTeammates(teamId,userId){
  return request({
    url: 'api/team/teammates?teamId='+teamId+"&userId="+userId,
    method: 'get'
  })
}

export function dropoutUser (teamId,userId) {
  return request({
    url: 'api/team/dropout?teamId='+teamId+"&userId="+userId,
    method: 'put'
  })
}
