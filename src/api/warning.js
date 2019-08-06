import axios from '@/libs/api.request'

/*
*  添加用户角色
* */
export const getBlockRosterList = ({ nbCode }) => {
  return axios.request({
    url: '/getBlockRosterList',
    method: 'get',
    params: {
      nbCode
    }
  })
}
