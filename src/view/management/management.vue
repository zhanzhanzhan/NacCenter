<template>
  <div class="view-content">
    <div class="title">
      {{activeNb.nbName}} <span>{{activeNb.nbCode}}</span>
    </div>
    <div class="info-list">
      <Row class="table-container" style="width: 100%;overflow: auto">
        <Col span="24">
          <Table :columns="management" :data="managementList" :loading="loading" stripe class="table" align="">
            <template slot-scope="{ row }" slot="f01">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f01 }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="ipAddress">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.ipAddress }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="f02">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f02 }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="f03">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f03 }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="f04">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f04 }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="f05">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f05 }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="f06">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f06 }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="f07">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f07 }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="f08">
              <span style="font-size: 12px;color: #666"><span style="color: #333;margin-left: 20px">{{ row.f08 }}</span></span>
            </template>

          </Table>
        </Col>
      </Row>
      <Row type="flex" justify="center" class="opera">
        <Col>
          <Page :total="pageInfo.total" @on-change="pageChange" prev-text="上一页" next-text="下一页" :page-size="pageInfo.pageSize" />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getManagement } from '../../api/chart'

export default {
  name: 'chart',
  data () {
    return {
      loading: false,
      pageInfo: {
        pageNo: 1,
        pageSize: 8
      },
      management: [
        {
          title: '主机名',
          slot: 'f01',
          width: 120,
          align: 'center'
        },
        {
          title: 'ip地址',
          slot: 'ipAddress',
          width: 150,
          align: 'center'
        },
        {
          title: '主机MAC地址',
          slot: 'f02',
          width: 200,
          align: 'center'
        },
        {
          title: '主机MAC厂商',
          slot: 'f03',
          width: 150,
          align: 'center'
        },
        {
          title: '操作系统类型',
          slot: 'f04',
          width: 150,
          align: 'center'
        },
        {
          title: '终端类型',
          slot: 'f05',
          width: 150,
          align: 'center'
        },
        {
          title: '终端厂商',
          slot: 'f06',
          width: 150,
          align: 'center'
        },
        {
          title: '开启的端口',
          slot: 'f07',
          width: 150,
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            let texts = params.row.f07
            if (texts !== null) {
              if (texts.length > 20) {
                texts = texts.slice(0, 10) + '......'
              }
            }
            return h('div', [
              h('Tooltip', {
                props: {
                  placement: 'top',
                  transfer: true
                }
              }, [texts, h('span', {
                slot: 'content',
                style: {
                  whiteSpace: 'normal'
                }
              }, params.row.f07)])

            ])
          }
        },
        {
          title: '服务进程',
          slot: 'f08',
          width: 150,
          tooltip: true
        },


      ],
      managementList: [
      ],
    }
  },
  methods: {
    async getManagement (page, ipAddress) {
      let res = await getManagement({ nbCode: this.activeNb.nbCode, pageNo: page, pageSize: this.pageInfo.pageSize, ipAddress: ipAddress })
      // console.log(res)
      this.managementList = res.data.data
      this.pageInfo.total = res.data.totalCount
    },
    pageChange (page) {
      this.getManagement(page)
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
        this.getManagement(1)
        this.$Loading.finish()
      },
      deep: true
      // immediate: true
    }
  },
  mounted () {
    this.getManagement(1)
  }

}
</script>
<style lang="less" scoped>
  @import "management";
</style>
