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
          <div class="tab tab1" v-show="tab === 'tab1'">
            <div class="title">
              <span>雇员登录</span>
              <span @click="tab= 'tab2'">访客登录</span>
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
          <div class=" tab tab2" v-show="tab === 'tab2'">
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

export default {
  data () {
    return {
      tab: 'tab1',
      path: 'ws://app.wingsbro.com:8070/websocket/',
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
    /* 生成二维码 */
    creatQrCode () {
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.$route.query.url,
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
      console.log(msg)
      let data, res
      if (msg.data === '连接成功') {
        return
      } else {
        data = JSON.parse(msg.data)
      }
      if (data.code === 'success') {
        res = JSON.parse(data.result)
        this.setUserInfo(res)
        this.setToken(res.token)
        this.$router.push({ name: 'home' })
      } else {
        this.bindModel = true
        this.openid = data.result
      }
    },
    send () {
      this.socket.send('')
    },
    wsClose () {
      // console.log('socket已经关闭')
    },
  },
  mounted () {
    this.creatQrCode()
  },
  destroyed () {
    this.wsClose()
  }

}
</script>
<style lang="less" scoped>
  @import "visitor-login";
</style>
