<template>
  <div class="main-content">
    <Tabs value="tab1" name="main-tab">
      <TabPane label="分组信息" name="tab1" tab="main-tab">
        <Card bordered :shadow="false">
          <div class="panel-content">
            <div class="role-list">
              <div class="title">
                分组列表
              </div>
              <div class="role-item-wrap">
                <div style="text-align: center" v-if="!groupList">暂无分组信息</div>
                <div class="role-item"
                     v-for="(item, index) in groupList"
                     @click="changeGroup(item.groupId, index)"
                     :class="active === index ? 'active': ''">
                  {{item.groupName}}
                  <Icon color="#2d8cf0" type="ios-arrow-forward" v-if="active === index"/>
                </div>
              </div>
              <div class="add">
                <Button long icon="md-add" @click="addModal = true">新增分组</Button>
              </div>
              <Modal
                v-model="addModal"
                title="新增分组"
                :loading="loading"
                @on-ok="add('addRoleForm')">
                <Form ref="addRoleForm" :model="addRoleForm" :rules="addRoleRule" :label-width="80">
                  <FormItem label="分组名" prop="groupName">
                    <Input v-model="addRoleForm.groupName" placeholder="请输入分组名"></Input>
                  </FormItem>
                  <FormItem label="备注">
                    <Input v-model="addRoleForm.remarks" placeholder="请输入分组名"></Input>
                  </FormItem>
                </Form>
              </Modal>
            </div>
            <div class="menu-list">
              <Tabs  value="supTab1" name="sub-tab">
                <TabPane label="机器列表" name="supTab1" tab="sub-tab">
                  <div style="padding:10px;margin-bottom:6px;">
                    <Checkbox
                      :indeterminate="indeterminate"
                      :value="checkAll"
                      @click.prevent.native="handleCheckAll">全选
                    </Checkbox>
                  </div>
                  <Card :bordered="false" style="min-height: 300px">
                    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" class="box-group">
                      <Checkbox :label="item.nbName" v-for="(item, index) in nbList" class="box-item">
                        <span>{{item.nbName}}</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </Card>
                  <div class="save" style="margin-top: 20px;">
                    <Button @click="save">保存</Button>
                  </div>
                </TabPane>
                <TabPane label="组配置" name="supTab2" tab="sub-tab">标签二的内容</TabPane>
              </Tabs>
            </div>
          </div>
        </Card>
      </TabPane>
      <TabPane label="修改分组" name="tab2" tab="main-tab">
        <Row type="flex" justify="center">
          <Col span="24">
            <div class="modify">
              <div class="role-item" v-for="(item) in groupList" :key="item.roleId">
            <span class="item-text">
               {{item.groupName}}
            </span>
                <Button type="primary" ghost size="small" @click="modifyModal = true" style="margin-right: 10px">修改</Button>
                <Button type="error" ghost size="small" @click="remove(item.roleId)">删除</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          v-model="modifyModal"
          title="修改分组"
          :loading="loading"
          @on-ok="modify('addRoleForm')">
          <Form ref="addRoleForm" :model="addRoleForm" :rules="addRoleRule" :label-width="80">
            <FormItem label="分组名" prop="groupName">
              <Input v-model="addRoleForm.groupName" placeholder="请输入分组名"></Input>
            </FormItem>
          </Form>
        </Modal>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import {
  addGroup,
  addNbToGroup,
  delGroup,
  delGroupRoster,
  getGroupRoster,
  insGroupRoster,
  getAllGroup,
  getNbCodeInfoByGroupId,
  updateNbGroup,
  uptGroupParam
} from '../../../api/group.js'
import { selectnbList } from '../../../api/menuManage'
import { mapState } from 'vuex'

export default {
  name: 'roleManage',
  data () {
    const validategroupName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入分组名！'))
      }
      /*selgroupName({ groupName: value, parentId: this.userInfo.parentId }).then((res) => {
        if (res.data.result === '分组名已存在！') {
          callback(new Error('该分组名已存在！'))
        } else {
          callback()
        }
      })*/
      callback()
    }
    return {
      active: 0,
      activeGroupId: '',
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [],
      groupList: [],
      loading: false,
      addModal: false,
      modifyModal: false,
      addRoleForm: {},
      addRoleRule: {
        groupName: [
          { required: true, validator: validategroupName, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      nbList: state => state.app.asideList
    })
  },
  methods: {
    /* 获取所有分组 */
    async getAllGroup () {
      let res = await getAllGroup()
      // console.log(res)
      if (res.data.code === 'success') {
        this.groupList = res.data.result
        this.changeGroup(this.groupList[0].roleId, 0)
      } else {
       // console.log(res.data.msg)
      }
    },
    /* 根据id获取菜单 */
    async getNbCodeInfoByGroupId (groupId) {
      let res = await getNbCodeInfoByGroupId({ groupId: groupId })
      // console.log(res)
      this.checkAllGroup = []
      if (res.data.code === 'success') {
        if (!res.data.result) return
        res.data.result.map((item, index) => {
          this.checkAllGroup.push(item.nbName)
        })
      }
      // console.log(this.checkAllGroup)
    },
    /* 新增分组信息 */
    async addGroup () {
      this.loading = true
      let res = await addGroup({ ...this.addRoleForm })
      if (res.data.code === 'success') {
        this.$Message.success('新增分组成功')
        this.loading = false
        this.addRoleForm = {}
        this.getAllGroup()
      } else {
        this.$Message.error(res.data.msg)
      }
    },
    /* 修改分组信息 */
    async uptRoleInfo (groupName) {
      this.loading = true
      let res = await uptRoleInfo({ groupName: groupName, parentId: this.userInfo.parentId })
      console.log(res)
      if (res.data.code === 'success') {
        this.loading = false
        this.$Message.success('修改分组成功')
        this.getAllGroup()
      } else {
        this.$Message.error(res.data.msg)
      }
    },
    /* 根据分组Id绑定菜单 */
    async bindTreeInfoByRoleId () {
      let res = await bindTreeInfoByRoleId({ roleId: this.activeGroupId, list: this.checkAllGroup })
      console.log(res)
      if (res.data.code === 'success') {
        this.$Message.success('保存成功')
      } else {
        this.$Message.error('保存失败')
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        let arr = []
        this.nbList.map((item, index) => {
          arr.push(item.nbName)
        })
        this.checkAllGroup = arr
      } else {
        this.checkAllGroup = []
      }
    },
    checkAllGroupChange (data) {
      if (data.length === this.nbList.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    changeGroup (groupId, index) {
      this.active = index
      this.activeGroupId = groupId
      this.getNbCodeInfoByGroupId(groupId)
    },
    add (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addGroup()
        } else {
          this.$Message.error('操作失败，请检查输入信息格式是否正确!')
        }
      })
    },
    save () {
      this.bindTreeInfoByRoleId()
    },
    modify (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.uptRoleInfo(this.addRoleForm.groupName)
        } else {
          this.$Message.error('操作失败，请检查输入信息格式是否正确!')
        }
      })
    },
    remove (roleId) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定删除此条分组吗？</p>',
        loading: true,
        onOk: () => {
          delRoleInfo({ roleId: roleId }).then((res) => {
            //console.log(res)
            if (res.data.code === 'success') {
              this.$Modal.remove()
              this.getAllGroup()
            }
          }).catch((res) => {
            //console.log(res)
          })
        }
      })
    }
  },
  mounted () {
    this.getAllGroup()
  }
}
</script>
<style lang="less" scoped>
  @import "groupManage";
</style>
