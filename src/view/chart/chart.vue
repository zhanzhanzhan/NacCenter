<template>
  <div class="view-content">
    <div class="title">
      {{activeNb.nbName}} <span>{{activeNb.nbCode}}</span>
    </div>
    <div class="info-list">
      <Row :gutter="10">
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              网络信息
            </div>
            <div class="item-content" v-if="networkInfo !==''">
              <div class="list-item">
                <span class="name">IP地址</span>：
                <span class="value">{{networkInfo.ipAddress}}</span>
              </div>
              <div class="list-item">
                <span class="name">IP子网</span>：
                <span class="value">{{networkInfo.ipSubnet}}</span>
              </div>
              <div class="list-item">
                <span class="name">网关</span>：
                <span class="value">{{networkInfo.geteway}}</span>
              </div>
              <div class="list-item">
                <span class="name">DNS服务器</span>：
                <span class="value">{{networkInfo.serverAddress}}</span>
              </div>
            </div>
            <div class="item-content" v-if="networkInfo === ''" style="text-align: center">暂无数据</div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              系统现状
            </div>
            <div class="item-content" v-if="system !== ''">
              <div class="list-item">
                <span class="name">系统负载</span>：
                <span class="value">{{system.systemLoad}}</span>
              </div>
              <div class="list-item">
                <span class="name">活跃主机</span>：
                <span class="value">{{system.activeHost}}</span>
              </div>
              <div class="list-item">
                <span class="name">入侵主机</span>：
                <span class="value">{{system.blockingHost}}</span>
              </div>
              <div class="list-item">
                <span class="name">保护主机</span>：
                <span class="value">{{system.hostProtection}}</span>
              </div>
              <div class="list-item">
                <span class="name">忽略名单</span>：
                <span class="value">{{system.ignoreHost}}</span>
              </div>
              <div class="list-item">
                <span class="name">在线主机</span>：
                <span class="value">{{system.liveHost}}</span>
              </div>
              <div class="list-item">
                <span class="name">白名单</span>：
                <span class="value">{{system.nameList}}</span>
              </div>
              <div class="list-item">
                <span class="name">nb序列号</span>：
                <span class="value">{{system.nbCode}}</span>
              </div>

              <div class="list-item">
                <span class="name">单机模式</span>：
                <span class="value">{{system.single}}</span>
              </div>
              <div class="list-item">
                <span class="name">学习模式</span>：
                <span class="value">{{system.studyMode}}</span>
              </div>
              <!--<div class="list-item">
                <span class="name">保护宿主总数</span>：
                <span class="value">{{system.hostProtection}}</span>
              </div>-->
              <div class="list-item">
                <span class="name">版本号</span>：
                <span class="value">{{system.version}}</span>
              </div>
            </div>
            <div class="item-content" v-if="system === ''" style="text-align: center">暂无数据</div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              模式设置
            </div>
            <div class="item-content">
              <div class="list-item" >
                <span class="name">单向模式</span>：
                <span class="value">{{modeSet.single}}</span>
              </div>
              <div class="list-item" >
                <span class="name">学习模式</span>：
                <span class="value">{{modeSet.learning}}</span>
              </div>
              <div class="list-item" >
                <span class="name">btime</span>：
                <span class="value">{{modeSet.ctime}}</span>
              </div>
              <div class="list-item" >
                <span class="name">ctime</span>：
                <span class="value">{{modeSet.btime}}</span>
              </div>
              <div class="list-item" >
                <span class="name">ltime</span>：
                <span class="value">{{modeSet.ltime}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              白名单
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="!whiteList.length">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in whiteList">
                <span>{{item.split(' ')[0]}}</span>
                <span>{{item.split(' ')[1]}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              忽略名单
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="!ignoreList.length">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in ignoreList" v-if="ignoreList.length">
                <span>{{item.macAddress}}</span>
                <span>{{item.ipAddress}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              活跃主机列表
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="!liveMasteList.length">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in liveMasteList" >
                <span>{{item.macAddress}}</span>
                <span>{{item.ipAddress}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              在线主机列表
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="onlineMasteList === ''">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in onlineMasteList" v-if="onlineMasteList !== ''">
                <span>{{item.macAddress}}</span>
                <span>{{item.ipAddress}}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="info-item">
            <div class="item-title">
              入侵主机列表
            </div>
            <div class="item-content">
              <div style="text-align: center" v-if="blockingHost === ''">暂无数据</div>
              <div class="list-item2" v-for="(item, index) in blockingHost" v-if="blockingHost !== ''">
                <span>{{item.macAddress}}</span>
                <span>{{item.ipAddress}}</span>
              </div>
            </div>
          </div>
        </Col>

      </Row>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNetworkInfo, getStudyMode, nbGetNameList, getMasterInfo, getSystemStatus } from '../../api/chart'

export default {
  name: 'chart',
  data () {
    return {
      networkInfo: {}, // 网络信息
      modeSet: {}, // 模式
      whiteList: [], // 白名单
      ignoreList: [], // 忽略名单
      liveMasteList: [], // 活跃主机
      onlineMasteList: [], // 在线主机
      system: {}, // 当前现状
      blockingHost: {} // 入侵主机
    }
  },
  methods: {
    ...mapActions([
      'getAsideList'
    ]),
    async getNetworkInfo (nbCode) {
      let res = await getNetworkInfo({ nbCode: nbCode })
      if (res.status === 200) {
        this.networkInfo = res.data
      }
    },
    async getStudyMode (nbCode) {
      let res = await getStudyMode({ nbCode: nbCode })
      if (res.status === 200) {
        this.modeSet = res.data
      }
    },
    async nbGetNameList (nbCode, type) {
      let res = await nbGetNameList({ nbCode: nbCode, type: type })
      if (res.data.code === '200') {
        if (type === 4) {
          this.whiteList = res.data.result
        } else if (type === 5) {
          this.ignoreList = res.data.result
        }
      }
    },
    async getMasterInfo (nbCode, type) {
      let res = await getMasterInfo({ nbCode: nbCode, type: type })
      if (res.status === 200) {
        switch (type) {
          case 1:
            this.onlineMasteList = res.data
            break
          case 2:
            this.liveMasteList = res.data
            break
          case 3:
            this.blockingHost = res.data
            break
        }
      }
    },
    async getSystemStatus (nbCode) {
      let res = await getSystemStatus({ nbCode: nbCode })
      if (res.status === 200) {
        this.system = res.data
      }
    },
    funHandle () {
      this.getNetworkInfo(this.activeNb.nbCode)
      this.getStudyMode(this.activeNb.nbCode)
      this.nbGetNameList(this.activeNb.nbCode, 4)
      this.nbGetNameList(this.activeNb.nbCode, 5)
      this.getMasterInfo(this.activeNb.nbCode, 1)
      this.getMasterInfo(this.activeNb.nbCode, 2)
      this.getMasterInfo(this.activeNb.nbCode, 3)
      this.getSystemStatus(this.activeNb.nbCode)
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
        this.funHandle()
        this.$Loading.finish()
      },
      deep: true
      // immediate: true
    }

  },
  mounted () {
    this.funHandle()
  },
 /* beforeDestroy () {
    this.getAsideList()
  }*/
}
</script>
<style lang="less" scoped>
  @import "chart";
</style>
