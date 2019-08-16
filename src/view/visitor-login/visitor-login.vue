<template>
  <div class="welcome">
    <Alert show-icon type="warning">
      提示：
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
      <template slot="desc">
        您正在尝试接入受控网络，该局域网络属于专有网络,如果您是合法访问用户,请通过以下方式接入网络:
      </template>
    </Alert>
    <Divider>选择登录方式</Divider>
    <div class="con">
      <Card :bordered="false" dis-hover style="width: 400px;height: 80%">
        <div class="login-wrap">
          <div class="tab tab1" v-if="tab === 'tab1'">
            <div class="title">
              <span>雇员登录</span>
              <span @click="visitorLogin">访客登录</span>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="form">
              <FormItem label="" prop="name">
                <Input v-model="formValidate.name" placeholder="用户账号"></Input>
              </FormItem>
              <FormItem label="" prop="password">
                <Input v-model="formValidate.password" placeholder="密码"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" long @click="handleSubmit('formValidate')">登录</Button>
              </FormItem>
            </Form>
          </div>
          <div class=" tab tab2" v-if="tab === 'tab2'">
            <div class="title">
              <span>访客登录</span>
              <span @click="tab = 'tab1'">雇员登录</span>
            </div>
            <div class="qrcode" ref="qrCodeUrl" ></div>
          </div>
        </div>

      </Card>
    </div>

    <div class="footer">
      <Divider>感谢使用Wingsbro Nacsys系统</Divider>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import { wxUserLogin } from '../../api/login'
export default {
  data () {
    return {
      tab: 'tab1',
      path: process.env.NODE_ENV === 'development' ? 'ws://192.168.1.110/websocket/' : 'ws://app.wingsbro.com:8070/websocket/',
      formValidate: {
        name: '',
        password: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    // 访客登录
    visitorLogin () {
      this.tab = 'tab2'
      this.weChatLogin()
    },
    async weChatLogin () {
      let sid = +new Date()
      let json = {
        ...this.$route.query
      }
      let res = await wxUserLogin(sid, json)
      // console.log(res)
      if (res.data.code === 'success') {
        this.creatQrCode(res.data.result)
        this.init(this.path + sid)
        // 三分钟后关闭连接
        setTimeout(() => {
          this.wsClose()
        }, 1000 * 60 * 3)
      } else {
        this.$Message.error(`登录错误：${res.data.result}`)
      }
    },
    /* 生成二维码 */
    creatQrCode (url) {
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: url,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: 3
      })
    },
    init (url) {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket,请升级浏览器或更换浏览器')
      } else {
        // 实例化socket
        this.socket = new WebSocket(url)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
        this.socket.onclose = this.wsClose
      }
    },
    open () {
      //console.log('socket连接成功')
    },
    error () {
      //console.log('连接错误')
    },
    getMessage (msg) {
      //console.log(msg)
      let data
      if (msg.data === '连接成功') {
        return
      } else {
        data = JSON.parse(msg.data)
       // console.log(data)
      }
      if (data.code === 'success') {
        this.$Notice.success({
          title: '提示',
          desc: data.result,
          duration: 0
        });
        this.wsClose()
      } else {
        this.$Notice.error({
          title: '提示',
          desc: data.result,
          duration: 0
        });
      }
    },
    send () {
      this.socket.send('')
    },
    wsClose () {
       console.log('socket已经关闭')
    },
  },
  mounted () {
    if (!this.$route.query.nbCode) {
      this.$router.push({ path: '/404' })
    }
  },
  destroyed () {
    this.wsClose()
  }

}
</script>
<style lang="less" scoped>
  @import "visitor-login";
</style>
