<template>
  <div class="view-content">
    <div class="title">
      NginxLB <span>Nginx 1.10.103</span>
    </div>
    <div class="nav-box">
      <div class="nav-bar">
        <div class="nav-item" v-for="(item,index) in navList" :class="activeNav === index ? 'active' : ''" @click="changeNav(index)">{{item}}</div>
      </div>
      <div class="nav-content" v-if="activeNav === 0">
        <div class="form-group">
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">btime:</label>
                <input type="text" class="my-input">
                <span>请输入正整数，单位秒</span>
              </div>
            </Col>
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">ctime:</label>
                <input type="text" class="my-input" >
                <span>请输入正整数，单位秒</span>
              </div>
            </Col>

          </Row>
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">ltime:</label>
                <input type="text" class="my-input">
                <span>请输入正整数，单位秒</span>
              </div>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">学习模式:</label>
                <i-switch v-model="learnMode" @on-change="changeLearnMode" />
              </div>
            </Col>
            <Col span="12">
              <div class="form-item">
                <label for="" class="my-label">单个:</label>
                <i-switch v-model="single" @on-change="changeSingle" />
              </div>
            </Col>
          </Row>
        </div>
        <div class="save"><span>保存</span></div>
      </div>
      <div class="nav-content2" v-if="activeNav === 1">
        <Row class="list-head" type="flex" justify="space-between" align="top">
          <Col span="6"> <h3>白名单列表:</h3></Col>
          <Col span="6">
            <Input suffix="ios-search" placeholder="Enter text" />
          </Col>
        </Row>
        <Row class="table-container">
          <Table :columns="columns12" :data="data6" :loading="loading" :show-header="false" stripe size="small">
            <template slot-scope="{ row }" slot="mac">
              <span style="font-size: 12px;color: #666">MAC地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.mac }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="ip">
              <span style="font-size: 12px;color: #666">IP地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.ip }}</span></span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Icon type="ios-trash" size="24" color="#00e9bc" @click="remove(index)"/>
            </template>
          </Table>
        </Row>
        <Row type="flex" justify="space-between" class="opera">
          <Col>
            <Page :total="100" prev-text="上一页" next-text="下一页" page-size="8" />
          </Col>
          <Col class="btn-group">
            <span>添加白名单</span>
            <span>清空列表</span>
          </Col>
        </Row>
      </div>
      <div class="nav-content2" v-if="activeNav === 2">
        <Row class="list-head" type="flex" justify="space-between" align="top">
          <Col span="6"> <h3>白名单列表:</h3></Col>
          <Col span="6">
            <Input suffix="ios-search" placeholder="Enter text" />
          </Col>
        </Row>
        <Row class="table-container">
          <Table :columns="columns12" :data="data6" :loading="loading" :show-header="false" stripe size="small">
            <template slot-scope="{ row }" slot="mac">
              <span style="font-size: 12px;color: #666">MAC地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.mac }}</span></span>
            </template>
            <template slot-scope="{ row }" slot="ip">
              <span style="font-size: 12px;color: #666">IP地址：<span style="color: #00e9bc;margin-left: 20px">{{ row.ip }}</span></span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Icon type="ios-trash" size="24" color="#00e9bc" @click="remove(index)"/>
            </template>
          </Table>
        </Row>
        <Row type="flex" justify="space-between" class="opera">
          <Col>
            <Page :total="100" prev-text="上一页" next-text="下一页" page-size="8" />
          </Col>
          <Col class="btn-group">
            <span>添加白名单</span>
            <span>清空列表</span>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'config',
  data () {
    return {
      activeNav: 0,
      learnMode: true,
      single: false,
      navList: [
        '模式参数',
        '白名单',
        '忽略名单'
      ],
      loading: false,
      columns12: [
        {
          title: 'Mac地址',
          slot: 'mac',
          width: 350
        },
        {
          title: 'Ip地址',
          slot: 'ip'
        },

        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data6: [
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        },
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        },
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        },
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        },
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        },
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        },
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        },
        {
          mac: '64:5a:04:64:5a:04',
          ip: '192.168.0.1'
        }
      ]
    }
  },
  methods: {
    changeNav (index) {
      this.activeNav = index
    },
    changeLearnMode (status) {
      this.$Message.info('开关状态：' + status)
    },
    changeSingle (status) {
      this.$Message.info('开关状态：' + status)
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "config";
</style>
