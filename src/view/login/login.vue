<style lang="less" scoped>
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <div class="forget">
            <router-link to="/forgotPassword">忘记密码?</router-link>
          </div>
          <div class="other">
            <div>
              <span>其他登录方式：</span>
              <Icons type="icon-yooxi" @click.native="weChatLogin"></Icons>
            </div>
            <router-link to="/register" style=" font-size: 12px;">注册</router-link>
          </div>
        </div>
      </Card>
    </div>
    <Modal
      v-model="qrCodeModal"
      title="请使用微信扫码登录！"
      class-name="vertical-center-modal"
      footer-hide width="300">
      <div class="qrcode" ref="qrCodeUrl" v-if="qrCodeModal" ></div>
    </Modal>
    <Modal v-model="bindModel" footer-hide fullscreen title="" class-name="bind-modal">
      <Row type="flex" justify="center" >
        <div class="select-box">
          <div class="select-panel">
            <div class="title">
              选择注册或关联账号
            </div>
            <div class="item">
              <h3>注册新账号</h3>
              <p>
                使用此微信注册一个新账号
              </p>
              <div class="arrow"  @click="$router.push({ path:'register',query:{ openid: openid }})">
                <Icons type="icon-arrow-up" color="#00a4ff" :size="40" ></Icons>
              </div>
            </div>
            <div class="item" >
              <h3>关联已有账号</h3>
              <p>
                关联此微信到已有账号，，您可以通过微信快速登录
              </p>
              <div class="arrow" @click="$router.push({ path:'bind',query:{ openid: openid }})">
                <Icons type="icon-arrow-up" :size="40" ></Icons>
              </div>
            </div>
          </div>
        </div>
      </Row>

    </Modal>
    <Particles/>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { wxUserLogin } from '../../api/login'
import { mapActions, mapMutations } from 'vuex'
import Icons from '_c/icons'
import Particles from '_c/particles'
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      path: process.env.NODE_ENV === 'development' ? 'ws://192.168.1.110/websocket/' : 'ws://app.wingsbro.com:8070/websocket/',
      qrCodeModal: false,
      bindModel: false,
      openid: ''
    }
  },
  components: {
    LoginForm, Icons, Particles
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    ...mapMutations([
      'setUserInfo',
      'setToken'
    ]),
    handleSubmit (data) {
      this.handleLogin({ userNo: data.userName, password: data.password }).then(res => {
        if (res.data.code === 'success') {
          this.$router.push({
            name: this.$config.homeName
          })
        } else {
          this.$Message.error(res.data.result)
        }
      })
    },
    async weChatLogin () {
      this.qrCodeModal = true
      let sid = +new Date()
      let res = await wxUserLogin(sid)
      // console.log(res)
      if (res.data.code === 'success') {
        this.creatQrCode(res.data.result)
        this.init(this.path + sid)
        // 三分钟后关闭连接
        setTimeout(() => {
          this.wsClose()
          this.qrCodeModal = false
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
  destroyed () {
    this.wsClose()
  }
}
</script>

<style>

</style>
