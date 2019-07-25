import axios from '@/libs/api.request'
/*
* 1.添加白名单,2.添加忽略名单，3.添加阻拦名单
* */
export const addIp = ({ nbCode, type, ipAddress, macAddress }) => {
  return axios.request({
    url: `/nb/addip`,
    method: 'post',
    params: {
      nbCode, type, ipAddress, macAddress
    }
  })
}

/*
* 删除名单
* */
export const deleteNbList = ({ id }) => {
  return axios.request({
    url: `/nb/delent`,
    method: 'delete',
    params: {
      id
    }
  })
}

/*
* 批量删除名单
* ids: array
* */
export const deleteNbLists = ({ ids }) => {
  return axios.request({
    url: `/nb/delents`,
    method: 'delete',
    params: {
      ids
    }
  })
}

/*
* 通过NB序列号查询配置参数
* */
export const getNbConfig = ({ nbCode }) => {
  return axios.request({
    url: `/nb/list`,
    method: 'post',
    params: {
      nbCode
    }
  })
}

/*
* 查询序列号和名单类型
* */
export const getNbType = ({ nbCode, type }) => {
  return axios.request({
    url: `/nb/listAll`,
    method: 'post',
    params: {
      nbCode, type
    }
  })
}

/*
* 用户修改NB运行参数
* */
export const changeNbConfig = ({ nbCode, single, learning, ctime, btime, ltime, ipadress, gateway, dnsser, ipsubnet }) => {
  return axios.request({
    url: `/nb/update`,
    method: 'put',
    params: {
      nbCode, single, learning, ctime, btime, ltime, ipadress, gateway, dnsser, ipsubnet
    }
  })
}

/*
*  获取名单信息
* */
export const getNameList = ({ nbCode, type, pageNo, pageSize }) => {
  return axios.request({
    url: '/getNameList',
    method: 'post',
    params: {
      nbCode, type, pageNo, pageSize
    }
  })
}

