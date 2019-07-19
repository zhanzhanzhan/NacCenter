import axios from '@/libs/api.request'
import qs from 'qs'
/*
*  上传文件
* */
export const uploadFile = ({ file }) => {
  console.log(qs.stringify({file}))
  return axios.request({
    url: '/importResult',
    method: 'post',
    headers: {
      //'Content-Type': 'multipart/form-data;chartset=UTF-8'
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      file
    }
  })
}
