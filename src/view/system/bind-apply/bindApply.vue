<template>
  <div class="main-content">
    <Tabs value="tab1">
      <TabPane label="申请列表" name="tab1">
        <Table border :columns="tableColumns" :data="applyList" :loading="tableLoad">
          <template slot-scope="{ row }" slot="applyUserName">
            <strong>{{ row.applyUserName }}</strong>
          </template>
          <template slot-scope="{ row }" slot="flowState">
            {{ row.flowState? '是' : '否' }}
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index, row)">修改</Button>
          </template>
        </Table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { getAllUserFlow } from '../../../api/userBind'

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
      applyList: []
    }
  },
  methods: {
    async getAllUserFlow () {
      let res = await getAllUserFlow()
      console.log(res)
    },
    show () {
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
