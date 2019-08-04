import axios from '@/libs/api.request'
import qs from 'qs'
/*
*  上传文件
* */
export const uploadFile = ({ file, nbCode }) => {
  console.log(file)
  return axios.request({
    url: '/importResult',
    method: 'post',
    headers: {
      //'Content-Type': 'multipart/form-data;chartset=UTF-8'
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    processData: false, // 告诉axios不要去处理发送的数据(重要参数)
    data: file,
    params: {
      nbCode
    }
  })
}
