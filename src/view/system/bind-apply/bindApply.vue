<template>
  <div class="main-content">
    <Tabs value="tab1">
      <TabPane label="申请列表" name="tab1">
        <Table border :columns="tableColumns" :data="applyList" :loading="tableLoad">
          <template slot-scope="{ row }" slot="applyUserName">
            <strong>{{ row.applyUserName }}</strong>
          </template>
          <template slot-scope="{ row }" slot="flowState">
            {{ row.flowState | flowState }}
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" :disabled="row.flowState !== 1 || row.applyUserName === userInfo.userName" @click="show(row)">审核</Button>
          </template>
        </Table>
      </TabPane>
    </Tabs>
    <!--对话框-->
    <Modal
      v-model="changeApplySateModal"
      :loading = "changeApplyStateLoading"
      title="审核"
      @on-ok="ok">
      <div style="padding: 20px">
        <Form :model="activeApplyInfo" :label-width="80" ref="uptApply" :rules="uptApplyValidate">
          <FormItem label="状态" prop="state">
            <Select v-model="activeApplyInfo.state">
              <Option :value="item.state" v-for="(item, index) in stateList">{{item.stateName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="审核理由" prop="reason">
            <Input v-model="activeApplyInfo.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="审核理由..."></Input>
          </FormItem>
        </Form>
      </div>

    </Modal>
  </div>
</template>
<script>
import { getAllUserFlow, checkUserApplyBind } from '../../../api/userBind'
import { mapState } from 'vuex'
export default {
  name: 'bindApply',
  data () {
    return {
      tableLoad: false,
      tableColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '申请用户',
          key: 'applyUserName',
          slot: 'applyUserName'
        },
        {
          title: '申请理由',
          key: 'applyReason'
        },
        {
          title: '审核人',
          key: 'auditUserName'
        },
        {
          title: '审核状态',
          key: 'flowState',
          slot: 'flowState'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          slot: 'action'
        }
      ],
      applyList: [],
      stateList: [
        { state: true, stateName: '通过' },
        { state: false, stateName: '拒绝' }
      ],
      flowId: null,
      changeApplyStateLoading: false,
      changeApplySateModal: false,
      activeApplyInfo: {
        state: true,
        reason: ''
      },
      uptApplyValidate: {
        state: [
          { required: true, message: '审核状态不能为空！', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  filters: {
    flowState (value) {
      switch (value) {
        case 1:
          return '待审核'
        case 2:
          return '通过'
        case 3:
          return '拒绝'
      }
    }
  },
  methods: {
    /* 查询所有流程 */
    async getAllUserFlow () {
      let res = await getAllUserFlow()
      console.log(res)
      if (res.data.code === 'success') {
        this.applyList = res.data.result
      }
    },
    /* 提交审核结果 */
    async checkUserApplyBind () {
      let json = {
        state: this.activeApplyInfo.state,
        auditReason: this.activeApplyInfo.reason,
        flowId: this.flowId
      }
      this.changeApplyStateLoading = true
      let res = await checkUserApplyBind(json)
      this.changeApplyStateLoading = false
      this.changeApplySateModal = false
      if (res.data.code === 'success') {
        this.$Message.success('审核提交成功！')
      } else {
        this.$Message.error(res.data.msg)
      }
    },
    show (row) {
      this.changeApplySateModal = true
      this.flowId = row.flowId
    },
    ok () {
      this.checkUserApplyBind()
    }
  },
  mounted () {
    this.getAllUserFlow()
  }
}
</script>
<style lang="less" scoped>
  @import "bindApply";
</style>
