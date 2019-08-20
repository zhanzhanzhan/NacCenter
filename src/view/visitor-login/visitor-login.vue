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
          <div class=" tab tab2" v-show="tab === 'tab2'">
            <div class="title">
              <span>访客登录</span>
              <span @click="tab = 'tab1'">雇员登录</span>
            </div>
            <div id="qrcode"></div>
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
import { wxUserLogin } from '../../api/login'
import qs from 'qs'
export default {
  data () {
    return {
      tab: 'tab1',
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
      this.createWxQrcode()
    },
    /* weixin */
    createWxQrcode () {
      let json = this.$route.query
      console.log(json)
      var obj=new WxLogin({
        self_redirect:false,
        id:'qrcode',
        appid:'wx243ad0422689c414',
        scope:'snsapi_login',
        redirect_uri: 'http://wingsbro.mynetgear.com:8081/visitorLogin?code=CODE&state=STATE&nbCode=123',
        state: encodeURI(json),
        style:'black',
        href:'',
      })
    },
    // 验证是否扫码登录
    async checkWxLogin () {
      if (this.$route.query.code) {
         console.log('已扫码')
        let json = {
          code : this.$route.query.code[1]
        }

        let res = await wxUserLogin(json)
        // console.log(res)
        if (res.data.code === 'success') {
          this.$Notice.success({
            title: '提示',
            desc: data.result,
            duration: 0
          });
        } else {
          this.$Notice.error({
            title: '提示',
            desc: data.result,
            duration: 0
          });
        }
      }
    }
  },
  mounted () {
    let json = this.$route.query
    console.log(json)
    /*if (!this.$route.query.nbCode) {
      this.$router.push({ path: '/404' })
    }*/
    this.checkWxLogin()

  }

}
</script>
<style lang="less" scoped>
  @import "visitor-login";
</style>
