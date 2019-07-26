import axios from '@/libs/api.request'

/*
*  新建NB机器分组
* */
export const addGroup = ({ groupName, remarks}) => {
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

/* 获取所有分组 */

export const getAllGroup = () => {
  return axios.request({
    url: `/groups/sel`,
    method: 'get'
  })
}

/* 修改nb分组信息 */

export const updateNbGroup = ({ groupId, groupName, unitId, remarks }) => {
  return axios.request({
    url: `/groups/update`,
    method: 'put',
    params: {
      groupId, groupName, unitId, remarks
    }
  })
}
