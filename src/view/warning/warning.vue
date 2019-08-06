<template>
  <div class="view-content">
    <div class="title">
      {{activeNb.nbName}} <span>{{activeNb.nbCode}}</span>
    </div>
    <div class="info-list">
      <Row class="table-container" style="width: 100%;overflow: auto">
        <Col span="24">
          <Table border :columns="tableColumns" :data="warningList" :loading="tableLoad">
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
        </Col>
      </Row>
    </div>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getBlockRosterList } from '../../api/warning'

export default {
  name: 'chart',
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
          title: 'ip地址',
          key: 'applyUserName',
          slot: 'applyUserName'
        },
        {
          title: '入侵时间',
          key: 'auditUserName'
        }
      ],
      warningList: []
    }
  },
  methods: {
    ...mapMutations([
      'setActiveNb'
    ]),
    ...mapActions([
      'getAsideList'
    ]),
    async getBlockRosterList () {
      let res = await getBlockRosterList({ nbCode: this.activeNb.nbCode })
      console.log(res)
      if (res.data.code === 'success') {
        this.warningList = res.data.result ? res.data.result : []
      }
    }

  },
  computed: {
    ...mapState({
      activeNb: state => state.app.activeNb
    })
  },
  watch: {
    activeNb: {
      handler (newVal, old) {
        this.$Loading.start()
        this.getBlockRosterList()
        this.$Loading.finish()
      },
      deep: true
      // immediate: true
    }
  },
  mounted () {
    this.getBlockRosterList()
  }
}
</script>
<style lang="less" scoped>
  @import "warning";
</style>
