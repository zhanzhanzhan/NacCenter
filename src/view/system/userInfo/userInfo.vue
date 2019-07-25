<template>
  <div class="main-content">
    <Tabs value="tab1">
      <TabPane label="修改用户信息" name="tab1">
        <Row justify="center" type="flex" style="margin-top: 50px;">
          <Col span="8">
            <Form :model="insUserForm" :label-width="80" ref="addUser" :rules="insUserFormValidate"  label-position="left">
              <FormItem label="账号">
                <Input v-model="insUserForm.userNo" placeholder="请输入用户账号" disabled v-if=""></Input>
              </FormItem>
              <FormItem label="用户名" prop="userName">
                <Input v-model="insUserForm.userName" placeholder="请输入用户名"></Input>
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input v-model="insUserForm.password" placeholder="请输入密码" type="password"></Input>
              </FormItem>
              <FormItem label="角色名称">
                <Select v-model="insUserForm.roleName" disabled>
                  <Option :value="item.roleName" v-for="(item, index) in roleNameList">{{item.roleName}}</Option>
                </Select>
              </FormItem>
            </Form>
            <Row justify="center" type="flex" style="margin-top: 40px;">
              <Button type="primary" long :loading="saveLoading" @click="handleSubmit('addUser')" ghost>保存</Button>
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { selUserInfo, updateUser, insUser, uptUserStatus } from '../../../api/userManage'
import { selRoleInfo } from '../../../api/roleInfo'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'userInfo',
  data () {
    return {
      saveLoading: false,
      roleNameList: [],
      insUserForm: {
      },
      insUserFormValidate: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' },
          { type: 'string', max: 12, message: '密码不能大于12位', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change', type: 'number' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    /* 获取用户列表 */
    async selUserInfo (userName) {
      let res = await selUserInfo({ userName: userName })
      if (res.status === 200) {
        this.insUserForm = res.data[0]
      }
    },
    /* 修改用户信息 */
    async updateUser () {
      let res = await updateUser(this.insUserForm)
      if (res.data.code === '200') {
        this.$Message.success('操作成功')
        this.handleLogin({ userNo: this.insUserForm.userNo, password: this.insUserForm.password }).then(res => {
          if (res.data.code === 'success') {
            this.selUserInfo(this.userInfo.userName)
          } else {
            // this.$Message.error(res.data.msg)
          }
        })
      }
      // console.log(res)
    },
    /* 获取角色列表 */
    async selRoleInfo () {
      let res = await selRoleInfo()
      if (res.status === 200) {
        this.roleNameList = res.data
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.updateUser()
        } else {
          this.$Message.error('操作失败，请检查输入信息格式是否正确!')
        }
      })
    },
  },
  mounted () {
    this.selRoleInfo()
    this.selUserInfo(this.userInfo.userName)

  }
}
</script>
<style lang="less" scoped>
  @import "userInfo";
</style>
