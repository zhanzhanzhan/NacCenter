import axios from '@/libs/api.request'

/*
* 登录
* */
export const login = ({ userNo, password }) => {
  return axios.request({
    url: `/user/loginIn`,
    method: 'post',
    params: {
      userNo, password
    }
  })
}
/*
* 登出
* */
export const loginOut = () => {
  return axios.request({
    url: `/user/loginOut`,
    method: 'post'
  })
}

/*
* 注册
* */
export const register = ({ userNo, userName, password, smsCode, openid }) => {
  return axios.request({
    url: `/user/register`,
    method: 'post',
    params: {
      userNo, userName, password, smsCode, openid
    }
  })
}
/*
*  获取验证码
* */

export const getSmsCode = ({ userNo }) => {
  return axios.request({
    url: `/user/getsmsCode`,
    method: 'post',
    params: {
      userNo
    }
  })
}

/*
*  验证用户账号是否存在
* */
export const checkUserNo = ({ userNo }) => {
  return axios.request({
    url: `/user/checkByUserNo`,
    method: 'post',
    params: {
      userNo
    }
  })
}

/*
*  微信绑定账号
* */

export const wxUserBinding = ({ userNo, openid, smsCode }) => {
  return axios.request({
    url: `/user/wxUserBinding`,
    method: 'post',
    params: {
      userNo, smsCode, openid
    }
  })
}

/*
*  微信登录入口
* */

export const wxUserLogin = (sid) => {
  return axios.request({
    url: `/wxLogin/${sid}`,
    method: 'get'
  })
}
/*
*  企业管理员转让
* */

export const roleTransfer = ({ userId }) => {
  return axios.request({
    url: `/roleTransfer`,
    method: 'post',
    params: {
      userId
    }
  })
}
