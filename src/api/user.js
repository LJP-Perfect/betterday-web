import request from '@/utils/request'

export function login (loginParam) {
  return request({
    url: 'api/login',
    method: 'post',
    data: loginParam
  })
}

export function register(user){
  return request({
    url: 'api/user/register',
    method: 'post',
    data: user
  })
}



export function updateStatus (userId,status) {
  return request({
    url: 'api/user/status/update?userId='+userId+"&status="+status,
    method: 'put'
  })
}

export function getUserByName (username) {
  return request({
    url: 'api/user?username='+username,
    method: 'get'
  })
}

export function updatePwd(username,oldPwd,newPwd){
  return request({
    url: 'api/user/updatePwd?username='+username+"&oldPassword="+oldPwd+"&newPassword="+newPwd,
    method: 'put'
  })
}
