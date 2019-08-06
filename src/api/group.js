import axios from '@/libs/api.request'

/*
*  新建NB机器分组
* */
export const addGroup = ({ groupName, remarks }) => {
  return axios.request({
    url: `/groups/add`,
    method: 'post',
    params: {
      groupName, remarks
    }
  })
}

/*
*  添加NB机器到分组
* */
export const addNbToGroup = ({ groupId, nbCode }) => {
  return axios.request({
    url: `/groups/addNbToGroups`,
    method: 'post',
    params: {
      groupId, nbCode
    }

  })
}

/*
*  删除分组
* */
export const delGroup = (groupId) => {
  return axios.request({
    url: `/groups/del/${groupId}`,
    method: 'delete'
  })
}

/*
*  名单管理分组删除
* */
export const delGroupRoster = ({ id, groupId }) => {
  return axios.request({
    url: `/groups/delGroupRoster`,
    method: 'get',
    params: {
      id, groupId
    }

  })
}

/*
*  名单管理分组获取
* */
export const getGroupRoster = ({ groupId }) => {
  return axios.request({
    url: `/groups/getGroupRoster`,
    method: 'get',
    params: {
      groupId
    }

  })
}

/*
*  根据组获取机器信息
* */
export const getNbCodeInfoByGroupId = ({ groupId }) => {
  return axios.request({
    url: `/groups/getNbCodeInfoByGroupId`,
    method: 'post',
    params: {
      groupId
    }

  })
}

/*
*  名单管理分组新增
* */
export const insGroupRoster = ({ groupRoster }) => {
  return axios.request({
    url: `/groups/insGroupRoster`,
    method: 'post',
    data: {
      groupRoster
    }

  })
}
/* 获取所有分组 */

export const getAllGroup = () => {
  return axios.request({
    url: `/groups/sel`,
    method: 'get'
  })
}

/* 修改nb分组信息 */

export const updateNbGroup = ({ groupId, groupName, parentId, remarks }) => {
  return axios.request({
    url: `/groups/update`,
    method: 'put',
    params: {
      groupId, groupName, parentId, remarks
    }
  })
}

/* 运行参数管理 */

export const uptGroupParam = ({ id, groupId, single, learning, ctime, btime, ltime }) => {
  return axios.request({
    url: `/groups/uptGroupParam`,
    method: 'get',
    params: {
      id, groupId, single, learning, ctime, btime, ltime
    }
  })
}
